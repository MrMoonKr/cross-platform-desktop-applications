
// ES6 가 동작하긴 하는데...
// 외부모듈 사용시는 CommonJS 형태로 사용해야 함. './js/filebrowser.js' 참고할 것
import FileBrowser from './js/filebrowser.js' ;


function displayFile( file ) 
{
    const mainArea = document.getElementById( 'main-area' );
    const template = document.querySelector( '#item-template' );
    let clone = document.importNode( template.content, true );
    clone.querySelector( 'img' ).src = `images/${file.type}.svg`;
    clone.querySelector( '.filename' ).innerText = file.file;
    mainArea.appendChild( clone );
}


function displayFiles( err, files ) 
{
    if ( err ) 
    {
        return alert( 'Sorry, we could not display your files' );
    }

    files.forEach( displayFile );
}

function main() 
{
    let homeFolder = FileBrowser.getUsersHomeFolder() ;

    FileBrowser.getFilesInFolder( homeFolder, ( err, files ) => {
        if ( err ) 
        {
            return alert( 'Sorry, we could not load your home folder' );
        }

        FileBrowser.inspectAndDescribeFiles( homeFolder, files, displayFiles );
    } );
    
    const win = nw.Window.get();

    win.on('close', () => {
        process.exit();
    });

    win.on('loaded', () => {
        const currentFolder = document.getElementById('current-folder');
        currentFolder.innerText = FileBrowser.getUsersHomeFolder();
    });

    // let homeFolder = FileBrowser.getUsersHomeFolder() ;

    // FileBrowser.getFilesInFolder( homeFolder, ( err, files ) => {
    //     if ( err ) 
    //     {
    //         return alert( 'Sorry, we could not load your home folder' );
    //     }

    //     FileBrowser.inspectAndDescribeFiles( homeFolder, files, displayFiles );
    // } );
}

main();

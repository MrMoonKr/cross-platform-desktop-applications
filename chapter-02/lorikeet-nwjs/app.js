
// html에 임베드 되는 코드는 ES6 가 동작하긴 하는데...
// 외부모듈 사용시는 CommonJS 형태로 사용해야 함. './js/filebrowser.js' 참고할 것
import FileBrowser from './js/filebrowser.js' ;

/**
 * 'main-area' 노드에 파일 정보 노드 생성 및 추가
 * @param { { file: string, path: string, type: string } } file 파일관련정보
 */
function displayFile( file ) {

    const mainArea  = document.getElementById( 'main-area' );

    const template  = document.querySelector( '#item-template' );   // id로 검색
    let clone       = document.importNode( template.content, true );
    clone.querySelector( 'img' ).src = `images/${file.type}.svg`;   // tag로 검색
    clone.querySelector( '.filename' ).innerText = file.file;       // class로 검색

    mainArea.appendChild( clone );
}

/**
 * 
 * @param {NodeJS.ErrnoException | null} err 실행에러
 * @param {{ file: string, path: string, type: string }[]} files 특정 디렉토리내 파일경로들
 * @returns 
 */
function displayFiles( err, files ) {

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
}

main();

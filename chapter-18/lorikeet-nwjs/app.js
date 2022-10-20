'use strict';

const fileSystem = require( './fileSystem' );
const userInterface = require( './userInterface' );
const search = require( './search' );

function main() {

    // const win = nw.Window.get();

    // win.showDevTools();

    // win.on('close', () => {

    //     win.closeDevTools();
    //     process.exit();

    // });

    // win.on('loaded', () => {

    //     //const currentFolder = document.getElementById('current-folder');
    //     //currentFolder.innerText = fileSystem.getUsersHomeFolder();

    //     userInterface.bindDocument( window );

    //     let folderPath = fileSystem.getUsersHomeFolder();

    //     userInterface.loadDirectory( folderPath )( window );
    //     userInterface.bindSearchField( ( event ) => {
    //         const query = event.target.value;
    //         if ( query === '' ) {
    //             userInterface.resetFilter();
    //         } 
    //         else 
    //         {
    //             search.find( query, userInterface.filterResults );
    //         }
    //     } );

    // });


    userInterface.bindDocument( window );

    let folderPath = fileSystem.getUsersHomeFolder();

    userInterface.loadDirectory( folderPath )( window );
    userInterface.bindSearchField( ( event ) => {
        const query = event.target.value;
        if ( query === '' ) {
            userInterface.resetFilter();
        } 
        else 
        {
            search.find( query, userInterface.filterResults );
        }
    } );
}

window.onload = main;

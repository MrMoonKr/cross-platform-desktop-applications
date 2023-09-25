// 다음은 동작 안함
//import fs from 'node:fs' ;
//import path from 'node:path' ;
//import osenv from 'osenv' ;
//import async from 'async' ;

// 다음과 같이 CommonJS 형태 모듈 사용할 것
const fs    = require( 'fs' ) ;
const path  = require( 'path' ) ;
const osenv = require( 'osenv' ) ;
const async = require( 'async' ) ;


class FileBrowser
{
    static getUsersHomeFolder() 
    {
        return osenv.home() ;
    }
    
    static getFilesInFolder( folderPath, cb ) 
    {
        fs.readdir( folderPath, cb ) ;
    }
    
    static inspectAndDescribeFile( filePath, cb ) 
    {
        let result = {
            file: path.basename( filePath ),
            path: filePath, 
            type: ''
        };
    
        fs.stat( filePath, ( err, stat ) => {
            if ( err ) 
            {
                cb( err );
            }
            else
            {
                if ( stat.isFile() )
                {
                    result.type = 'file' ;
                }
                else if ( stat.isDirectory() )
                {
                    result.type = 'directory' ;
                }
    
                cb( err, result ) ;
            }
        } ) ;
    }
    
    static inspectAndDescribeFiles( folderPath, files, cb )
    {
        async.map( files, 
            ( file, asyncCB ) => {
                let resolvedFilePath = path.resolve( folderPath, file ) ;
    
                FileBrowser.inspectAndDescribeFile( resolvedFilePath, asyncCB ) ;
            },
            cb 
        ) ;
    }
}


export default FileBrowser ;

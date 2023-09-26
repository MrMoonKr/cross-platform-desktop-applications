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
    /**
     * osenv 모듈을 이용한 사용자 홈 디렉토리 경로 조회
     * @returns 사용자 홈 디렉토리 경로
     */
    static getUsersHomeFolder() 
    {
        return osenv.home() ;
    }
    /**
     * fs 모듈을 이용한 디렉토리 읽기
     * @param {string} folderPath 
     * @param {( err: NodeJS.ErrnoException | null, files: string[] ) => void} cb 
     */
    static getFilesInFolder( folderPath, cb ) 
    {
        fs.readdir( folderPath, cb ) ;
    }
    /**
     * 
     * @param {string} filePath 
     * @param {( err: NodeJS.ErrnoException | null, result: {file: string, path: string, type: string} ) => void} cb 
     */
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
    /**
     * 
     * @param {string} folderPath 
     * @param {string[]} files 
     * @param {( err: NodeJS.ErrnoException | null, files: { file: string, path: string, type: string }[] ) => void} cb 
     */
    static inspectAndDescribeFiles( folderPath, files, cb ) {

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

import * as path from 'path'
import * as  extract from 'extract-zip'
import * as fs from 'fs-extra'

const cwd = process.cwd()
const pathResolve = (pathStr) => {
    let newPathStr = pathStr
    if (!path.isAbsolute(pathStr)) {
        newPathStr = path.normalize(path.join(cwd, newPathStr))
    }
    return newPathStr
}

export function start(yargs) {
    yargs.command('unzip <zipFile> <dir>',
        'unzip <zipfile> to <dir>',
        {
            log: {
                alias: 'l',
                boolean: true,
                default: false,
                describe: '是否打印过程日志信息'
            }
        },
        async (argv) => {

            let zipFilePath = argv.zipFile
            let dirPath = argv.dir

            zipFilePath = pathResolve(zipFilePath)  
            dirPath = pathResolve(dirPath) 

            if (fs.pathExistsSync(zipFilePath)) {
                await extract(zipFilePath, { dir: dirPath })
            } else {
                console.log(`文件 ${zipFilePath} 不存在 , 请确认`)
            }

        }).help()
}
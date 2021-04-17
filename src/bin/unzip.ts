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

            argv.zipFile = (argv.zipFile as String).replace(/\.zip$/, '') + '.zip'
            argv.zipFile = pathResolve(argv.zipFile)
            argv.dir = pathResolve(argv.dir)

            if (fs.pathExistsSync(argv.zipFile)) {
                await extract(argv.zipFile, { dir: argv.dir })
                console.log(`解压 ${argv.zipFile} 完成 , 对应目录 ${argv.zipFile}`)
            } else {
                console.log(`文件 ${argv.zipFile} 不存在 , 请确认`)
            }

        }).help()
}
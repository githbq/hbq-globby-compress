import * as path from 'path'
import GlobbyCompress from '../index'

const cwd = process.cwd()
const pathResolve = (pathStr) => {
    let newPathStr = pathStr
    if (!path.isAbsolute(pathStr)) {
        newPathStr = path.normalize(path.join(cwd, newPathStr))
    }
    return newPathStr
}

export function start(yargs) {
    yargs.command('zip <zipFile>',
        'zip cwd all files to <zipFile>',
        {
            log: {
                alias: 'l',
                boolean: true,
                default: false,
                describe: '是否打印过程日志信息'
            }
        },
        async (argv) => {
            const consoleLog = (...args) => {
                argv.log && console.log(...args)
            }

            argv.zipFile = (argv.zipFile as String).replace(/\.zip$/, '')
            const globbyCompress = new GlobbyCompress(`${argv.zipFile}.zip`, [`**/*`,`!${argv.zipFile}.zip`], { cwd: process.cwd() })
            try {
                consoleLog('开始生成压缩包...')
                argv.log && console.time('生成压缩包完成，耗时')
                const size: any = await globbyCompress.compress()
                consoleLog('压缩包文件地址:' + globbyCompress.zipFilePath)
                consoleLog(`文件体积：${Math.ceil(size / 1000)}KB`)
                argv.log && console.timeEnd('生成压缩包完成，耗时')

            } catch (e) {
                argv.log && console.error(`发生错误${e.message}`)
                argv.log && console.error(e.stack)
            }

        }).help()
}
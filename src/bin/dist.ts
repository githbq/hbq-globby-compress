
import GlobbyCompress from '../index'
import * as fs from 'fs-extra'
import * as path from 'path'
import copy from 'globby-copy-promise'
const cwd = process.cwd()

export function start(yargs) {
    yargs.command('dist <name>',
        'compress dist to dist/[name]',
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
            const distPath = path.join(cwd, 'dist')
            const distCopyedPath = path.join(distPath, argv.name)
            consoleLog('distCopyedPath', distCopyedPath)
            fs.removeSync(distCopyedPath)


            await copy(['**/*', `!${argv.name}`], distCopyedPath, { cwd: distPath })
            try {
                consoleLog('xxx', `${argv.name}/**/*`, '!*.zip')
                const globbyCompress = new GlobbyCompress(`${argv.name}.zip`, [`${argv.name}/**/*`, '!*.zip'], { cwd: distPath })
                const size: any = await globbyCompress.compress()
                console.log('处理成功，压缩包文件地址:' + globbyCompress.zipFilePath)
                consoleLog(`文件体积：${Math.ceil(size / 1000)}KB`)
            } catch (e) {
                console.error(e)
            }
        }).help()
}
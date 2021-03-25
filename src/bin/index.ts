#!/usr/bin/env node
import * as  yargs from 'yargs'
import GlobbyCompress from '../index'

import * as dist from './dist'


function start() {
    dist.start(yargs)
    yargs.command('start <zipFile> [patterns..]',
        'compress files',
        {
            log: {
                alias: 'l',
                boolean: true,
                default: false,
                describe: '是否打印过程日志信息'
            }
        },
        async (argv) => {
            // const consoleLog = (...args) => {
            //     argv.log && console.log(...args)
            // }
            // if (((argv.patterns as any) || []).length === 0) {
            //     console.log('提示：请填写第二个pattern参数如： **/*.js , 支持多个: *.js *.cs *.html')
            //     return
            // }
            // argv.zipFile = (argv.zipFile as String).replace(/\.zip$/, '')
            // const globbyCompress = new GlobbyCompress(`${argv.zipFile}.zip`, argv.patterns, { cwd: process.cwd() })
            // try {
            //     consoleLog('开始生成压缩包...')
            //     argv.log && console.time('生成压缩包完成，耗时')
            //     const size: any = await globbyCompress.compress()
            //     consoleLog('压缩包文件地址:' + globbyCompress.zipFilePath)
            //     consoleLog(`文件体积：${Math.ceil(size / 1000)}KB`)
            //     argv.log && console.timeEnd('生成压缩包完成，耗时')

            // } catch (e) {
            //     argv.log && console.error(`发生错误${e.message}`)
            //     argv.log && console.error(e.stack)
            // }
        }).help()
    let argv = yargs.version().argv
    if (!argv._.length) {
        yargs.showHelp()
    }
}

start()

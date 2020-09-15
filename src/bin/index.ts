#!/usr/bin/env node
import * as  yargs from 'yargs'
import GlobbyCompress from '../index'


function start() {
    yargs.command('start <zipFile> [patterns..]',
        'compress files',
        {
        },
        async (argv) => {
            if (((argv.patterns as any) || []).length === 0) {
                console.log('提示：请填写第二个pattern参数如： **/*.js , 支持多个: *.js *.cs *.html')
                return
            }
            const globbyCompress = new GlobbyCompress(argv.zipFile, argv.patterns, { cwd: process.cwd() })
            try {
                console.log('开始生成压缩包...')
                console.time('生成压缩包完成，耗时')
                const size: any = await globbyCompress.compress()
                console.log('压缩包文件地址:' + globbyCompress.zipFilePath)
                console.log(`文件体积：${Math.ceil(size / 1000)}KB`)
                console.timeEnd('生成压缩包完成，耗时')

            } catch (e) {
                console.error(`发生错误${e.message}`)
                console.error(e.stack)
            }
        }).help()
    let argv = yargs.version().argv
    if (!argv._.length) {
        yargs.showHelp()
    }
}

start()

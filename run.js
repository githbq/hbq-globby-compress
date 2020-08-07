require('ts-node/register');

const GlobbyCompress = require('./src/index.ts').default;
debugger
//tsconfig 帮助文档地址
//https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html
//https://tslang.cn/docs/handbook/compiler-options.html

(async () => {
    const globbyCompress = new GlobbyCompress('./temp/temp1.zip',
        ['**/*.md', '!node_modules/**/*'])
    try {
        // 追加压缩信息
        globbyCompress.add('**/*.ts')
        const infos = await globbyCompress.compress()
        console.log(infos) // 返回压缩包文件体积
    } catch (e) {
        console.error(e)
    }
})();

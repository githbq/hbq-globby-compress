# globby-compress

![my love](./logo.png) 

## 功能介绍
1. 按需压缩目录,可以过滤不想要的文件如 node_modules ，可以多次添加目录
2. 支持多 glob pattern
3. 基于 `globby` 与 `archiver`

## 安装
```
yarn add globby-compress 
```

## 使用   
```ts
  import GlobbyCompress from 'globby-compress'
  // 第一个参数指压缩包放置路径
  // 第二个参数为globby pattern参数,可以是单个pattern字符串，或者pattern字符串数组 ["**/*.js"]
  // 第三个参数 可选 globby options，如：{cwd,dot} ,默认 cwd 为 process.cwd()
 const globbyCompress = new GlobbyCompress('./temp/temp1.zip',
        ['**/*.md', '!node_modules/**/*'])
    try {
        // 追加压缩信息
        globbyCompress.add('**/*.ts')
        const bytes = await globbyCompress.compress()
        console.log(bytes) // 返回压缩包文件体积
    } catch (e) {
        console.error(e)
    }  
```

## cli模式
```
npm i -g globby-compress 

globby-compress <zipFilePath> [patterns..]

globby-compress ./abc.zip **/*.js **/*.md
```
 

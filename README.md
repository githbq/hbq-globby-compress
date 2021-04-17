# globby-compress

## 功能介绍
1. 按需压缩目录,提供过滤规则设置如 `!node_modules/**/*` ，支持多次添加目录
2. 支持多 glob pattern
3. 基于 `globby` 与 `archiver`
4. 将当前工程 `dist` 目录打成指定名称的压缩包, 全局安装后：`gbc dist project1`
5. 2021-4-17 新增解压 unzip 包命令: `gbc unzip <zipFile> ./` , 将 zip 文件解压到指定路径
5. 2021-4-17 新增解压 zip 包命令: `gbc zip <zipFile>`  , 将当前目录下的所有文件压缩到指定文件,已排除zip文件自身

## 安装
```
yarn add globby-compress 
//or 
npm install globby-compress 
// 对应全局命令名 globby-compress 或者 简称 gbc
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
        // 执行压缩行为，函数返回值为zip文件的体积
        const byteSize = await globbyCompress.compress()
        console.log(byteSize) // 返回压缩包文件体积
    } catch (e) {
        console.error(e)
    }  
```

## cli模式

```bash
npm i -g globby-compress 

gbc start <zipFilePath> [patterns..]

gbc start ./abc.zip **/*.js !node_modules !dist --log


// 将当前目录下的文件压缩成 `xxx.zip`

gbc zip xxx.zip 

// 将当前目录下的 `yyy.zip` 文件解压到当前目录的 `./`

gbc unzip yyy.zip ./

```
 

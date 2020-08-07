import * as fs from 'fs-extra'
import * as pathTool from 'path'
import * as  globby from 'globby'
import * as archiver from 'archiver'
class FileInfo {
    public relativeFilePath: string
    public cwd: string
}

export default class GlobbyCompress {
    public files: Array<FileInfo> = []
    public patterns: Array<string>
    private archiver: archiver.Archiver
    private options: any
    public zipFilePath: string
    private pathPatternAndOptions: Array<any> = []
    constructor(zipFilePath, patterns, options?) {
        this.files = []
        this.options = options
        this.zipFilePath = zipFilePath
        if (!/\.zip$/.test(zipFilePath)) {
            this.zipFilePath += '.zip'
        }
        this.patterns = patterns
        this.options = {
            level: 9,
            archiveType: 'zip'
            , ...options
        }
        this.reset()
        this.add(this.patterns, this.options)
    }
    reset() {
        this.archiver = archiver(this.options.archiveType, this.options)
    }
    async getFiles() {
        const getFilesPromise = this.pathPatternAndOptions.map(
            async ({ patterns, globOptions }) => {
                const relativeFilePaths = await globby(patterns, { dot: true, ...globOptions, absolute: false, })
                this.files = this.files.concat(relativeFilePaths.map(relativeFilePath => ({ cwd: globOptions.cwd, relativeFilePath })))
            }
        )
        return await Promise.all(getFilesPromise)
    }
    async add(patterns, globOptions = { cwd: null }) {
        let cwd = process.cwd()
        globOptions.cwd = globOptions.cwd || cwd
        this.pathPatternAndOptions.push({ patterns, globOptions })
    }

    async compress() {
        await fs.ensureDir(pathTool.dirname(this.zipFilePath))
        await fs.remove(this.zipFilePath)

        await this.getFiles()
        if (this.files.length === 0) {
            return Promise.resolve(0)
        }
        let out = fs.createWriteStream(this.zipFilePath)
        this.archiver.pipe(out)
        const promise = new Promise((resolve, reject) => {

            out.once('close', () => {
                out.removeAllListeners()
                let bytes = this.archiver.pointer()
                this.reset()
                resolve(bytes)
            })

            out.once('error', (err) => {
                out.removeAllListeners()
                this.reset()
                reject(err)
            })
        })
        this.files.forEach(file => {
            this.archiver.append(fs.createReadStream(pathTool.join(file.cwd, file.relativeFilePath)), {
                name: file.relativeFilePath
            })
        })

        this.archiver.finalize()
        return promise
    }

}
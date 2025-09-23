import path from 'path'
import fs from 'fs'

export class GmRootHathHelper {
    static findNearestPackageJson(startDir: string = process.cwd()): string | null {
        let currentDir = path.resolve(startDir)
        
        while (true) {
            const pkgPath = path.join(currentDir, 'package.json')
            if (fs.existsSync(pkgPath)) {
                return currentDir
            }
            
            const parentDir = path.dirname(currentDir)
            if (parentDir === currentDir) {
                return null
            }
            currentDir = parentDir
        }
    }
}
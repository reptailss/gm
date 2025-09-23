import fs from 'fs'
import path from 'path'
import {StringCaseHelper} from '@helpers/StringCaseHelper'

export class CreateAppDockerfileModule {
    
    
    constructor(private readonly packageName: string) {
    }
    
    
    public create(): void {
        const rootDir = process.cwd()
        const packageJsonPath = path.join(rootDir, this.packageName, 'Dockerfile')
        
        const content =
            `
FROM node:20-alpine
RUN apk add --no-cache git
WORKDIR /${StringCaseHelper.toSnakeCase(this.packageName)}
COPY package.json  /${StringCaseHelper.toSnakeCase(this.packageName)}
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "app"]
        `
        
        fs.writeFileSync(packageJsonPath, content, {
            encoding: 'utf-8',
        })
    }
}

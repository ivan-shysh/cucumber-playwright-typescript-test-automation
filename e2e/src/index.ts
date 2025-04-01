import dotenv from 'dotenv'
import { env, getJsonFromFile } from './env/parseEnv'
import {
    GlobalConfig,
    HostsConfig,
    PagesConfig, 
    PageElementMappings,
} from './env/global'
import * as fs from "fs"

dotenv.config({path: env('COMMON_CONFIG_FILE')})

const hostsConfig: HostsConfig = getJsonFromFile(env('HOSTS_URLS_PATH'));
const pagesConfig: PagesConfig = getJsonFromFile(env('PAGES_URLS_PATH'));
const mappingFiles = fs.readdirSync(`${process.cwd()}${env('PAGE_ELEMENTS_PATH')}`);

console.log(mappingFiles); // remove later 

const pageElementMappings: PageElementMappings = mappingFiles.reduce(
    (pageElementConfigAcc, file) => {
        const key = file.replace('.json', '')
        const elementMappings = getJsonFromFile(`${env('PAGE_ELEMENTS_PATH')}${file}`);
        return {...pageElementConfigAcc, [key]: elementMappings}
    },
    {}
 )

const worldParameters: GlobalConfig = {
    hostsConfig,
    pagesConfig,
    pageElementMappings
}

const common = `./src/features/**/*.feature \
                --require-module ts-node/register \
                --require ./src/step-definitions/**/**/*.ts \
                --world-parameters ${JSON.stringify(worldParameters)} \
                -f json:./reports/report.json \
                --format progress-bar \
                --parallel ${env('PARALLEL')} \
                --retry ${env('RETRY')}`;

const dev = `${common} --tags '@dev'`;
const smoke = `${common} --tags '@smoke'`;
const regression = `${common} --tags '@regression'`;

export { dev, smoke, regression };

/*fs stands for the File System module in Node.js. 
  It provides an API to interact with the file system, allowing to read, write, delete, and perform other file operations.
  fs.readdirSync is a synchronous method provided by the fs module to read the contents of a directory. 
  It returns an array of the names of the files and directories within the specified directory. */


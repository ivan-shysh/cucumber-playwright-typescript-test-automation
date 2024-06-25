import dotenv from 'dotenv'
import { env } from './env/parseEnv'

dotenv.config({path: env('COMMONG_CONFIG_FILE')})

const common = `./src/features/**/*.feature \
                --require-module ts-node/register \
                --require ./src/step-definition/**/**/*.ts \
                -f json:./reports/report.json \
                --format progress-bar`;

const dev = `${common} --tags '@dev'`;
const smoke = `${common} --tags '@smoke'`;
const regression = `${common} --tags '@regression'`;

export { dev, smoke, regression }

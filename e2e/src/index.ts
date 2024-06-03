const common = `/src/features/**/*.feature \
                --require-module ts-node/register \
                --require ./src/step-definitions/**/**/.ts \
                -f json:./reports/report.json \
                --format progress-bar`;
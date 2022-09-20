import chalk from "chalk";

export default class RequestError extends Error {
    error: string;
    errorDescription: string;
    statusCode: number;
    url: string;
    method: string;
    qs: { [key: string]: any; } | undefined;
    body: any;

    constructor(options: {
        error: string,
        errorDescription: string,
        statusCode: number,
        url: string,
        method: string,
        qs?: { [key: string]: any },
        body?: any,
    }) {
        const errorText = `${chalk.bold.red(options.statusCode)}: ${chalk.yellow(options.errorDescription)}\n${chalk.bold.blue(options.method)} ${chalk.blue(options.url)}\n${options.qs && chalk.blue(JSON.stringify(options.qs || ""))}\n${options.body && chalk.blue(JSON.stringify(options.body))}`
        super(errorText);
        console.error(errorText);

        this.name = "RequestError";
        this.error = options.error;
        this.errorDescription = options.errorDescription;
        this.statusCode = options.statusCode;
        this.url = options.url;
        this.method = options.method;
        this.qs = options.qs;
        this.body = options.body;
    }
}
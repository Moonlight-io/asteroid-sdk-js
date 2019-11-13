import { LoggerOptions } from 'node-log-it';
export interface AsteroidOptions {
    baseUrl?: string;
    loggerOptions?: LoggerOptions;
}
export declare class Asteroid {
    private options;
    private logger;
    constructor(options?: AsteroidOptions);
    greet(name?: string): string;
    sum(a: number, b: number): number;
    getAsteroidUserVersion(): Promise<any>;
    private validateOptionalParameters;
}

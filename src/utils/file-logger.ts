import { Logger } from "../interfaces/logger"

export class FileLogger implements Logger {
    info(object: any): void {
        throw new Error('Method not implemented.');
    }
    debug(object: any): void {
        throw new Error('Method not implemented.');
    }
    error(object: any): void {
        throw new Error('Method not implemented.');
    }
    warning(object: any): void {
        throw new Error('Method not implemented.');
    }
}

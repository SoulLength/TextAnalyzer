export interface Logger {
    info(object: any): void;
    debug(object: any): void;
    error(object: any): void;
    warning(object: any): void;
}
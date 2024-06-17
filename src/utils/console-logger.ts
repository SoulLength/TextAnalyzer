import { Logger } from "../interfaces/logger"

export class ConsoleLogger implements Logger {
    info(object: any): void {
        console.log("---- INFO ----")
        console.log(object)
    }
    debug(object: any): void {
        console.log("---- DEBUG ----")
        console.log(object)
    }
    error(object: any): void {
        console.log("---- ERROR ----")
        console.log(object)
    }
    warning(object: any): void {
        console.log("---- WARNING ----")
        console.log(object)
    }

}

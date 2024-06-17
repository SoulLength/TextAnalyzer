import { Logger } from './interfaces/logger';

class Log {
    type: string;
    message: string;

    constructor(type: string, message: string) {
        this.type = type;
        this.message = message
    }
}
export class MockLogger implements Logger {
	logs: Log[] = [];

    info(message: string): void {
		this.logs.push(new Log("info", message));
    }
    debug(message: string): void {
		this.logs.push(new Log("debug", message));
    }
    error(message: string): void {
		this.logs.push(new Log("error", message));
    }
    warning(message: string): void {
		this.logs.push(new Log("warning", message));
    }

	hasLogged(type: string, message: string = ""): boolean {
		return this.logs.filter(log => log.type == type && log.message.includes(message)).length > 0;
	}
}

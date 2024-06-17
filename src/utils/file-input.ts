import { readFile as fsReadFile } from "fs";

export function readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fsReadFile(filePath, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
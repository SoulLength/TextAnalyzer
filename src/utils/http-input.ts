
import { get as httpGet } from "http";
import { get as httpsGet } from "https";
import { URL } from "url";

export function downloadContent(fileUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const get = new URL(fileUrl).protocol === "https:" ? httpsGet : httpGet;
        get(fileUrl, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to download '${fileUrl}' (${res.statusCode})`));
                return;
            }

            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                resolve(data);
            });
        }).on("error", (err) => {
            reject(err);
        });
    });
}

export function isValidURL(input: string): boolean {
    try {
        new URL(input);
        return true;
    } catch (_) {
        return false;
    }
}
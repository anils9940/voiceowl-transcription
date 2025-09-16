import fs from "fs";
import path from "path";
import axios from "axios";
import { tmpdir } from "os";

async function delay(ms: number) {
    return new Promise(res => setTimeout(res, ms));
}

export async function downloadFileStream(url: string, maxRetries = 3): Promise<string> {
    let attempt = 0;
    let delay = 500;

    while (attempt < maxRetries) {
        try {
            const tmpPath = path.join(tmpdir(), `audio-${Date.now()}.mp3`);
            const writer = fs.createWriteStream(tmpPath);

            const response = await axios.get(url, {
                responseType: "stream",
            });

            // Pipe the remote stream into the file
            response.data.pipe(writer);

            // Wait until the stream finishes
            await new Promise<void>((resolve, reject) => {
                writer.on("finish", () => resolve());
                writer.on("error", (err) => reject(err));
            });

            return tmpPath; // return path to temp file
        } catch (err) {
            attempt++;
            if (attempt >= maxRetries) throw err;
            console.warn(`Download failed (attempt ${attempt}), retrying in ${delay}ms...`);
            await new Promise((r) => setTimeout(r, delay));
            delay *= 2;
        }
    }

    throw new Error("Download failed unexpectedly");
}

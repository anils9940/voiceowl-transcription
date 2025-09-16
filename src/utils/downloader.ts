import axios from "axios";

async function delay(ms: number) {
    return new Promise(res => setTimeout(res, ms));
}

export async function downloadWithRetry(url: string, maxRetries = 3): Promise<Buffer> {
    let attempt = 0;
    let delay = 500;

    while (attempt < maxRetries) {
        try {
            const response = await axios.get(url, {
                responseType: "arraybuffer", // return raw bytes
            });

            return Buffer.from(response.data);
        } catch (err) {
            attempt++;
            if (attempt >= maxRetries) throw err;
            console.warn(`Download failed (attempt ${attempt}), retrying in ${delay}ms...`);
            await new Promise((r) => setTimeout(r, delay));
            delay *= 2; // exponential backoff
        }
    }
    throw new Error("Download failed unexpectedly");
}

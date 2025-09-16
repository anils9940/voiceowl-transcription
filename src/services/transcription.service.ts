import fs from "fs/promises";
import * as fs2 from "fs";
import path from "path";
import {TranscriptionModel} from "../models/transcription.model";
import {OpenAI} from "openai";
import {downloadFileStream} from "../utils/downloader";
import { producer } from "../config/kafka";

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY!});
/**
 * Save audio buffer to a temp file in tmp/ folder.
 */
async function saveBufferToTempFile(buffer: Buffer): Promise<string> {
    const tmpDir = path.join(__dirname, "../../tmp");
    await fs.mkdir(tmpDir, {recursive: true});
    const filePath = path.join(tmpDir, `audio_${Date.now()}-${Math.random()}.mp3`);
    await fs.writeFile(filePath, buffer);
    return filePath;
}

export async function sendTranscriptionJob(audioUrl: string) {
    await producer.connect();
    await producer.send({
        topic: "transcription_jobs",
        messages: [{ value: JSON.stringify({ audioUrl }) }],
    });
    console.log("Job sent to Kafka:", audioUrl);
}


/**
 * Create transcription from audio URL.
 */
export async function createTranscription(audioUrl: string) {
    // 1. Download remote audio
    const tmpPath = await downloadFileStream(audioUrl, Number(process.env.MAX_DOWNLOAD_RETRIES || 3));

    // 2. Save to tmp folder
   // const tmpPath = await saveBufferToTempFile(buffer);

    try {
        console.log("Processing file:", tmpPath);

        // 3. Call OpenAI Whisper
        const transcription = await openai.audio.transcriptions.create({
            file: fs2.createReadStream(tmpPath),
            model: "whisper-1", // or "gpt-4o-transcribe"
            response_format: "json",
        });

        const transcriptionText = transcription.text;

        // 4. Save to MongoDB
        return await TranscriptionModel.create({
            audioUrl,
            transcription: transcriptionText,
            status: 'inprogress',
            createdAt: new Date(),
        });
    } finally {
        // 5. Cleanup tmp file
        try {
            await fs.unlink(tmpPath);
        } catch (err) {
            console.warn("Failed to delete tmp file:", err);
        }
    }
}

/**
 * List all transcriptions (newest first)
 */
export async function listTranscriptions() {
    return TranscriptionModel.find().sort({createdAt: -1}).lean();
}

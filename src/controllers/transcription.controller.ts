import { Request, Response, NextFunction } from "express";
import { listTranscriptions, sendTranscriptionJob } from "../services/transcription.service";

export async function postTranscription(req: Request, res: Response, next: NextFunction) {
    try {
        const { audioUrl } = req.body;
        if (!audioUrl) return res.status(400).json({ error: "audioUrl is required" });

        await sendTranscriptionJob(audioUrl);
        res.status(202).json({ message: "Transcription job queued" });
    } catch (err) {
        next(err);
    }
}

export async function getTranscriptions(req: Request, res: Response, next: NextFunction) {
    try {
        const docs = await listTranscriptions();
        res.json(docs);
    } catch (err) {
        next(err);
    }
}

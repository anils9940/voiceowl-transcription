import { Request, Response, NextFunction } from "express";
import { createTranscription, listTranscriptions } from "../services/transcription.service";

export async function postTranscription(req: Request, res: Response, next: NextFunction) {
    try {
        const { audioUrl } = req.body;
        if (!audioUrl) return res.status(400).json({ error: "audioUrl is required" });

        const doc = await createTranscription(audioUrl);
        return res.status(201).json(doc);
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

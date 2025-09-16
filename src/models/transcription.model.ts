import { Schema, model, Document } from "mongoose";

export interface ITranscription extends Document {
    audioUrl: string;
    transcription: string;
    createdAt: Date;
}

const TranscriptionSchema = new Schema<ITranscription>({
    audioUrl: { type: String, required: true },
    transcription: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const TranscriptionModel = model<ITranscription>("Transcription", TranscriptionSchema);

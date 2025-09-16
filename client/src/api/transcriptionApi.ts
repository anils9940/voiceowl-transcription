import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4000", // adjust if backend runs elsewhere
});

export interface Transcription {
    _id: string;
    audioUrl: string;
    transcription: string;
    createdAt: string;
}

export async function createTranscription(audioUrl: string) {
    const res = await API.post<{ id: string }>("/transcription", { audioUrl });
    return res.data;
}

export async function getTranscriptions() {
    const res = await API.get<Transcription[]>("/transcriptions");
    return res.data;
}

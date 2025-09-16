import {consumer} from "../config/kafka";
import {createTranscription} from "../services/transcription.service";
import {TranscriptionModel} from "../models/transcription.model";

export async function startWorker() {
    await consumer.connect();
    await consumer.subscribe({topic: "transcription_jobs", fromBeginning: false});

    await consumer.run({
        eachMessage: async ({message}) => {
            if (!message.value) return;
            const job = JSON.parse(message.value.toString()) as { audioUrl: string };
            console.log("Processing job:", job.audioUrl);
            let audioUrl = job.audioUrl;
            try {
                const doc = await createTranscription(audioUrl); // OpenAI called here
                await TranscriptionModel.findByIdAndUpdate(doc._id, {
                    status: "Done",
                });
                console.log("Transcription saved with ID:", doc._id);
            } catch (err) {
                console.error("Failed to transcribe:", audioUrl, err);
            }
        },
    });
}

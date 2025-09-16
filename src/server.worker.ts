import "dotenv/config";
import {startWorker} from "./worker/transcription.worker";
import {connectMongoWithRetry} from "./config/mongo";

async function initWorker() {
    try {
        // 1. Connect to Mongo first
        await connectMongoWithRetry();
        console.log("MongoDB connected");

        // 2. Start Kafka worker
        await startWorker();
    } catch (err) {
        console.error("Worker init failed:", err);
        process.exit(1);
    }
}

initWorker();

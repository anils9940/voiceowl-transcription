import mongoose from "mongoose";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/voiceowl";

export async function connectMongo() {
    await mongoose.connect(uri, {
        // options if needed
    });
    console.log("MongoDB connected");
}

export async function connectMongoWithRetry(retries = 5, delayMs = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            await connectMongo();
            console.log("Mongo connected");
            return;
        } catch (err) {
            console.warn(`Mongo connection failed, retrying in ${delayMs}ms...`);
            await new Promise(r => setTimeout(r, delayMs));
        }
    }
    throw new Error("Failed to connect to Mongo after retries");
}

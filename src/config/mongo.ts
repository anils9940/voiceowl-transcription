import mongoose from "mongoose";
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/voiceowl";

export async function connectMongo() {
    await mongoose.connect(uri, {
        // options if needed
    });
    console.log("MongoDB connected");
}

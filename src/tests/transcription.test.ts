import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import {TranscriptionModel} from "../models/transcription.model";

// Mock OpenAI
jest.mock("openai", () => ({
    OpenAI: jest.fn().mockImplementation(() => ({
        audio: {
            transcriptions: {create: jest.fn().mockResolvedValue({text: "mock transcription"})},
        },
    })),
}));

// Mock downloader
jest.mock("../utils/downloader", () => ({
    downloadWithRetry: jest.fn().mockResolvedValue(Buffer.from("fake audio")),
}));

beforeAll(async () => {
    const uri = process.env.TEST_MONGO_URI || "mongodb://localhost:27017/voiceowl";
    await mongoose.connect(uri);
    await TranscriptionModel.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.dropDatabase(); // optional: clean DB
    await mongoose.disconnect();
});

test("POST /transcription creates a record", async () => {
    const res = await request(app)
        .post("/transcription")
        .send({audioUrl: "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3"})
        .expect(201);

    expect(res.body._id).toBeTruthy();
    expect(res.body.transcription).toBe("mock transcription");

    const record = await TranscriptionModel.findById(res.body._id).lean();
    expect(record).toBeTruthy();
    expect(record!.transcription).toBe("mock transcription");
});

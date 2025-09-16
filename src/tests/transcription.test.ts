import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import { TranscriptionModel } from "../models/transcription.model";
import {startWorker} from "../worker/transcription.worker";

// Mock OpenAI
jest.mock("openai", () => ({
    OpenAI: jest.fn().mockImplementation(() => ({
        audio: {
            transcriptions: { create: jest.fn().mockResolvedValue({ text: "mock transcription" }) },
        },
    })),
}));

// Mock downloader
jest.mock("../utils/downloader", () => ({
    downloadFileStream: jest.fn().mockResolvedValue("/tmp"),
}));

// Mock Kafka producer & consumer
jest.mock("../config/kafka", () => {
    const messages: any[] = [];
    return {
        producer: {
            connect: jest.fn(),
            send: jest.fn(({ topic, messages: msgs }) => {
                msgs.forEach((m: any) => messages.push(JSON.parse(m.value)));
            }),
        },
        consumer: {
            connect: jest.fn(),
            subscribe: jest.fn(),
            run: jest.fn(async ({ eachMessage }) => {
                for (const msg of messages) {
                    await eachMessage({
                        topic: "transcription_jobs",
                        partition: 0,
                        message: { offset: "0", value: Buffer.from(JSON.stringify(msg)) },
                    });
                }
            }),
            stop: jest.fn(),
            disconnect: jest.fn(),
        },
    };
});

beforeAll(async () => {
    const uri = process.env.TEST_MONGO_URI || "mongodb://localhost:27017/voiceowl-test";
    await mongoose.connect(uri);
    await TranscriptionModel.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
});

test("POST /transcription queues a Kafka job and worker saves record", async () => {
    // 1. Call API → should enqueue job
    const res = await request(app)
        .post("/transcription")
        .send({ audioUrl: "https://example.com/audio.mp3" })
        .expect(202);

    expect(res.body.message).toBe("Transcription job queued");

    // 2. Run worker (consume from mocked Kafka)
    await startWorker();

    // 3. Verify Mongo has saved transcription
    const records = await TranscriptionModel.find({});
    expect(records.length).toBe(1);
    expect(records[0].audioUrl).toBe("https://example.com/audio.mp3");
    expect(records[0].transcription).toBe("mock transcription");
});

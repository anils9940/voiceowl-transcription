import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: "voiceowl-service",
    brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "transcription-workers" });

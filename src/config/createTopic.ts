import {kafka} from "./kafka";

export async function ensureTopic(topicName: string) {
    const admin = kafka.admin();
    await admin.connect();
    const topics = await admin.listTopics();

    if (!topics.includes(topicName)) {
        await admin.createTopics({
            topics: [{topic: topicName, numPartitions: 3, replicationFactor: 1}],
        });
        console.log(`✅ Topic created: ${topicName}`);
    } else {
        console.log(`ℹ️ Topic already exists: ${topicName}`);
    }

    await admin.disconnect();
}

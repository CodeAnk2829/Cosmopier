import { Prisma, PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"]
});

const prisma = new PrismaClient();

async function main() {
    const producer = kafka.producer();
    await producer.connect();
    
    while(true) {
        // fetch 10 rows from the first 10 recent zaps
        const pendingRows = await prisma.zapRunOutbox.findMany({
            where: {},
            take: 10
        });

        // put them into the kafka queue
        await producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map(row => {
                return {
                    value: row.zapRunId
                }
            })
        });

        // delete those 10 entries from the zapRunOutbox as they have been processed
        await prisma.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map(row => row.id)
                }
            }
        });
    }
}

main();
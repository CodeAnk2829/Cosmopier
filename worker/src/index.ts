import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"]
});

async function main() {
    const consumer = kafka.consumer({ groupId: "main-worker" });
    await consumer.connect();
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });
    await consumer.run({
        // by default autoCommit is set to true this means
        // even if the worker didn't process the work it committed
        // but it should give an acknowledgement to the queue
        // that the message has been processed successfully
        // hence we need to send acknowledgment manually --> autoCommit = false

        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString(),
                // key: message.key?.toString()
            });

            await new Promise(resolve => setTimeout(() => resolve(1), 1000));

            await consumer.commitOffsets([{
                topic: TOPIC_NAME,
                partition: partition,
                offset: (parseInt(message.offset) + 1).toString()
            }]);
            console.log("processed");
        } 
    });
}

main();
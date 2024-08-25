import express from "express";
import { PrismaClient } from "@prisma/client";


const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    console.log("reached here");

    await prisma.$transaction(async tx => {
        console.log("reached here 2");
        const zapRun = await prisma.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body
            }
        });
        console.log("reached here 3");

        const zapRunOutbox = await prisma.zapRunOutbox.create({
            data: {
                zapRunId: zapRun.id
            }
        });

        return zapRunOutbox;
    });

    console.log("reached here 4");

    res.json({
        message: "Webhook received"
    });
});

app.listen(3000, () => console.log("server started at port 3000"));
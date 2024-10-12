import express from "express";
import { PrismaClient } from "@prisma/client";


const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;
    try {
        console.log("reached here");
    
        const zapRunOutbox = await prisma.$transaction(async tx => {
            console.log("reached here 2");
            const zapRun = await tx.zapRun.create({
                data: {
                    zapId: zapId,
                    metadata: body
                }
            });
            console.log("reached here 3");
    
            const zapRunOutbox = await tx.zapRunOutbox.create({
                data: {
                    zapRunId: zapRun.id
                }
            });
    
            return zapRunOutbox;
        });
    
        console.log("reached here 4");
    
        if(!zapRunOutbox) {
            throw new Error("Unable to run zap run outbox");
        }
        console.log(zapRunOutbox);
    
        res.status(200).json({
            message: "Webhook received"
        });

    } catch(err: any) {
        console.error(err);
        res.status(400).json({
            ok: false,
            Error: err.message
        });
    }
});

app.listen(5000, () => console.log("server started at port 5000"));
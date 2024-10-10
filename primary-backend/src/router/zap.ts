import { Router } from "express";
import { ZapCreateSchema } from "../types";
import { client } from "../db";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
    console.log("create zap");
    // @ts-ignore
    const userId = req.id;
    const body = req.body; // name, availableTriggerId, triggerMetadata, [{availableActionId, actionMetadata}]
    const parsedData = ZapCreateSchema.safeParse(body);

    try {
        if(!parsedData.success) {
            throw new Error("Invalid inputs for zap");
        }

        let actionData: any = []

        parsedData.data.actions.map((actionDetails, index) => {
            actionData.push({
                actionId: actionDetails.availableActionId,
                sortingOrder: index
            })
        });

        const zap = await client.zap.create({
            data: {
                name: parsedData.data.name,
                user: {
                    connect: {
                        id: userId
                    }
                },
                trigger: {
                    create: {
                       triggerId: parsedData.data.availableTriggerId
                    }
                },
                actions: {
                    create: actionData,
                }
            }
        });

        if(!zap) {
            throw new Error("Zap couldn't be created.")
        }

        res.status(201).json({
            message: "Zap created successfully.",
            zap
        });

    } catch(err: any)  {
        console.log(err);
        res.status(404).json({
            ok: false,
            Error: err.message
        });
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.id;
        
        const zaps = await client.zap.findMany({
            where: {
                userId
            },
            select: {
                id: true,
                name: true,
                trigger: {
                    select: {
                        type: true
                    }
                },
                actions: {
                    select: {
                        type: true
                    }
                }
            }
        });

        if(!zaps) {
            throw new Error("No zaps available.")
        }

        res.status(200).json({
            zaps
        });
    } catch(err: any) {
        console.log(err);
        res.status(404).json({
            ok: false,
            Error: err.message
        });
    }
});

router.get("/:zapId", async (req, res) => {
    // @ts-ignore
    const userId = req.id;
    const zapId = req.params.zapId;
    try {
        const zap = await client.zap.findUnique({
            where: {
                id: zapId,
                userId
            }
        });

        if(!zap) {
            throw new Error("Zap not found");
        }

        res.status(200).json({
            zap
        });
    } catch(err: any) {
        console.log(err);
        res.status(404).json({
            ok: false,
            Error: err.message
        })
    }
});


export const zapRouter = router;
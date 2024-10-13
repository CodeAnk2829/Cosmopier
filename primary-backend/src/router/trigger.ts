import { Router } from "express";
import { client } from "../db";


const router = Router();

router.get("/available", async (req, res) => {
    try {
        const availableTrigger = await client.availableTriggers.findMany({});

        if(!availableTrigger) {
            throw new Error("No triggers available");
        }

        res.status(200).json({
            availableTrigger
        });
    } catch(err: any) {
        console.error(err);
        res.status(404).json({
            ok: false,
            Error: err.message
        }) 
    }
});

export const triggerRouter = router;
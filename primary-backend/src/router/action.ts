import { Router } from "express";
import { client } from "../db";


const router = Router();

router.get("/available", async (req, res) => {
    try {
        const availableAction = await client.availableActions.findMany({});

        if (!availableAction) {
            throw new Error("No actions available");
        }

        res.status(200).json({
            availableAction
        });
    } catch (err: any) {
        console.error(err);
        res.status(404).json({
            ok: false,
            Error: err.message
        })
    }
});

export const actionRouter = router;
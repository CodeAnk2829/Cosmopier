import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { client } from "../db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const router = Router();

router.post("/signup", async (req, res) => {
    const body = req.body; // username, password, name
    console.log("signup with ", body);
    const parseData = SignupSchema.safeParse(body);

    try {
        if (!parseData.success) {
            throw new Error("Username or Password is too short.")
        }
    
        const isUserExist = await client.user.findFirst({
            where: {
                email: parseData.data.username
            },
            select: {
                id: true
            }
        });
    
        if(isUserExist) {
            throw new Error("Already registered.")
        }
    
        const user = await client.user.create({
            data: {
                email: parseData.data.username,
                password: parseData.data.password,
                name: parseData.data.name,
            },
            select: {
                id: true
            }
        });
        
        if(!user) {
            throw new Error("Registration failed due to some unwanted error.")
        }

        console.log(user.id);
        console.log(JWT_SECRET);

        const token = jwt.sign({
            id: user.id
        }, JWT_SECRET);

        // TODO : send an email to the user for verification
        // HINT : Add another field called verified of type boolean in the database

        res.status(201).json({
            message: "Please verify you account",
            token
        });

    } catch(err: any) {
        console.log(err);
        res.status(403).json({
            ok: false,
            Error: err.message
        });
    }
});

router.post("/signin", async (req, res) => {
    const body = req.body;
    console.log(body);
    const parseData = SigninSchema.safeParse(body);

    try {
        if(!parseData.success) {
            throw new Error("Invalid Username or Password")
        }
    
        const user = await client.user.findFirst({
            where: {
                AND: [{
                        email: parseData.data.username,
                    }, {
                        password: parseData.data.password
                    }]
            },
        })
    
        if(!user) {
            throw new Error("Incorrect Username or Password")
        }
        
        // send jwt token
        const token = jwt.sign({
            id: user.id
        }, JWT_SECRET);

        res.status(200).json({
            message: "Logged in successfully",
            token
        });

    } catch(err: any) {
        console.log(err);
        res.status(411).json({
            ok: false,
            Error: err.message
        })
    }

});

router.get("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.id;
    console.log("in user-details");
    console.log(userId);
    try {
        if(!userId) {
            throw new Error("User doesn't exists");
        }

        const user = await client.user.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true,
                email: true
            }
        });

        res.status(200).json({
            user
        });
    } catch(err: any) {
        res.status(404).json({
            ok: false,
            Error: err.message
        });
    }
});


export const userRouter = router;
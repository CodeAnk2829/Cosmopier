import cors from "cors";
import express from "express";
import { userRouter } from "./router/user";
import { zapRouter } from "./router/zap";

const app = express();


// Define allowed origins
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://rapidflow.vercel.app'];

const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);

app.listen(8080, () => console.log("server started"));
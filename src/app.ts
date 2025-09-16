import express from "express";
import cors from "cors";
import transcriptionRoutes from "./routes/transcription.routes";
import {connectMongo} from "./config/mongo";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",   // or "*" for all origins
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

app.use("/transcription", transcriptionRoutes); // POST /transcription
// optional: list endpoint
app.use("/transcriptions", transcriptionRoutes);

if (process.env.NODE_ENV !== 'test') {
    connectMongo().catch(err => {
        console.error("Failed to connect to Mongo:", err);
        process.exit(1);
    });
}

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({error: err.message || "Internal Server Error"});
});

export default app;

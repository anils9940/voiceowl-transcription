import { Router } from "express";
import { postTranscription, getTranscriptions } from "../controllers/transcription.controller";

const router = Router();

router.post("/", postTranscription);
router.get("/", getTranscriptions);

export default router;

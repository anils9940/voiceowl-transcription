import dotenv from "dotenv";

dotenv.config();
import app from "./app";
import {ensureTopic} from "./config/createTopic";

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    ensureTopic("transcription_jobs").catch(console.error);
    console.log(`Server running on http://localhost:${PORT}`);
});

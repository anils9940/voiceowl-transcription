import {defineConfig} from "vite";

export default defineConfig({
    server: {
        proxy: {
            "/transcriptions": "http://localhost:4000",
            "/transcription": "http://localhost:4000",
        },
    },
});

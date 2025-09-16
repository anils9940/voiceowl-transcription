import React from "react";
import TranscriptionForm from "./components/TranscriptionForm";
import TranscriptionList from "./components/TranscriptionList";

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold text-blue-600 mb-6">
                🎙️ VoiceOwl Transcription
            </h1>
            <div className="w-full max-w-lg bg-white shadow rounded-2xl p-6 space-y-8">
                <TranscriptionForm />
                <TranscriptionList />
            </div>
        </div>
    );
}

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTranscriptions, Transcription } from "../api/transcriptionApi";

export default function TranscriptionList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["transcriptions"],
        queryFn: getTranscriptions,
    });

    if (isLoading) return <p className="text-gray-500">Loading...</p>;
    if (isError) return <p className="text-red-500">Failed to fetch</p>;

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Saved Transcriptions</h2>
            <div className="space-y-2">
                {data && data.length > 0 ? (
                    data.map((t: Transcription) => (
                        <div
                            key={t._id}
                            className="p-3 border rounded-lg bg-gray-50 flex flex-col"
                        >
              <span className="text-sm font-medium text-gray-800">
                {t.transcription}
              </span>
                            <span className="text-xs text-gray-500">
                {t.audioUrl} | {new Date(t.createdAt).toLocaleString()}
              </span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No transcriptions yet.</p>
                )}
            </div>
        </div>
    );
}

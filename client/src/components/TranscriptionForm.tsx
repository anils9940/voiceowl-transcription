import React, {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createTranscription} from "../api/transcriptionApi";

export default function TranscriptionForm() {
    const [url, setUrl] = useState("");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createTranscription,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["transcriptions"]});
            setUrl("");
        },
    });

    return (
        <div className="space-y-4">
            <input
                type="text"
                className="w-full border rounded-lg p-2"
                placeholder="Enter audio file URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => mutation.mutate(url)}
                disabled={mutation.isPending}   // ✅ use isPending in v5
            >
                {mutation.isPending ? "Processing..." : "Submit"}
            </button>
            {mutation.isError && (
                <p className="text-red-500 text-sm">
                    Error: {(mutation.error as Error).message}
                </p>
            )}
            {mutation.isSuccess && (
                <p className="text-green-600 text-sm">
                    ✅ Created transcription ID: {mutation.data.id}
                </p>
            )}
        </div>
    );
}

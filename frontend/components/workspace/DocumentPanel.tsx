"use client";

import { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";

import {
    Document,
    getDocuments,
    uploadDocument,
} from "@/services/documentService";

interface Props {
    projectId: string;
}

export default function DocumentPanel({ projectId }: Props) {

    const [documents, setDocuments] = useState<Document[]>([]);
    const [uploading, setUploading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        loadDocuments();

    }, [projectId]);

    async function loadDocuments() {

        try {

            const docs = await getDocuments(projectId);

            setDocuments(docs);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleUpload(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        const file = event.target.files?.[0];

        if (!file) return;

        try {

            setUploading(true);

            await uploadDocument(projectId, file);

            await loadDocuments();

        } catch (error) {

            console.error(error);

            alert("Upload failed");

        } finally {

            setUploading(false);

            // Allows selecting the same file again later
            event.target.value = "";

        }

    }

    return (

        <div className="border rounded-xl p-6 h-[420px] flex flex-col">

            <div className="flex justify-between items-center">

                <h2 className="text-xl font-semibold">

                    Documents

                </h2>

                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:bg-gray-500"
                >

                    <Upload size={18} />

                    {uploading ? "Uploading..." : "Upload"}

                </button>

            </div>

            <div className="mt-6 flex-1 overflow-y-auto">

                {documents.length === 0 ? (

                    <div className="text-gray-500">

                        No documents uploaded.

                    </div>

                ) : (

                    documents.map((document) => (

                        <div
                            key={document.id}
                            className="border rounded-lg p-4 mb-3 hover:bg-gray-50"
                        >

                            <div className="font-semibold">

                                {document.filename}

                            </div>

                            <div className="text-sm text-gray-500 mt-1">

                                Uploaded:

                                {" "}

                                {new Date(
                                    document.uploaded_at
                                ).toLocaleString()}

                            </div>

                        </div>

                    ))

                )}

            </div>

            <input
                type="file"
                accept=".pdf"
                hidden
                ref={fileInputRef}
                onChange={handleUpload}
            />

        </div>

    );

}
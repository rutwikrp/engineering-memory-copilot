"use client";

import { useEffect, useRef, useState } from "react";

import { askQuestion } from "@/services/chatService";

interface Props {
    projectId: string;
}

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatPanel({ projectId }: Props) {

    const [messages, setMessages] = useState<Message[]>([]);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    async function sendMessage() {

        if (!question.trim() || loading) {
            return;
        }

        const userQuestion = question;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: userQuestion,
            },
        ]);

        setQuestion("");

        setLoading(true);

        try {

            const response = await askQuestion(
                projectId,
                userQuestion
            );

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: response.answer,
                },
            ]);

        } catch (error) {

            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Something went wrong while querying memory.",
                },
            ]);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="border rounded-xl h-[550px] flex flex-col">

            <div className="border-b px-6 py-4">

                <h2 className="text-xl font-semibold">

                    Incident Assistant

                </h2>

                <p className="text-sm text-gray-500">

                    Ask questions about your uploaded documents.

                </p>

            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">

                {messages.length === 0 && (

                    <div className="text-gray-400">

                        Start by asking a question.

                    </div>

                )}

                {messages.map((message, index) => (

                    <div
                        key={index}
                        className={
                            message.role === "user"
                                ? "flex justify-end"
                                : "flex justify-start"
                        }
                    >

                        <div
                            className={
                                message.role === "user"
                                    ? "bg-blue-600 text-white rounded-xl px-4 py-3 max-w-[80%]"
                                    : "bg-gray-100 rounded-xl px-4 py-3 max-w-[80%]"
                            }
                        >

                            <div className="text-xs font-semibold mb-1">

                                {message.role === "user"
                                    ? "You"
                                    : "Assistant"}

                            </div>

                            <div className="whitespace-pre-wrap">

                                {message.content}

                            </div>

                        </div>

                    </div>

                ))}

                {loading && (

                    <div className="flex justify-start">

                        <div className="bg-gray-100 rounded-xl px-4 py-3">

                            <div className="text-xs font-semibold mb-1">

                                Assistant

                            </div>

                            Thinking...

                        </div>

                    </div>

                )}

                <div ref={bottomRef} />

            </div>

            <div className="border-t p-4 flex gap-3">

                <input
                    type="text"
                    value={question}
                    onChange={(e) =>
                        setQuestion(e.target.value)
                    }
                    onKeyDown={(e) => {

                        if (
                            e.key === "Enter" &&
                            !loading
                        ) {
                            sendMessage();
                        }

                    }}
                    placeholder="Ask about your documents..."
                    className="flex-1 border rounded-lg px-4 py-2 outline-none"
                />

                <button
                    onClick={sendMessage}
                    disabled={
                        loading ||
                        question.trim() === ""
                    }
                    className="bg-black text-white px-5 rounded-lg disabled:bg-gray-400"
                >

                    Send

                </button>

            </div>

        </div>

    );

}
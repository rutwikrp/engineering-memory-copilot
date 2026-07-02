"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getProject, Project } from "@/services/projectService";
import DocumentPanel from "@/components/workspace/DocumentPanel";

export default function ProjectWorkspace() {

    const params = useParams();

    const id = params.id as string;

    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {

        if (id) {
            loadProject();
        }

    }, [id]);

    async function loadProject() {

        try {

            const data = await getProject(id);

            setProject(data);

        } catch (error) {

            console.error(error);

        }

    }

    if (!project) {

        return (
            <div className="p-8">
                Loading...
            </div>
        );

    }

    return (

        <div className="p-8">

            <h1 className="text-4xl font-bold">

                {project.name}

            </h1>

            <p className="text-gray-500 mt-2">

                {project.description}

            </p>

            <div className="grid grid-cols-3 gap-6 mt-10">

                <DocumentPanel
    projectId={project.id}
/>              

                <div className="border rounded-lg p-6">

                    <h2 className="text-xl font-semibold">

                        Chat

                    </h2>

                    <p className="mt-4 text-gray-500">

                        Start chatting with memory.

                    </p>

                </div>

                <div className="border rounded-lg p-6">

                    <h2 className="text-xl font-semibold">

                        Memory

                    </h2>

                    <p className="mt-4 text-gray-500">

                        Cognee memory status.

                    </p>

                </div>

            </div>

        </div>

    );

}
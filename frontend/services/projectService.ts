import api from "./api";

export interface Project {
    id: string;
    name: string;
    description: string;
    created_at: string;
}

export const getProjects = async (): Promise<Project[]> => {
    const response = await api.get("/projects/");
    return response.data;
};

export const createProject = async (
    name: string,
    description: string
): Promise<Project> => {

    const response = await api.post("/projects/", {
        name,
        description,
    });

    return response.data;
};

export const deleteProject = async (id: string) => {
    await api.delete(`/projects/${id}`);
};

export const getProject = async (id: string): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
};
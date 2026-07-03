from fastapi import APIRouter, HTTPException

from pydantic import BaseModel

from services.memory_service import memory_service

router = APIRouter(
    prefix="/memory",
    tags=["Memory"],
)


class ImproveRequest(BaseModel):
    project_id: str


@router.post("/improve")
async def improve_memory(
    request: ImproveRequest,
):

    return await memory_service.improve(
        request.project_id
    )

@router.get("/{project_id}")
async def get_memory_status(project_id: str):

    memory = memory_service.get_memory_status(project_id)

    if memory is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return memory
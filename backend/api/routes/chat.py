from fastapi import APIRouter

from models.chat import ChatRequest
from services.chat_service import chat_service

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("/")
async def ask(request: ChatRequest):

    return await chat_service.ask(
        project_id=request.project_id,
        question=request.question,
    )
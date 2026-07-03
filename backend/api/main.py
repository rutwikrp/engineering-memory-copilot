from fastapi import FastAPI
from api.routes.projects import router as project_router
from api.routes.health import router as health_router
from api.routes.documents import router as document_router
from config.settings import settings
from api.routes.chat import router as chat_router
from fastapi.middleware.cors import CORSMiddleware
from api.routes.memory import router as memory_router
from api.routes.dashboard import router as dashboard_router

app = FastAPI(

    title=settings.APP_NAME,

    version=settings.APP_VERSION,
)


@app.get("/")
async def root():

    return {
        "message": "Engineering Memory Copilot API"
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(project_router)
app.include_router(document_router)
app.include_router(chat_router)
app.include_router(memory_router)
app.include_router(dashboard_router)
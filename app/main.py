from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router
from pathlib import Path

app = FastAPI(title="AI Text Classifier")

# CORS (если нужно тестировать фронт отдельно)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

static_path = Path(__file__).resolve().parent / "static"

app.mount("/assets", StaticFiles(directory=static_path / "assets"), name="assets")


@app.get("/", include_in_schema=False)
async def serve_frontend():
    index_file = static_path / "index.html"
    return FileResponse(index_file)


@app.get("/health", tags=["Service"])
async def health_check():
    """
    Эндпоинт для проверки состояния сервера.
    Используется системами мониторинга и CI/CD.
    """
    return JSONResponse(content={"status": "ok", "service": "AI Text Classifier"})


# === Root endpoint ===
@app.get("/", tags=["Service"])
async def root_info():
    """
    Корневой эндпоинт — описание сервиса.
    """
    return {
        "message": "AI Text Classifier API is running 🚀",
        "docs_url": "/docs",
        "frontend_url": "/app",
    }

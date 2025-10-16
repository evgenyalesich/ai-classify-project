from fastapi import APIRouter
from app.api.endpoints import classify

router = APIRouter()
router.include_router(classify.router, prefix="/classify", tags=["Classification"])

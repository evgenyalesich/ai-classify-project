from app.api.models.schemas import TextInput, ClassificationOutput
from app.api.core.logic import (
    extract_zip,
    extract_brand,
    extract_category,
    extract_time_pref,
)
from fastapi import APIRouter

router = APIRouter()


@router.post("", response_model=ClassificationOutput)
def classify_text(data: TextInput):
    text = data.text
    return ClassificationOutput(
        zip=extract_zip(text),
        brand=extract_brand(text),
        category=extract_category(text),
        time_pref=extract_time_pref(text),
    )

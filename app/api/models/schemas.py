from pydantic import BaseModel, Field


class TextInput(BaseModel):
    text: str = Field(
        ..., min_length=1, description="Free text input for classification"
    )


class ClassificationOutput(BaseModel):
    zip: str | None = None
    brand: str | None = None
    category: str | None = None
    time_pref: str | None = None

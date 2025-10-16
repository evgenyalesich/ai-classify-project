from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_english_text():
    r = client.post(
        "/classify", json={"text": "My Samsung AC in 10001 is broken, need help today"}
    )
    data = r.json()
    assert data["brand"] == "Samsung"
    assert data["category"] == "AC"
    assert data["time_pref"] == "today"
    assert data["zip"] == "10001"


def test_russian_text():
    r = client.post(
        "/classify", json={"text": "Сломался холодильник LG, желательно завтра"}
    )
    data = r.json()
    assert data["brand"] == "LG"
    assert data["category"] == "fridge"
    assert data["time_pref"] == "tomorrow"


def test_only_brand():
    r = client.post("/classify", json={"text": "Bosch"})
    data = r.json()
    assert data["brand"] == "Bosch"
    assert data["category"] is None


def test_without_data():
    r = client.post("/classify", json={"text": ""})
    assert r.status_code == 422  # пустая строка невалидна


def test_week_preference():
    r = client.post("/classify", json={"text": "Могу принять мастера на этой неделе"})
    data = r.json()
    assert data["time_pref"] == "this_week"

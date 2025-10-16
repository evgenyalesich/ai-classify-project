import re


def extract_zip(text: str):
    match = re.search(r"\b\d{5,6}\b", text)
    return match.group(0) if match else None


def extract_brand(text: str):
    brands = [
        "Samsung",
        "LG",
        "Whirlpool",
        "Bosch",
        "Sony",
        "Panasonic",
        "Daikin",
        "Mitsubishi",
        "Haier",
        "Electrolux",
        "Xiaomi",
        "Hisense",
        "Sharp",
        "Philips",
        "Gorenje",
    ]
    for brand in brands:
        if brand.lower() in text.lower():
            return brand
    return None


def extract_category(text: str):
    categories = {
        "AC": [
            "ac",
            "air conditioner",
            "cooler",
            "кондиционер",
            "сплит",
            "сплит-система",
            "охладитель",
        ],
        "fridge": [
            "fridge",
            "refrigerator",
            "freezer",
            "холодильник",
            "морозилка",
            "морозильник",
        ],
        "washer": [
            "washing machine",
            "washer",
            "стиралка",
            "стиральная машина",
            "прачка",
        ],
        "microwave": ["microwave", "oven", "микроволновка", "печь", "духовка"],
        "tv": ["tv", "television", "телевизор", "экран", "плазма"],
        "vacuum": ["vacuum", "пылесос"],
    }
    for cat, keywords in categories.items():
        if any(k in text.lower() for k in keywords):
            return cat
    return None


def extract_time_pref(text: str):
    text_lower = text.lower()

    if re.search(
        r"today|сегодня|срочно|asap|now|urgent|немедленно|прямо сейчас", text_lower
    ):
        return "today"

    if re.search(r"tomorrow|завтра|на следующий день|утром|вечером|позже", text_lower):
        return "tomorrow"

    days_map = {
        "понедельник": "monday",
        "вторник": "tuesday",
        "среду": "wednesday",
        "четверг": "thursday",
        "пятницу": "friday",
        "субботу": "saturday",
        "воскресенье": "sunday",
        "monday": "monday",
        "tuesday": "tuesday",
        "wednesday": "wednesday",
        "thursday": "thursday",
        "friday": "friday",
        "saturday": "saturday",
        "sunday": "sunday",
    }

    for word, day in days_map.items():
        if word in text_lower:
            return day

    if re.search(
        r"week|weekend|на неделе|на этой неделе|в эти выходные|к выходным",
        text_lower,
    ):
        return "this_week"

    if re.search(r"\b\d{1,2}[./-]\d{1,2}\b", text_lower):
        return "specific_date"

    if re.search(
        r"\b\d{1,2}\s*(января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря)\b",
        text_lower,
    ):
        return "specific_date"

    return None

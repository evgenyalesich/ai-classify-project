#  Классификатор текста на основе ИИ

Небольшое FastAPI-приложение с интегрированным React-интерфейсом
для извлечения информации из текстовых сообщений (бренд, категория техники, время и индекс).



## Запуск проекта

### Клонировать репозиторий
```bash
git clone https://github.com/<ВАШ_ЛОГИН>/ai-classify-project.git
cd ai-classify-project

## Установить зависимости Python

python3 -m venv venv
source venv/bin/activate
pip install -r app/requirements.txt


## Запустить приложение
uvicorn app.main:app --reload



После запуска перейдите в браузере по ссылке:

👉 http://127.0.0.1:8000

Откроется готовый React-интерфейс .
В поле введите текст, например:

не работает стиральная машина Samsung нужен мастер на завтра


и нажмите Классифицировать.

💡 Также можно проверить через Swagger UI:

👉 http://127.0.0.1:8000/docs

Найдите эндпоинт POST /classify

Нажмите Try it out

Вставьте пример:

{
  "text": "не работает стиральная машина Samsung нужен мастер на завтра"
}


Нажмите Execute

Ответ:

{
  "zip": null,
  "brand": "Samsung",
  "category": "washer",
  "time_pref": "tomorrow"
}

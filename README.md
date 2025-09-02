# food-secure
A food donation coordination platform linking supermarkets, restaurants, and NGOs to distribute excess food.

## Tech Stack
- **Frontend** - React + Tailwind + DaisyUI
- **Backend** - FastAPI
- **Database** - SQLite (for production)


## Run Backend
```Bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# http://127.0.0.1:8000/docs
```

## Run Frontend
```bash
cd frontend
npm install
npm start
# http://localhost:3000
```


> Users are stored in-memory for demo; restart clears them. Switch to DB-backed auth for persistence in production.

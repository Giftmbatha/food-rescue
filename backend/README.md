# Food Rescue Backend

This is the **backend service** for the Food Rescue application.  
It provides RESTful APIs for user authentication, donors, NGOs, listings, and claims using **FastAPI** and **SQLAlchemy**.

---

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI entry point
│   ├── database.py      # Database connection and Base
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── routers/         # API routes (auth, donors, ngos, listings, claims)
│   └── utils.py         # Utility functions
├── tests/
│   └── test_main.py     # Pytest test cases
├── requirements.txt     # Python dependencies
└── README.md            # Project documentation
```

---

## Features
- **Authentication**: Register and login with JWT-based tokens
- **Donors & NGOs**: Manage organizations in the system
- **Listings**: Donors can publish food items available for rescue
- **Claims**: NGOs can claim available food
- **SQLite Database** (default, can be swapped for PostgreSQL/MySQL)
- **Automated Testing** with `pytest`

---

## Tech Stack
- [FastAPI](https://fastapi.tiangolo.com/) - Web framework
- [SQLAlchemy](https://www.sqlalchemy.org/) - ORM for database models
- [Alembic](https://alembic.sqlalchemy.org/) - Database migrations
- [Pydantic](https://docs.pydantic.dev/) - Data validation
- [Pytest](https://docs.pytest.org/) - Testing framework

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/food-rescue.git
cd food-rescue/backend

### 2. Create and activate a virtual environment
```bash
python -m venv venv
# On Windows
venv\Scripts\activate

```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Set up the database
The backend uses SQLite by default. When the app starts, tables are created automatically from `models.py`.

```

### 5. Run the backend server
```bash
uvicorn app.main:app --reload
```

---

## Running Tests

This project uses `pytest`. All test cases are inside the `tests/` folder.

Run tests:
```bash
pytest -v
```

If you want to run only one test:
```bash
pytest -v tests/test_main.py::test_create_and_list_donors
```

Sample test output:
```
tests/test_main.py::test_register_and_login PASSED
tests/test_main.py::test_create_and_list_donors PASSED
tests/test_main.py::test_create_and_list_ngos PASSED
tests/test_main.py::test_create_and_list_listings PASSED
tests/test_main.py::test_create_claim PASSED
```

---

## Notes

- All database tables are auto-created on startup.
- For production, switch SQLite to PostgreSQL or MySQL.
- The test suite uses the same setup to ensure all tables exist before execution.

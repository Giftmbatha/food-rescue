from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from ..schemas import Token, RegisterRequest
from ..auth import create_access_token
from ..users import create_user, authenticate_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=Token)
def register(payload: RegisterRequest):
    role = payload.role.lower()
    if role not in {"donor", "ngo"}:
        raise HTTPException(status_code=400, detail="Role must be 'donor' or 'ngo'")
    try:
        user = create_user(payload.email, payload.password, role=role)
    except ValueError:
        raise HTTPException(status_code=400, detail="User already exists")
    token = create_access_token({"sub": user["email"], "role": user["role"]})
    return {"access_token": token, "role": user["role"], "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": user["email"], "role": user["role"]})
    return {"access_token": token, "role": user["role"], "token_type": "bearer"}

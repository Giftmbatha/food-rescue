# Simple in-memory user store for demo. Replace with DB in production.
from typing import Dict
from .auth import get_password_hash, verify_password

_users: Dict[str, Dict] = {}

def create_user(email: str, password: str, role: str = "ngo"):
    if email in _users:
        raise ValueError("User exists")
    _users[email] = {
        "email": email,
        "password_hash": get_password_hash(password),
        "role": role
    }
    return _users[email]

def authenticate_user(email: str, password: str):
    u = _users.get(email)
    if not u:
        return None
    if not verify_password(password, u["password_hash"]):
        return None
    return u

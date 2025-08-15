from pydantic import BaseModel, EmailStr
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    role: str  # 'donor' or 'ngo'

class DonorCreate(BaseModel):
    name: str
    city: str
    contact_email: EmailStr

class DonorRead(BaseModel):
    id: int
    name: str
    city: str
    contact_email: EmailStr

class NGOCreate(BaseModel):
    name: str
    city: str
    contact_email: EmailStr

class NGORead(BaseModel):
    id: int
    name: str
    city: str
    contact_email: EmailStr

class ListingCreate(BaseModel):
    title: str
    description: str = ""
    quantity: int
    unit: str
    expires_at: datetime
    city: str

class ListingRead(BaseModel):
    id: int
    donor_id: int
    title: str
    description: str
    quantity: int
    unit: str
    expires_at: datetime
    city: str
    status: str

class ClaimCreate(BaseModel):
    listing_id: int
    ngo_id: int
    note: str | None = None

class ClaimRead(BaseModel):
    id: int
    listing_id: int
    ngo_id: int
    status: str
    note: str | None = None

from typing import Optional, List
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship

class Donor(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    city: str
    contact_email: str
    listings: List["Listing"] = Relationship(back_populates="donor")

class NGO(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    city: str
    contact_email: str
    claims: List["Claim"] = Relationship(back_populates="ngo")

class Listing(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    donor_id: int = Field(foreign_key="donor.id")
    title: str
    description: str
    quantity: int
    unit: str
    expires_at: datetime
    city: str
    status: str = Field(default="OPEN")  # OPEN, CLAIMED, COLLECTED, CANCELLED
    donor: Optional[Donor] = Relationship(back_populates="listings")
    claims: List["Claim"] = Relationship(back_populates="listing")

class Claim(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    listing_id: int = Field(foreign_key="listing.id")
    ngo_id: int = Field(foreign_key="ngo.id")
    status: str = Field(default="PENDING")  # PENDING, APPROVED, DENIED, PICKED_UP
    note: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    listing: Optional[Listing] = Relationship(back_populates="claims")
    ngo: Optional[NGO] = Relationship(back_populates="claims")

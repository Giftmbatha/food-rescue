from datetime import datetime,timezone 
from fastapi import APIRouter, Depends, HTTPException, Header, Query
from sqlmodel import Session, select
from ..db import get_session
from ..models import Listing, Donor
from ..schemas import ListingCreate, ListingRead
from ..auth import decode_access_token

router = APIRouter(prefix="/listings", tags=["listings"])

def get_current_user(authorization: str | None = Header(None)):
    if not authorization:
        return None
    parts = authorization.split()
    if len(parts) != 2:
        return None
    token = parts[1]
    return decode_access_token(token)

@router.post("", response_model=ListingRead)
def create_listing(donor_id: int, payload: ListingCreate, session: Session = Depends(get_session), user=Depends(get_current_user)):
    donor = session.get(Donor, donor_id)
    if not donor:
        raise HTTPException(status_code=404, detail="Donor not found")
    if payload.expires_at <= datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="expires_at must be in the future")
    listing = Listing(donor_id=donor_id, **payload.model_dump())
    session.add(listing)
    session.commit()
    session.refresh(listing)
    return listing

@router.get("", response_model=list[ListingRead])
def list_listings(session: Session = Depends(get_session)):
    return session.exec(select(Listing)).all()

@router.get("/search", response_model=list[ListingRead])
def search_listings(city: str | None = Query(None), status: str | None = Query("OPEN"), session: Session = Depends(get_session)):
    stmt = select(Listing)
    if city:
        stmt = stmt.where(Listing.city == city)
    if status:
        stmt = stmt.where(Listing.status == status)
    return session.exec(stmt).all()

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ..db import get_session
from ..models import Claim, Listing, NGO
from ..schemas import ClaimCreate, ClaimRead

router = APIRouter(prefix="/claims", tags=["claims"])

@router.post("", response_model=ClaimRead)
def create_claim(payload: ClaimCreate, session: Session = Depends(get_session)):
    listing = session.get(Listing, payload.listing_id)
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    if listing.status != "OPEN":
        raise HTTPException(status_code=400, detail="Listing is not open for claims")
    ngo = session.get(NGO, payload.ngo_id)
    if not ngo:
        raise HTTPException(status_code=404, detail="NGO not found")
    existing = session.exec(select(Claim).where(Claim.listing_id == listing.id, Claim.ngo_id == ngo.id)).first()
    if existing:
        raise HTTPException(status_code=409, detail="Duplicate claim")
    claim = Claim(**payload.model_dump())
    session.add(claim)
    listing.status = "CLAIMED"
    session.add(listing)
    session.commit()
    session.refresh(claim)
    return claim

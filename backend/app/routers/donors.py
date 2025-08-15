from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from ..db import get_session
from ..models import Donor
from ..schemas import DonorCreate, DonorRead

router = APIRouter(prefix="/donors", tags=["donors"])

@router.post("", response_model=DonorRead)
def create_donor(payload: DonorCreate, session: Session = Depends(get_session)):
    donor = Donor(**payload.model_dump())
    session.add(donor)
    session.commit()
    session.refresh(donor)
    return donor

@router.get("", response_model=list[DonorRead])
def list_donors(session: Session = Depends(get_session)):
    return session.exec(select(Donor)).all()

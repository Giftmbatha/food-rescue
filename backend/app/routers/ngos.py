from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from ..db import get_session
from ..models import NGO
from ..schemas import NGOCreate, NGORead

router = APIRouter(prefix="/ngos", tags=["ngos"])

@router.post("", response_model=NGORead)
def create_ngo(payload: NGOCreate, session: Session = Depends(get_session)):
    ngo = NGO(**payload.model_dump())
    session.add(ngo)
    session.commit()
    session.refresh(ngo)
    return ngo

@router.get("", response_model=list[NGORead])
def list_ngos(session: Session = Depends(get_session)):
    return session.exec(select(NGO)).all()

# app/routers/usuarios.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from .. import dal, schemas, security
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Usuario, status_code=status.HTTP_201_CREATED)
async def register_new_user(user: schemas.UsuarioCreate, db: AsyncSession = Depends(get_db)):
    db_user = await dal.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="El email ya está registrado")
    
    hashed_password = security.get_password_hash(user.password)
    return await dal.create_user(db=db, user=user, hashed_password=hashed_password)


@router.get("/me", response_model=schemas.Usuario)
async def read_users_me(current_user: schemas.Usuario = Depends(security.get_current_user)):
    return current_user
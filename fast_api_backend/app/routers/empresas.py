# app/routers/empresas.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from .. import dal, schemas
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Empresa)
async def create_company(empresa: schemas.EmpresaCreate, db: AsyncSession = Depends(get_db)):
    return await dal.crear_empresa(db, empresa=empresa)

@router.get("/", response_model=List[schemas.Empresa])
async def read_all_companies(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    empresas = await dal.obtener_empresas(db, skip=skip, limit=limit)
    return empresas

@router.get("/{empresa_id}", response_model=schemas.Empresa)
async def read_company_by_id(empresa_id: int, db: AsyncSession = Depends(get_db)):
    db_empresa = await dal.obtener_empresa_por_id(db, empresa_id=empresa_id)
    if db_empresa is None:
        raise HTTPException(status_code=404, detail="Empresa no encontrada")
    return db_empresa

# --- AÑADIDO: Endpoint para contar usuarios en una empresa ---
@router.get("/{empresa_id}/contar_usuarios", response_model=int)
async def count_users_in_company(empresa_id: int, db: AsyncSession = Depends(get_db)):
    count = await dal.contar_usuarios_por_empresa(db, empresa_id=empresa_id)
    return count
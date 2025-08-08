# app/routers/marcas.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from .. import dal, schemas
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Marca)
async def create_brand(marca: schemas.MarcaCreate, db: AsyncSession = Depends(get_db)):
    return await dal.crear_marca(db, marca=marca)

@router.get("/empresa/{empresa_id}", response_model=List[schemas.Marca])
async def read_brands_by_company(empresa_id: int, db: AsyncSession = Depends(get_db)):
    return await dal.obtener_marcas_por_empresa(db, empresa_id=empresa_id)

@router.put("/{marca_id}", response_model=schemas.Marca)
async def update_brand(marca_id: int, marca: schemas.MarcaBase, db: AsyncSession = Depends(get_db)):
    db_marca = await dal.editar_marca(db, marca_id=marca_id, marca=marca)
    if db_marca is None:
        raise HTTPException(status_code=404, detail="Marca no encontrada")
    return db_marca

@router.delete("/{marca_id}", response_model=schemas.Marca)
async def delete_brand(marca_id: int, db: AsyncSession = Depends(get_db)):
    db_marca = await dal.eliminar_marca(db, marca_id=marca_id)
    if db_marca is None:
        raise HTTPException(status_code=404, detail="Marca no encontrada")
    return db_marca
@router.get("/buscar/{empresa_id}", response_model=List[schemas.Marca])
async def search_brands(empresa_id: int, descripcion: str, db: AsyncSession = Depends(get_db)):
    marcas = await dal.buscar_marcas(db, empresa_id=empresa_id, descripcion=descripcion)
    return marcas

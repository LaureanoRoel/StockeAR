# app/routers/categorias.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from .. import dal, schemas
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Categoria)
async def create_category(categoria: schemas.CategoriaCreate, db: AsyncSession = Depends(get_db)):
    return await dal.crear_categoria(db, categoria=categoria)

@router.get("/empresa/{empresa_id}", response_model=List[schemas.Categoria])
async def read_categories_by_company(empresa_id: int, db: AsyncSession = Depends(get_db)):
    return await dal.obtener_categorias_por_empresa(db, empresa_id=empresa_id)

@router.get("/buscar/{empresa_id}", response_model=List[schemas.Categoria])
async def search_categories(empresa_id: int, descripcion: str, db: AsyncSession = Depends(get_db)):
    return await dal.buscar_categorias(db, empresa_id=empresa_id, descripcion=descripcion)

@router.put("/{categoria_id}", response_model=schemas.Categoria)
async def update_category(categoria_id: int, categoria: schemas.CategoriaBase, db: AsyncSession = Depends(get_db)):
    db_categoria = await dal.editar_categoria(db, categoria_id=categoria_id, categoria=categoria)
    if db_categoria is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_categoria

@router.delete("/{categoria_id}", response_model=schemas.Categoria)
async def delete_category(categoria_id: int, db: AsyncSession = Depends(get_db)):
    db_categoria = await dal.eliminar_categoria(db, categoria_id=categoria_id)
    if db_categoria is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_categoria
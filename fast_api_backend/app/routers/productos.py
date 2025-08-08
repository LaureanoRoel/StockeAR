# app/routers/productos.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from .. import dal, schemas
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Producto, status_code=201)
async def create_product(producto: schemas.ProductoCreate, db: AsyncSession = Depends(get_db)):
    return await dal.crear_producto(db, producto=producto)

@router.get("/empresa/{empresa_id}", response_model=List[schemas.Producto])
async def read_products_by_company(empresa_id: int, db: AsyncSession = Depends(get_db)):
    return await dal.obtener_productos_por_empresa(db, empresa_id=empresa_id)
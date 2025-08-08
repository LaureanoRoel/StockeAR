from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from sqlalchemy import func
from . import models, schemas

# Categorias
async def crear_categoria(db: AsyncSession, categoria: schemas.CategoriaCreate):
    db_categoria = models.Categoria(**categoria.model_dump())
    db.add(db_categoria)
    await db.commit()
    await db.refresh(db_categoria)
    return db_categoria

async def obtener_categorias_por_empresa(db: AsyncSession, empresa_id: int):
    result = await db.execute(
        select(models.Categoria).where(models.Categoria.empresa_id == empresa_id)
    )
    return result.scalars().all()

async def buscar_categorias(db: AsyncSession, empresa_id: int, descripcion: str):
    result = await db.execute(
        select(models.Categoria)
        .where(models.Categoria.empresa_id == empresa_id)
        .where(models.Categoria.descripcion.ilike(f"%{descripcion}%"))
    )
    return result.scalars().all()

async def editar_categoria(db: AsyncSession, categoria_id: int, categoria: schemas.CategoriaBase):
    result = await db.execute(select(models.Categoria).where(models.Categoria.id == categoria_id))
    db_categoria = result.scalar_one_or_none()
    if db_categoria:
        db_categoria.descripcion = categoria.descripcion
        await db.commit()
        await db.refresh(db_categoria)
    return db_categoria

async def eliminar_categoria(db: AsyncSession, categoria_id: int):
    result = await db.execute(select(models.Categoria).where(models.Categoria.id == categoria_id))
    db_categoria = result.scalar_one_or_none()
    if db_categoria:
        await db.delete(db_categoria)
        await db.commit()
    return db_categoria

#   Marcas
async def crear_marca(db: AsyncSession, marca: schemas.MarcaCreate):
    db_marca = models.Marca(**marca.model_dump())
    db.add(db_marca)
    await db.commit()
    await db.refresh(db_marca)
    return db_marca

async def obtener_marcas_por_empresa(db: AsyncSession, empresa_id: int):
    result = await db.execute(select(models.Marca).where(models.Marca.empresa_id == empresa_id))
    return result.scalars().all()

async def editar_marca(db: AsyncSession, marca_id: int, marca: schemas.MarcaBase):
    result = await db.execute(select(models.Marca).where(models.Marca.id == marca_id))
    db_marca = result.scalar_one_or_none()
    if db_marca:
        db_marca.descripcion = marca.descripcion
        await db.commit()
        await db.refresh(db_marca)
    return db_marca

async def eliminar_marca(db: AsyncSession, marca_id: int):
    result = await db.execute(select(models.Marca).where(models.Marca.id == marca_id))
    db_marca = result.scalar_one_or_none()
    if db_marca:
        await db.delete(db_marca)
        await db.commit()
    return db_marca

# Empresas
async def crear_empresa(db: AsyncSession, empresa: schemas.EmpresaCreate):
    db_empresa = models.Empresa(**empresa.model_dump())
    db.add(db_empresa)
    await db.commit()
    await db.refresh(db_empresa)
    return db_empresa

async def obtener_empresa_por_id(db: AsyncSession, empresa_id: int):
    result = await db.execute(select(models.Empresa).where(models.Empresa.id == empresa_id))
    return result.scalar_one_or_none()

async def obtener_empresas(db: AsyncSession, skip: int = 0, limit: int = 100):
    result = await db.execute(select(models.Empresa).offset(skip).limit(limit))
    return result.scalars().all()


async def contar_usuarios_por_empresa(db: AsyncSession, empresa_id: int):
    result = await db.execute(
        select(func.count(models.Usuario.id))
        .where(models.Usuario.empresa_id == empresa_id)
    )
    return result.scalar_one()

# Usuarios
async def get_user_by_email(db: AsyncSession, email: str):
    result = await db.execute(
        select(models.Usuario)
        .options(selectinload(models.Usuario.empresa))
        .where(models.Usuario.email == email)
    )
    return result.scalar_one_or_none()

async def create_user(db: AsyncSession, user: schemas.UsuarioCreate, hashed_password: str):
    db_user = models.Usuario(
        email=user.email, 
        hashed_password=hashed_password,
        empresa_id=user.empresa_id
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    result = await db.execute(
        select(models.Usuario)
        .options(selectinload(models.Usuario.empresa))
        .where(models.Usuario.id == db_user.id)
    )
    return result.scalar_one_or_none()
async def crear_producto(db: AsyncSession, producto: schemas.ProductoCreate):
    db_producto = models.Producto(**producto.model_dump())
    db.add(db_producto)
    await db.commit()
    await db.refresh(db_producto)

    result = await db.execute(
        select(models.Producto)
        .options(selectinload(models.Producto.categoria), selectinload(models.Producto.marca))
        .where(models.Producto.id == db_producto.id)
    )
    return result.scalar_one_or_none()

async def obtener_productos_por_empresa(db: AsyncSession, empresa_id: int):
    result = await db.execute(
        select(models.Producto)
        .options(selectinload(models.Producto.categoria), selectinload(models.Producto.marca))
        .where(models.Producto.empresa_id == empresa_id)
    )
    return result.scalars().all()
async def buscar_marcas(db: AsyncSession, empresa_id: int, descripcion: str):
    result = await db.execute(
        select(models.Marca)
        .where(models.Marca.empresa_id == empresa_id)
        .where(models.Marca.descripcion.ilike(f"%{descripcion}%"))
    )
    return result.scalars().all()
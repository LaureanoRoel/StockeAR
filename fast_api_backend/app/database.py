# app/database.py
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

# 1. URL de la base de datos con el driver asíncrono para SQLite
DATABASE_URL = "sqlite+aiosqlite:///./database.db"

# 2. Motor de base de datos asíncrono
engine = create_async_engine(
    DATABASE_URL, 
    echo=True  # 'echo=True' es útil para ver las consultas SQL en la terminal
)

# 3. Fábrica de sesiones asíncronas
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# 4. Clase base para los modelos de SQLAlchemy
Base = declarative_base()

# 5. Función centralizada para obtener la sesión de la base de datos
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
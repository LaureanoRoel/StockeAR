# app/models.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


class Empresa(Base):
    __tablename__ = "empresa"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, unique=True, index=True, nullable=False)
    
    # nullable=True para permitir que este campo esté vacío
    simbolo_moneda = Column(String, nullable=True)

    usuarios = relationship("Usuario", back_populates="empresa")
    categorias = relationship("Categoria", back_populates="empresa")
    marcas = relationship("Marca", back_populates="empresa")

class Usuario(Base):
    __tablename__ = "usuario"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    idauth = Column(String, unique=True, index=True, nullable=True) 
    empresa_id = Column(Integer, ForeignKey("empresa.id"))
    empresa = relationship("Empresa", back_populates="usuarios")

class Categoria(Base):
    __tablename__ = "categoria"
    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String, index=True)
    empresa_id = Column(Integer, ForeignKey("empresa.id"))
    empresa = relationship("Empresa", back_populates="categorias")

class Marca(Base):
    __tablename__ = "marca"
    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String, index=True)
    empresa_id = Column(Integer, ForeignKey("empresa.id"))
    empresa = relationship("Empresa", back_populates="marcas")
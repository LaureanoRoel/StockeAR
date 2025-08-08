from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


class Empresa(Base):
    __tablename__ = "empresa"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, unique=True, index=True, nullable=False)
    
  
    simbolo_moneda = Column(String, nullable=True)

    usuarios = relationship("Usuario", back_populates="empresa")
    categorias = relationship("Categoria", back_populates="empresa")
    marcas = relationship("Marca", back_populates="empresa")
    productos = relationship("Producto", back_populates="empresa")

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
    color = Column(String, nullable=True)
    empresa_id = Column(Integer, ForeignKey("empresa.id"))
    empresa = relationship("Empresa", back_populates="categorias")
    productos = relationship("Producto", back_populates="categoria")


class Marca(Base):
    __tablename__ = "marca"
    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String, index=True)
    empresa_id = Column(Integer, ForeignKey("empresa.id"))
    empresa = relationship("Empresa", back_populates="marcas")
    productos = relationship("Producto", back_populates="marca")

class Producto(Base):
    __tablename__ = "producto"
    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String, index=True)
   
    stock = Column(Float, default=0)
    stock_minimo = Column(Float, default=0)

    precio_venta = Column(Float, default=0)
    precio_compra = Column(Float, default=0)

    empresa_id = Column(Integer, ForeignKey("empresa.id"), nullable=False)
    categoria_id = Column(Integer, ForeignKey("categoria.id"), nullable=False)
    marca_id = Column(Integer, ForeignKey("marca.id"), nullable=False)

    empresa = relationship("Empresa", back_populates="productos")
    categoria = relationship("Categoria", back_populates="productos")
    marca = relationship("Marca", back_populates="productos")
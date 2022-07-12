from uuid import uuid4

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Boolean, Column, String

from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
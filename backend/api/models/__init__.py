import datetime

from uuid import uuid4

from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import (
    Float, 
    Column, 
    String, 
    Integer,
    Boolean, 
    DateTime, 
    ForeignKey,
)

from api.database import Base
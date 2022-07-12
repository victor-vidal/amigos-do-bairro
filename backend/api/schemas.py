from uuid import UUID
from typing import Optional

from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    
    
class UserCreate(UserBase):
    password: str
    
    
class User(UserBase):
    id: UUID
    is_active: bool
    
    class Config:
        orm_mode = True
        
    
class Token(BaseModel):
    access_token: str
    token_type: str
    

class TokenData(BaseModel):
    email: Optional[str] = None
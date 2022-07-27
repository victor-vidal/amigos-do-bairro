from . import *


class UserBase(BaseModel):
    email: str
    
    
class UserCreate(UserBase):
    password: str
    
    
class UserPatch(BaseModel):
    email: Optional[str]
    password: Optional[str]
    
    
class User(UserBase):
    id: UUID
    is_active: bool
    
    class Config:
        orm_mode = True
from . import *


class AuthData(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    

class TokenData(BaseModel):
    email: Optional[str] = None
    
    
class RecoveryNumberData(BaseModel):
    email: str
    
    
class RecoveryNumberCreate(BaseModel):
    owner_id: UUID
    number: int
    
    
class RecoveryNumberCheck(BaseModel):
    email: str
    number: int
    
    
class RecoveryNumberTry(BaseModel):
    tries: int
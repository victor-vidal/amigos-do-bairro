from . import *


class Token(BaseModel):
    access_token: str
    token_type: str
    

class TokenData(BaseModel):
    email: Optional[str] = None
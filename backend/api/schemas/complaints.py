from . import *


class ComplaintCategoryCreate(BaseModel):
    name: str


class ComplaintCategory(BaseModel):
    id: UUID
    name: str
    
    class Config:
        orm_mode = True
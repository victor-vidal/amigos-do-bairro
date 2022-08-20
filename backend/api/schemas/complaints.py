from . import *

from api.schemas.users import User


class ComplaintCategoryCreate(BaseModel):
    name: str


class ComplaintCategory(BaseModel):
    id: UUID
    name: str
    
    class Config:
        orm_mode = True
        
        
class ComplaintCreate(BaseModel):
    owner_id: UUID
    category_id: UUID
    title: str
    latitude: float
    longitude: float
    image: str
    
    # address
    country: Optional[str]
    state: Optional[str]
    city: Optional[str]
    suburb: Optional[str]
    road: Optional[str]
    
    @validator("owner_id")
    def user_exists(cls, v):
        from api.dependencies.database import get_db
        from api.repositories.users import UsersRepository
        
        users_repo = UsersRepository(db=next(get_db()))
        
        db_user = users_repo.read_one(v)
        
        if not db_user:
            raise ValueError("Owner doesn't exist")
            
        return v
    
    @validator("category_id")
    def complaint_category_exists(cls, v):
        from api.dependencies.database import get_db
        from api.repositories.complaints import ComplaintCategoriesRepository
        
        complaint_categories_repo = ComplaintCategoriesRepository(
            db=next(get_db())
        )
        
        db_complaint_category = complaint_categories_repo.read_one(v)
        
        if not db_complaint_category:
            raise ValueError("Complaint category doesn't exist")
            
        return v
    
    
class Complaint(BaseModel):
    id: UUID
    created_at: datetime.datetime
    owner: User
    category: ComplaintCategory
    title: str
    latitude: float
    longitude: float
    image: str
    
    # address
    country: str
    state: str
    city: str
    suburb: str
    road: str
    
    class Config:
        orm_mode = True
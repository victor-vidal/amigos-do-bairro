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
    # complaint info
    id: UUID = Field(title="Complaint's identified")
    created_at: datetime.datetime = Field(title="Complaint's creation date and time")
    owner: User = Field(title="Complaint's creator")
    category: ComplaintCategory = Field(title="Complaint's category")
    title: str = Field(title="Complaint's title")
    image: str = Field(title="Complaint's image on base64 format")
    resolved: bool = Field(title="If complaint was resolved") 
    
    # complaint location info
    latitude: float = Field(title="Complaint's latitude")
    longitude: float = Field(title="Complaint's logintude")
    country: str = Field(title="Complaint's country")
    state: str = Field(title="Complaint's state")
    city: str = Field(title="Complaint's city")
    suburb: str = Field(title="Complaint's suburb")
    road: str = Field(title="Complaint's road")
    
    # complaint-user info
    likes: Optional[int] = Field(title="Number of complaint's likes")
    liked_by_user: Optional[bool] = Field(title="If complaint was liked by current user")
    followed_by_user: Optional[bool] = Field(title="If complaint was followed by current user")
    
    class Config:
        orm_mode = True
        

class ComplaintLikeCreate(BaseModel):
    user_id: UUID
    complaint_id: UUID
    
    @validator("user_id")
    def user_exists(cls, v):
        from api.dependencies.database import get_db
        from api.repositories.users import UsersRepository
        
        users_repo = UsersRepository(db=next(get_db()))
        
        db_user = users_repo.read_one(v)
        
        if not db_user:
            raise ValueError("User doesn't exist")
            
        return v
        
    @validator("complaint_id")
    def complaint_exists(cls, v):
        from api.dependencies.database import get_db
        from api.repositories.complaints import ComplaintsRepository
        
        users_repo = ComplaintsRepository(db=next(get_db()))
        
        db_complaint = users_repo.read_one(v)
        
        if not db_complaint:
            raise ValueError("Complaint doesn't exist")
            
        return v
    

class ComplaintFollowCreate(BaseModel):
    user_id: UUID
    complaint_id: UUID
    
    @validator("user_id")
    def user_exists(cls, v):
        from api.dependencies.database import get_db
        from api.repositories.users import UsersRepository
        
        users_repo = UsersRepository(db=next(get_db()))
        
        db_user = users_repo.read_one(v)
        
        if not db_user:
            raise ValueError("User doesn't exist")
            
        return v
        
    @validator("complaint_id")
    def complaint_exists(cls, v):
        from api.dependencies.database import get_db
        from api.repositories.complaints import ComplaintsRepository
        
        users_repo = ComplaintsRepository(db=next(get_db()))
        
        db_complaint = users_repo.read_one(v)
        
        if not db_complaint:
            raise ValueError("Complaint doesn't exist")
            
        return v
        
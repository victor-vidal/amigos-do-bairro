from . import *

from api.dependencies.access import *
from api.schemas import complaints, users
from api.repositories.complaints import (
    ComplaintsRepository,
    ComplaintCategoriesRepository, 
)


router = APIRouter(
    prefix="/complaints",
    tags=["complaints"]
)


@router.get("/categories", response_model=List[complaints.ComplaintCategory])
def get_complaint_categories(
    skip: int = 0,
    limit: int = 100,
    complaint_categories_repo: ComplaintCategoriesRepository = Depends(
        ComplaintCategoriesRepository
    ),
    current_user: users.User = Depends(user_is_active)
):
    return complaint_categories_repo.read_all(skip=skip, limit=limit)


@router.post("/", response_model=complaints.Complaint)
def post_create(
    complaint: complaints.ComplaintCreate,
    complaints_repo: ComplaintsRepository = Depends(ComplaintsRepository),
    current_user: users.User = Depends(user_is_active)
):
    
    
    return complaints_repo.create(schema=complaint)


@router.get("/", response_model=List[complaints.Complaint])
def get_complaints(
    skip: int = 0, 
    limit: int = 100, 
    complaints_repo: ComplaintsRepository = Depends(ComplaintsRepository),
    current_user: users.User = Depends(user_is_active)
):
    return complaints_repo.read_all(skip=skip, limit=limit)


@router.get("/{complaint_id}", response_model=complaints.Complaint)
def get_complaint(
    complaint_id: uuid.UUID,
    complaints_repo: ComplaintsRepository = Depends(ComplaintsRepository),
    current_user: users.User = Depends(user_is_active)
):
    db_complaint = complaints_repo.read_one(id=complaint_id)
    
    if db_complaint is None:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return db_complaint
from . import *

from api.dependencies.access import *
from api.schemas import complaints, users
from api.repositories.complaints import (
    ComplaintsRepository,
    ComplaintCategoriesRepository, 
)
from api.services.complaint_service import ComplaintService


router = APIRouter(
    prefix="/complaints",
    tags=["complaints"]
)


@router.get("/categories", response_model=List[complaints.ComplaintCategory])
def get_complaint_categories(
    complaint_categories_repo: ComplaintCategoriesRepository = Depends(
        ComplaintCategoriesRepository
    ),
    current_user: users.User = Depends(user_is_active)
):
    return complaint_categories_repo.read_all()


@router.post("/", response_model=complaints.Complaint)
def post_create(
    complaint: complaints.ComplaintCreate,
    complaints_repo: ComplaintsRepository = Depends(ComplaintsRepository),
    current_user: users.User = Depends(user_is_active)
):
    complaint = ComplaintService().create(complaints_repo, complaint)
    
    if not complaint:
        raise HTTPException(
            status_code=500, 
            detail="Could not get complaint address"
        )
    return complaint


@router.get("/", response_model=List[complaints.Complaint])
def get_complaints(
    country: Optional[str] = None,
    state: Optional[str] = None,
    city: Optional[str] = None,
    suburb: Optional[str] = None,
    road: Optional[str] = None,
    complaints_repo: ComplaintsRepository = Depends(ComplaintsRepository),
    current_user: users.User = Depends(user_is_active)
):
    return complaints_repo.read_all(
        country, 
        state, 
        city, 
        suburb, 
        road
    )


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
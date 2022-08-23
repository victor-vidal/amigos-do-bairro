from . import *

from fastapi.responses import JSONResponse
from pydantic import ValidationError

from api.dependencies.access import *
from api.schemas import complaints, users
from api.repositories.complaints import (
    ComplaintLikesRepository,
    ComplaintsRepository,
    ComplaintCategoriesRepository, 
    ComplaintFollowsRepository
)
from api.services.complaint_service \
    import ComplaintService, ComplaintLikeService, ComplaintFollowService


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
    current_user: users.User = Depends(user_is_active)
):
    return ComplaintService().read_all(
        current_user,
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


@router.post("/{complaint_id}/like")
def like_complaint(
    complaint_id: uuid.UUID, 
    complaint_likes_repo: ComplaintLikesRepository = Depends(ComplaintLikesRepository),
    current_user: users.User = Depends(user_is_active)    
):
    try:
        complaint_like = complaints.ComplaintLikeCreate(
            complaint_id=complaint_id,
            user_id=current_user.id
        )
        
        return ComplaintLikeService().create(
            complaint_likes_repo, 
            complaint_like
        )
    except ValidationError as e:
        return JSONResponse(status_code=400, content=e.errors())


@router.delete("/{complaint_id}/like")
def remove_like_from_complaint(
    complaint_id: uuid.UUID, 
    complaint_likes_repo: ComplaintLikesRepository = Depends(ComplaintLikesRepository),
    current_user: users.User = Depends(user_is_active)   
):
    return ComplaintLikeService().delete(
        complaint_likes_repo, 
        complaint_id, 
        current_user.id
    )
    
    
@router.post("/{complaint_id}/follow")
def follow_complaint(
    complaint_id: uuid.UUID, 
    complaint_follow_repo: ComplaintFollowsRepository = Depends(ComplaintFollowsRepository),
    current_user: users.User = Depends(user_is_active)    
):
    try:
        complaint_follow = complaints.ComplaintFollowCreate(
            complaint_id=complaint_id,
            user_id=current_user.id
        )
        
        return ComplaintFollowService().create(
            complaint_follow_repo, 
            complaint_follow
        )
    except ValidationError as e:
        return JSONResponse(status_code=400, content=e.errors())
    
    
@router.delete("/{complaint_id}/follow")
def remove_follow_from_complaint(
    complaint_id: uuid.UUID, 
    complaint_follow_repo: ComplaintFollowsRepository = Depends(ComplaintFollowsRepository),
    current_user: users.User = Depends(user_is_active)    
):
    return ComplaintFollowService().delete(
        complaint_follow_repo, 
        complaint_id, 
        current_user.id
    )
    
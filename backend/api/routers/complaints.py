from . import *

from api.dependencies.access import *
from api.schemas import complaints, users
from api.repositories.complaints import ComplaintCategoriesRepository


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
from . import *

from api.schemas import users
from api.dependencies.access import *
from api.repositories.users import UsersRepository


router = APIRouter(
    prefix="/users",
    tags=["users"]
)


@router.post("/", response_model=users.User)
def post_create(
    user: users.UserCreate, 
    users_repo: UsersRepository = Depends(UsersRepository)
):
    db_user = users_repo.get_user_by_email(user_email=user.email)
    
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return users_repo.create(schema=user)


@router.get("/", response_model=List[users.User])
def get_users(
    skip: int = 0, 
    limit: int = 100, 
    users_repo: UsersRepository = Depends(UsersRepository),
    current_user: users.User = Depends(user_is_active)
):
    return users_repo.read_all(skip=skip, limit=limit)


@router.get("/{user_id}", response_model=users.User)
def get_user(
    user_id: uuid.UUID,
    users_repo: UsersRepository = Depends(UsersRepository),
    current_user: users.User = Depends(user_is_active)
):
    db_user = users_repo.read_one(id=user_id)
    
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.delete("/{user_id}", response_model=users.User)    
def delete(
    user_id: uuid.UUID, 
    users_repo: UsersRepository = Depends(UsersRepository),
    current_user: users.User = Depends(user_is_active)
):
    db_user = users_repo.read_one(user_id)
    
    if current_user != db_user:
        raise HTTPException(status_code=403)
    
    return users_repo.delete(id=user_id)


@router.patch("/{user_id}", response_model=users.User)
def patch(
    user_id: uuid.UUID, 
    user: users.UserPatch,
    users_repo: UsersRepository = Depends(UsersRepository),
    current_user: users.User = Depends(user_is_active)
):
    db_user = users_repo.read_one(user_id)
    
    if current_user != db_user:
        raise HTTPException(status_code=403)
    
    return users_repo.put_or_patch(id=user_id, schema=user)


@router.put("/{user_id}", response_model=users.User)
def put(
    user_id: uuid.UUID, 
    user: users.UserPatch,
    users_repo: UsersRepository = Depends(UsersRepository),
    current_user: users.User = Depends(user_is_active)
):
    db_user = users_repo.read_one(user_id)
    
    if current_user != db_user:
        raise HTTPException(status_code=403)
    
    return users_repo.put_or_patch(id=user_id, schema=user)
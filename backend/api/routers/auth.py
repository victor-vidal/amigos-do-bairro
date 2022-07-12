from datetime import timedelta

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from api.schemas import Token
from api.authentication import AuthProvider
from api.exceptions import inactive_user_exception
from api.repositories.users import UsersRepository

from config import settings


router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/token", response_model=Token)
def get_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), 
    users_repo: UsersRepository = Depends(UsersRepository) ,
    auth_provider: AuthProvider = Depends(AuthProvider)
):
    user = auth_provider.authenticate_user(
        form_data.username, 
        form_data.password, 
        users_repo
    )
    if not user:
        raise inactive_user_exception
    
    access_token_expires = timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    access_token = auth_provider.create_access_token(
        data={ "sub": user.email }, expires_delta=access_token_expires
    )
    
    return { "access_token": access_token, "token_type": "bearer" }
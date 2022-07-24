from fastapi import Depends
from jose import JWTError, jwt

from api.exceptions import *
from api.schemas import users, auth
from api.authentication import oauth2_scheme
from api.repositories.users import UsersRepository

from config import settings


def user_exists(
    token: str = Depends(oauth2_scheme),
    users_repo: UsersRepository = Depends(UsersRepository)
):
    try:
        payload = jwt.decode(
            token, 
            settings.SECRET_KEY, 
            algorithms=[settings.ALGORITHM]
        )
        email = payload.get("sub")
        
        if email is None:
            raise credentials_exception
        token_data = auth.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    
    user = users_repo.get_user_by_email(token_data.email)
    
    if user is None:
        raise credentials_exception
    return user


def user_is_active(current_user: users.User = Depends(user_exists)):
    if not current_user.is_active:
        raise inactive_user_exception
    return current_user
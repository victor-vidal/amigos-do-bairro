from typing import Optional
from datetime import datetime, timedelta

from jose import jwt
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from api.utils import *
from api.repositories.users import UsersRepository

from config import settings


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')


class AuthProvider:
    def authenticate_user(
        self, 
        email: str, 
        password: str, 
        users_repo: UsersRepository
    ):
        user = users_repo.get_user_by_email(email)
        
        if not user:
            return False
        if not verify_password(password, user.hashed_password):
            return False
        return user
    
    def create_access_token(
        self,
        data: dict,
        expires_delta: Optional[timedelta] = None
    ):
        to_encode = data.copy()
        
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(
                minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
            )
            
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(
            to_encode, 
            settings.SECRET_KEY, 
            algorithm=settings.ALGORITHM
        )
        
        return encoded_jwt
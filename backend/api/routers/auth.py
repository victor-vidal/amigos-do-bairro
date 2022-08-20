from . import *

from datetime import timedelta

from fastapi import APIRouter, Depends, Response

from api.schemas import auth, users
from api.authentication import AuthProvider
from api.exceptions import incorrect_name_or_password_exception
from api.repositories.users import UsersRepository
from api.dependencies.access import user_is_active
from api.repositories.auth import RecoveryNumbersRepository

from api.utils import send_email, generate_recovery_number

from config import settings


router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/token", response_model=auth.Token)
def get_access_token(
    form_data: auth.AuthData, 
    users_repo: UsersRepository = Depends(UsersRepository),
    auth_provider: AuthProvider = Depends(AuthProvider)
):
    user = auth_provider.authenticate_user(
        form_data.username, 
        form_data.password, 
        users_repo
    )
    if not user:
        raise incorrect_name_or_password_exception
    
    access_token_expires = timedelta(
        hours=settings.ACCESS_TOKEN_EXPIRE_HOURS
    )
    access_token = auth_provider.create_access_token(
        data={ "sub": user.email }, expires_delta=access_token_expires
    )
    
    return { 
        "access_token": access_token, 
        "token_type": "bearer", 
        "user_id": user.id 
    }
    



@router.post(
    "/create_recovery_number", 
    response_model=auth.RecoveryNumberData
)
def create_recovery_number(
    data: auth.RecoveryNumberData,
    users_repo: UsersRepository = Depends(UsersRepository),
    recovery_numbers_repo: RecoveryNumbersRepository \
        = Depends(RecoveryNumbersRepository)
):
    db_user = users_repo.get_user_by_email(user_email=data.email)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_recovery_number = recovery_numbers_repo.get_by_user_id(db_user.id)
    if db_recovery_number:
        recovery_numbers_repo.delete(db_recovery_number.id)
        
    recovery_number = generate_recovery_number()
    
    recovery_numbers_repo.create(auth.RecoveryNumberCreate(
        owner_id=db_user.id, 
        number=recovery_number
    ))
    
    message = f"This is your password recovery number: {recovery_number}."
    send_email(
        db_user.email, 
        "Password recovery [Amigos do Bairro]", 
        message
    )
    
    return data


@router.post("/check_recovery_number")
def check_recovery_number(
    data: auth.RecoveryNumberCheck,
    users_repo: UsersRepository = Depends(UsersRepository),
    recovery_numbers_repo: RecoveryNumbersRepository \
        = Depends(RecoveryNumbersRepository),
    auth_provider: AuthProvider = Depends(AuthProvider)
):
    db_user = users_repo.get_user_by_email(user_email=data.email)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_recovery_number = recovery_numbers_repo.get_by_user_id(db_user.id)
    if db_recovery_number is None:
        raise HTTPException(status_code=404, detail="Recovery number not found")
    
    if db_recovery_number.number == data.number:
        recovery_numbers_repo.delete(id=db_recovery_number.id)
        
        access_token_expires = timedelta(
            hours=settings.ACCESS_TOKEN_EXPIRE_HOURS
        )
        access_token = auth_provider.create_access_token(
            data={ "sub": db_user.email }, expires_delta=access_token_expires
        )
    
        return { "access_token": access_token, "token_type": "bearer", "user_id": db_user.id }
    else:
        db_recovery_number.tries = db_recovery_number.tries + 1
        
        if db_recovery_number.tries == 3:
            recovery_numbers_repo.delete(id=db_recovery_number.id)
            raise HTTPException(
                status_code=400, 
                detail="Maximum number of tries exceeded"
            )
        
        recovery_numbers_repo.put_or_patch(
            id=db_recovery_number.id,
            schema=auth.RecoveryNumberTry(tries=db_recovery_number.tries)
        )
        
        raise HTTPException(
            status_code=400,
            detail=f"Wrong number, tries left {3 - db_recovery_number.tries}"
        )
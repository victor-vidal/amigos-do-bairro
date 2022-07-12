
from typing import List

from fastapi import (
    Depends, 
    FastAPI, 
    Request,
    HTTPException, 
)
from sqlalchemy.orm import Session
from starlette.responses import RedirectResponse

from api import schemas, crud
from api.dependencies.database import create_database_tables, get_db

from config import settings


def start_application():
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.PROJECT_VERSION
    )
    create_database_tables()
    
    return app


app = start_application()


@app.get("/")
async def root(request: Request):
    return RedirectResponse("/docs")


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: str, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
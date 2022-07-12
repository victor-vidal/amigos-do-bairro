
from fastapi import (
    FastAPI, 
    Request,
)
from starlette.responses import RedirectResponse

from api.dependencies.database import create_database_tables
from api.routers import auth, users

from config import settings


def start_application():
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.PROJECT_VERSION
    )
    create_database_tables()
    
    return app


app = start_application()


app.include_router(auth.router)
app.include_router(users.router)


@app.get("/")
async def root(request: Request):
    return RedirectResponse("/docs")
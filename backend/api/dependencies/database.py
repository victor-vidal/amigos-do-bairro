from api.database import SessionLocal, engine
from api import models


def get_db():
    db = SessionLocal()
    
    try:
        yield db
    finally:
        db.close()
        

def create_database_tables():
    models.Base.metadata.create_all(bind=engine)
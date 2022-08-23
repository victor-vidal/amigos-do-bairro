import uuid
from typing import Any, List, Optional

from sqlalchemy.orm import Session
from fastapi.param_functions import Depends

from api import schemas, models
from api.dependencies.database import get_db


class BaseRepository:
    model = models.Base
    db = Session
    
    def __init__(self, db: Session = Depends(get_db)) -> None:
        self.db = db
        
    def commit2db(self, db_instance: models.Base):
        self.db.add(db_instance)
        self.db.commit()
        self.db.refresh(db_instance)
        
        return db_instance
        
    def read_one(self, id: uuid.UUID) -> Optional[Any]:
        return self.db.query(self.model).filter(self.model.id == id).first()
    
    def read_all(self) -> List[Any]:
        return self.db.query(self.model).all()
    
    def create(self, schema: schemas.BaseModel):
        db_instance = self.model(
            id=uuid.uuid4(),
            **schema.dict()
        )
        
        return self.commit2db(db_instance)
        
    def put_or_patch(self, id: uuid.UUID, schema: schemas.BaseModel):
        db_instance = self.db.query(self.model).filter(
            self.model.id == id
        ).first()
        
        for var, value in vars(schema).items():
            setattr(db_instance, var, value) if value \
                else getattr(db_instance, var)
                
        return self.commit2db(db_instance)
    
    def delete(self, id: uuid.UUID):
        db_instance = self.db.query(self.model).filter(
            self.model.id == id
        ).first()
        
        self.db.delete(db_instance)
        self.db.commit()
        
        return db_instance
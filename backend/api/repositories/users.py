from . import *

from api.schemas import users
from api.models.users import User
from api.utils import get_password_hash


class UsersRepository(BaseRepository):
    model = User
    
    def get_user_by_email(self, user_email: str):
        return self.db.query(self.model).filter(
            self.model.email == user_email
        ).first()
        
    def create(self, schema: users.UserCreate):
        db_user = self.model(
            id=uuid.uuid4(),
            email=schema.email,
            hashed_password=get_password_hash(schema.password),
            is_active=True
        )
        
        return self.commit2db(db_user)
    
    def put_or_patch(self, id: uuid.UUID, schema: users.UserCreate):
        db_user = self.db.query(self.model).filter(
            self.model.id == id
        ).first()
        
        for var, value in vars(schema).items():
            if var == "password":
                value = get_password_hash(value)
                
            setattr(db_user, var, value) if value else getattr(db_user, var)
            
        return self.commit2db(db_user)
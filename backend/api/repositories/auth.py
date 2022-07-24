from . import *

from api.models.auth import RecoveryNumber


class RecoveryNumbersRepository(BaseRepository):
    model = RecoveryNumber
    
    def get_by_user_id(self, user_id: str):
        return self.db.query(self.model).filter(
            self.model.owner_id == user_id
        ).first()
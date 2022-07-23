from . import *

from api.models.complaints import ComplaintCategory, Complaint


class ComplaintCategoriesRepository(BaseRepository):
    model = ComplaintCategory
    
    def get_complaint_category_by_name(self, name: str):
        return self.db.query(self.model).filter(
            self.model.name == name
        ).first()
        
        
class ComplaintsRepository(BaseRepository):
    model = Complaint
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
    
    def read_all(
        self, 
        country: Optional[str],
        state: Optional[str],
        city: Optional[str],
        suburb: Optional[str],
        road: Optional[str]
    ) -> List[Any]:
        result = self.db.query(self.model)
        
        if country:
            result = result.filter_by(country=country)
        if state:
            result = result.filter_by(state=state)
        if city:
            result = result.filter_by(city=city)
        if suburb:
            result = result.filter_by(suburb=suburb)
        if road:
            result = result.filter_by(road=road)
        
        return result.all()
    
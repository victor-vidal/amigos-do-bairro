from geopy.geocoders import Nominatim

from api.schemas.complaints import ComplaintCreate
from api.repositories.complaints import ComplaintsRepository


class ComplaintService:
    def create(
        self, 
        complaint_repo: ComplaintsRepository, 
        data: ComplaintCreate
    ):
        try:
            locator = Nominatim(user_agent="AmigosGeocoder", timeout=3)
            
            location = locator.reverse((data.latitude, data.longitude))
            
            if not location:
                return;
            
            data.country = location.raw["address"]["country"]
            data.state = location.raw["address"]["state"]
            data.city = location.raw["address"]["city"]
            data.suburb = location.raw["address"]["suburb"]
            data.road = location.raw["address"]["road"]
            
            return complaint_repo.create(data)
        except Exception as e:
            print(e)
            return;
        
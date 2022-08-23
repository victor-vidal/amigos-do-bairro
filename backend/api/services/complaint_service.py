from uuid import UUID
from typing import List, Optional

from fastapi import HTTPException

from geopy.geocoders import Nominatim

from api.dependencies.database import get_db
from api.schemas.users import User
from api.schemas.complaints \
    import ComplaintCreate, ComplaintLikeCreate, ComplaintFollowCreate, Complaint
    
from api.repositories.complaints \
    import ComplaintsRepository, ComplaintLikesRepository, ComplaintFollowsRepository


class ComplaintService:
    def read_all(
        self, 
        current_user: User,
        country: Optional[str], 
        state: Optional[str], 
        city: Optional[str], 
        suburb: Optional[str], 
        road: Optional[str]
    ) -> List[Complaint]:
        complaints_repo = ComplaintsRepository(db=next(get_db()))
        complaint_likes_repo = ComplaintLikesRepository(db=next(get_db()))
        complaint_follows_repo = ComplaintFollowsRepository(db=next(get_db()))
        
        filtered_complaints = complaints_repo.read_all(
            country, 
            state, 
            city, 
            suburb, 
            road
        )
        
        result = []
        for filtered_complaint in filtered_complaints:
            complaint_schema = Complaint(
                id=filtered_complaint.id,
                created_at=filtered_complaint.created_at,
                owner=filtered_complaint.owner,
                category=filtered_complaint.category,
                title=filtered_complaint.title,
                image=filtered_complaint.image,
                resolved=filtered_complaint.resolved,
                latitude=filtered_complaint.latitude,
                longitude=filtered_complaint.longitude,
                country=filtered_complaint.country,
                state=filtered_complaint.state,
                city=filtered_complaint.city,
                suburb=filtered_complaint.suburb,
                road=filtered_complaint.road
            )
            
            # Getting complaint likes
            complaint_schema.likes = len(complaint_likes_repo.read_complaint_likes(complaint_schema.id))
            
            # Check if complaint was liked by current user
            complaint_like = complaint_likes_repo.read_by_user_and_complaint_ids(
                user_id=current_user.id, 
                complaint_id=complaint_schema.id
            )
            complaint_schema.liked_by_user = True if complaint_like else False

            # Check if complaint was followed by current user
            complaint_follow = complaint_follows_repo.read_by_user_and_complaint_ids(
                user_id=current_user.id,
                complaint_id=complaint_schema.id
            )
            complaint_schema.followed_by_user = True if complaint_follow else False
            
            result.append(complaint_schema)
            
        return result
        
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
        
        
class ComplaintLikeService:
    def create(
        self,
        complaint_like_repo: ComplaintLikesRepository,
        data: ComplaintLikeCreate
    ):
        complaint_like = complaint_like_repo.read_by_user_and_complaint_ids(
            user_id=data.user_id, 
            complaint_id=data.complaint_id
        )
        
        if complaint_like:
            raise HTTPException(status_code=400, detail='Like already exists.') 
        
        return complaint_like_repo.create(data)
    
    def delete(
        self,
        complaint_like_repo: ComplaintLikesRepository,
        complaint_id: UUID,
        user_id: UUID
    ):
        complaint_like = complaint_like_repo.read_by_user_and_complaint_ids(
            user_id=user_id, 
            complaint_id=complaint_id
        )
        
        if complaint_like:
            return complaint_like_repo.delete(complaint_like.id)
        
        raise HTTPException(status_code=404, detail='Like not found.')
        
        
class ComplaintFollowService:
    def create(
        self,
        complaint_follow_repo: ComplaintFollowsRepository,
        data: ComplaintFollowCreate
    ):
        complaint_follow = complaint_follow_repo.read_by_user_and_complaint_ids(
            user_id=data.user_id, 
            complaint_id=data.complaint_id
        )
        
        if complaint_follow:
            raise HTTPException(status_code=400, detail='Follow already exists.') 
        
        return complaint_follow_repo.create(data)
    
    def delete(
        self,
        complaint_follow_repo: ComplaintFollowsRepository,
        complaint_id: UUID,
        user_id: UUID
    ):
        complaint_like = complaint_follow_repo.read_by_user_and_complaint_ids(
            user_id=user_id, 
            complaint_id=complaint_id
        )
        
        if complaint_like:
            return complaint_follow_repo.delete(complaint_like.id)
        
        raise HTTPException(status_code=404, detail='Follow not found.')
    
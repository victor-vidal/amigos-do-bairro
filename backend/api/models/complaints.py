from . import *


class ComplaintCategory(Base):
    __tablename__ = "complaint_categories"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String, unique=True, index=True)



class Complaint(Base):
    __tablename__ = "complaints"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    category_id = Column(
        UUID(as_uuid=True), 
        ForeignKey("complaint_categories.id")
    )
    title = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    image = Column(String)
    resolved = Column(Boolean, default=False)
    
    # address
    country = Column(String)
    state = Column(String)
    city = Column(String)
    suburb = Column(String)
    road = Column(String)
    
    owner = relationship("User", backref="complaints")
    category = relationship("ComplaintCategory", backref="complaints")
    
    
class ComplaintLike(Base):
    __tablename__ = "complaint_likes"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    complaint_id = Column(UUID(as_uuid=True), ForeignKey("complaints.id"))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    owner = relationship("User", backref=backref("complaint_likes", cascade="all,delete"))
    complaint = relationship("Complaint", backref=backref("complaint_likes", cascade="all,delete"))


class ComplaintFollow(Base):
    __tablename__ = "complaint_follows"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    complaint_id = Column(UUID(as_uuid=True), ForeignKey("complaints.id"))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
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
    
    owner = relationship("User", backref="complaints")
    category = relationship("ComplaintCategory", backref="complaints")
    
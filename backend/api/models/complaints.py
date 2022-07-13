from . import *


class ComplaintCategory(Base):
    __tablename__ = "complaint_categories"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String, unique=True, index=True)



# class Complaint(Base):
#     __tablename__ = "complaints"
    
#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    
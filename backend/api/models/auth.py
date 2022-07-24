from . import *


class RecoveryNumber(Base):
    __tablename__ = "recovery_numbers"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    number = Column(Integer)
    tries = Column(Integer, default=0)
    
    owner = relationship("User", backref="recovery_numbers")
    
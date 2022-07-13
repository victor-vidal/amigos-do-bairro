from api import models
from api.database import SessionLocal, engine
from api.schemas.complaints import ComplaintCategoryCreate 


def get_db():
    db = SessionLocal()
    
    try:
        yield db
    finally:
        db.close()
        

def create_database_tables():
    models.Base.metadata.create_all(bind=engine)
    
    
def create_fixtures():
    from api.repositories.complaints import ComplaintCategoriesRepository
    
    complaint_category_repo = ComplaintCategoriesRepository(db=next(get_db()))
    
    categories = [
        "Acessibilidade",
        "Água e esgoto",
        "Alagamentos",
        "Árvores",
        "Buracos",
        "Energia",
        "Iluminação",
        "Lixo",
        "Obra pública",
        "Poluição do ar",
        "Poluição sonora",
        "Poluição visual",
        "Queimada"
    ]
    
    for category in categories:
        result = complaint_category_repo.get_complaint_category_by_name(
            name=category
        )

        if not result:
            complaint_category = ComplaintCategoryCreate(name=category)
            complaint_category_repo.create(complaint_category)
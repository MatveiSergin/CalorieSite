from sqlalchemy import URL, create_engine, Column, String, Float
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from dotenv import load_dotenv
from os import getenv
load_dotenv()


url_object = URL.create(
    getenv("DIALECT"),
    username=getenv("USER_NAME"),
    password=getenv("PASSWORD"),
    host=getenv("HOST"),
    database=getenv("DATABASE")
)

engine = create_engine(url_object)

engine.connect()

class Base(DeclarativeBase):
    pass

class Product(Base):
    __tablename__ = "Product"

    id = Column(Float, autoincrement='auto', primary_key=True)
    name = Column(String, nullable=False)
    proteins = Column(Float, nullable=False)
    fats = Column(Float, nullable=False)
    carbohydrates = Column(Float, nullable=False)
    calories = Column(Float,  nullable=False)
    dictionary = {}
    def to_dict(self):
        if self.dictionary:
            return self.dictionary

        self.dictionary["name"] = self.name
        self.dictionary["proteins"] = self.proteins
        self.dictionary["fats"] = self.fats
        self.dictionary["carbohydrates"] = self.carbohydrates
        self.dictionary["calories"] = self.calories

        return self.dictionary


Base.metadata.create_all(engine)
DBSession = sessionmaker(bind=engine, autoflush=False)
session = DBSession()





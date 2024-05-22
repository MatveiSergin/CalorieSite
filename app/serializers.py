import json

from exceptions import SerializerException
from db import Product

class ProductsSerializer:
    def __init__(self, products, many=False):
        self.products = products
        self.many = many
    def validate(self):
        if self.many and any(type(product) != Product for product in self.products):
            raise SerializerException("All element of list must be type of Product")
        elif not self.many and type(self.products) != Product:
            raise SerializerException("product must be of type Product")
        else:
            return True
    def encode(self):
        self.validate()

        if self.many:
            objects = [product.to_dict() for product in self.products]
            return json.dumps(objects, indent=4, ensure_ascii=False)
        else:
            return json.dumps(self.products.to_dict(), ensure_ascii=False)

    def decode(self):
        pass



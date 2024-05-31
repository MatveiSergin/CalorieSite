import json

import googletrans

from flaskr.exceptions import SerializerException, NotConvertToJsonException
from flaskr.db import Product

class ProductsSerializer:
    def validate(self, products, many):
        if many and any(type(product) != Product for product in products):
            raise SerializerException("All element of list must be type of Product")
        elif not many and type(products) != Product:
            raise SerializerException("product must be of type Product")
        else:
            return True
    def encode(self, products, many=False):
        if isinstance(products, Product) or (many and all(isinstance(product, Product) for product in products)):
            self.validate(products, many)
            if many:
                objects = [product.to_dict() for product in products]
                return json.dumps(objects, ensure_ascii=False)
            else:
                return json.dumps(products.to_dict(), ensure_ascii=False)
        elif isinstance(products, dict):
            try:
                return json.dumps(products, ensure_ascii=False)
            except Exception as e:
                return json.dumps(dict())

    def decode(self, string):
        json_data = json.loads(string)

        if not json_data:
            return json_data
        products = json_data['items']
        if len(products) == 1:
            product = products[0]
            return {
                    'name': googletrans.Translator().translate(text=product['name'], src='en', dest='ru').text,
                    'protein': product['protein_g'],
                    'fat': product['fat_total_g'],
                    'carbohydrates': product['carbohydrates_total_g'],
                    'calories': product['calories']
                  }

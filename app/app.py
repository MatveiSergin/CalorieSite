import googletrans
from flask import Flask, render_template
from db import session, Product
from serializers import ProductsSerializer
from api import ProductsApi

app = Flask(__name__)

@app.route('/')
def calculate_calorie():
    return render_template('calculate_calorie.html')

@app.get('/api/products/<string:product_name>') #http://127.0.0.1:5000/api/products
def all_calorie(product_name):
    translator = googletrans.Translator()
    if translator.detect(product_name).lang == 'ru':
        en_product_name = translator.translate(product_name, src='ru', dest='en').text
    else:
        en_product_name = product_name
    api = ProductsApi()
    json = api.get_data(en_product_name)
    serializer = ProductsSerializer()
    data = serializer.decode(json)

    if data:
        response = serializer.encode(data)
        return response
    else:
        db_product = session.query(Product).filter(Product.name == product_name).all()
        if db_product:
            response = serializer.encode(db_product[0])
            return response
        return 'No product found'

if __name__ == '__main__':
    app.run(use_reloader=False)

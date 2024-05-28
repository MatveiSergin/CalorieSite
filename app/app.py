import googletrans
from flask import render_template
from app.db import session, Product
from app.serializers import ProductsSerializer
from app.api import ProductsApi
from flask import Flask

app = Flask(__name__)

@app.route('/')
def calculate_calorie():
    return render_template('calculate_calorie.html')

@app.get('/api/products/<string:product_name>') #http://127.0.0.1:5000/api/products
def all_calorie(product_name):
    translator = googletrans.Translator()
    source_lang = translator.detect(product_name).lang
    if source_lang != 'en':
        en_product_name = translator.translate(product_name, src=source_lang, dest='en').text
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


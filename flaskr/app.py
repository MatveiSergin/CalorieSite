import googletrans
from flask import render_template
from flaskr.db import session, Product
from flaskr.serializers import ProductsSerializer
from flaskr.api import ProductsApi
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)
@app.route('/') #http://127.0.0.1:5000
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


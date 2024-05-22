from flask import Flask, render_template
from db import session, Product
from serializers import ProductsSerializer
app = Flask(__name__)

@app.route('/')
def calculate_calorie():
    return render_template('calculate_calorie.html')

@app.route('/api/products') #http://127.0.0.1:5000/api/products
def all_calorie():
    products = session.query(Product).all()
    serializer = ProductsSerializer(products, many=True)
    return serializer.encode()

if __name__ == '__main__':
    app.run(use_reloader=False)

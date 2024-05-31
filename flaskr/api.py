import requests
import os
from flaskr.exceptions import ApiException
from dotenv import load_dotenv

load_dotenv()

class ProductsApi:
    api_url = os.getenv('APIURL')
    XApiKey = os.getenv('APIKEY')
    def get_data(self, product_name):
        self.product_name = product_name
        response = requests.get(self.api_url + product_name, headers={'X-Api-Key': self.XApiKey})
        if response.status_code != requests.codes.ok:
            raise ApiException(f"Error: {response.status_code}. {response.text}")

        return response.text

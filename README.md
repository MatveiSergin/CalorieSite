# Calorie Tracker Website
This is an application for calculating the daily calorie intake, as well as for analyzing the calorie content, amount of protein, fat and carbohydrates of dishes. The application is packaged in Docker containers, which makes it easy to deploy.

## Features
* Calculation of the daily calorie content.
* Counting the calories of the dish.
* Easy project deployment.
* Integration with Google Translate API.
* Integration with CalorieNinjas API for calorie information.

## Prerequisites
* Docker
* Docker Compose

## APIs
This project uses two external APIs:
1. **Google Translate API**: Used for translating food item names
2. **CalorieNinjas API**: Used for retrieving calorie information for food items. You can get your API key from CalorieNinjas (see https://calorieninjas.com/api).

## Installation
1. Clone the repository:

```
git clone https://github.com/MatveiSergin/CalorieSite.git
cd CalorieSite
```

2. Create an .env file in the root of the project and configure your environment variables (see Environment Variables).

3. Build and start the containers:

```
docker-compose up --build
```

4. The application should now be running at **'http://localhost:5001'**.

5. (Optional) Also at 'http://localhost:81 ' you can configure Nginx Proxy Manager to create your own domain and get HTTPS connections (see https://nginxproxymanager.com/guide /).



## Environment Variables
Create a .env file in the root of the project with the following variables:
```
DIALECT='postgresql'
USER_NAME='your_db_user'
PASSWORD='your_db_password'
HOST='localhost'
DATABASE='calories'
PORT='5432'
CHARSET='utf8'
APIKEY='your_api_key'
APIURL='https://api.calorieninjas.com/v1/nutrition?query='
```

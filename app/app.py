from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def calculate_calorie():
    return render_template('calculate_calorie.html')

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask
from flask_cors import CORS
from routes.cv_routes import cv_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(cv_bp, url_prefix="/api/cv")

@app.route("/")
def home():
    return {"status": "CV Analyzer API Running"}

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
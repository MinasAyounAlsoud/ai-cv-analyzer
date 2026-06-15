import os
from flask import Flask
from flask_cors import CORS
from routes.cv_routes import cv_bp

app = Flask(__name__)

CORS(app, resources={
    r"/api/*": {
        "origins": "https://cv-analyzer-app.onrender.com"
    }
})

app.register_blueprint(cv_bp, url_prefix="/api/cv")

@app.route("/")
def home():
    return {"status": "CV Analyzer API Running"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
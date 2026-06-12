from flask import Blueprint, request, jsonify
import json

from services.pdf_parser import extract_text_from_pdf
from services.ai_service import analyze_cv
from services.mongo_service import save_cv_result

cv_bp = Blueprint("cv_bp", __name__)

@cv_bp.route("/analyze", methods=["POST"])
def analyze_cv_route():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]

        text = extract_text_from_pdf(file)

        if not text:
            return jsonify({"error": "Could not extract text"}), 400

        ai_response = analyze_cv(text)

        print("RAW AI RESPONSE:", ai_response)

        # JSON parse
        try:
            parsed = json.loads(ai_response)
        except Exception:
            return jsonify({
                "error": "AI returned invalid JSON",
                "raw": ai_response
            }), 500

        
        # SAFE ATS SCORE CALCULATION
       
        skills = len(parsed.get("skills", []))
        education = len(parsed.get("education", []))
        projects = len(parsed.get("projects", []))

        ats_score = 50 + (skills * 2) + (education * 5) + (projects * 5)
        parsed["ats_score"] = min(ats_score, 95)

        # save to DB (optional)
        # saved_id = save_cv_result(parsed)
        # parsed["_id"] = str(saved_id)

        return jsonify(parsed)

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500
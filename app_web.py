"""
Flask API for Employee Promotion Prediction
Serves predictions through REST endpoints and static HTML interface
"""

from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd
import numpy as np
import os
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__, template_folder='templates', static_folder='static')

# Load the trained model and scaler
MODEL_PATH = 'models/xgboost_model_smote.pkl'
SCALER_PATH = 'models/scaler.pkl'

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    print("✓ Model and scaler loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None
    scaler = None

# Feature names expected by the model (in the correct order)
FEATURE_NAMES = [
    'department', 'region', 'education', 'gender', 'recruitment_channel',
    'no_of_trainings', 'age', 'previous_year_rating', 'length_of_service',
    'KPIs_met >80%', 'awards_won?', 'avg_training_score'
]

@app.route('/')
def index():
    """Serve the main HTML page"""
    return render_template('index.html')

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    API endpoint to make predictions
    Expects JSON with employee data
    """
    try:
        data = request.json
        
        # Extract features in the correct order matching FEATURE_NAMES
        input_features = [
            int(data.get('department', 0)),           # department
            int(data.get('region', 0)),                # region
            int(data.get('education', 0)),             # education
            int(data.get('gender', 0)),                # gender
            int(data.get('recruitment_channel', 0)),   # recruitment_channel
            int(data.get('no_of_trainings', 0)),       # no_of_trainings
            float(data.get('age', 0)),                 # age
            float(data.get('previous_year_rating', 0)), # previous_year_rating
            float(data.get('length_of_service', 0)),   # length_of_service
            int(data.get('kpis_met', 0)),              # KPIs_met >80%
            int(data.get('awards_won', 0)),            # awards_won?
            float(data.get('avg_training_score', 0))   # avg_training_score
        ]
        
        # Convert to DataFrame for scaling
        input_df = pd.DataFrame([input_features], columns=FEATURE_NAMES)
        
        # Scale the features
        scaled_features = scaler.transform(input_df)
        
        # Make prediction
        prediction = model.predict(scaled_features)[0]
        prediction_proba = model.predict_proba(scaled_features)[0]
        
        # Prepare response
        result = {
            'success': True,
            'prediction': int(prediction),
            'prediction_label': 'Promoted' if prediction == 1 else 'Not Promoted',
            'confidence': float(prediction_proba[prediction]) * 100,
            'probability_not_promoted': float(prediction_proba[0]) * 100,
            'probability_promoted': float(prediction_proba[1]) * 100
        }
        
        return jsonify(result)
    
    except Exception as e:
        print(f"Prediction Error: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/sample-data', methods=['GET'])
def get_sample_data():
    """Return sample employee data for reference"""
    sample = {
        'age': 35,
        'department': 2,
        'region': 1,
        'education': 1,
        'gender': 0,
        'recruitment_channel': 0,
        'previous_year_rating': 3.5,
        'length_of_service': 5,
        'kpis_met': 1,
        'awards_won': 0,
        'avg_training_score': 75,
        'no_of_trainings': 3
    }
    return jsonify(sample)

if __name__ == '__main__':
    print("🚀 Starting Employee Promotion Prediction Web App...")
    print("📊 Open http://localhost:5000 in your browser")
    app.run(debug=True, port=5000)

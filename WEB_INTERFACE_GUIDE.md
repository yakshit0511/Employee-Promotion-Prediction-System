# Flask Web Interface - Setup Guide

## Quick Start

### 1. Install Flask
```bash
pip install flask
```

### 2. Run the Web Application
```bash
python app_web.py
```

### 3. Open in Browser
Navigate to: **http://localhost:5000**

---

## Features

✅ **User-Friendly Form Interface**
- Input employee data easily
- All required fields clearly labeled
- Sample data loader for quick testing

✅ **Real-time Predictions**
- Submit form to get instant predictions
- Confidence scores displayed
- Probability analysis included

✅ **Beautiful UI/UX**
- Responsive design (works on mobile, tablet, desktop)
- Modern styling with gradients
- Clear visual feedback
- Professional color scheme

✅ **Detailed Results**
- Prediction status (Promoted / Not Promoted)
- Confidence percentage
- Individual probability bars
- Interpretation text

---

## Files Structure

```
├── app_web.py                  # Flask backend server
├── templates/
│   └── index.html              # Main web interface
├── static/
│   ├── style.css               # Styling
│   └── script.js               # Frontend logic
```

---

## API Endpoints

### 1. GET `/`
Returns the HTML interface

### 2. POST `/api/predict`
**Request:**
```json
{
    "age": 35,
    "department": 1,
    "previous_year_rating": 3.5,
    "length_of_service": 5,
    "kpis_met": 1,
    "awards_won": 0,
    "avg_training_score": 75,
    "no_of_trainings": 3
}
```

**Response:**
```json
{
    "success": true,
    "prediction": 1,
    "prediction_label": "Promoted",
    "confidence": 94.23,
    "probability_not_promoted": 5.77,
    "probability_promoted": 94.23
}
```

### 3. GET `/api/sample-data`
Returns sample employee data for testing

---

## Field Descriptions

| Field | Type | Range | Description |
|-------|------|-------|-------------|
| Age | Number | 18-70 | Employee's current age |
| Department | Select | 1-5 | Department ID |
| Previous Year Rating | Number | 1-5 | Performance rating from previous year |
| Length of Service | Number | 0-50 | Years employed at company |
| KPIs Met >80% | Select | 0-1 | Did employee meet KPIs (0=No, 1=Yes) |
| Awards Won | Number | 0-10 | Number of awards received |
| Avg Training Score | Number | 0-100 | Average training score |
| No. of Trainings | Number | 0-20 | Number of trainings completed |

---

## Customization Options

### Change Port
Edit `app_web.py` line:
```python
app.run(debug=True, port=5000)  # Change 5000 to your desired port
```

### Deploy to Production
Replace `debug=True` with `debug=False` and use a WSGI server like Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 app_web.py
```

### Modify Styling
Edit `static/style.css` to customize colors, fonts, and layout

### Update Feature Names
If your model uses different feature names, update the `FEATURE_NAMES` list in `app_web.py`

---

## Troubleshooting

**Port Already in Use:**
```bash
python app_web.py  # Change port number in the script
```

**Model Not Found:**
Ensure `models/xgboost_model_smote.pkl` and `models/scaler.pkl` exist

**CORS Issues (if accessing from different domain):**
```python
from flask_cors import CORS
CORS(app)
```

---

## Browser Compatibility

✅ Chrome/Edge (Latest)
✅ Firefox (Latest)
✅ Safari (Latest)
✅ Mobile browsers

---

Enjoy! 🚀

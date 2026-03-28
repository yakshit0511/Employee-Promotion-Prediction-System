# 🎯 Employee Promotion Prediction System

## 📄 **Project Overview**

This project focuses on building a **Machine Learning Model** to predict whether employees are eligible for a promotion based on their performance, achievements, and other attributes. The solution is designed to help HR departments make data-driven decisions while ensuring fairness and efficiency.

---

## 🔍 **Objectives**

- Develop a robust ML model to predict employee promotions.
- Handle class imbalance to ensure accurate predictions for underrepresented groups.
- Provide a detailed **EDA (Exploratory Data Analysis)** to understand key patterns and relationships in the data.
- Train models with optimized features for better interpretability and performance.

---

## 🛠️ **Technologies and Tools Used**

- **Programming Language**: Python 🐍
- **Libraries**: 
  - Data Processing: `pandas`, `numpy`
  - Visualization: `matplotlib`, `seaborn`
  - Machine Learning: `scikit-learn`, `xgboost`
  - Oversampling: `imbalanced-learn`
  - Model Persistence: `joblib`

---

## 📂 **Project Structure**

```
Employee-Promotion-Prediction-System/
├── App/                      # Streamlit web application
│   └── app.py                # Main web app interface
├── Data/                     # Contains datasets
│   ├── HRData.csv            # Raw dataset
│   ├── HRData_cleaned.csv    # Cleaned and preprocessed dataset
│   ├── hrdatatest.csv        # Test dataset
│   └── predictions_hrdatatest.csv # Predictions output
├── models/                   # Trained models and scalers
│   ├── model.py              # Model training script
│   ├── xgboost_model_smote.pkl # Trained XGBoost model with SMOTE
│   └── scaler.pkl            # Feature scaler for preprocessing
├── scripts/                  # Scripts for each step of the pipeline
│   ├── data_preprocessing.py # Data preprocessing and cleaning
│   ├── Exploratory_Data_Analysis.py # Exploratory Data Analysis with visualizations
│   └── predict.py            # Predictions on new data
├── static/                   # Static files for Flask web app
│   ├── style.css             # CSS styling for web interface
│   └── script.js             # JavaScript for form handling and API calls
├── templates/                # HTML templates for Flask app
│   └── index.html            # Main employee prediction form interface
├── visualizations/           # EDA visualizations
├── App/                      # Streamlit web application
│   └── app.py                # Streamlit app interface (alternative to Flask)
├── app_web.py                # Flask web application backend
├── README.md                 # Project documentation
└── requirements.txt          # Python dependencies
```

---

## 🚀 **Key Features**

### 🔹 **1. Exploratory Data Analysis (EDA)**
- **Visualizations included**:
  - Distribution of promotions.
  - Correlation matrix.
  - Boxplots (e.g., age vs promotion).
  - Histograms (e.g., training scores).
  - Promotion breakdown by department.
- **Insights**:
  - `avg_training_score`, `KPIs_met >80%`, and `previous_year_rating` are highly correlated with promotions.

### 🔹 **2. Data Preprocessing**
- Handled missing values using `SimpleImputer`.
- Converted categorical variables to numerical using `LabelEncoder`.
- Standardized features using `StandardScaler`.

### 🔹 **3. Model Training**
- Used **XGBoost** for classification.
- Addressed class imbalance with **SMOTE**.
- Trained the model with the full feature set and improved its precision and recall by balancing classes using **SMOTE**:


### 🔹 **4. Predictions**
- Deployed a script to predict promotions on new datasets.
- Outputs predictions in `predictions_hrdatatest.csv`.

---

## 📊 **Model Metrics**

### **Model with Full Features**
  - **Accuracy:** 97%.
  - **Class `1` (Promoted):**
    - **Recall:** 94%.
    - **Precision:** 99%.
    - **F1-Score:** 96%.
---

## ⚙️ **How to Run the Project**

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Setup Steps

1. **Clone and navigate to the project directory:**
   ```bash
   cd Employee-Promotion-Prediction-System
   ```

2. **Create and activate a virtual environment:**
   ```bash
   # Create virtual environment
   python -m venv venv
   
   # Activate it (Windows)
   .\venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the pipeline:**
   ```bash
   # Step 1: Preprocess the data
   python scripts/data_preprocessing.py
   
   # Step 2: Perform Exploratory Data Analysis
   python scripts/Exploratory_Data_Analysis.py
   
   # Step 3: Train the model
   python models/model.py
   
   # Step 4: Make predictions on test data
   python scripts/predict.py
   ```

5. **Launch the Flask Web Interface (optional - Interactive Prediction UI):**
   ```bash
   python app_web.py
   ```
   Then open your browser and navigate to: `http://127.0.0.1:5000`

---

## 🌐 **How to Run the Flask Web Interface**

The Flask web interface provides an interactive, user-friendly way to predict employee promotions in real-time.

### Quick Start

1. **Ensure the model is trained:**
   - First, run the model training script if you haven't already:
   ```bash
   python models/model.py
   ```
   - This creates `models/xgboost_model_smote.pkl` and `models/scaler.pkl`

2. **Start the Flask server:**
   ```bash
   python app_web.py
   ```
   - You should see output like:
   ```
   ✓ Model and scaler loaded successfully!
   🚀 Starting Employee Promotion Prediction Web App...
   📊 Open http://localhost:5000 in your browser
   * Running on http://127.0.0.1:5000
   ```

3. **Open the web interface:**
   - Open your web browser and go to: `http://127.0.0.1:5000`
   - You'll see a clean form to input employee data

### Form Fields Explained

The web interface contains 8 input fields for employee data (hidden fields are auto-filled):

| **Field Name** | **Type** | **Description** | **Example** |
|---|---|---|---|
| **Age** | Number | Employee's current age | 35 |
| **Department** | Dropdown | Department the employee works in | Sales/Marketing/HR/Operations/Technology |
| **Previous Year Rating** | Dropdown | Performance rating from last year (1-5 scale) | 4 |
| **Length of Service** | Number | Years working at the company | 5 |
| **KPIs Met >80%?** | Yes/No | Did the employee meet KPIs above 80%? | Yes/No |
| **Awards Won** | Number | Number of awards/recognition received | 2 |
| **Avg Training Score** | Number | Average score from training programs (0-100) | 85 |
| **Number of Trainings** | Number | Total trainings completed | 4 |

**Hidden Fields** (auto-filled with default values):
- Region, Education, Gender, Recruitment Channel (all set to 0)

### How to Make a Prediction

1. **Fill in the employee data:**
   - Enter or select values for each visible field
   - The form has placeholder text showing example values (e.g., "Enter age (e.g., 35)")

2. **Click "Predict Promotion":**
   - The form data is sent to the backend API
   - The model processes the data and returns a prediction

3. **View the results:**
   - **Prediction**: "Promoted" or "Not Promoted"
   - **Confidence**: Visual bar chart showing confidence percentage
   - **Probabilities**: Detailed breakdown of promotion vs. not promoted probabilities

### Example Usage

**Scenario:** Predicting for an experienced employee with strong performance
```
Age: 42
Department: Technology
Previous Year Rating: 5 (Excellent)
Length of Service: 8 years
KPIs Met >80%: Yes
Awards Won: 3
Avg Training Score: 92
Number of Trainings: 6
```

**Expected Result:** 
- Prediction: ✓ **Promoted** 
- Confidence: ~95-99%
- Reason: High performance metrics, strong training scores, awards, and consistent KPI achievement

### Features of the Web Interface

- **🎨 Clean, Responsive Design**: Works on desktop, tablet, and mobile devices
- **⚡ Real-time Predictions**: Get results instantly
- **📊 Visual Confidence Bars**: Intuitive representation of prediction confidence
- **🔄 Sample Data Button**: Load pre-filled sample data to test the model
- **🧹 Clear Button**: Reset all fields to start fresh
- **🎯 Keyboard Shortcut**: Press `Ctrl+Enter` to submit the form

### API Endpoint (for advanced users)

If you want to integrate with other applications, the Flask backend provides a REST API:

**Endpoint:** `POST /api/predict`

**Request Format:**
```json
{
  "age": 35,
  "department": 1,
  "previous_year_rating": 4,
  "length_of_service": 5,
  "KPIs_met >80%": 1,
  "awards_won?": 2,
  "avg_training_score": 85,
  "no_of_trainings": 4,
  "region": 0,
  "education": 0,
  "gender": 0,
  "recruitment_channel": 0
}
```

**Response Format:**
```json
{
  "prediction": 1,
  "prediction_label": "Promoted",
  "confidence": "94.85%",
  "probability_not_promoted": "5.15%",
  "probability_promoted": "94.85%",
  "success": true
}
```

### Troubleshooting Flask Issues

**Q: Port 5000 already in use**
```bash
# Kill the process using port 5000, or use a different port:
# (Modify app_web.py line: app.run(port=5001, debug=True))
```

**Q: Model files not found**
- Ensure you've run `python models/model.py` first
- Check that `models/xgboost_model_smote.pkl` and `models/scaler.pkl` exist

**Q: Form submission returns error**
- Check Flask server console for error messages
- Verify all form fields are filled in correctly
- Try the "Sample" button to test with pre-filled data

---

5. **Launch the Streamlit application (optional):**
   ```bash
   streamlit run App/app.py
   ```

---

## 📦 **Dependencies**

All required libraries are listed in `requirements.txt`. Key dependencies include:

- **Data Processing**: `pandas`, `numpy`
- **Visualization**: `matplotlib`, `seaborn`, `altair`
- **Machine Learning**: `scikit-learn`, `xgboost`
- **Class Imbalance Handling**: `imbalanced-learn`
- **Model Persistence**: `joblib`
- **Web Frameworks**: 
  - `flask` (REST API backend for interactive predictions)
  - `streamlit` (alternative web app interface)

Install all dependencies with:
```bash
pip install -r requirements.txt
```

---

## 📥 **Outputs**

- **Cleaned Dataset:** `Data/HRData_cleaned.csv` - Preprocessed data ready for model training
- **Predictions:** `Data/predictions_hrdatatest.csv` - Model predictions on test data
- **Trained Model:** `models/xgboost_model_smote.pkl` - Saved XGBoost model
- **Scaler:** `models/scaler.pkl` - Feature scaler for inference
- **Visualizations:** `visualizations/` - All EDA plots and charts (30+ visualizations)

---



## 🔧 **Troubleshooting**

### ModuleNotFoundError: No module named 'xgboost'
If you encounter this error, try reinstalling the package:
```bash
pip install xgboost --retries 10 --timeout 3600
```

### Virtual environment not activating
Ensure you're using the correct activation command for your OS:
- **Windows**: `.\venv\Scripts\activate`
- **macOS/Linux**: `source venv/bin/activate`

### Streamlit app not starting
Make sure streamlit is installed:
```bash
pip install streamlit
```

### Flask server not starting or "Address already in use"
If you encounter issues starting the Flask server:
```bash
# Try using a different port by editing app_web.py:
# Change: app.run(port=5000, debug=True)
# To: app.run(port=5001, debug=True)

# Or kill the process using port 5000:
# Note: Find the process using port 5000 and stop it
```

### Form submission returns "404 - Not Found"
- Ensure the Flask server is running (`python app_web.py`)
- Check that the browser is accessing `http://127.0.0.1:5000` (not `localhost`)
- Look for error messages in the Flask server terminal

### Predictions are abnormal or confidence is very low
- Verify that the trained model files exist: `models/xgboost_model_smote.pkl`
- Try loading sample data using the "Sample" button to test with known values
- Check that all form fields are properly filled with valid values

---
For questions or feedback, please reach out to me at - [LinkedIn Profile](www.linkedin.com/in/yakshit-koshiya-b49a11296).

---

### ✨ Thank you for exploring this project! 😊

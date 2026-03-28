/**
 * Employee Promotion Prediction System - JavaScript
 * Handles form submission and prediction API calls
 */

// Get DOM elements
const predictionForm = document.getElementById('predictionForm');
const resultsContainer = document.getElementById('resultsContainer');
const loadingSpinner = document.getElementById('loadingSpinner');

// Form submission handler
predictionForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Show loading spinner
    loadingSpinner.style.display = 'flex';
    resultsContainer.innerHTML = '';

    try {
        // Collect form data
        const formData = new FormData(predictionForm);
        const data = {
            age: formData.get('age'),
            department: formData.get('department'),
            previous_year_rating: formData.get('previous_year_rating'),
            length_of_service: formData.get('length_of_service'),
            kpis_met: formData.get('kpis_met'),
            awards_won: formData.get('awards_won'),
            avg_training_score: formData.get('avg_training_score'),
            no_of_trainings: formData.get('no_of_trainings')
        };

        // Make API call
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Hide loading spinner
        loadingSpinner.style.display = 'none';

        if (result.success) {
            displayResults(result);
        } else {
            displayError(result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        loadingSpinner.style.display = 'none';
        displayError('Failed to get prediction. Please try again.');
    }
});

/**
 * Display prediction results
 */
function displayResults(result) {
    const isPromoted = result.prediction === 1;
    const statusClass = isPromoted ? 'status-promoted' : 'status-not-promoted';
    const statusIcon = isPromoted ? '✅' : '❌';
    const confidenceClass = isPromoted ? 'promoted' : 'not-promoted';

    const resultsHTML = `
        <div class="prediction-result">
            <!-- Result Header -->
            <div class="result-header">
                <div class="result-icon">${statusIcon}</div>
                <div class="result-status">
                    <h3 class="${statusClass}">${result.prediction_label}</h3>
                    <p>Based on the employee data provided</p>
                </div>
            </div>

            <!-- Confidence Section -->
            <div class="confidence-section">
                <h4>📊 Prediction Confidence</h4>
                
                <!-- Overall Prediction Confidence -->
                <div class="confidence-item">
                    <div class="confidence-label">
                        <span>${result.prediction_label}</span>
                        <span>${result.confidence.toFixed(1)}%</span>
                    </div>
                    <div class="confidence-bar">
                        <div class="confidence-fill ${confidenceClass}" 
                             style="width: ${result.confidence}%">
                        </div>
                    </div>
                </div>

                <!-- Promoted Probability -->
                <div class="confidence-item">
                    <div class="confidence-label">
                        <span>Promotion Probability</span>
                        <span>${result.probability_promoted.toFixed(1)}%</span>
                    </div>
                    <div class="confidence-bar">
                        <div class="confidence-fill promoted" 
                             style="width: ${result.probability_promoted}%">
                        </div>
                    </div>
                </div>

                <!-- Not Promoted Probability -->
                <div class="confidence-item">
                    <div class="confidence-label">
                        <span>Not Promoted Probability</span>
                        <span>${result.probability_not_promoted.toFixed(1)}%</span>
                    </div>
                    <div class="confidence-bar">
                        <div class="confidence-fill not-promoted" 
                             style="width: ${result.probability_not_promoted}%">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Interpretation -->
            <div class="interpretation">
                <h4>💡 Interpretation</h4>
                <p>${getInterpretation(result)}</p>
            </div>
        </div>
    `;

    resultsContainer.innerHTML += resultsHTML;
    scrollToResults();
}

/**
 * Get interpretation text based on prediction and confidence
 */
function getInterpretation(result) {
    const confidence = result.confidence;
    
    if (result.prediction === 1) {
        if (confidence >= 95) {
            return `<strong>Strong Promotion Candidate:</strong> This employee shows excellent potential for promotion with very high confidence (${confidence.toFixed(1)}%). They demonstrate consistent high performance and meet key promotion criteria.`;
        } else if (confidence >= 80) {
            return `<strong>Good Promotion Candidate:</strong> This employee is likely ready for promotion (${confidence.toFixed(1)}% confidence). They meet most key performance indicators and show strong career development potential.`;
        } else {
            return `<strong>Potential for Promotion:</strong> This employee may be ready for promotion (${confidence.toFixed(1)}% confidence), though they might benefit from addressing a few development areas before promotion.`;
        }
    } else {
        if (confidence >= 95) {
            return `<strong>Not Ready for Promotion:</strong> Based on the analysis, this employee is not currently ready for promotion (${confidence.toFixed(1)}% confidence). Focus on development opportunities in key areas before reconsidering.`;
        } else if (confidence >= 80) {
            return `<strong>Unlikely for Current Promotion:</strong> While there's potential, this employee is likely not ready for immediate promotion (${confidence.toFixed(1)}% confidence). Additional training and experience would be beneficial.`;
        } else {
            return `<strong>Needs Development:</strong> This employee requires further development before promotion consideration (${confidence.toFixed(1)}% confidence). Create a clear development plan.`;
        }
    }
}

/**
 * Display error message
 */
function displayError(errorMessage) {
    const errorHTML = `
        <div class="error-message">
            <strong>❌ Error:</strong> ${errorMessage}
        </div>
    `;
    resultsContainer.innerHTML = errorHTML;
    scrollToResults();
}

/**
 * Load sample data into the form
 */
async function loadSampleData() {
    try {
        const response = await fetch('/api/sample-data');
        if (!response.ok) {
            throw new Error('Failed to load sample data');
        }

        const sample = await response.json();

        // Populate form fields
        document.getElementById('age').value = sample.age;
        document.getElementById('department').value = sample.department;
        document.getElementById('previous_year_rating').value = sample.previous_year_rating;
        document.getElementById('length_of_service').value = sample.length_of_service;
        document.getElementById('kpis_met').value = sample.kpis_met;
        document.getElementById('awards_won').value = sample.awards_won;
        document.getElementById('avg_training_score').value = sample.avg_training_score;
        document.getElementById('no_of_trainings').value = sample.no_of_trainings;

        // Scroll to form
        predictionForm.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading sample data:', error);
        alert('Failed to load sample data');
    }
}

/**
 * Scroll to results section
 */
function scrollToResults() {
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Add keyboard shortcut to submit form (Ctrl+Enter)
document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        predictionForm.dispatchEvent(new Event('submit'));
    }
});

console.log('✓ Employee Promotion Prediction System loaded successfully!');
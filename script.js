// Carbon emission factors (kg CO2 per unit)
const EMISSION_FACTORS = {
    transportation: 0.2, // kg CO2 per km
    electricity: 0.4,    // kg CO2 per kWh
    flights: 90         // kg CO2 per hour
};

// DOM Elements
const transportationInput = document.getElementById('transportation');
const electricityInput = document.getElementById('electricity');
const flightsInput = document.getElementById('flights');
const calculateBtn = document.getElementById('calculate-btn');
const offsetBtn = document.getElementById('offset-btn');
const totalFootprintDisplay = document.getElementById('total-footprint');
const resultsSection = document.getElementById('results');

// Initialize results section as hidden
resultsSection.style.display = 'none';

// Calculate carbon footprint
function calculateFootprint() {
    const transportation = parseFloat(transportationInput.value) || 0;
    const electricity = parseFloat(electricityInput.value) || 0;
    const flights = parseFloat(flightsInput.value) || 0;

    const transportationEmissions = transportation * EMISSION_FACTORS.transportation;
    const electricityEmissions = electricity * 12 * EMISSION_FACTORS.electricity; // Multiply by 12 for yearly
    const flightsEmissions = flights * EMISSION_FACTORS.flights;

    const totalEmissions = transportationEmissions + electricityEmissions + flightsEmissions;
    
    return Math.round(totalEmissions);
}

// Update the UI with the calculated footprint
function updateFootprintDisplay(footprint) {
    totalFootprintDisplay.textContent = footprint.toLocaleString();
    resultsSection.style.display = 'block';
}

// Handle calculate button click
calculateBtn.addEventListener('click', () => {
    const footprint = calculateFootprint();
    updateFootprintDisplay(footprint);
});

// Handle offset button click
offsetBtn.addEventListener('click', () => {
    const footprint = calculateFootprint();
    const offsetCost = (footprint * 0.02).toFixed(2); // Assuming $0.02 per kg CO2
    
    // In a real application, this would redirect to a payment gateway
    alert(`Your carbon offset cost would be $${offsetCost}. This would be processed through our secure payment gateway.`);
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add input validation
[transportationInput, electricityInput, flightsInput].forEach(input => {
    input.addEventListener('input', () => {
        if (input.value < 0) {
            input.value = 0;
        }
    });
});
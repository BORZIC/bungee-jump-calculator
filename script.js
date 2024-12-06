document.getElementById('settings-btn').addEventListener('click', function () {
    const menu = document.getElementById('settings-menu');
    menu.classList.toggle('hidden');
});

document.getElementById('calculate-btn').addEventListener('click', function () {
    const mass = parseFloat(document.getElementById('mass').value);
    const height = parseFloat(document.getElementById('height').value);
    const g = parseFloat(document.getElementById('gravitational-constant').value);
    const elasticity = parseFloat(document.getElementById('elasticity').value);

    // Calculations
    const addedString = height * elasticity; // Placeholder formula
    const cordStretched = height * 0.8; // Placeholder formula
    const endingHeight = height - cordStretched; // Placeholder formula

    // Update results
    document.getElementById('string-needed').textContent = addedString.toFixed(2);
    document.getElementById('cord-stretched').textContent = cordStretched.toFixed(2);
    document.getElementById('ending-height').textContent = endingHeight.toFixed(2);

    // Update chart
    updateChart([mass * g * height, 0, elasticity * cordStretched, mass * g * height]);
});

let chart;

function updateChart(data) {
    const ctx = document.getElementById('energy-chart').getContext('2d');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Gravitational Energy', 'Kinetic Energy', 'Elastic Energy', 'Total Energy'],
            datasets: [{
                label: 'Energy (J)',
                data: data,
                backgroundColor: ['#007BFF', '#FFC107', '#28A745', '#17A2B8']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

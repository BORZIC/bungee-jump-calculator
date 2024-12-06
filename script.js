document.getElementById('settings-btn').addEventListener('click', function () {
    const menu = document.getElementById('settings-menu');
    menu.classList.toggle('hidden');
});

document.getElementById('calculate-btn').addEventListener('click', function () {
    // Retrieve inputs
    const mass = parseFloat(document.getElementById('mass').value);
    const jumperHeight = parseFloat(document.getElementById('jumper-height').value);
    const startingHeight = parseFloat(document.getElementById('starting-height').value);
    const bungeeLength = parseFloat(document.getElementById('bungee-length').value);
    const bungeeStrength = parseFloat(document.getElementById('bungee-strength').value);
    const buffer = parseFloat(document.getElementById('buffer').value);
    const noGoZone = parseFloat(document.getElementById('no-go-zone').value);

    const g = 9.81; // Gravitational constant
    const totalEnergy = mass * g * startingHeight;

    // Calculations
    const addedString = Math.max(0, startingHeight - bungeeLength - buffer);
    const cordStretched = startingHeight - noGoZone - jumperHeight;
    const endingHeight = noGoZone;

    const positions = [
        { name: 'Initial', eg: totalEnergy, ek: 0, ee: 0 },
        { name: '3/4 Height', eg: totalEnergy * 0.75, ek: totalEnergy * 0.25, ee: 0 },
        { name: '1/4 Height', eg: totalEnergy * 0.25, ek: totalEnergy * 0.25, ee: totalEnergy * 0.5 },
        { name: 'Final', eg: 0, ek: 0, ee: totalEnergy },
    ];

    // Update results
    document.getElementById('string-needed').textContent = addedString.toFixed(2);
    document.getElementById('cord-stretched').textContent = cordStretched.toFixed(2);
    document.getElementById('ending-height').textContent = endingHeight.toFixed(2);

    // Update chart
    const ctx = document.getElementById('energy-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: positions.map(pos => pos.name),
            datasets: [
                { label: 'Gravitational Energy', data: positions.map(pos => pos.eg), backgroundColor: '#007BFF' },
                { label: 'Kinetic Energy', data: positions.map(pos => pos.ek), backgroundColor: '#FFC107' },
                { label: 'Elastic Energy', data: positions.map(pos => pos.ee), backgroundColor: '#28A745' },
            ],
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } },
            plugins: { legend: { position: 'top' } },
        },
    });
});

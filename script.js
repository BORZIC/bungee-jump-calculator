// Default parameters (admin panel values)
let startingHeight = 50; // meters
let unstretchedCord = 20; // meters
let cordStrength = 1000; // Newtons
let bufferZone = 5; // meters
let noGoZone = 10; // meters

function updateAdminParameters() {
    startingHeight = parseFloat(document.getElementById('startingHeight').value);
    unstretchedCord = parseFloat(document.getElementById('unstretchedCord').value);
    cordStrength = parseFloat(document.getElementById('cordStrength').value);
    bufferZone = parseFloat(document.getElementById('bufferZone').value);
    noGoZone = parseFloat(document.getElementById('noGoZone').value);

    alert('Admin parameters updated!');
}

function calculateJump() {
    const mass = parseFloat(document.getElementById('mass').value);
    const height = parseFloat(document.getElementById('height').value);

    if (isNaN(mass) || isNaN(height)) {
        alert('Please enter valid numbers for mass and height');
        return;
    }

    // Calculate the extra string needed based on simple physics (Hooke's law)
    const gravitationalForce = mass * 9.81; // F = m * g
    const stretchFactor = cordStrength / gravitationalForce; // Assuming ideal cord strength

    const stretchedCord = unstretchedCord + stretchFactor;
    const stringLength = unstretchedCord + bufferZone;

    const endingHeight = startingHeight - stretchedCord;

    // Display results
    document.getElementById('stringLength').textContent = `String Length Needed: ${stringLength} meters`;
    document.getElementById('stretchedCord').textContent = `Bungee Cord Stretched: ${stretchedCord} meters`;
    document.getElementById('endingHeight').textContent = `Ending Height: ${endingHeight} meters`;

    document.getElementById('results').style.display = 'block';
}

function calculate() {
    // Get input values
    const mass = parseFloat(document.getElementById('mass').value);
    const startHeight = parseFloat(document.getElementById('startHeight').value);
    const unstretchedLength = parseFloat(document.getElementById('unstretchedLength').value);
    const springConstant = parseFloat(document.getElementById('springConstant').value);
    const jumperHeight = parseFloat(document.getElementById('jumperHeight').value);
    const bufferZone = parseFloat(document.getElementById('bufferZone').value);
    const noGoZone = parseFloat(document.getElementById('noGoZone').value);

    // Calculate Elastic Energy
    const g = 9.81; // Gravitational acceleration in m/s²
    const elasticEnergy = mass * g * jumperHeight; // Energy from gravity (Joules)

    // Calculate the Stretch of the Bungee Cord (in meters)
    const stretch = Math.sqrt((2 * elasticEnergy) / springConstant); // Stretch using elastic energy

    // Calculate Ending Height
    const totalCordLength = unstretchedLength + stretch;
    const endingHeight = startHeight - totalCordLength + bufferZone + noGoZone;

    // Calculate Added String Distance
    const addedStringDistance = startHeight - unstretchedLength - stretch - jumperHeight - endingHeight;

    // Output results
    document.getElementById('addedStringDistance').textContent = addedStringDistance.toFixed(2) + " meters";
    document.getElementById('stretch').textContent = stretch.toFixed(2) + " meters";
    document.getElementById('endingHeight').textContent = endingHeight.toFixed(2) + " meters";
}

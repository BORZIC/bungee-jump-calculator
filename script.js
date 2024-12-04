function calculate() {
    // Get input values
    const mass = parseFloat(document.getElementById('mass').value);
    const startHeight = parseFloat(document.getElementById('startHeight').value);
    const unstretchedLength = parseFloat(document.getElementById('unstretchedLength').value);
    const springConstant = parseFloat(document.getElementById('springConstant').value);
    const jumperHeight = parseFloat(document.getElementById('jumperHeight').value);
    const bufferZone = parseFloat(document.getElementById('bufferZone').value);
    const noGoZone = parseFloat(document.getElementById('noGoZone').value);

    // Constants
    const g = 9.81; // Gravitational acceleration in m/s²

    // Calculate Elastic Energy (Joules)
    const elasticEnergy = mass * g * jumperHeight;

    // Calculate the Stretch of the Bungee Cord (in meters)
    const stretch = Math.sqrt((2 * elasticEnergy) / springConstant);

    // Calculate Ending Height (m)
    const totalCordLength = unstretchedLength + stretch;
    const endingHeight = startHeight - totalCordLength + bufferZone + noGoZone;

    // Calculate Added String Distance (m)
    const addedStringDistance = startHeight - unstretchedLength - stretch - jumperHeight - endingHeight;

    // Output results
    document.getElementById('addedStringDistance').textContent = addedStringDistance.toFixed(2) + " meters";
    document.getElementById('stretch').textContent = stretch.toFixed(2) + " meters";
    document.getElementById('endingHeight').textContent = endingHeight.toFixed(2) + " meters";
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

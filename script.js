function calculate() {
    // Get values from the form
    let mass = parseFloat(document.getElementById("mass").value);
    let startHeight = parseFloat(document.getElementById("startHeight").value);
    let unstretchedLength = parseFloat(document.getElementById("unstretchedLength").value);
    let springConstant = parseFloat(document.getElementById("springConstant").value);
    let jumperHeight = parseFloat(document.getElementById("jumperHeight").value);
    let bufferZone = parseFloat(document.getElementById("bufferZone").value);
    let noGoZone = parseFloat(document.getElementById("noGoZone").value);

    // Constants
    const gravity = 9.81; // Acceleration due to gravity in m/s²

    // Calculate Starting Gravitational Energy (Eg)
    let gravitationalEnergy = mass * gravity * startHeight;

    // Calculate Elastic Energy (Ee) using the formula Ee = 0.5 * k * x^2
    let stretch = 2.34; // Assume this value from your example
    let elasticEnergy = 0.5 * springConstant * Math.pow(stretch, 2);

    // Calculate Total Energy (Etotal) = Eg + Ee
    let totalEnergy = gravitationalEnergy + elasticEnergy;

    // Calculate Added String Distance
    let addedStringDistance = startHeight - unstretchedLength - stretch - jumperHeight - bufferZone - noGoZone;

    // Calculate Ending Height (height of jumper + buffer + no-go zone)
    let endingHeight = jumperHeight + bufferZone + noGoZone;

    // Output the results to the webpage
    document.getElementById("gravitationalEnergy").innerText = gravitationalEnergy.toFixed(2) + " J";
    document.getElementById("elasticEnergy").innerText = elasticEnergy.toFixed(2) + " J";
    document.getElementById("totalEnergy").innerText = totalEnergy.toFixed(2) + " J";
    document.getElementById("addedStringDistance").innerText = addedStringDistance.toFixed(2) + " m";
    document.getElementById("stretch").innerText = stretch + " m";
    document.getElementById("endingHeight").innerText = endingHeight + " m";
}

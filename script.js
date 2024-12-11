document.addEventListener('DOMContentLoaded', () => {
    // Initialize feather icons
    feather.replace();

    // Settings Toggle
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.getElementById('closeSettings');

    // Open the settings modal when clicking the settings button
    settingsToggle.addEventListener('click', () => {
        settingsModal.classList.toggle('hidden');
        loadSettings();  // Load the saved settings when modal is opened
    });

    // Close the settings modal when clicking the close button
    closeSettings.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
    });

    const calculateBtn = document.getElementById('calculateBtn');
    calculateBtn.addEventListener('click', calculate);

    // Toggle conversion section visibility
    const toggleConversion = document.getElementById('toggleConversion');
    const conversionContent = document.getElementById('conversionContent');
    toggleConversion.addEventListener('click', () => {
        if (conversionContent.classList.contains('hidden')) {
            conversionContent.classList.remove('hidden');
            toggleConversion.innerHTML = 'Unit Conversion ▲';
        } else {
            conversionContent.classList.add('hidden');
            toggleConversion.innerHTML = 'Unit Conversion ▼';
        }
    });

    const convertBtn = document.getElementById('convertBtn');
    convertBtn.addEventListener('click', convertUnits);

    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    saveSettingsBtn.addEventListener('click', saveSettings);

    // Save the settings to localStorage
    function saveSettings() {
        const settings = {
            unstretchedLength: parseFloat(document.getElementById('unstretchedLength').value),
            startingHeight: parseFloat(document.getElementById('startingHeight').value),
            strength: parseFloat(document.getElementById('strength').value),
            buffer: parseFloat(document.getElementById('buffer').value),
            noGoZone: parseFloat(document.getElementById('noGoZone').value),
        };
        localStorage.setItem('bungeeSettings', JSON.stringify(settings));
        alert('Settings Saved');
    }

    // Load settings from localStorage if available
    function loadSettings() {
        const savedSettings = JSON.parse(localStorage.getItem('bungeeSettings'));
        if (savedSettings) {
            document.getElementById('unstretchedLength').value = savedSettings.unstretchedLength || '';
            document.getElementById('startingHeight').value = savedSettings.startingHeight || '';
            document.getElementById('strength').value = savedSettings.strength || '';
            document.getElementById('buffer').value = savedSettings.buffer || '';
            document.getElementById('noGoZone').value = savedSettings.noGoZone || '';
        }
    }

    function calculate() {
        // Default values for advanced settings if not provided
        const defaultSettings = {
            unstretchedLength: 10,  // Default 10m cord
            jumperHeight: 1.7,      // Default average human height
            strength: 100,          // Default cord strength
            buffer: 1,              // Default 1m buffer
            noGoZone: 1             // Default 1m no-go zone
        };

        // Gather input values
        const mass = parseFloat(document.getElementById('mass').value);
        const jumperHeight = parseFloat(document.getElementById('jumperHeight').value);
        
        // Get advanced settings or use defaults
        const unstretchedLength = parseFloat(document.getElementById('unstretchedLength').value) || defaultSettings.unstretchedLength;
        const startingHeight = parseFloat(document.getElementById('startingHeight').value) || defaultSettings.jumperHeight;
        const strength = parseFloat(document.getElementById('strength').value) || defaultSettings.strength;
        const buffer = parseFloat(document.getElementById('buffer').value) || defaultSettings.buffer;
        const noGoZone = parseFloat(document.getElementById('noGoZone').value) || defaultSettings.noGoZone;

        // Validate main inputs
        if (isNaN(mass) || isNaN(jumperHeight)) {
            alert('Please fill in your weight and height');
            return;
        }

        // Existing calculation logic remains the same as in previous implementation
        const startingGravitationalEnergy = mass * 9.81 * startingHeight;
        const totalEnergy = startingGravitationalEnergy;
        const endingHeight = noGoZone + buffer;
        const endingGravitationalEnergy = mass * 9.81 * endingHeight;
        const endingElasticEnergy = totalEnergy - endingGravitationalEnergy;
        const distanceCordStretched = Math.sqrt((2 * endingElasticEnergy) / strength);
        const stringAdded = startingHeight - unstretchedLength - distanceCordStretched - jumperHeight - endingHeight;

        const positionHeights = [
            startingHeight,
            0.75 * startingHeight,
            0.25 * startingHeight,
            endingHeight
        ];

        const gravitationalEnergies = positionHeights.map(height => mass * 9.81 * height);
        const elasticEnergies = [
            0,
            0,
            0.5 * strength * Math.pow(Math.max(startingHeight - stringAdded - unstretchedLength - jumperHeight - 0.25 * startingHeight, 0), 2),
            endingElasticEnergy
        ];

        const kineticEnergies = positionHeights.map((height, index) => {
            const elasticEnergy = elasticEnergies[index] || 0;
            const gravitationalEnergy = gravitationalEnergies[index];
            return Math.max(totalEnergy - gravitationalEnergy - elasticEnergy, 0);
        });

        // Update results display
        updateResultsDisplay({
            stringAdded,
            distanceCordStretched,
            endingHeight
        });

        // Create chart
        createEnergyChart(gravitationalEnergies, kineticEnergies, elasticEnergies);

        // Scroll to results
        document.getElementById('results').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    // Unit conversion function
    function convertUnits() {
        const convertFrom = document.getElementById('convertFrom').value;
        const convertTo = document.getElementById('convertTo').value;
        let value = parseFloat(document.getElementById('convertValue').value);

        if (convertFrom === 'kg' && convertTo === 'lbs') {
            value *= 2.20462;
        } else if (convertFrom === 'lbs' && convertTo === 'kg') {
            value /= 2.20462;
        } else if (convertFrom === 'm' && convertTo === 'ft') {
            value *= 3.28084;
        } else if (convertFrom === 'ft' && convertTo === 'm') {
            value /= 3.28084;
        }

        alert(`Converted Value: ${value.toFixed(2)}`);
    }

    // Function to update the results display
    function updateResultsDisplay(results) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <h3 class="text-xl font-semibold text-gray-700 mb-4">Jump Analysis</h3>
            <div class="grid grid-cols-3 gap-4">
                <div class="bg-blue-100 p-3 rounded-lg text-center">
                    <p class="text-sm text-gray-600">String Added</p>
                    <p class="text-lg font-bold text-blue-700">${results.stringAdded.toFixed(2)} m</p>
                </div>
                <div class="bg-green-100 p-3 rounded-lg text-center">
                    <p class="text-sm text-gray-600">Cord Stretch</p>
                    <p class="text-lg font-bold text-green-700">${results.distanceCordStretched.toFixed(2)} m</p>
                </div>
                <div class="bg-yellow-100 p-3 rounded-lg text-center">
                    <p class="text-sm text-gray-600">Safe Zone Height</p>
                    <p class="text-lg font-bold text-yellow-700">${results.endingHeight.toFixed(2)} m</p>
                </div>
            </div>
        `;
        resultsDiv.classList.add('animate-fade-in');
    }

    // Function to create the energy chart
    function createEnergyChart(gravitationalEnergies, kineticEnergies, elasticEnergies) {
        const ctx = document.getElementById('chart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (window.energyChart instanceof Chart) {
            window.energyChart.destroy();
        }

        window.energyChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Position 1', 'Position 2', 'Position 3', 'Position 4'],
                datasets: [
                    {
                        label: 'Gravitational Energy (J)',
                        data: gravitationalEnergies,
                        backgroundColor: '#3B82F6',
                        stack: 'Energy'
                    },
                    {
                        label: 'Kinetic Energy (J)',
                        data: kineticEnergies,
                        backgroundColor: '#10B981',
                        stack: 'Energy'
                    },
                    {
                        label: 'Elastic Energy (J)',
                        data: elasticEnergies,
                        backgroundColor: '#F59E0B',
                        stack: 'Energy'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: { stacked: true },
                    y: { stacked: true }
                }
            }
        });
    }
});

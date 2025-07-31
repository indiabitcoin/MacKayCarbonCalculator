// MacKay Carbon Calculator JavaScript
// Based on UK Government MacKay Carbon Calculator methodology

class CarbonCalculator {
    constructor() {
        this.currentSector = 'transport';
        this.leverValues = {};
        this.emissionsChart = null;
        this.baselineEmissions = 700; // 1990 baseline in MtCO2e
        this.targetYear = 2050;
        
        // Initialize lever values to level 1
        this.initializeLeverValues();
        this.initializeEventListeners();
        this.initializeChart();
        this.updateCalculations();
    }

    initializeLeverValues() {
        // Initialize all levers to level 1 (minimal effort)
        const levers = [
            // Transport
            'electric-cars', 'public-transport', 'active-travel', 'aviation', 'freight',
            // Buildings
            'building-temp', 'insulation', 'heat-pumps', 'district-heat', 'appliances',
            // Industry
            'industrial-efficiency', 'steel', 'cement', 'chemicals',
            // Electricity
            'wind', 'solar', 'nuclear', 'storage',
            // CO2 Removal
            'direct-air-capture', 'ccs', 'methane',
            // Land Use
            'afforestation', 'bioenergy', 'agriculture'
        ];

        levers.forEach(lever => {
            this.leverValues[lever] = 1;
        });
    }

    initializeEventListeners() {
        // Sector tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchSector(e.target.dataset.sector);
            });
        });

        // Lever slider changes
        document.querySelectorAll('.lever-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                this.updateLever(e.target.dataset.lever, parseInt(e.target.value));
            });
        });
    }

    switchSector(sectorId) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-sector="${sectorId}"]`).classList.add('active');

        // Update active panel
        document.querySelectorAll('.sector-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(sectorId).classList.add('active');

        this.currentSector = sectorId;
    }

    updateLever(leverId, value) {
        this.leverValues[leverId] = value;
        
        // Add visual feedback
        const leverElement = document.querySelector(`[data-lever="${leverId}"]`).closest('.lever');
        leverElement.classList.add('updated');
        setTimeout(() => leverElement.classList.remove('updated'), 500);

        // Recalculate emissions
        this.updateCalculations();
    }

    calculateSectorEmissions() {
        const emissions = {
            transport: this.calculateTransportEmissions(),
            buildings: this.calculateBuildingsEmissions(),
            industry: this.calculateIndustryEmissions(),
            electricity: this.calculateElectricityEmissions(),
            'co2-removal': this.calculateCO2RemovalEmissions(),
            'land-use': this.calculateLandUseEmissions()
        };

        return emissions;
    }

    calculateTransportEmissions() {
        // Transport baseline: ~180 MtCO2e
        const baseline = 180;
        
        // Calculate reduction based on lever settings
        const electricCarsReduction = (this.leverValues['electric-cars'] - 1) * 15; // Up to 45% reduction
        const publicTransportReduction = (this.leverValues['public-transport'] - 1) * 8; // Up to 24% reduction
        const activeTravelReduction = (this.leverValues['active-travel'] - 1) * 5; // Up to 15% reduction
        const aviationReduction = (this.leverValues['aviation'] - 1) * 10; // Up to 30% reduction
        const freightReduction = (this.leverValues['freight'] - 1) * 7; // Up to 21% reduction

        const totalReduction = electricCarsReduction + publicTransportReduction + 
                              activeTravelReduction + aviationReduction + freightReduction;
        
        return Math.max(baseline * (1 - totalReduction / 100), 20); // Minimum 20 MtCO2e
    }

    calculateBuildingsEmissions() {
        // Buildings baseline: ~120 MtCO2e
        const baseline = 120;
        
        const tempReduction = (this.leverValues['building-temp'] - 1) * 5; // Up to 15% reduction
        const insulationReduction = (this.leverValues['insulation'] - 1) * 12; // Up to 36% reduction
        const heatPumpReduction = (this.leverValues['heat-pumps'] - 1) * 15; // Up to 45% reduction
        const districtHeatReduction = (this.leverValues['district-heat'] - 1) * 8; // Up to 24% reduction
        const appliancesReduction = (this.leverValues['appliances'] - 1) * 6; // Up to 18% reduction

        const totalReduction = tempReduction + insulationReduction + heatPumpReduction + 
                              districtHeatReduction + appliancesReduction;
        
        return Math.max(baseline * (1 - totalReduction / 100), 15); // Minimum 15 MtCO2e
    }

    calculateIndustryEmissions() {
        // Industry baseline: ~160 MtCO2e
        const baseline = 160;
        
        const efficiencyReduction = (this.leverValues['industrial-efficiency'] - 1) * 8; // Up to 24% reduction
        const steelReduction = (this.leverValues['steel'] - 1) * 12; // Up to 36% reduction
        const cementReduction = (this.leverValues['cement'] - 1) * 10; // Up to 30% reduction
        const chemicalsReduction = (this.leverValues['chemicals'] - 1) * 9; // Up to 27% reduction

        const totalReduction = efficiencyReduction + steelReduction + cementReduction + chemicalsReduction;
        
        return Math.max(baseline * (1 - totalReduction / 100), 25); // Minimum 25 MtCO2e
    }

    calculateElectricityEmissions() {
        // Electricity baseline: ~150 MtCO2e
        const baseline = 150;
        
        const windReduction = (this.leverValues['wind'] - 1) * 20; // Up to 60% reduction
        const solarReduction = (this.leverValues['solar'] - 1) * 15; // Up to 45% reduction
        const nuclearReduction = (this.leverValues['nuclear'] - 1) * 18; // Up to 54% reduction
        const storageReduction = (this.leverValues['storage'] - 1) * 5; // Up to 15% reduction

        const totalReduction = windReduction + solarReduction + nuclearReduction + storageReduction;
        
        return Math.max(baseline * (1 - totalReduction / 100), 5); // Minimum 5 MtCO2e
    }

    calculateCO2RemovalEmissions() {
        // CO2 Removal can provide negative emissions
        const dacRemoval = (this.leverValues['direct-air-capture'] - 1) * 20; // Up to 60 MtCO2e removal
        const ccsRemoval = (this.leverValues['ccs'] - 1) * 15; // Up to 45 MtCO2e removal
        const methaneReduction = (this.leverValues['methane'] - 1) * 8; // Up to 24 MtCO2e reduction

        return -(dacRemoval + ccsRemoval + methaneReduction); // Negative emissions
    }

    calculateLandUseEmissions() {
        // Land use baseline: ~50 MtCO2e
        const baseline = 50;
        
        const afforestationReduction = (this.leverValues['afforestation'] - 1) * 15; // Up to 45 MtCO2e removal
        const bioenergyReduction = (this.leverValues['bioenergy'] - 1) * 8; // Up to 24% reduction
        const agricultureReduction = (this.leverValues['agriculture'] - 1) * 6; // Up to 18% reduction

        const totalReduction = bioenergyReduction + agricultureReduction;
        const forestRemoval = afforestationReduction;
        
        return Math.max(baseline * (1 - totalReduction / 100) - forestRemoval, -20); // Can go negative
    }

    updateCalculations() {
        const sectorEmissions = this.calculateSectorEmissions();
        const totalEmissions = Object.values(sectorEmissions).reduce((sum, val) => sum + val, 0);
        
        // Update emissions display
        document.getElementById('emissions2050').textContent = `${Math.round(totalEmissions)} MtCO₂e`;
        
        // Calculate reduction percentage from 1990 baseline
        const reductionPercent = Math.round(((this.baselineEmissions - totalEmissions) / this.baselineEmissions) * 100);
        document.getElementById('reductionPercent').textContent = `${reductionPercent}%`;
        
        // Check net zero status
        const netZeroElement = document.getElementById('netZeroStatus');
        const netZeroMetric = netZeroElement.closest('.metric');
        if (totalEmissions <= 0) {
            netZeroElement.textContent = 'Achieved';
            netZeroMetric.classList.add('achieved');
        } else {
            netZeroElement.textContent = 'Not Achieved';
            netZeroMetric.classList.remove('achieved');
        }
        
        // Update sector breakdown
        this.updateSectorBreakdown(sectorEmissions);
        
        // Update chart
        this.updateChart(sectorEmissions, totalEmissions);
    }

    updateSectorBreakdown(sectorEmissions) {
        const maxEmissions = Math.max(...Object.values(sectorEmissions).filter(val => val > 0));
        
        const sectorMapping = {
            'transport': 'Transport',
            'buildings': 'Buildings', 
            'industry': 'Industry',
            'electricity': 'Electricity',
            'land-use': 'Agriculture'
        };

        Object.entries(sectorMapping).forEach(([key, name]) => {
            const emissions = sectorEmissions[key] || 0;
            const percentage = maxEmissions > 0 ? (Math.max(emissions, 0) / maxEmissions) * 100 : 0;
            
            const sectorBar = document.querySelector(`.bar[data-sector="${key}"]`);
            const valueSpan = sectorBar.parentElement.querySelector('.bar-value');
            
            if (sectorBar && valueSpan) {
                sectorBar.style.width = `${percentage}%`;
                valueSpan.textContent = `${Math.round(emissions)} MtCO₂e`;
            }
        });
    }

    initializeChart() {
        const ctx = document.getElementById('emissionsChart').getContext('2d');
        
        this.emissionsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1990', '2000', '2010', '2020', '2030', '2040', '2050'],
                datasets: [{
                    label: 'UK Emissions Pathway',
                    data: [700, 650, 580, 520, 400, 200, 450],
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Net Zero Target',
                    data: [null, null, null, null, null, null, 0],
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 6,
                    pointBackgroundColor: '#28a745'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 800,
                        title: {
                            display: true,
                            text: 'Emissions (MtCO₂e)'
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    updateChart(sectorEmissions, totalEmissions2050) {
        // Generate pathway based on current lever settings
        const pathway = this.generateEmissionsPathway(totalEmissions2050);
        
        this.emissionsChart.data.datasets[0].data = pathway;
        this.emissionsChart.update('none');
    }

    generateEmissionsPathway(finalEmissions) {
        // Generate a realistic pathway from 1990 to 2050
        const years = [1990, 2000, 2010, 2020, 2030, 2040, 2050];
        const baseline1990 = 700;
        const current2020 = 520;
        
        // Calculate intermediate points based on ambition levels
        const avgAmbition = Object.values(this.leverValues).reduce((sum, val) => sum + val, 0) / Object.keys(this.leverValues).length;
        
        // More ambitious settings lead to steeper reductions after 2020
        const reductionRate = 0.5 + (avgAmbition - 1) * 0.3; // 0.5 to 1.4
        
        const pathway = [
            baseline1990, // 1990
            650, // 2000
            580, // 2010
            current2020, // 2020
            current2020 - (current2020 - finalEmissions) * 0.3 * reductionRate, // 2030
            current2020 - (current2020 - finalEmissions) * 0.7 * reductionRate, // 2040
            finalEmissions // 2050
        ];
        
        return pathway.map(val => Math.round(val));
    }
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CarbonCalculator();
});

// Add some helper functions for enhanced interactivity
function resetAllLevers() {
    document.querySelectorAll('.lever-slider').forEach(slider => {
        slider.value = 1;
        slider.dispatchEvent(new Event('input'));
    });
}

function setMaxAmbition() {
    document.querySelectorAll('.lever-slider').forEach(slider => {
        slider.value = 4;
        slider.dispatchEvent(new Event('input'));
    });
}

// Export functions for potential external use
window.CarbonCalculator = CarbonCalculator;
window.resetAllLevers = resetAllLevers;
window.setMaxAmbition = setMaxAmbition;
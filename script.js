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
        
        // Initialize enhanced animations
        this.enhanceTabSwitching();
        
        // Add initial staggered animation to levers
        setTimeout(() => {
            const levers = document.querySelectorAll('.lever');
            this.addStaggeredAnimation(levers, 'bounceIn');
        }, 500);
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
                
                // Update progress ring
                this.updateProgressRing(slider.closest('.lever'), parseInt(e.target.value));
                
                // Create ripple effect
                this.createRippleEffect(e.target, e);
                
                // Generate particles
                this.createParticles(slider.closest('.lever'));
            });
            
            // Add hover effects
            slider.addEventListener('mouseenter', (e) => {
                const lever = e.target.closest('.lever');
                lever.classList.add('active');
            });
            
            slider.addEventListener('mouseleave', (e) => {
                const lever = e.target.closest('.lever');
                lever.classList.remove('active');
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
        
        // Calculate reduction percentage from 1990 baseline
        const reductionPercent = Math.round(((this.baselineEmissions - totalEmissions) / this.baselineEmissions) * 100);
        
        // Animate CO2e meter and values
        this.animateEmissionsUpdate(totalEmissions, reductionPercent);
        
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

    animateEmissionsUpdate(totalEmissions, reductionPercent) {
        // Add updating class for animation
        const metrics = document.querySelectorAll('.metric');
        metrics.forEach(metric => {
            metric.classList.add('updating');
            setTimeout(() => metric.classList.remove('updating'), 600);
        });

        // Animate emissions percentage
        const percentageElement = document.getElementById('emissionsPercentage');
        const currentPercent = parseInt(percentageElement.textContent.replace('%', '').replace('-', '')) || 0;
        this.animateValue(percentageElement, currentPercent, Math.abs(reductionPercent), (value) => {
            const sign = reductionPercent >= 0 ? '-' : '+';
            return `${sign}${value}%`;
        });

        // Animate CO2e meter needle
        this.animateMeterNeedle(reductionPercent);

        // Animate other values
        const emissions2050Element = document.getElementById('emissions2050');
        const currentEmissions = parseInt(emissions2050Element.textContent.replace(/[^0-9]/g, '')) || 0;
        this.animateValue(emissions2050Element, currentEmissions, Math.round(totalEmissions), (value) => `${value} MtCO₂e`);

        const reductionElement = document.getElementById('reductionPercent');
        const currentReduction = parseInt(reductionElement.textContent.replace('%', '')) || 0;
        this.animateValue(reductionElement, currentReduction, reductionPercent, (value) => `${value}%`);

        // Add value updating animation
        [emissions2050Element, reductionElement, percentageElement].forEach(el => {
            el.classList.add('updating');
            setTimeout(() => el.classList.remove('updating'), 500);
        });
    }

    animateValue(element, startValue, endValue, formatter) {
        const duration = 800;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(startValue + (endValue - startValue) * easeOutCubic);
            
            element.textContent = formatter(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    animateMeterNeedle(reductionPercent) {
        const needle = document.getElementById('meterNeedle');
        if (!needle) return;

        // Calculate needle rotation (-90deg = 1990 baseline, 0deg = -80%, 90deg = -100% net zero)
        let rotation;
        if (reductionPercent <= 0) {
            rotation = -90; // At or above 1990 levels
        } else if (reductionPercent >= 100) {
            rotation = 90; // Net zero or beyond
        } else {
            // Linear interpolation between -90deg (0% reduction) and 90deg (100% reduction)
            rotation = -90 + (reductionPercent / 100) * 180;
        }

        needle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

        // Add color change based on progress
        const percentage = document.getElementById('emissionsPercentage');
        if (reductionPercent >= 100) {
            percentage.style.color = '#28a745'; // Green for net zero
        } else if (reductionPercent >= 80) {
            percentage.style.color = '#ffc107'; // Yellow for 80% target
        } else {
            percentage.style.color = '#dc3545'; // Red for insufficient progress
        }
    }

    // Advanced Animation Functions
    updateProgressRing(lever, value) {
        const ring = lever.querySelector('.progress-ring-circle');
        if (!ring) return;
        
        const circumference = 2 * Math.PI * 15; // radius = 15
        const progress = (value / 4) * 100; // Convert to percentage
        const offset = circumference - (progress / 100) * circumference;
        
        ring.style.strokeDashoffset = offset;
        
        // Change color based on ambition level
        const colors = ['#dc3545', '#fd7e14', '#ffc107', '#28a745'];
        ring.style.stroke = colors[value - 1];
    }
    
    createRippleEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(0, 123, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    createParticles(container) {
        const particleCount = 5;
        const rect = container.getBoundingClientRect();
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const x = Math.random() * rect.width;
            const y = rect.height;
            
            particle.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                animation-delay: ${Math.random() * 0.5}s;
            `;
            
            container.style.position = 'relative';
            container.appendChild(particle);
            
            setTimeout(() => particle.remove(), 3000);
        }
    }
    
    addStaggeredAnimation(elements, animationClass) {
        elements.forEach((element, index) => {
            element.classList.add(animationClass);
            element.classList.add(`animate-stagger-${Math.min(index + 1, 6)}`);
            
            setTimeout(() => {
                element.classList.remove(animationClass);
                element.classList.remove(`animate-stagger-${Math.min(index + 1, 6)}`);
            }, 1000 + (index * 100));
        });
    }
    
    showSuccessAnimation(element) {
        element.classList.add('success-animation');
        setTimeout(() => element.classList.remove('success-animation'), 600);
    }
    
    showErrorAnimation(element) {
        element.classList.add('error-animation');
        setTimeout(() => element.classList.remove('error-animation'), 500);
    }
    
    enhanceTabSwitching() {
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', (e) => {
                // Remove active class from all tabs
                document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                e.target.classList.add('active');
                
                // Add entrance animation to sector panel
                const targetPanel = document.querySelector(`[data-sector="${e.target.dataset.sector}"]`);
                if (targetPanel) {
                    targetPanel.style.animation = 'slideInFromLeft 0.5s ease-out';
                    setTimeout(() => targetPanel.style.animation = '', 500);
                }
            });
        });
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

        const sectorBars = [];
        Object.entries(sectorMapping).forEach(([key, name], index) => {
            const emissions = sectorEmissions[key] || 0;
            const percentage = maxEmissions > 0 ? (Math.max(emissions, 0) / maxEmissions) * 100 : 0;
            
            const sectorBar = document.querySelector(`.bar[data-sector="${key}"]`);
            const valueSpan = sectorBar.parentElement.querySelector('.bar-value');
            
            if (sectorBar && valueSpan) {
                // Animate bar width change with stagger
                setTimeout(() => {
                    sectorBar.style.width = `${percentage}%`;
                    
                    // Add to array for staggered animation
                    sectorBars.push(sectorBar.closest('.sector-bar'));
                    
                    // Show success animation for significant reductions
                    if (percentage < 50) {
                        this.showSuccessAnimation(sectorBar.closest('.sector-bar'));
                    }
                }, index * 100);
                valueSpan.textContent = `${Math.round(emissions)} MtCO₂e`;
            }
        });
        
        // Apply staggered animation to all sector bars
        setTimeout(() => {
            this.addStaggeredAnimation(sectorBars, 'slideInFromLeft');
        }, Object.keys(sectorMapping).length * 100);
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
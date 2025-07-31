// MacKay Carbon Calculator JavaScript
// Based on UK Government MacKay Carbon Calculator methodology

class CarbonCalculator {
    constructor() {
        this.currentSector = 'transport';
        this.leverValues = {};
        this.emissionsChart = null;
        this.baselineEmissions = this.calculateBaselineEmissions(); // 1990 baseline in MtCO2e
        this.targetYear = 2050;
        
        // Initialize lever values to level 1
        this.initializeLeverValues();
        this.initializeEventListeners();
        this.initializeChart();
        this.updateCalculations();
        
        // Initialize enhanced animations
        this.enhanceTabSwitching();
        
        // Add initial staggered animation to levers (reduced on mobile)
        setTimeout(() => {
            const levers = document.querySelectorAll('.lever');
            if (window.innerWidth > 768) {
                this.addStaggeredAnimation(levers, 'bounceIn');
            }
        }, 500);
        
        // Initialize responsive features
        this.initializeResponsiveFeatures();
        
        // Initialize new features
        this.initializeFeatures();
        this.initializeModals();
        this.initializeAnalytics();
        this.initializeScenarioManagement();
        this.initializeAdvancedAnimations();
        this.initializeThemeToggle();
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
            const lever = slider.closest('.lever');
            
            slider.addEventListener('input', (e) => {
                this.updateLever(e.target.dataset.lever, parseInt(e.target.value));
                
                // Update progress ring
                this.updateProgressRing(lever, parseInt(e.target.value));
                
                // Create ripple effect
                this.createRippleEffect(e.target, e);
                
                // Generate particles
                this.createParticles(lever);
            });
            
            // Enhanced lever interaction with advanced animations
            this.enhanceLeverInteraction(lever, slider);
            
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
        // Update active tab with animation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-sector="${sectorId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
            // Create ripple effect on tab switch
            this.createAdvancedRippleEffect({
                clientX: activeBtn.offsetLeft + activeBtn.offsetWidth / 2,
                clientY: activeBtn.offsetTop + activeBtn.offsetHeight / 2
            }, activeBtn);
        }

        // Update active panel with smooth transition
        document.querySelectorAll('.sector-panel').forEach(panel => {
            if (panel.classList.contains('active')) {
                panel.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => {
                    panel.classList.remove('active');
                    panel.style.animation = '';
                }, 300);
            }
        });
        
        // Show new sector with staggered animation
        setTimeout(() => {
            const sectorElement = document.getElementById(sectorId);
            if (sectorElement) {
                sectorElement.classList.add('active');
                sectorElement.style.animation = 'fadeInUp 0.4s ease-out';
                
                // Add staggered animation to levers
                const levers = sectorElement.querySelectorAll('.lever');
                levers.forEach((lever, index) => {
                    lever.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
                });
            }
        }, 150);

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
        if (percentageElement) {
            const currentPercent = parseInt(percentageElement.textContent.replace('%', '').replace('-', '')) || 0;
            this.animateValue(percentageElement, currentPercent, Math.abs(reductionPercent), (value) => {
                const sign = reductionPercent >= 0 ? '-' : '+';
                return `${sign}${value}%`;
            });
        }

        // Animate CO2e meter needle
        this.animateMeterNeedle(reductionPercent);

        // Animate other values
        const emissions2050Element = document.getElementById('emissions2050');
        if (emissions2050Element) {
            const currentEmissions = parseInt(emissions2050Element.textContent.replace(/[^0-9]/g, '')) || 0;
            this.animateValue(emissions2050Element, currentEmissions, Math.round(totalEmissions), (value) => `${value} MtCO₂e`);
        }

        const reductionElement = document.getElementById('reductionPercent');
        if (reductionElement) {
            const currentReduction = parseInt(reductionElement.textContent.replace('%', '')) || 0;
            this.animateValue(reductionElement, currentReduction, reductionPercent, (value) => `${value}%`);
        }

        // Add value updating animation
        [emissions2050Element, reductionElement, percentageElement].filter(el => el).forEach(el => {
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

        // Enhanced smooth animation with easing
        needle.style.transition = 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
        needle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

        // Add pulsing effect for significant changes
        if (Math.abs(this.lastReduction - reductionPercent) > 10) {
            needle.style.animation = 'meterPulse 0.6s ease-out';
            setTimeout(() => {
                needle.style.animation = '';
            }, 600);
        }
        this.lastReduction = reductionPercent;

        // Enhanced color transitions with glow effects
        const percentage = document.getElementById('emissionsPercentage');
        const meter = document.querySelector('.co2e-meter');
        if (percentage && meter) {
            percentage.style.transition = 'all 0.8s ease';
            meter.style.transition = 'box-shadow 0.8s ease';
            
            if (reductionPercent >= 100) {
                percentage.style.color = '#28a745';
                percentage.style.textShadow = '0 0 10px rgba(40, 167, 69, 0.5)';
                meter.style.boxShadow = '0 0 20px rgba(40, 167, 69, 0.3)';
                this.createCelebrationEffect();
            } else if (reductionPercent >= 80) {
                percentage.style.color = '#ffc107';
                percentage.style.textShadow = '0 0 8px rgba(255, 193, 7, 0.4)';
                meter.style.boxShadow = '0 0 15px rgba(255, 193, 7, 0.2)';
            } else {
                percentage.style.color = '#dc3545';
                percentage.style.textShadow = '0 0 6px rgba(220, 53, 69, 0.3)';
                meter.style.boxShadow = '0 0 10px rgba(220, 53, 69, 0.1)';
            }
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
                
                // Add entrance animation to sector panel (only on larger screens)
                if (window.innerWidth > 768) {
                    const targetPanel = document.querySelector(`[data-sector="${e.target.dataset.sector}"]`);
                    if (targetPanel) {
                        targetPanel.style.animation = 'slideInFromLeft 0.5s ease-out';
                        setTimeout(() => targetPanel.style.animation = '', 500);
                    }
                }
            });
        });
    }
    
    initializeResponsiveFeatures() {
        // Detect if device supports touch
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Add touch-specific event listeners
        if (this.isTouchDevice) {
            this.addTouchInteractions();
        }
        
        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });
        
        // Handle window resize for responsive updates
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Optimize animations based on device capabilities
        this.optimizeForDevice();
    }
    
    initializeFeatures() {
        // Feature toolbar buttons - check if elements exist first
        const saveBtn = document.getElementById('save-scenario-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.showModal('save-scenario-modal');
            });
        }
        
        const loadBtn = document.getElementById('load-scenario-btn');
        if (loadBtn) {
            loadBtn.addEventListener('click', () => {
                this.loadSavedScenarios();
                this.showModal('load-scenario-modal');
            });
        }
        
        const compareBtn = document.getElementById('compare-btn');
        if (compareBtn) {
            compareBtn.addEventListener('click', () => {
                this.showAnalyticsTab('compare');
            });
        }
        
        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.showModal('export-modal');
            });
        }
        
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareScenario();
            });
        }
        
        const helpBtn = document.getElementById('help-btn');
        if (helpBtn) {
            helpBtn.addEventListener('click', () => {
                this.showModal('help-modal');
            });
        }
    }
    
    initializeModals() {
        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal.id);
                }
            });
        });
        
        // Close buttons
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.hideModal(modal.id);
            });
        });
        
        // Help tabs
        document.querySelectorAll('.help-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.showHelpSection(e.target.dataset.section);
            });
        });
        
        // Save scenario form
        const saveForm = document.getElementById('save-scenario-form');
        if (saveForm) {
            saveForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveScenario();
            });
        }
        
        // Export form
        const exportForm = document.getElementById('export-form');
        if (exportForm) {
            exportForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.exportData();
            });
        }
    }
    
    initializeAnalytics() {
        // Analytics tabs
        document.querySelectorAll('.analytics-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.showAnalyticsTab(e.target.dataset.tab);
            });
        });
        
        // Initialize analytics data
        this.updateAnalytics();
    }
    
    initializeScenarioManagement() {
        this.scenarios = JSON.parse(localStorage.getItem('carbonCalculatorScenarios') || '[]');
        this.currentScenario = {
            name: 'Current Scenario',
            description: '',
            values: {},
            timestamp: new Date().toISOString()
        };
    }
    
    showModal(modalId) {
        this.showModalWithAnimation(modalId);
    }

    hideModal(modalId) {
        this.hideModalWithAnimation(modalId);
    }
    
    showHelpSection(sectionId) {
        // Update tab states
        document.querySelectorAll('.help-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
        
        // Update section visibility
        document.querySelectorAll('.help-section').forEach(section => {
            section.classList.remove('active');
        });
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            sectionElement.classList.add('active');
        }
    }
    
    showAnalyticsTab(tabId) {
        // Update tab states
        document.querySelectorAll('.analytics-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        // Update section visibility
        document.querySelectorAll('.analytics-section').forEach(section => {
            section.classList.remove('active');
        });
        const analyticsElement = document.getElementById(`analytics-${tabId}`);
            if (analyticsElement) {
                analyticsElement.classList.add('active');
            }
        
        // Update analytics data for the specific tab
        this.updateAnalyticsTab(tabId);
    }
    
    saveScenario() {
        const form = document.getElementById('save-scenario-form');
        const formData = new FormData(form);
        
        const scenario = {
            id: Date.now().toString(),
            name: formData.get('scenario-name'),
            description: formData.get('scenario-description'),
            values: { ...this.leverValues },
            timestamp: new Date().toISOString(),
            emissions: this.calculateTotalEmissions()
        };
        
        this.scenarios.push(scenario);
        localStorage.setItem('carbonCalculatorScenarios', JSON.stringify(this.scenarios));
        
        this.hideModal('save-scenario-modal');
        this.showToast('Scenario saved successfully!', 'success');
        form.reset();
    }
    
    loadSavedScenarios() {
        const container = document.querySelector('.scenarios-list');
        container.innerHTML = '';
        
        if (this.scenarios.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 20px;">No saved scenarios found.</p>';
            return;
        }
        
        this.scenarios.forEach(scenario => {
            const scenarioElement = document.createElement('div');
            scenarioElement.className = 'scenario-item';
            scenarioElement.innerHTML = `
                <div class="scenario-info">
                    <h4>${scenario.name}</h4>
                    <p>${scenario.description || 'No description'}</p>
                    <small>Saved: ${new Date(scenario.timestamp).toLocaleDateString()}</small>
                </div>
                <div class="scenario-actions">
                    <button class="btn btn-primary" onclick="calculator.loadScenario('${scenario.id}')">Load</button>
                    <button class="btn btn-danger" onclick="calculator.deleteScenario('${scenario.id}')">Delete</button>
                </div>
            `;
            container.appendChild(scenarioElement);
        });
    }
    
    loadScenario(scenarioId) {
        const scenario = this.scenarios.find(s => s.id === scenarioId);
        if (!scenario) return;
        
        // Update lever values
        this.leverValues = { ...scenario.values };
        
        // Update UI
        Object.keys(scenario.values).forEach(leverId => {
            const slider = document.querySelector(`#${leverId}`);
            if (slider) {
                slider.value = scenario.values[leverId];
                this.updateLeverDisplay(leverId, scenario.values[leverId]);
            }
        });
        
        this.updateCalculations();
        this.hideModal('load-scenario-modal');
        this.showToast(`Scenario "${scenario.name}" loaded successfully!`, 'success');
    }
    
    deleteScenario(scenarioId) {
        if (confirm('Are you sure you want to delete this scenario?')) {
            this.scenarios = this.scenarios.filter(s => s.id !== scenarioId);
            localStorage.setItem('carbonCalculatorScenarios', JSON.stringify(this.scenarios));
            this.loadSavedScenarios();
            this.showToast('Scenario deleted successfully!', 'success');
        }
    }
    
    shareScenario() {
        const url = new URL(window.location.href);
        const params = new URLSearchParams();
        
        Object.keys(this.leverValues).forEach(key => {
            params.set(key, this.leverValues[key]);
        });
        
        url.search = params.toString();
        
        if (navigator.share) {
            navigator.share({
                title: 'MacKay Carbon Calculator Scenario',
                text: 'Check out my carbon reduction scenario',
                url: url.toString()
            });
        } else {
            navigator.clipboard.writeText(url.toString()).then(() => {
                this.showToast('Scenario URL copied to clipboard!', 'success');
            });
        }
    }
    
    exportData() {
        const form = document.getElementById('export-form');
        const formData = new FormData(form);
        const format = formData.get('export-format');
        
        const data = {
            scenario: {
                name: this.currentScenario.name,
                values: this.leverValues,
                timestamp: new Date().toISOString()
            },
            results: {
                totalEmissions: this.calculateTotalEmissions(),
                sectorBreakdown: this.calculateSectorBreakdown(),
                reductionFrom1990: this.calculateReductionFrom1990()
            }
        };
        
        if (formData.get('include-charts')) {
            data.chartData = this.getChartData();
        }
        
        if (formData.get('include-analytics')) {
            data.analytics = this.getAnalyticsData();
        }
        
        this.downloadData(data, format);
        this.hideModal('export-modal');
        this.showToast(`Data exported as ${format.toUpperCase()}!`, 'success');
    }
    
    downloadData(data, format) {
        let content, filename, mimeType;
        
        switch (format) {
            case 'json':
                content = JSON.stringify(data, null, 2);
                filename = 'carbon-calculator-data.json';
                mimeType = 'application/json';
                break;
            case 'csv':
                content = this.convertToCSV(data);
                filename = 'carbon-calculator-data.csv';
                mimeType = 'text/csv';
                break;
            case 'pdf':
                this.generatePDF(data);
                return;
        }
        
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
    
    convertToCSV(data) {
        const rows = [];
        rows.push(['Metric', 'Value']);
        rows.push(['Total Emissions (MtCO2e)', data.results.totalEmissions]);
        rows.push(['Reduction from 1990 (%)', data.results.reductionFrom1990]);
        rows.push(['']);
        rows.push(['Lever', 'Value']);
        
        Object.keys(data.scenario.values).forEach(key => {
            rows.push([key, data.scenario.values[key]]);
        });
        
        return rows.map(row => row.join(',')).join('\n');
    }
    
    generatePDF(data) {
        // This would require a PDF library like jsPDF
        this.showToast('PDF export feature coming soon!', 'info');
    }
    
    updateAnalytics() {
        this.updateKeyMetrics();
        this.updateTrendsChart();
        this.updateInsights();
    }
    
    updateAnalyticsTab(tabId) {
        switch (tabId) {
            case 'overview':
                this.updateKeyMetrics();
                break;
            case 'trends':
                this.updateTrendsChart();
                break;
            case 'compare':
                this.updateComparison();
                break;
            case 'insights':
                this.updateInsights();
                break;
        }
    }
    
    updateKeyMetrics() {
        const totalEmissions = this.calculateTotalEmissions();
        const reductionFrom1990 = this.calculateReductionFrom1990();
        const renewableShare = this.calculateRenewableShare();
        const efficiencyScore = this.calculateEfficiencyScore();
        
        const targetProgressEl = document.querySelector('[data-metric="target-progress"] .metric-value');
        if (targetProgressEl) {
            targetProgressEl.textContent = `${Math.round(reductionFrom1990)}%`;
        }
        
        const efficiencyEl = document.querySelector('[data-metric="efficiency"] .metric-value');
        if (efficiencyEl) {
            efficiencyEl.textContent = `${Math.round(efficiencyScore)}%`;
        }
        
        const renewableEl = document.querySelector('[data-metric="renewable"] .metric-value');
        if (renewableEl) {
            renewableEl.textContent = `${Math.round(renewableShare)}%`;
        }
    }
    
    updateInsights() {
        const insights = this.generateInsights();
        const container = document.querySelector('.insights-container');
        
        if (container) {
            container.innerHTML = insights.map(insight => `
                <div class="insight-card">
                    <div class="insight-icon">${insight.icon}</div>
                    <div class="insight-content">
                        <h4>${insight.title}</h4>
                        <p>${insight.description}</p>
                    </div>
                </div>
            `).join('');
        }
    }
    
    generateInsights() {
        const insights = [];
        const totalEmissions = this.calculateTotalEmissions();
        const reductionFrom1990 = this.calculateReductionFrom1990();
        
        if (reductionFrom1990 < 50) {
            insights.push({
                icon: '⚡',
                title: 'Increase Renewable Energy',
                description: 'Consider increasing renewable energy adoption to achieve deeper emissions reductions.'
            });
        }
        
        if (this.leverValues['building-insulation'] < 3) {
            insights.push({
                icon: '🏠',
                title: 'Improve Building Efficiency',
                description: 'Better building insulation could significantly reduce heating and cooling emissions.'
            });
        }
        
        if (this.leverValues['electric-cars'] < 3) {
            insights.push({
                icon: '🚗',
                title: 'Accelerate Transport Electrification',
                description: 'Faster adoption of electric vehicles would help reduce transport emissions.'
            });
        }
        
        return insights;
    }
    
    calculateRenewableShare() {
        // Simplified calculation based on relevant levers
        const renewableLevers = ['wind-onshore', 'wind-offshore', 'solar-pv', 'hydro'];
        const total = renewableLevers.reduce((sum, lever) => {
            return sum + (this.leverValues[lever] || 1);
        }, 0);
        return (total / renewableLevers.length) * 25; // Scale to percentage
    }
    
    calculateEfficiencyScore() {
        // Simplified efficiency calculation
        const efficiencyLevers = ['building-insulation', 'heat-pumps', 'freight-efficiency'];
        const total = efficiencyLevers.reduce((sum, lever) => {
            return sum + (this.leverValues[lever] || 1);
        }, 0);
        return (total / efficiencyLevers.length) * 25; // Scale to percentage
    }
    
    calculateBaselineEmissions() {
        // Calculate 1990 baseline emissions from sector data
        return 700; // This should be calculated from actual 1990 UK emissions data
    }
    
    calculateTotalEmissions() {
        // Calculate total emissions based on sector calculations
        const sectorEmissions = this.calculateSectorEmissions();
        return Object.values(sectorEmissions).reduce((sum, val) => sum + val, 0);
    }
    
    calculateReductionFrom1990() {
        const currentEmissions = this.calculateTotalEmissions();
        return ((this.baselineEmissions - currentEmissions) / this.baselineEmissions) * 100;
    }
    
    calculateSectorBreakdown() {
        // Simplified sector breakdown
        const totalEmissions = this.calculateTotalEmissions();
        return {
            transport: totalEmissions * 0.3,
            buildings: totalEmissions * 0.25,
            industry: totalEmissions * 0.2,
            electricity: totalEmissions * 0.15,
            agriculture: totalEmissions * 0.1
        };
    }
    
    getChartData() {
        // Return current chart data if available
        return {
            emissions: this.calculateTotalEmissions(),
            sectorBreakdown: this.calculateSectorBreakdown()
        };
    }
    
    getAnalyticsData() {
        // Return analytics data
        return {
            totalEmissions: this.calculateTotalEmissions(),
            reductionFrom1990: this.calculateReductionFrom1990(),
            renewableShare: this.calculateRenewableShare(),
            efficiencyScore: this.calculateEfficiencyScore()
        };
    }
    
    updateTrendsChart() {
        // Update trends chart with current data
        // Implementation would depend on chart library integration
    }
    
    updateComparison() {
        // Update comparison view with scenario data
        // Implementation would depend on comparison feature requirements
    }
    
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        if (!toast) {
            console.log(`Toast: ${message}`);
            return;
        }
        
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon');
        
        if (toastMessage) {
            toastMessage.textContent = message;
        }
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        if (toastIcon) {
            toastIcon.textContent = icons[type] || icons.info;
        }
        
        // Set type class
        toast.className = `toast ${type} show`;
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => {
                toast.classList.remove('show', 'hide');
            }, 300);
        }, 3000);
        
        // Close button
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.onclick = () => {
                toast.classList.add('hide');
                setTimeout(() => {
                    toast.classList.remove('show', 'hide');
                }, 300);
            };
        }
    }

    // Advanced Animation System
    initializeAdvancedAnimations() {
        this.initializeParticleSystem();
        this.initializeRippleEffects();
        this.initializeLoadingAnimations();
        this.initializeCounterAnimations();
        this.initializeEnergyFlowAnimations();
        this.initializeStaggerAnimations();
        this.enhanceLeverAnimations();
        this.monitorAnimationPerformance();
    }

    initializeParticleSystem() {
        this.particleContainer = document.createElement('div');
        this.particleContainer.className = 'particle-container';
        this.particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
        `;
        document.body.appendChild(this.particleContainer);
    }

    createAdvancedParticles(x, y, count = 8, color = '#3498db') {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                animation: particleFloat ${Math.random() * 2 + 2}s linear forwards;
                transform: translate(-50%, -50%);
            `;
            
            this.particleContainer.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 4000);
        }
    }

    initializeRippleEffects() {
        const rippleElements = document.querySelectorAll('.tab-btn, .feature-btn, .btn');
        
        rippleElements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.createAdvancedRippleEffect(e, element);
            });
        });
    }

    createAdvancedRippleEffect(event, element) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    initializeLoadingAnimations() {
        this.loadingStates = new Set();
    }

    showLoadingAnimation(element) {
        if (!element) return;
        
        element.classList.add('loading');
        this.loadingStates.add(element);
    }

    hideLoadingAnimation(element) {
        if (!element) return;
        
        element.classList.remove('loading');
        this.loadingStates.delete(element);
    }

    initializeCounterAnimations() {
        this.observeCounterElements();
    }

    observeCounterElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const counterElements = document.querySelectorAll('.metric-value, .emissions-value');
        counterElements.forEach(el => observer.observe(el));
    }

    animateCounter(element) {
        const target = parseFloat(element.textContent.replace(/[^\d.-]/g, '')) || 0;
        const duration = 1000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;
        
        const timer = setInterval(() => {
            current += increment;
            step++;
            
            if (step >= steps) {
                current = target;
                clearInterval(timer);
            }
            
            const suffix = element.textContent.replace(/[\d.-]/g, '');
            element.textContent = Math.round(current * 10) / 10 + suffix;
        }, duration / steps);
    }

    initializeEnergyFlowAnimations() {
        const energyElements = document.querySelectorAll('.progress-ring, .lever');
        
        energyElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.addEnergyFlow(element);
            });
        });
    }

    addEnergyFlow(element) {
        if (element.querySelector('.energy-flow-line')) return;
        
        const flowLine = document.createElement('div');
        flowLine.className = 'energy-flow-line';
        flowLine.style.cssText = `
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
            animation: energyFlow 2s linear infinite;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(flowLine);
        
        setTimeout(() => {
            if (flowLine.parentNode) {
                flowLine.parentNode.removeChild(flowLine);
            }
        }, 6000);
    }

    initializeStaggerAnimations() {
        const staggerContainers = document.querySelectorAll('.levers-container, .key-metrics, .insights-grid');
        
        staggerContainers.forEach(container => {
            container.classList.add('stagger-animation');
        });
    }

    // Enhanced lever interaction with animations
    enhanceLeverInteraction(lever, slider) {
        slider.addEventListener('input', (e) => {
            // Add active animation
            lever.classList.add('active');
            
            // Create particles on significant changes
            const rect = slider.getBoundingClientRect();
            const x = rect.left + (rect.width * (e.target.value / e.target.max));
            const y = rect.top + rect.height / 2;
            
            if (Math.random() > 0.7) { // 30% chance for particles
                this.createAdvancedParticles(x, y, 3, this.getParticleColor(e.target.value));
            }
            
            // Remove active class after animation
            setTimeout(() => {
                lever.classList.remove('active');
            }, 600);
        });
        
        slider.addEventListener('change', (e) => {
            // Create celebration particles for high values
            if (e.target.value > e.target.max * 0.8) {
                const rect = slider.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                this.createAdvancedParticles(x, y, 12, '#2ecc71');
            }
        });
    }

    getParticleColor(value) {
        const colors = ['#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6'];
        const index = Math.floor((value / 4) % colors.length);
        return colors[index];
    }

    // Enhanced celebration effect for significant changes
    createCelebrationEffect(x, y, intensity = 1) {
        const particleCount = Math.floor(15 * intensity);
        const colors = ['#2ecc71', '#3498db', '#f39c12', '#e74c3c', '#9b59b6'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'celebration-particle';
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 6px;
                height: 6px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                animation: celebrationBurst 1.5s ease-out forwards;
                transform-origin: center;
            `;
            
            // Random direction and distance
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            const distance = 50 + Math.random() * 100;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance - Math.random() * 50;
            
            particle.style.setProperty('--end-x', `${endX}px`);
            particle.style.setProperty('--end-y', `${endY}px`);
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1500);
        }
    }

    // Enhanced lever interaction with smooth animations
    enhanceLeverAnimations() {
        const levers = document.querySelectorAll('.lever');
        
        levers.forEach(lever => {
            const slider = lever.querySelector('input[type="range"]');
            const leverHandle = lever.querySelector('.lever-handle');
            const progressRing = lever.querySelector('.progress-ring');
            
            if (!slider) return;
            
            let lastValue = slider.value;
            
            // Enhanced input animation
            slider.addEventListener('input', (e) => {
                const currentValue = parseInt(e.target.value);
                const valueDiff = Math.abs(currentValue - lastValue);
                
                // Add smooth lever animation
                lever.style.transform = 'scale(1.02)';
                lever.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // Create ripple effect at slider position
                const rect = slider.getBoundingClientRect();
                const progress = (currentValue / slider.max);
                const x = rect.left + (rect.width * progress);
                const y = rect.top + rect.height / 2;
                
                this.createAdvancedRippleEffect({
                    clientX: x,
                    clientY: y
                }, slider);
                
                // Create particles for significant changes
                if (valueDiff >= 1) {
                    const intensity = Math.min(valueDiff / 2, 3);
                    this.createAdvancedParticles(x, y, Math.floor(3 * intensity), this.getParticleColor(currentValue));
                }
                
                // Celebration effect for maximum values
                if (currentValue === parseInt(slider.max)) {
                    this.createCelebrationEffect(x, y, 1.5);
                }
                
                lastValue = currentValue;
                
                // Reset lever scale
                setTimeout(() => {
                    lever.style.transform = 'scale(1)';
                }, 200);
            });
            
            // Enhanced change animation
            slider.addEventListener('change', (e) => {
                const value = parseInt(e.target.value);
                
                // Add success animation for high values
                if (value > slider.max * 0.8) {
                    lever.classList.add('high-impact');
                    setTimeout(() => {
                        lever.classList.remove('high-impact');
                    }, 1000);
                }
                
                // Update progress ring with animation
                if (progressRing) {
                    this.updateProgressRing(lever, value);
                }
            });
            
            // Add hover effects for desktop
            if (!('ontouchstart' in window)) {
                lever.addEventListener('mouseenter', () => {
                    lever.style.transform = 'translateY(-2px)';
                    lever.style.transition = 'transform 0.3s ease';
                });
                
                lever.addEventListener('mouseleave', () => {
                    lever.style.transform = 'translateY(0)';
                });
            }
        });
    }

    // Enhanced modal animations
    showModalWithAnimation(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.style.display = 'flex';
        modal.classList.add('show');
        
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.animation = 'modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        
        document.body.style.overflow = 'hidden';
    }

    hideModalWithAnimation(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.animation = 'modalSlideOut 0.3s ease-in';
        }
        
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }, 300);
    }

    // Enhanced tab switching with animations
    switchTabWithAnimation(tabId) {
        const allTabs = document.querySelectorAll('.tab-content');
        const targetTab = document.getElementById(tabId);
        const allButtons = document.querySelectorAll('.tab-btn');
        const activeButton = document.querySelector(`[onclick*="${tabId}"]`);
        
        // Hide all tabs with fade out
        allTabs.forEach(tab => {
            if (tab.style.display !== 'none') {
                tab.style.animation = 'fadeOut 0.2s ease-out';
                setTimeout(() => {
                    tab.style.display = 'none';
                }, 200);
            }
        });
        
        // Remove active class from all buttons
        allButtons.forEach(btn => btn.classList.remove('active'));
        
        // Show target tab with fade in
        setTimeout(() => {
            if (targetTab) {
                targetTab.style.display = 'block';
                targetTab.style.animation = 'fadeInUp 0.4s ease-out';
            }
            
            if (activeButton) {
                activeButton.classList.add('active');
            }
        }, 200);
    }

    // Performance monitoring for animations
    monitorAnimationPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const checkPerformance = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // Reduce animations if performance is poor
                if (fps < 30) {
                    document.body.classList.add('reduced-animations');
                } else if (fps > 50) {
                    document.body.classList.remove('reduced-animations');
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkPerformance);
        };
        
        requestAnimationFrame(checkPerformance);
    }
    
    addTouchInteractions() {
        // Add touch feedback for sliders
        document.querySelectorAll('input[type="range"]').forEach(slider => {
            slider.addEventListener('touchstart', (e) => {
                const lever = e.target.closest('.lever');
                lever.classList.add('touching');
            }, { passive: true });
            
            slider.addEventListener('touchend', (e) => {
                const lever = e.target.closest('.lever');
                setTimeout(() => {
                    lever.classList.remove('touching');
                }, 150);
            }, { passive: true });
        });
        
        // Add touch feedback for tabs
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('touchstart', () => {
                tab.classList.add('touching');
            });
            
            tab.addEventListener('touchend', () => {
                setTimeout(() => {
                    tab.classList.remove('touching');
                }, 150);
            });
        });
    }
    
    handleOrientationChange() {
        // Recalculate layout after orientation change
        this.updateCalculations();
        
        // Adjust CO2e meter size for landscape mode
        const meter = document.querySelector('.co2e-meter');
        if (meter && window.innerWidth <= 768) {
            if (window.orientation === 90 || window.orientation === -90) {
                meter.style.width = '140px';
                meter.style.height = '140px';
            } else {
                meter.style.width = '180px';
                meter.style.height = '180px';
            }
        }
    }
    
    handleResize() {
        // Update chart and meter sizes
        const meter = document.querySelector('.co2e-meter');
        if (meter) {
            if (window.innerWidth <= 360) {
                meter.style.width = '120px';
                meter.style.height = '120px';
            } else if (window.innerWidth <= 480) {
                meter.style.width = '150px';
                meter.style.height = '150px';
            } else if (window.innerWidth <= 768) {
                meter.style.width = '180px';
                meter.style.height = '180px';
            }
        }
        
        // Recalculate emissions display
        this.updateCalculations();
    }
    
    optimizeForDevice() {
        // Reduce animations on low-end devices
        const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                              navigator.deviceMemory <= 2 || 
                              window.innerWidth <= 480;
        
        if (isLowEndDevice) {
            document.body.classList.add('reduced-motion');
            
            // Disable particle effects
            this.createParticles = () => {};
            
            // Simplify animations
            const style = document.createElement('style');
            style.textContent = `
                .reduced-motion * {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.3s !important;
                }
                .reduced-motion .particle {
                    display: none !important;
                }
                .reduced-motion .lever.active {
                    animation: none !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
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
        const chartElement = document.getElementById('emissionsChart');
        if (!chartElement) return;
        const ctx = chartElement.getContext('2d');
        
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
                    pointBackgroundColor: 'var(--accent-secondary)'
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

    // Theme Toggle Functionality
    initializeThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        // Load saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);

        // Add click event listener
        themeToggle.addEventListener('click', (event) => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
            
            // Add ripple effect
            this.createRippleEffect(themeToggle, event);
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update theme toggle button text and icons
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const sunIcon = themeToggle.querySelector('.sun-icon');
            const moonIcon = themeToggle.querySelector('.moon-icon');
            const themeText = themeToggle.querySelector('.theme-text');
            
            if (theme === 'dark') {
                if (sunIcon) sunIcon.style.opacity = '0';
                if (moonIcon) {
                    moonIcon.style.opacity = '1';
                    moonIcon.style.display = 'block';
                }
                if (themeText) themeText.textContent = 'Light';
            } else {
                if (sunIcon) sunIcon.style.opacity = '1';
                if (moonIcon) {
                    moonIcon.style.opacity = '0';
                    moonIcon.style.display = 'none';
                }
                if (themeText) themeText.textContent = 'Dark';
            }
        }
        
        // Show toast notification
        this.showToast(`Switched to ${theme} mode`, 'info');
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
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
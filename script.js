// MacKay Carbon Calculator JavaScript
// Based on UK Government MacKay Carbon Calculator methodology

class CarbonCalculator {
    constructor() {
        this.currentSector = 'transport';
        this.leverValues = {};
        this.emissionsChart = null;
        this.baselineEmissions = this.calculateBaselineEmissions(); // 1990 baseline in MtCO2e
        this.targetYear = 2050;
        this.scenarios = [];
        this.currentScenario = null;
        this.collaborationMode = false;
        this.aiInsights = [];
        this.userPreferences = this.loadUserPreferences();

        // Initialize lever values to level 1
        this.initializeLeverValues();
        this.initializeEventListeners();
        this.initializeChart();
        this.updateCalculations();

        // Initialize enhanced animations
        this.enhanceTabSwitching();
        this.initializeParticleSystem();
        this.initializeAdvancedInteractions();

        // Add initial staggered animation to levers (reduced on mobile)
        // Add initial staggered animation to levers
        setTimeout(() => {
            const levers = document.querySelectorAll('.lever');
            if (window.innerWidth > 768) {
                // Using simple fade in instead of bounce
                levers.forEach((lever, index) => {
                    lever.style.animation = `fadeIn 0.5s ease-out ${index * 0.05}s both`;
                });
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
        this.initializeCollaboration();
        this.initializeAIInsights();
        this.initializeAdvancedVisualizations();
        this.initializeAccessibility();
        this.initializePerformanceMonitoring();
        this.initializeMobileOptimizations();

        // Initial entrance animations
        this.applyInitialAnimations();
    }

    // Enhanced Particle System
    // Simplified Particle System (Disabled for professional look)
    initializeParticleSystem() {
        // Particle system disabled for cleaner UI
    }

    createBackgroundParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;

        container.appendChild(particle);

        setTimeout(() => particle.remove(), 2000);
    }

    // Enhanced Slider Interactions with Particles
    // Streamlined Interactions
    initializeAdvancedInteractions() {
        document.querySelectorAll('.lever-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                // Removed particle creation used previously
                this.addSliderGlow(e.target);
            });

            slider.addEventListener('mousedown', (e) => {
                e.target.style.cursor = 'grabbing';
            });

            slider.addEventListener('mouseup', (e) => {
                e.target.style.cursor = 'grab';
            });
        });

        // Standard tab interactions
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Removed particle burst
            });
        });
    }

    createSliderParticles(slider) {
        // Disabled
    }

    addSliderGlow(slider) {
        // Subtle focus indication instead of heavy glow
        const lever = slider.closest('.lever');
        lever.style.borderColor = 'var(--accent-primary)';

        setTimeout(() => {
            lever.style.borderColor = '';
        }, 300);
    }

    createSuccessRipple(element) {
        // Disabled ripple
    }

    createTabSwitchEffect(tab) {
        // Disabled particle burst
    }

    createButtonRipple(e) {
        // Standard CSS active state is sufficient
    }

    // Advanced Features: Real-time Comparison Visualization
    updateComparisonVisualization() {
        const currentEmissions = this.calculateTotalEmissions();
        const baseline = this.baselineEmissions;
        const target = baseline * 0.05; // Net zero target (95% reduction)

        // Create or update comparison panel
        let comparisonPanel = document.querySelector('.progress-comparison');
        if (!comparisonPanel) {
            comparisonPanel = this.createComparisonPanel();
        }

        // Update comparison bars with animation
        this.animateComparisonBar('baseline-bar', 100, `${baseline.toFixed(0)} MtCO₂e`);
        this.animateComparisonBar('current-bar', (currentEmissions / baseline) * 100, `${currentEmissions.toFixed(0)} MtCO₂e`);
        this.animateComparisonBar('target-bar', (target / baseline) * 100, `${target.toFixed(0)} MtCO₂e`);
        this.animateComparisonBar('global-avg-bar', 30, '~120 MtCO₂e');
    }

    createComparisonPanel() {
        const impactTab = document.getElementById('impact-tab');
        if (!impactTab) {
            console.warn('Impact tab not found, appending to results panel');
            const resultsPanel = document.querySelector('.results-panel');
            const panel = document.createElement('div');
            panel.className = 'progress-comparison';
            panel.innerHTML = this.getComparisonHTML();
            resultsPanel.appendChild(panel);
            return panel;
        }

        const panel = document.createElement('div');
        panel.className = 'progress-comparison';
        panel.innerHTML = this.getComparisonHTML();
        impactTab.appendChild(panel);
        return panel;
    }

    getComparisonHTML() {
        return `
            <h4>📊 Comparison with Targets</h4>
            <div class="comparison-bar">
                <span class="comparison-label">1990 Baseline</span>
                <div class="comparison-track">
                    <div class="comparison-fill" id="baseline-bar" style="width: 0%; background: var(--text-secondary)"></div>
                </div>
                <span class="comparison-value" id="baseline-value">0</span>
            </div>
            <div class="comparison-bar">
                <span class="comparison-label">Your Scenario</span>
                <div class="comparison-track">
                    <div class="comparison-fill" id="current-bar" style="width: 0%; background: var(--accent-primary)"></div>
                </div>
                <span class="comparison-value" id="current-value">0</span>
            </div>
            <div class="comparison-bar">
                <span class="comparison-label">2050 Target</span>
                <div class="comparison-track">
                    <div class="comparison-fill" id="target-bar" style="width: 0%; background: var(--accent-secondary)"></div>
                </div>
                <span class="comparison-value" id="target-value">0</span>
            </div>
            <div class="comparison-bar">
                <span class="comparison-label">Global Average</span>
                <div class="comparison-track">
                    <div class="comparison-fill" id="global-avg-bar" style="width: 0%; background: var(--accent-warning)"></div>
                </div>
                <span class="comparison-value" id="global-avg-value">0</span>
            </div>
        `;
    }

    animateComparisonBar(barId, percentage, value) {
        const bar = document.getElementById(barId);
        const valueElement = document.getElementById(barId.replace('-bar', '-value'));

        if (bar && valueElement) {
            setTimeout(() => {
                bar.style.width = percentage + '%';
                valueElement.textContent = value;
            }, 100);
        }
    }

    // Achievement Badge System
    initializeAchievements() {
        const badges = [
            { id: 'first-step', icon: '🌱', title: 'First Step', condition: () => true },
            { id: 'reducer', icon: '♻️', title: 'Reducer', condition: () => this.calculateReduction() > 20 },
            { id: 'green-hero', icon: '🦸', title: 'Green Hero', condition: () => this.calculateReduction() > 50 },
            { id: 'climate-warrior', icon: '⚔️', title: 'Climate Warrior', condition: () => this.calculateReduction() > 70 },
            { id: 'net-zero', icon: '🎯', title: 'Net Zero', condition: () => this.calculateReduction() > 95 },
            { id: 'max-effort', icon: '💯', title: 'Max Effort', condition: () => Object.values(this.leverValues).every(v => v === 4) }
        ];

        let achievementsPanel = document.querySelector('.achievements-panel');
        if (!achievementsPanel) {
            achievementsPanel = this.createAchievementsPanel(badges);
        }

        this.updateAchievements(badges);
    }

    createAchievementsPanel(badges) {
        const impactTab = document.getElementById('impact-tab');
        const panel = document.createElement('div');
        panel.className = 'achievements-panel';
        panel.innerHTML = `
            <h4>🏆 Achievements</h4>
            <div class="badges-grid">
                ${badges.map(badge => `
                    <div class="badge locked" id="badge-${badge.id}" title="${badge.title}">
                        <div class="badge-icon">${badge.icon}</div>
                        <div class="badge-title">${badge.title}</div>
                    </div>
                `).join('')}
            </div>
        `;

        if (impactTab) {
            impactTab.appendChild(panel);
        } else {
            const resultsPanel = document.querySelector('.results-panel');
            resultsPanel.appendChild(panel);
        }
        return panel;
    }

    updateAchievements(badges) {
        badges.forEach(badge => {
            const element = document.getElementById(`badge-${badge.id}`);
            if (element && badge.condition()) {
                if (element.classList.contains('locked')) {
                    element.classList.remove('locked');
                    element.classList.add('unlocked');
                    this.showAchievementNotification(badge);
                }
            }
        });
    }

    showAchievementNotification(badge) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <span class="achievement-icon">${badge.icon}</span>
                <div class="achievement-text">
                    <strong>Achievement Unlocked!</strong>
                    <p>${badge.title}</p>
                </div>
            </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    calculateReduction() {
        const current = this.calculateTotalEmissions();
        const baseline = this.baselineEmissions;
        return ((baseline - current) / baseline) * 100;
    }

    // Live Impact Visualization
    createLiveImpactViz() {
        const impactTab = document.getElementById('impact-tab');
        const currentEmissions = this.calculateTotalEmissions();
        const reduction = this.calculateReduction();

        // Calculate equivalent impacts
        const treesEquivalent = Math.floor(reduction * 50); // Rough estimate
        const carsOffRoad = Math.floor(reduction * 10);
        const homesEnergy = Math.floor(reduction * 5);

        let vizPanel = document.querySelector('.live-impact-viz');
        if (!vizPanel) {
            vizPanel = document.createElement('div');
            vizPanel.className = 'live-impact-viz';
            if (impactTab) {
                impactTab.appendChild(vizPanel);
            } else {
                const resultsPanel = document.querySelector('.results-panel');
                resultsPanel.appendChild(vizPanel);
            }
        }

        vizPanel.innerHTML = `
            <h4>🌍 Your Impact Equals...</h4>
            <div class="impact-items">
                <div class="impact-item">
                    <div class="impact-icon">🌳</div>
                    <div class="impact-value">${treesEquivalent}</div>
                    <div class="impact-label">Trees Planted</div>
                </div>
                <div class="impact-item">
                    <div class="impact-icon">🚗</div>
                    <div class="impact-value">${carsOffRoad}</div>
                    <div class="impact-label">Cars Off Road</div>
                </div>
                <div class="impact-item">
                    <div class="impact-icon">🏠</div>
                    <div class="impact-value">${homesEnergy}</div>
                    <div class="impact-label">Homes Powered</div>
                </div>
                <div class="impact-item">
                    <div class="impact-icon">⚡</div>
                    <div class="impact-value">${reduction.toFixed(0)}%</div>
                    <div class="impact-label">Total Reduction</div>
                </div>
            </div>
        `;
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
        // Results tabs switching
        document.querySelectorAll('.results-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchResultsTab(e.target.dataset.tab);
            });
        });

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

                // Generate particles - Disabled
                // this.createParticles(lever);

                // Brief glow pulse - Disabled
                // lever.classList.add('pulse-glow');
                // setTimeout(() => lever.classList.remove('pulse-glow'), 300);
            });

            // Interaction without advanced animations
            // this.enhanceLeverInteraction(lever, slider);

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

    applyInitialAnimations() {
        const panels = document.querySelectorAll('.controls-panel, .results-panel');
        panels.forEach((panel, idx) => {
            setTimeout(() => panel.classList.add('animate-in'), idx * 80);
        });
    }

    switchResultsTab(tabId) {
        // Update active tab button
        document.querySelectorAll('.results-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`.results-tab-btn[data-tab="${tabId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Update active content
        document.querySelectorAll('.results-tab-content').forEach(content => {
            content.classList.remove('active');
            content.classList.remove('animate-in');
        });
        const activeContent = document.getElementById(`${tabId}-tab`);
        if (activeContent) {
            activeContent.classList.add('active');
            // trigger enter animation
            requestAnimationFrame(() => {
                activeContent.classList.add('animate-in');
            });
        }
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

        // NEW ADVANCED FEATURES
        // Update comparison visualization
        this.updateComparisonVisualization();

        // Update achievements
        this.initializeAchievements();

        // Update live impact visualization
        this.createLiveImpactViz();
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
        const saveBtn = document.getElementById('saveScenarioBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.showModal('saveScenarioModal');
            });
        }

        const loadBtn = document.getElementById('loadScenarioBtn');
        if (loadBtn) {
            loadBtn.addEventListener('click', () => {
                this.loadSavedScenarios();
                this.showModal('loadScenarioModal');
            });
        }

        const compareBtn = document.getElementById('compareBtn');
        if (compareBtn) {
            compareBtn.addEventListener('click', () => {
                this.switchResultsTab('analytics');
                setTimeout(() => this.showAnalyticsTab('comparison'), 100);
            });
        }

        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.showModal('exportModal');
            });
        }

        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareScenario();
            });
        }

        const helpBtn = document.getElementById('helpBtn');
        if (helpBtn) {
            helpBtn.addEventListener('click', () => {
                this.showModal('helpModal');
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
                const modalId = e.target.getAttribute('data-modal');
                if (modalId) {
                    this.hideModal(modalId);
                } else {
                    const modal = e.target.closest('.modal');
                    if (modal) {
                        this.hideModal(modal.id);
                    }
                }
            });
        });

        // Cancel buttons with data-modal attribute
        document.querySelectorAll('[data-modal]').forEach(btn => {
            if (btn.classList.contains('btn-secondary') || btn.classList.contains('btn')) {
                btn.addEventListener('click', (e) => {
                    const modalId = e.target.getAttribute('data-modal');
                    if (modalId) {
                        this.hideModal(modalId);
                    }
                });
            }
        });

        // Help tabs
        document.querySelectorAll('.help-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const sectionId = e.target.getAttribute('data-help');
                if (sectionId) {
                    this.showHelpSection(sectionId);
                }
            });
        });

        // Save scenario button
        const confirmSaveBtn = document.getElementById('confirmSaveScenario');
        if (confirmSaveBtn) {
            confirmSaveBtn.addEventListener('click', () => {
                this.saveScenario();
                this.hideModal('saveScenarioModal');
            });
        }

        // Export confirm button
        const confirmExportBtn = document.getElementById('confirmExport');
        if (confirmExportBtn) {
            confirmExportBtn.addEventListener('click', () => {
                this.exportData();
                this.hideModal('exportModal');
            });
        }

        // Clear all scenarios button
        const clearAllBtn = document.getElementById('clearAllScenarios');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete all saved scenarios? This cannot be undone.')) {
                    this.scenarios = [];
                    localStorage.removeItem('carbonCalculatorScenarios');
                    this.loadSavedScenarios();
                    this.showToast('All scenarios cleared', 'success');
                }
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

    hideModalWithAnimation(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.animation = 'modalSlideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        setTimeout(() => {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    showHelpSection(sectionId) {
        // Update tab states
        document.querySelectorAll('.help-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        const activeTab = document.querySelector(`[data-help="${sectionId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

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
        const activeTab = document.querySelector(`.analytics-tab[data-tab="${tabId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Update section visibility
        document.querySelectorAll('.analytics-section').forEach(section => {
            section.classList.remove('active');
        });
        const analyticsElement = document.getElementById(`${tabId}-section`);
        if (analyticsElement) {
            analyticsElement.classList.add('active');
        }

        // Update analytics data for the specific tab
        this.updateAnalyticsTab(tabId);
    }

    saveScenario() {
        const nameInput = document.getElementById('scenarioName');
        const descInput = document.getElementById('scenarioDescription');
        const defaultCheckbox = document.getElementById('setAsDefault');

        if (!nameInput || !nameInput.value.trim()) {
            this.showToast('Please enter a scenario name', 'error');
            return;
        }

        const scenario = {
            id: Date.now().toString(),
            name: nameInput.value.trim(),
            description: descInput ? descInput.value.trim() : '',
            values: { ...this.leverValues },
            timestamp: new Date().toISOString(),
            emissions: this.calculateTotalEmissions(),
            isDefault: defaultCheckbox ? defaultCheckbox.checked : false
        };

        this.scenarios.push(scenario);
        localStorage.setItem('carbonCalculatorScenarios', JSON.stringify(this.scenarios));

        this.showToast('Scenario saved successfully!', 'success');

        // Clear form
        if (nameInput) nameInput.value = '';
        if (descInput) descInput.value = '';
        if (defaultCheckbox) defaultCheckbox.checked = false;
    }

    loadSavedScenarios() {
        const container = document.getElementById('scenariosList');
        if (!container) {
            console.error('Scenarios list container not found');
            return;
        }

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
            const slider = document.querySelector(`[data-lever="${leverId}"]`);
            if (slider) {
                slider.value = scenario.values[leverId];
                this.updateLever(leverId, scenario.values[leverId]);
            }
        });

        this.updateCalculations();
        this.hideModal('loadScenarioModal');
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

    calculateSectorEmissions() {
        // Base emissions (MtCO2e) roughly based on UK data
        const baseEmissions = {
            transport: 120,
            buildings: 90,
            industry: 70,
            electricity: 60,
            agriculture: 50,
            landUse: 10,
            waste: 20
        };

        // Calculate reductions based on levers
        // Scale 1-4 to 0-1 multiplier (1 = 100% impact, 4 = 25% emissions / 75% reduction)
        const getReductionFactor = (val) => 1 - ((val - 1) * 0.25);

        // Transport levers
        const transportFactor = (
            getReductionFactor(this.leverValues['transport-demand'] || 1) *
            getReductionFactor(this.leverValues['electric-cars'] || 1) *
            getReductionFactor(this.leverValues['freight-efficiency'] || 1)
        );

        // Buildings levers
        const buildingsFactor = (
            getReductionFactor(this.leverValues['building-insulation'] || 1) *
            getReductionFactor(this.leverValues['heat-pumps'] || 1) *
            getReductionFactor(this.leverValues['building-temp'] || 1)
        );

        // Electricity levers (grid decarbonization affects other sectors too, but simplified here)
        const electricityFactor = (
            getReductionFactor(this.leverValues['wind-offshore'] || 1) *
            getReductionFactor(this.leverValues['solar-pv'] || 1) *
            getReductionFactor(this.leverValues['nuclear'] || 1) *
            getReductionFactor(this.leverValues['ccs-power'] || 1)
        );

        // Industry levers
        const industryFactor = (
            getReductionFactor(this.leverValues['industry-efficiency'] || 1) *
            getReductionFactor(this.leverValues['ccs-industry'] || 1)
        );

        // Land use & Bioenergy
        const landUseFactor = (
            getReductionFactor(this.leverValues['forestry'] || 1) *
            getReductionFactor(this.leverValues['bioenergy'] || 1)
        );

        return {
            transport: baseEmissions.transport * transportFactor,
            buildings: baseEmissions.buildings * buildingsFactor,
            industry: baseEmissions.industry * industryFactor,
            electricity: baseEmissions.electricity * electricityFactor,
            landUse: baseEmissions.landUse * landUseFactor + baseEmissions.agriculture * landUseFactor,
            waste: baseEmissions.waste * 0.8 // Assume constant improvement
        };
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
        const trendsCtx = document.getElementById('trendsChart')?.getContext('2d');
        if (!trendsCtx) return;

        // Destroy existing chart if it exists to prevent memory leaks/glitches
        if (this.trendsChartInstance) {
            this.trendsChartInstance.destroy();
        }

        const currentEmissions = this.calculateTotalEmissions();
        const years = [2020, 2025, 2030, 2035, 2040, 2045, 2050];
        // Generate a smooth curve from 2020 (approx 450) to 2050 target
        const generateTrend = (start, end) => {
            return years.map((year, i) => {
                const progress = i / (years.length - 1);
                // Ease-out function for realistic curve
                const factor = 1 - Math.pow(1 - progress, 3);
                return Math.round(start - (start - end) * factor);
            });
        };

        const dataPoints = generateTrend(450, currentEmissions);

        this.trendsChartInstance = new Chart(trendsCtx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Projected Emissions (MtCO₂e)',
                    data: dataPoints,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Transition Pathway 2020-2050'
                    },
                    legend: {
                        display: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'MtCO₂e'
                        }
                    }
                }
            }
        });
    }

    updateComparison() {
        const comparisonCtx = document.getElementById('comparisonChart')?.getContext('2d');
        if (!comparisonCtx) return;

        if (this.comparisonChartInstance) {
            this.comparisonChartInstance.destroy();
        }

        const currentEmissions = this.calculateSectorEmissions();

        // Define baseline scenario (Level 1 everywhere)
        const baselineEmissions = {
            transport: 120,
            buildings: 90,
            industry: 70,
            electricity: 60,
            landUse: 60, // ag + land use
            waste: 20
        };

        const labels = Object.keys(currentEmissions).map(k => k.charAt(0).toUpperCase() + k.slice(1));
        const currentData = Object.values(currentEmissions);
        const baselineData = Object.values(baselineEmissions);

        this.comparisonChartInstance = new Chart(comparisonCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Current Scenario',
                        data: currentData,
                        backgroundColor: '#2ecc71',
                        borderRadius: 4
                    },
                    {
                        label: 'Baseline (No Action)',
                        data: baselineData,
                        backgroundColor: '#95a5a6',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Sector Comparison vs Baseline'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'MtCO₂e' },
                        stacked: false
                    },
                    x: {
                        stacked: false
                    }
                }
            }
        });
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
            this.createParticles = () => { };

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

    // New Advanced Features

    initializeCollaboration() {
        this.collaborationSocket = null;
        this.collaborators = new Map();
        this.collaborationId = this.generateCollaborationId();

        // Initialize WebSocket for real-time collaboration
        this.initializeWebSocket();

        // Add collaboration UI
        this.addCollaborationUI();
    }

    initializeWebSocket() {
        // Simulate WebSocket connection for demo purposes
        // In production, this would connect to a real WebSocket server
        console.log('Initializing collaboration features...');

        // Simulate real-time updates
        setInterval(() => {
            if (this.collaborationMode) {
                this.simulateCollaborationUpdate();
            }
        }, 5000);
    }

    addCollaborationUI() {
        const toolbar = document.querySelector('.features-toolbar');
        if (!toolbar) return;

        const collaborationBtn = document.createElement('button');
        collaborationBtn.className = 'feature-btn collaboration-btn';
        collaborationBtn.id = 'collaborationBtn';
        collaborationBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.13,14.5 12,14.5C15.87,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"/>
            </svg>
            <span>Collaborate</span>
        `;
        collaborationBtn.title = 'Start Real-time Collaboration';

        collaborationBtn.addEventListener('click', () => {
            this.toggleCollaboration();
        });

        toolbar.appendChild(collaborationBtn);
    }

    toggleCollaboration() {
        this.collaborationMode = !this.collaborationMode;
        const btn = document.getElementById('collaborationBtn');

        if (this.collaborationMode) {
            btn.classList.add('active');
            btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.13,14.5 12,14.5C15.87,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"/>
                </svg>
                <span>Collaborating</span>
            `;
            this.showToast('Collaboration mode enabled! Share the link with others.', 'success');
            this.startCollaboration();
        } else {
            btn.classList.remove('active');
            btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.13,14.5 12,14.5C15.87,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"/>
                </svg>
                <span>Collaborate</span>
            `;
            this.showToast('Collaboration mode disabled.', 'info');
            this.stopCollaboration();
        }
    }

    startCollaboration() {
        // Update URL with collaboration ID
        const url = new URL(window.location.href);
        url.searchParams.set('collaborate', this.collaborationId);
        window.history.replaceState({}, '', url);

        // Add collaboration indicator
        this.addCollaborationIndicator();

        // Start sharing lever changes
        this.shareLeverChanges();
    }

    stopCollaboration() {
        // Remove collaboration ID from URL
        const url = new URL(window.location.href);
        url.searchParams.delete('collaborate');
        window.history.replaceState({}, '', url);

        // Remove collaboration indicator
        this.removeCollaborationIndicator();
    }

    addCollaborationIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'collaborationIndicator';
        indicator.className = 'collaboration-indicator';
        indicator.innerHTML = `
            <div class="indicator-dot"></div>
            <span>Live Collaboration Active</span>
        `;

        document.body.appendChild(indicator);
    }

    removeCollaborationIndicator() {
        const indicator = document.getElementById('collaborationIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    shareLeverChanges() {
        // Simulate sharing lever changes with other collaborators
        const changeData = {
            type: 'lever_change',
            leverValues: this.leverValues,
            timestamp: Date.now(),
            userId: this.userPreferences.userId || 'anonymous'
        };

        // In a real implementation, this would be sent via WebSocket
        console.log('Sharing lever changes:', changeData);
    }

    simulateCollaborationUpdate() {
        // Simulate receiving updates from other collaborators
        const mockUpdate = {
            type: 'lever_change',
            leverValues: this.generateMockLeverValues(),
            timestamp: Date.now(),
            userId: 'collaborator-' + Math.floor(Math.random() * 1000)
        };

        this.handleCollaborationUpdate(mockUpdate);
    }

    handleCollaborationUpdate(update) {
        // Handle incoming collaboration updates
        if (update.type === 'lever_change') {
            this.showCollaborationNotification(update);
        }
    }

    showCollaborationNotification(update) {
        const notification = document.createElement('div');
        notification.className = 'collaboration-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">👥</div>
                <div class="notification-text">
                    <strong>${update.userId}</strong> updated the scenario
                </div>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }

    generateCollaborationId() {
        return 'collab-' + Math.random().toString(36).substr(2, 9);
    }

    generateMockLeverValues() {
        const mockValues = {};
        Object.keys(this.leverValues).forEach(key => {
            mockValues[key] = Math.floor(Math.random() * 4) + 1;
        });
        return mockValues;
    }

    // AI Insights System
    initializeAIInsights() {
        this.aiInsights = [];
        this.insightUpdateInterval = null;

        // Start AI insights generation
        this.startAIInsights();

        // Add AI insights UI
        this.addAIInsightsUI();
    }

    startAIInsights() {
        // Generate initial insights
        this.generateAIInsights();

        // Update insights periodically
        this.insightUpdateInterval = setInterval(() => {
            this.generateAIInsights();
        }, 30000); // Every 30 seconds
    }

    generateAIInsights() {
        const insights = [];
        const totalEmissions = this.calculateTotalEmissions();
        const reductionPercent = this.calculateReductionFrom1990();

        // Analyze current scenario and generate insights
        if (reductionPercent < 50) {
            insights.push({
                type: 'warning',
                title: 'Low Reduction Target',
                message: 'Current settings achieve less than 50% reduction. Consider increasing renewable energy and transport electrification.',
                priority: 'high',
                action: 'increase_renewables'
            });
        }

        if (this.leverValues['electric-cars'] < 3) {
            insights.push({
                type: 'recommendation',
                title: 'Transport Electrification',
                message: 'Electric vehicle adoption is below optimal levels. Increasing to level 3+ could reduce transport emissions by 30-45%.',
                priority: 'medium',
                action: 'increase_electric_cars'
            });
        }

        if (this.leverValues['wind'] < 3 || this.leverValues['solar'] < 3) {
            insights.push({
                type: 'opportunity',
                title: 'Renewable Energy Potential',
                message: 'Wind and solar deployment could be increased. Level 4 deployment could reduce electricity emissions by up to 60%.',
                priority: 'medium',
                action: 'increase_renewables'
            });
        }

        if (totalEmissions <= 0) {
            insights.push({
                type: 'success',
                title: 'Net Zero Achieved!',
                message: 'Congratulations! Your scenario achieves net zero emissions. Consider sharing this successful configuration.',
                priority: 'high',
                action: 'share_scenario'
            });
        }

        // Add cost-benefit analysis
        const costAnalysis = this.analyzeCostBenefit();
        if (costAnalysis) {
            insights.push(costAnalysis);
        }

        this.aiInsights = insights;
        this.updateAIInsightsUI();
    }

    analyzeCostBenefit() {
        const totalEmissions = this.calculateTotalEmissions();
        const reductionPercent = this.calculateReductionFrom1990();

        // Simple cost-benefit analysis
        const estimatedCost = this.estimateImplementationCost();
        const estimatedSavings = this.estimateCarbonSavings();

        if (estimatedSavings > estimatedCost * 2) {
            return {
                type: 'opportunity',
                title: 'High Return Investment',
                message: `Estimated carbon savings (£${estimatedSavings.toFixed(0)}M) significantly outweigh implementation costs (£${estimatedCost.toFixed(0)}M).`,
                priority: 'high',
                action: 'view_cost_analysis'
            };
        }

        return null;
    }

    estimateImplementationCost() {
        // Simplified cost estimation based on lever settings
        let totalCost = 0;

        Object.entries(this.leverValues).forEach(([lever, value]) => {
            const baseCost = this.getLeverBaseCost(lever);
            totalCost += baseCost * value;
        });

        return totalCost;
    }

    estimateCarbonSavings() {
        const reductionPercent = this.calculateReductionFrom1990();
        const baselineEmissions = this.baselineEmissions;

        // Estimate savings based on carbon price (£50/tonne CO2e)
        const carbonPrice = 50;
        const emissionsReduced = (reductionPercent / 100) * baselineEmissions;

        return emissionsReduced * carbonPrice;
    }

    getLeverBaseCost(lever) {
        const costMap = {
            'electric-cars': 5000,
            'wind': 2000,
            'solar': 1500,
            'heat-pumps': 3000,
            'insulation': 1000,
            'nuclear': 8000,
            'ccs': 6000,
            'direct-air-capture': 10000
        };

        return costMap[lever] || 1000;
    }

    addAIInsightsUI() {
        const resultsPanel = document.querySelector('.results-panel');
        if (!resultsPanel) return;

        const insightsSection = document.createElement('div');
        insightsSection.className = 'ai-insights-section';
        insightsSection.innerHTML = `
            <h4>🤖 AI Insights</h4>
            <div class="insights-container" id="aiInsightsContainer">
                <div class="loading-insights">Analyzing your scenario...</div>
            </div>
        `;

        resultsPanel.appendChild(insightsSection);
    }

    updateAIInsightsUI() {
        const container = document.getElementById('aiInsightsContainer');
        if (!container) return;

        if (this.aiInsights.length === 0) {
            container.innerHTML = '<div class="no-insights">No insights available at this time.</div>';
            return;
        }

        const insightsHTML = this.aiInsights.map(insight => `
            <div class="ai-insight-card ${insight.type} ${insight.priority}">
                <div class="insight-header">
                    <span class="insight-type">${this.getInsightIcon(insight.type)}</span>
                    <span class="insight-title">${insight.title}</span>
                    <span class="insight-priority">${insight.priority}</span>
                </div>
                <div class="insight-message">${insight.message}</div>
                <div class="insight-actions">
                    <button class="insight-action-btn" data-action="${insight.action}">
                        ${this.getActionText(insight.action)}
                    </button>
                </div>
            </div>
        `).join('');

        container.innerHTML = insightsHTML;

        // Add event listeners to action buttons
        container.querySelectorAll('.insight-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleInsightAction(e.target.dataset.action);
            });
        });
    }

    getInsightIcon(type) {
        const icons = {
            'warning': '⚠️',
            'recommendation': '💡',
            'opportunity': '🚀',
            'success': '✅'
        };
        return icons[type] || 'ℹ️';
    }

    getActionText(action) {
        const actions = {
            'increase_renewables': 'Increase Renewables',
            'increase_electric_cars': 'Boost EV Adoption',
            'share_scenario': 'Share Scenario',
            'view_cost_analysis': 'View Analysis'
        };
        return actions[action] || 'Learn More';
    }

    handleInsightAction(action) {
        switch (action) {
            case 'increase_renewables':
                this.autoAdjustRenewables();
                break;
            case 'increase_electric_cars':
                this.autoAdjustElectricCars();
                break;
            case 'share_scenario':
                this.shareScenario();
                break;
            case 'view_cost_analysis':
                this.showCostAnalysis();
                break;
        }
    }

    autoAdjustRenewables() {
        const windSlider = document.querySelector('[data-lever="wind"]');
        const solarSlider = document.querySelector('[data-lever="solar"]');

        if (windSlider && windSlider.value < 4) {
            windSlider.value = 4;
            windSlider.dispatchEvent(new Event('input'));
        }

        if (solarSlider && solarSlider.value < 4) {
            solarSlider.value = 4;
            solarSlider.dispatchEvent(new Event('input'));
        }

        this.showToast('Renewable energy levels increased automatically!', 'success');
    }

    autoAdjustElectricCars() {
        const electricCarsSlider = document.querySelector('[data-lever="electric-cars"]');

        if (electricCarsSlider && electricCarsSlider.value < 4) {
            electricCarsSlider.value = 4;
            electricCarsSlider.dispatchEvent(new Event('input'));
        }

        this.showToast('Electric vehicle adoption increased automatically!', 'success');
    }

    showCostAnalysis() {
        const cost = this.estimateImplementationCost();
        const savings = this.estimateCarbonSavings();
        const roi = ((savings - cost) / cost * 100).toFixed(1);

        this.showModal('costAnalysisModal');

        // Update cost analysis modal content
        const modal = document.getElementById('costAnalysisModal');
        if (modal) {
            const content = modal.querySelector('.modal-body');
            content.innerHTML = `
                <div class="cost-analysis">
                    <h4>Cost-Benefit Analysis</h4>
                    <div class="cost-metrics">
                        <div class="cost-metric">
                            <span class="metric-label">Implementation Cost:</span>
                            <span class="metric-value">£${cost.toFixed(0)}M</span>
                        </div>
                        <div class="cost-metric">
                            <span class="metric-label">Carbon Savings:</span>
                            <span class="metric-value">£${savings.toFixed(0)}M</span>
                        </div>
                        <div class="cost-metric">
                            <span class="metric-label">Return on Investment:</span>
                            <span class="metric-value ${roi > 0 ? 'positive' : 'negative'}">${roi}%</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Advanced Visualizations
    initializeAdvancedVisualizations() {
        this.initializeSankeyDiagram();
        this.initializeHeatmap();
        this.initializeTimelineChart();
    }

    initializeSankeyDiagram() {
        // Add Sankey diagram for energy flow visualization
        const sankeyContainer = document.createElement('div');
        sankeyContainer.id = 'sankeyDiagram';
        sankeyContainer.className = 'advanced-visualization';
        sankeyContainer.innerHTML = `
            <h4>Energy Flow Visualization</h4>
            <canvas id="sankeyCanvas" width="600" height="400"></canvas>
        `;

        const resultsPanel = document.querySelector('.results-panel');
        if (resultsPanel) {
            resultsPanel.appendChild(sankeyContainer);
        }

        this.updateSankeyDiagram();
    }

    updateSankeyDiagram() {
        const canvas = document.getElementById('sankeyCanvas');
        if (!canvas) return;

        // Handle High DPI displays
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Logical dimensions
        const width = rect.width;
        const height = rect.height;

        // Set display size (css pixels)
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        // Set actual size in memory (scaled to account for extra pixel density)
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);

        const ctx = canvas.getContext('2d');

        // Normalize coordinate system to use css pixels.
        ctx.scale(dpr, dpr);

        ctx.clearRect(0, 0, width, height);

        // Draw with logical dimensions
        this.drawSankeyDiagram(ctx, width, height);
    }

    drawSankeyDiagram(ctx, width, height) {
        // Draw energy flow from sources to sectors
        const flows = this.calculateEnergyFlows();
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

        const textColor = isDarkMode ? '#ecf0f1' : '#2c3e50';
        ctx.font = '500 12px Inter, sans-serif';
        ctx.fillStyle = textColor;

        // Calculate dynamic spacing
        const usableHeight = height - 40;
        const itemSpacing = Math.min(80, usableHeight / (flows.length || 1));
        const startY = 30 + (usableHeight - (flows.length * itemSpacing)) / 2;

        const sourceX = 150;
        const targetX = width - 160;

        flows.forEach((flow, index) => {
            const y1 = startY + (index * itemSpacing);
            const y2 = startY + (index * itemSpacing);

            // Define colors
            const baseColor = isDarkMode ? '#3498db' : '#2980b9'; // Blue

            // Draw connection line
            ctx.beginPath();
            ctx.moveTo(sourceX + 10, y1);
            ctx.bezierCurveTo(
                sourceX + 150, y1,
                targetX - 100, y2,
                targetX - 5, y2
            );

            // Gradient stroke
            const gradient = ctx.createLinearGradient(sourceX, y1, targetX, y2);
            gradient.addColorStop(0, hexToRgba(baseColor, 0.6));
            gradient.addColorStop(1, hexToRgba(isDarkMode ? '#2ecc71' : '#27ae60', 0.6));

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 5;
            ctx.stroke();

            // Source Label
            ctx.textAlign = 'right';
            ctx.fillStyle = textColor;
            ctx.fillText(`${flow.source} (${Math.round(flow.value || 0)})`, sourceX - 10, y1 + 4);

            // Target Label
            ctx.textAlign = 'left';
            ctx.fillText(`→ ${flow.target}`, targetX + 15, y2 + 4);

            // Source Node Dot
            ctx.beginPath();
            ctx.arc(sourceX, y1, 6, 0, Math.PI * 2);
            ctx.fillStyle = baseColor;
            ctx.fill();

            // Target Node Dot
            ctx.beginPath();
            ctx.arc(targetX, y2, 6, 0, Math.PI * 2);
            ctx.fillStyle = isDarkMode ? '#2ecc71' : '#27ae60';
            ctx.fill();
        });

        // Helper to add alpha to hex
        function hexToRgba(hex, alpha) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
    }

    calculateEnergyFlows() {
        // Use correct lever IDs
        const wind = (this.leverValues['wind-onshore'] || 1) + (this.leverValues['wind-offshore'] || 1);
        const solar = this.leverValues['solar-pv'] || 1;
        const nuclear = this.leverValues['nuclear'] || 1;
        const bio = this.leverValues['bioenergy'] || 1;

        const elec = this.leverValues['electric-cars'] || 1;
        const heat = this.leverValues['heat-pumps'] || 1;

        return [
            { source: 'Renewables', target: 'Electricity', value: wind + solar },
            { source: 'Nuclear', target: 'Electricity', value: nuclear },
            { source: 'Bioenergy', target: 'Electricity', value: bio },
            { source: 'Electricity', target: 'Transport', value: elec },
            { source: 'Electricity', target: 'Buildings', value: heat }
        ];
    }

    initializeHeatmap() {
        // Add heatmap for sector comparison
        const heatmapContainer = document.createElement('div');
        heatmapContainer.id = 'heatmapVisualization';
        heatmapContainer.className = 'advanced-visualization';
        heatmapContainer.innerHTML = `
            <h4>Sector Performance Heatmap</h4>
            <div id="heatmapGrid"></div>
        `;

        const resultsPanel = document.querySelector('.results-panel');
        if (resultsPanel) {
            resultsPanel.appendChild(heatmapContainer);
        }

        this.updateHeatmap();
    }

    updateHeatmap() {
        const grid = document.getElementById('heatmapGrid');
        if (!grid) return;

        const sectors = ['Transport', 'Buildings', 'Industry', 'Electricity', 'Land Use'];
        const metrics = ['Efficiency', 'Reduction', 'Feasibility', 'Cost'];

        let gridHTML = '<div class="heatmap-header"></div>';

        // Create header row
        gridHTML += '<div class="heatmap-row header">';
        gridHTML += '<div class="heatmap-cell header">Sector</div>';
        metrics.forEach(metric => {
            gridHTML += `<div class="heatmap-cell header">${metric}</div>`;
        });
        gridHTML += '</div>';

        // Create data rows
        sectors.forEach(sector => {
            gridHTML += '<div class="heatmap-row">';
            gridHTML += `<div class="heatmap-cell sector">${sector}</div>`;

            metrics.forEach(metric => {
                const value = this.calculateHeatmapValue(sector, metric);
                const intensity = Math.min(value / 100, 1);
                const color = this.getHeatmapColor(intensity);

                gridHTML += `<div class="heatmap-cell" style="background-color: ${color}">${value}%</div>`;
            });

            gridHTML += '</div>';
        });

        grid.innerHTML = gridHTML;
    }

    calculateHeatmapValue(sector, metric) {
        // Simplified calculation for demo
        const baseValues = {
            'Transport': { 'Efficiency': 75, 'Reduction': 60, 'Feasibility': 80, 'Cost': 70 },
            'Buildings': { 'Efficiency': 85, 'Reduction': 70, 'Feasibility': 90, 'Cost': 60 },
            'Industry': { 'Efficiency': 65, 'Reduction': 50, 'Feasibility': 70, 'Cost': 80 },
            'Electricity': { 'Efficiency': 90, 'Reduction': 85, 'Feasibility': 95, 'Cost': 75 },
            'Land Use': { 'Efficiency': 70, 'Reduction': 40, 'Feasibility': 85, 'Cost': 50 }
        };

        return baseValues[sector]?.[metric] || 50;
    }

    getHeatmapColor(intensity) {
        const red = Math.round(255 * (1 - intensity));
        const green = Math.round(255 * intensity);
        const blue = 0;
        return `rgb(${red}, ${green}, ${blue})`;
    }

    // Accessibility Features
    initializeAccessibility() {
        this.addKeyboardNavigation();
        this.addScreenReaderSupport();
        this.addHighContrastMode();
        this.addFontSizeControls();
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'Tab':
                    this.handleTabNavigation(e);
                    break;
                case 'Enter':
                case ' ':
                    this.handleActivation(e);
                    break;
                case 'Escape':
                    this.handleEscape(e);
                    break;
            }
        });
    }

    handleTabNavigation(e) {
        // Ensure proper tab order and focus management
        const focusableElements = document.querySelectorAll(
            'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (e.shiftKey) {
            // Shift+Tab - move backwards
            if (document.activeElement === focusableElements[0]) {
                e.preventDefault();
                focusableElements[focusableElements.length - 1].focus();
            }
        } else {
            // Tab - move forwards
            if (document.activeElement === focusableElements[focusableElements.length - 1]) {
                e.preventDefault();
                focusableElements[0].focus();
            }
        }
    }

    handleActivation(e) {
        if (e.target.classList.contains('lever-slider')) {
            e.preventDefault();
            // Handle slider activation
        }
    }

    handleEscape(e) {
        // Close any open modals
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            this.hideModal(openModal.id);
        }
    }

    addScreenReaderSupport() {
        // Add ARIA labels and descriptions
        document.querySelectorAll('.lever-slider').forEach(slider => {
            const lever = slider.closest('.lever');
            const label = lever.querySelector('label');

            slider.setAttribute('aria-label', `${label.textContent} level selector`);
            slider.setAttribute('aria-describedby', `${slider.id}-description`);

            // Add description element
            const description = document.createElement('div');
            description.id = `${slider.id}-description`;
            description.className = 'sr-only';
            description.textContent = `Adjust ${label.textContent} from level 1 (minimum) to level 4 (maximum)`;

            lever.appendChild(description);
        });
    }

    addHighContrastMode() {
        const highContrastBtn = document.createElement('button');
        highContrastBtn.className = 'feature-btn accessibility-btn';
        highContrastBtn.id = 'highContrastBtn';
        highContrastBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
            </svg>
            <span>High Contrast</span>
        `;

        highContrastBtn.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            this.showToast(
                document.body.classList.contains('high-contrast')
                    ? 'High contrast mode enabled'
                    : 'High contrast mode disabled',
                'info'
            );
        });

        const toolbar = document.querySelector('.features-toolbar');
        if (toolbar) {
            toolbar.appendChild(highContrastBtn);
        }
    }

    addFontSizeControls() {
        const fontSizeContainer = document.createElement('div');
        fontSizeContainer.className = 'font-size-controls';
        fontSizeContainer.innerHTML = `
            <button class="font-size-btn" id="decreaseFont" aria-label="Decrease font size">A-</button>
            <button class="font-size-btn" id="increaseFont" aria-label="Increase font size">A+</button>
        `;

        document.querySelector('header').appendChild(fontSizeContainer);

        document.getElementById('decreaseFont').addEventListener('click', () => {
            this.changeFontSize(-1);
        });

        document.getElementById('increaseFont').addEventListener('click', () => {
            this.changeFontSize(1);
        });
    }

    changeFontSize(delta) {
        const currentSize = parseInt(getComputedStyle(document.body).fontSize);
        const newSize = Math.max(12, Math.min(24, currentSize + delta));

        document.body.style.fontSize = `${newSize}px`;
        localStorage.setItem('fontSize', newSize);

        this.showToast(`Font size ${delta > 0 ? 'increased' : 'decreased'}`, 'info');
    }

    // Performance Monitoring
    initializePerformanceMonitoring() {
        this.performanceMetrics = {
            fps: 0,
            memoryUsage: 0,
            loadTime: 0,
            interactionTime: 0
        };

        this.startPerformanceMonitoring();
        this.addPerformanceUI();
    }

    startPerformanceMonitoring() {
        // Monitor FPS
        let frameCount = 0;
        let lastTime = performance.now();

        const measureFPS = (currentTime) => {
            frameCount++;

            if (currentTime - lastTime >= 1000) {
                this.performanceMetrics.fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;
                this.updatePerformanceUI();
            }

            requestAnimationFrame(measureFPS);
        };

        requestAnimationFrame(measureFPS);

        // Monitor memory usage (if available)
        if ('memory' in performance) {
            setInterval(() => {
                this.performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
            }, 5000);
        }

        // Monitor interaction time
        this.measureInteractionTime();
    }

    measureInteractionTime() {
        let startTime = performance.now();

        document.addEventListener('click', () => {
            const endTime = performance.now();
            this.performanceMetrics.interactionTime = endTime - startTime;
            startTime = endTime;
        });
    }

    addPerformanceUI() {
        const performancePanel = document.createElement('div');
        performancePanel.id = 'performancePanel';
        performancePanel.className = 'performance-panel';
        performancePanel.innerHTML = `
            <div class="performance-metric">
                <span class="metric-label">FPS:</span>
                <span class="metric-value" id="fpsValue">--</span>
            </div>
            <div class="performance-metric">
                <span class="metric-label">Memory:</span>
                <span class="metric-value" id="memoryValue">--</span>
            </div>
        `;

        // Only show in development mode
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            document.body.appendChild(performancePanel);
        }
    }

    updatePerformanceUI() {
        const fpsElement = document.getElementById('fpsValue');
        const memoryElement = document.getElementById('memoryValue');

        if (fpsElement) {
            fpsElement.textContent = this.performanceMetrics.fps;
            fpsElement.className = `metric-value ${this.performanceMetrics.fps < 30 ? 'warning' : ''}`;
        }

        if (memoryElement) {
            memoryElement.textContent = `${this.performanceMetrics.memoryUsage.toFixed(1)} MB`;
        }
    }

    // User Preferences Management
    loadUserPreferences() {
        const saved = localStorage.getItem('userPreferences');
        return saved ? JSON.parse(saved) : {
            userId: 'user-' + Math.random().toString(36).substr(2, 9),
            theme: 'light',
            fontSize: 16,
            animations: true,
            accessibility: {
                highContrast: false,
                reducedMotion: false
            }
        };
    }

    saveUserPreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
    }

    // Enhanced Error Handling
    handleError(error, context = 'general') {
        console.error(`Error in ${context}:`, error);

        // Show user-friendly error message
        this.showToast(`An error occurred: ${error.message}`, 'error');

        // Log to analytics (if available)
        if (window.gtag) {
            window.gtag('event', 'error', {
                error_message: error.message,
                error_context: context
            });
        }
    }

    // Enhanced Mobile Responsiveness
    initializeMobileOptimizations() {
        this.isMobile = window.innerWidth <= 768;
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // Add mobile-specific event listeners
        this.addMobileEventListeners();

        // Initialize mobile-specific features
        this.initializeMobileFeatures();

        // Handle orientation changes
        this.handleOrientationChange();

        // Handle viewport changes
        this.handleViewportChanges();
    }

    addMobileEventListeners() {
        // Enhanced touch interactions for sliders
        document.querySelectorAll('.lever-slider').forEach(slider => {
            slider.addEventListener('touchstart', (e) => {
                this.handleTouchStart(e, slider);
            }, { passive: false });

            slider.addEventListener('touchmove', (e) => {
                this.handleTouchMove(e, slider);
            }, { passive: false });

            slider.addEventListener('touchend', (e) => {
                this.handleTouchEnd(e, slider);
            }, { passive: false });
        });

        // Mobile-friendly tab switching
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.switchSector(tab.dataset.sector);
            });
        });

        // Mobile modal handling
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('touchstart', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal.id);
                }
            });
        });

        // Swipe gestures for mobile
        this.initializeSwipeGestures();
    }

    handleTouchStart(e, slider) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = slider.getBoundingClientRect();
        const percentage = (touch.clientX - rect.left) / rect.width;
        const value = Math.round(percentage * (slider.max - slider.min) + slider.min);

        slider.value = Math.max(slider.min, Math.min(slider.max, value));
        this.updateLever(slider.dataset.lever, parseInt(slider.value));

        // Add visual feedback
        slider.classList.add('touching');
    }

    handleTouchMove(e, slider) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = slider.getBoundingClientRect();
        const percentage = (touch.clientX - rect.left) / rect.width;
        const value = Math.round(percentage * (slider.max - slider.min) + slider.min);

        slider.value = Math.max(slider.min, Math.min(slider.max, value));
        this.updateLever(slider.dataset.lever, parseInt(slider.value));
    }

    handleTouchEnd(e, slider) {
        slider.classList.remove('touching');
        this.updateLever(slider.dataset.lever, parseInt(slider.value));
    }

    initializeSwipeGestures() {
        let startX = 0;
        let startY = 0;
        let isSwiping = false;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwiping = false;
        });

        document.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;

            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                isSwiping = true;
                e.preventDefault();
            }
        });

        document.addEventListener('touchend', (e) => {
            if (!isSwiping) return;

            const deltaX = e.changedTouches[0].clientX - startX;

            if (Math.abs(deltaX) > 100) {
                // Swipe detected - could be used for navigation
                if (deltaX > 0) {
                    // Swipe right - could go to previous sector
                    this.handleSwipeRight();
                } else {
                    // Swipe left - could go to next sector
                    this.handleSwipeLeft();
                }
            }

            startX = 0;
            startY = 0;
            isSwiping = false;
        });
    }

    handleSwipeLeft() {
        const sectors = ['transport', 'buildings', 'industry', 'electricity', 'co2-removal', 'land-use'];
        const currentIndex = sectors.indexOf(this.currentSector);
        const nextIndex = (currentIndex + 1) % sectors.length;
        this.switchSector(sectors[nextIndex]);
    }

    handleSwipeRight() {
        const sectors = ['transport', 'buildings', 'industry', 'electricity', 'co2-removal', 'land-use'];
        const currentIndex = sectors.indexOf(this.currentSector);
        const prevIndex = currentIndex === 0 ? sectors.length - 1 : currentIndex - 1;
        this.switchSector(sectors[prevIndex]);
    }

    initializeMobileFeatures() {
        // Add mobile-specific UI elements
        this.addMobileNavigation();
        this.addMobileQuickActions();
        this.optimizeForMobile();
    }

    addMobileNavigation() {
        // Add mobile navigation dots
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav-dots';
        mobileNav.innerHTML = `
            <div class="nav-dot active" data-sector="transport"></div>
            <div class="nav-dot" data-sector="buildings"></div>
            <div class="nav-dot" data-sector="industry"></div>
            <div class="nav-dot" data-sector="electricity"></div>
            <div class="nav-dot" data-sector="co2-removal"></div>
            <div class="nav-dot" data-sector="land-use"></div>
        `;

        const controlsPanel = document.querySelector('.controls-panel');
        if (controlsPanel) {
            controlsPanel.appendChild(mobileNav);
        }

        // Add event listeners for navigation dots
        mobileNav.querySelectorAll('.nav-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                this.switchSector(dot.dataset.sector);
            });
        });
    }

    addMobileQuickActions() {
        // Add quick action buttons for mobile
        const quickActions = document.createElement('div');
        quickActions.className = 'mobile-quick-actions';
        quickActions.innerHTML = `
            <button class="quick-action-btn" id="resetAllBtn" title="Reset All">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M11,7V12.5L16.25,15.15L17,13.92L12.5,11.7V7H11Z"/>
                </svg>
                Reset
            </button>
            <button class="quick-action-btn" id="maxAllBtn" title="Set All to Maximum">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                </svg>
                Max
            </button>
            <button class="quick-action-btn" id="shareMobileBtn" title="Share Scenario">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"/>
                </svg>
                Share
            </button>
        `;

        const resultsPanel = document.querySelector('.results-panel');
        if (resultsPanel) {
            resultsPanel.appendChild(quickActions);
        }

        // Add event listeners for quick actions
        document.getElementById('resetAllBtn')?.addEventListener('click', () => {
            this.resetAllLevers();
            this.showToast('All levers reset to minimum', 'info');
        });

        document.getElementById('maxAllBtn')?.addEventListener('click', () => {
            this.setAllLeversToMax();
            this.showToast('All levers set to maximum', 'info');
        });

        document.getElementById('shareMobileBtn')?.addEventListener('click', () => {
            this.shareScenario();
        });
    }

    resetAllLevers() {
        document.querySelectorAll('.lever-slider').forEach(slider => {
            slider.value = 1;
            this.updateLever(slider.dataset.lever, 1);
        });
    }

    setAllLeversToMax() {
        document.querySelectorAll('.lever-slider').forEach(slider => {
            slider.value = 4;
            this.updateLever(slider.dataset.lever, 4);
        });
    }

    optimizeForMobile() {
        // Reduce animations on mobile for better performance
        if (this.isMobile) {
            document.body.classList.add('mobile-optimized');
        }

        // Adjust chart sizes for mobile
        this.adjustChartsForMobile();

        // Optimize images and icons for mobile
        this.optimizeImagesForMobile();
    }

    adjustChartsForMobile() {
        const charts = document.querySelectorAll('canvas');
        charts.forEach(chart => {
            if (this.isMobile) {
                chart.style.maxHeight = '200px';
            }
        });
    }

    optimizeImagesForMobile() {
        // Optimize SVG icons for mobile
        const svgs = document.querySelectorAll('svg');
        svgs.forEach(svg => {
            if (this.isMobile) {
                svg.style.maxWidth = '20px';
                svg.style.maxHeight = '20px';
            }
        });
    }

    handleOrientationChange() {
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.isMobile = window.innerWidth <= 768;
                this.optimizeForMobile();
                this.updateMobileNavigation();
            }, 100);
        });
    }

    handleViewportChanges() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.isMobile = window.innerWidth <= 768;
                this.optimizeForMobile();
                this.updateMobileNavigation();
            }, 250);
        });
    }

    updateMobileNavigation() {
        const navDots = document.querySelectorAll('.nav-dot');
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.sector === this.currentSector) {
                dot.classList.add('active');
            }
        });
    }

    // Enhanced mobile-friendly modal handling
    showModalWithMobileOptimization(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        if (this.isMobile) {
            // Mobile-specific modal behavior
            modal.style.display = 'flex';
            modal.classList.add('show', 'mobile-modal');

            // Prevent body scroll on mobile
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            this.showModalWithAnimation(modalId);
        }
    }

    hideModalWithMobileOptimization(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        if (this.isMobile) {
            modal.classList.remove('show', 'mobile-modal');
            setTimeout(() => {
                modal.style.display = 'none';
                // Restore body scroll
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }, 300);
        } else {
            this.hideModalWithAnimation(modalId);
        }
    }

    // Mobile-friendly sharing
    shareScenarioMobile() {
        if (navigator.share) {
            const shareData = {
                title: 'MacKay Carbon Calculator Scenario',
                text: 'Check out my carbon reduction scenario',
                url: window.location.href
            };

            navigator.share(shareData).then(() => {
                this.showToast('Scenario shared successfully!', 'success');
            }).catch((error) => {
                console.log('Error sharing:', error);
                this.shareScenario(); // Fallback to clipboard
            });
        } else {
            this.shareScenario(); // Fallback to clipboard
        }
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
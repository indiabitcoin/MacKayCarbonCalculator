# MacKay Carbon Calculator

A web-based implementation of the UK Government's MacKay Carbon Calculator, designed to help users explore pathways to achieve net zero emissions by 2050.

## Overview

This carbon calculator is based on the official UK Government MacKay Carbon Calculator and allows users to:

- Explore different decarbonisation scenarios across 6 key sectors
- Adjust 23 different "levers" with 4 levels of ambition each
- Visualize the impact of choices on UK emissions pathways
- See real-time calculations of emissions reductions
- Track progress toward the net zero 2050 target

## Features

### Sectors Covered

1. **Transport** - Electric vehicles, public transport, active travel, aviation, freight
2. **Buildings** - Temperature control, insulation, heat pumps, district heating, appliances
3. **Industry** - Energy efficiency, steel production, cement, chemicals
4. **Electricity Supply** - Wind, solar, nuclear power, energy storage
5. **CO₂ Removal & Gases** - Direct air capture, carbon capture & storage, methane reduction
6. **Land Use & Biofuels** - Afforestation, bioenergy crops, agriculture efficiency

### Interactive Elements

- **Ambition Levels**: Each lever has 4 levels from minimal effort (1) to maximum effort (4)
- **Real-time Calculations**: Emissions update instantly as you adjust levers
- **Visual Feedback**: Charts and graphs show emissions pathways and sector breakdowns
- **Net Zero Tracking**: Clear indication of whether your pathway achieves net zero by 2050

## Technical Implementation

### Technologies Used

- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern responsive design with animations
- **JavaScript (ES6+)** - Interactive calculations and chart rendering
- **Chart.js** - Data visualization for emissions pathways

### Key Components

1. **CarbonCalculator Class** - Main application logic
2. **Sector-based Interface** - Tabbed navigation between different sectors
3. **Lever Controls** - Range sliders for setting ambition levels
4. **Results Panel** - Real-time emissions display and visualizations

## Usage Instructions

1. **Open the Calculator**: Open `index.html` in a modern web browser
2. **Select a Sector**: Click on sector tabs (Transport, Buildings, etc.)
3. **Adjust Levers**: Use sliders to set ambition levels (1-4) for each decarbonisation lever
4. **View Results**: Monitor the emissions pathway chart and sector breakdown
5. **Achieve Net Zero**: Experiment with different combinations to reach net zero by 2050

## Calculation Methodology

The calculator uses simplified but scientifically-based calculations derived from the official MacKay Carbon Calculator:

- **Baseline Emissions**: Based on 1990 UK emissions (~700 MtCO₂e)
- **Sector Reductions**: Each lever contributes specific percentage reductions
- **Pathway Generation**: Realistic trajectories from current levels to 2050 targets
- **Net Zero Calculation**: Accounts for both emissions reductions and negative emissions

### Emission Factors by Sector

- **Transport**: 180 MtCO₂e baseline, up to 135% total reduction possible
- **Buildings**: 120 MtCO₂e baseline, up to 138% total reduction possible
- **Industry**: 160 MtCO₂e baseline, up to 117% total reduction possible
- **Electricity**: 150 MtCO₂e baseline, up to 158% total reduction possible
- **CO₂ Removal**: Can provide up to 129 MtCO₂e negative emissions
- **Land Use**: 50 MtCO₂e baseline, can become carbon negative

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Educational Use

This calculator is designed for:

- **Students** - Understanding climate policy and energy systems
- **Educators** - Teaching about decarbonisation pathways
- **Policy Makers** - Exploring different scenario outcomes
- **General Public** - Engaging with net zero challenges

## Limitations

This is a simplified educational model. For detailed policy analysis, refer to the official UK Government MacKay Carbon Calculator and supporting Excel models.

## Data Sources

Based on:
- UK Government MacKay Carbon Calculator (2020)
- Department for Energy Security and Net Zero (DESNZ)
- Climate Change Committee analysis
- Expert stakeholder consultations

## License

This educational tool is provided for learning purposes. The original MacKay Carbon Calculator is developed by the UK Government Department for Energy Security and Net Zero.

## Acknowledgments

- Named in honor of the late Sir David MacKay
- Based on UK Government MacKay Carbon Calculator
- Inspired by "Sustainable Energy - Without the Hot Air"

---

*Explore pathways to net zero and help shape the UK's clean energy future!*
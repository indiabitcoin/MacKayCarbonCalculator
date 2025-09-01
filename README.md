# MacKay Carbon Calculator - Enhanced Web Application

A sophisticated, interactive web application for exploring pathways to UK net zero emissions by 2050, based on the UK Government's MacKay Carbon Calculator methodology.

## 🌟 Key Features

### Core Functionality
- **Interactive Sector Controls**: Adjust ambition levels across 6 key sectors
- **Real-time Emissions Calculation**: Live updates as you modify settings
- **Visual CO₂e Meter**: Animated gauge showing reduction progress
- **Sector Breakdown**: Detailed emissions analysis by sector
- **Chart Visualization**: Interactive emissions pathway charts

### 🚀 Advanced Features

#### 🤖 AI-Powered Insights
- **Smart Recommendations**: AI analyzes your scenario and provides actionable insights
- **Cost-Benefit Analysis**: Automatic calculation of implementation costs vs. carbon savings
- **Optimization Suggestions**: AI suggests lever adjustments for better outcomes
- **Priority Alerts**: Highlights critical areas needing attention

#### 👥 Real-time Collaboration
- **Live Collaboration Mode**: Work with others in real-time
- **Shared Scenarios**: Multiple users can modify the same scenario simultaneously
- **Collaboration Indicators**: Visual feedback showing active collaboration
- **Change Notifications**: Real-time updates when others make changes

#### 📊 Advanced Visualizations
- **Sankey Energy Flow Diagrams**: Visualize energy flows between sectors
- **Performance Heatmaps**: Compare sector performance across multiple metrics
- **Interactive Charts**: Enhanced Chart.js integration with custom animations
- **Timeline Analysis**: Historical and projected emissions pathways

#### ♿ Accessibility Features
- **Keyboard Navigation**: Full keyboard accessibility support
- **Screen Reader Support**: ARIA labels and descriptions
- **High Contrast Mode**: Enhanced visibility for users with visual impairments
- **Font Size Controls**: Adjustable text size for better readability
- **Reduced Motion Support**: Respects user's motion preferences

#### 🎨 Enhanced User Experience
- **Dark/Light Theme Toggle**: Seamless theme switching
- **Responsive Design**: Optimized for all device sizes
- **Advanced Animations**: Smooth, performance-optimized animations
- **Toast Notifications**: User-friendly feedback system
- **Modal Dialogs**: Clean, accessible modal interfaces

#### 📈 Performance Monitoring
- **Real-time FPS Monitoring**: Track application performance
- **Memory Usage Tracking**: Monitor resource consumption
- **Interaction Timing**: Measure user interaction responsiveness
- **Performance Optimization**: Automatic adjustments for low-end devices

## 🏗️ Technical Architecture

### Frontend Technologies
- **Vanilla JavaScript**: No framework dependencies
- **CSS3 with Custom Properties**: Advanced styling with CSS variables
- **HTML5**: Semantic markup with accessibility features
- **Chart.js**: Interactive data visualization
- **Canvas API**: Custom graphics and animations

### Key Components

#### CarbonCalculator Class
The main application class that handles:
- Lever value management
- Emissions calculations
- UI updates and animations
- Feature initialization
- Performance monitoring

#### Sector Management
- Transport, Buildings, Industry, Electricity, CO₂ Removal, Land Use
- Individual lever controls with 4 ambition levels
- Real-time calculation updates
- Sector-specific visualizations

#### Data Visualization
- Interactive charts with Chart.js
- Custom CO₂e meter with animated needle
- Sector breakdown bars
- Performance heatmaps
- Energy flow diagrams

## 🎯 Usage Guide

### Getting Started
1. Open `index.html` in a modern web browser
2. Familiarize yourself with the 6 sector tabs
3. Adjust lever settings using the sliders
4. Watch real-time updates to emissions calculations
5. Explore the AI insights and recommendations

### Collaboration Mode
1. Click the "Collaborate" button in the toolbar
2. Share the generated URL with collaborators
3. See real-time updates as others make changes
4. Use the collaboration indicator to track active sessions

### AI Insights
1. Review the AI insights panel for recommendations
2. Click action buttons to automatically adjust levers
3. View cost-benefit analysis for your scenario
4. Export detailed reports for further analysis

### Accessibility Features
1. Use Tab key for keyboard navigation
2. Toggle high contrast mode for better visibility
3. Adjust font size using A+ and A- buttons
4. Screen readers will announce lever changes and results

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with advanced visualizations
- **Tablet**: Touch-optimized controls with simplified layouts
- **Mobile**: Streamlined interface with essential features
- **Landscape/Portrait**: Automatic orientation adjustments

## 🎨 Customization

### Themes
The application supports both light and dark themes with:
- CSS custom properties for easy theming
- Automatic theme persistence
- Smooth transitions between themes

### Animations
- Performance-optimized animations
- Respects `prefers-reduced-motion` user preference
- Hardware acceleration for smooth performance
- Automatic animation reduction on low-end devices

## 🔧 Development

### File Structure
```
CarbonCalculator/
├── index.html          # Main HTML structure
├── script.js           # Core JavaScript functionality
├── styles.css          # Comprehensive styling
└── README.md           # This documentation
```

### Key Functions

#### Emissions Calculations
```javascript
calculateSectorEmissions()     // Calculate emissions by sector
calculateTotalEmissions()      // Sum all sector emissions
calculateReductionFrom1990()   // Calculate reduction percentage
```

#### AI Insights
```javascript
generateAIInsights()           // Generate AI recommendations
analyzeCostBenefit()          // Calculate cost-benefit analysis
estimateImplementationCost()  // Estimate implementation costs
```

#### Collaboration
```javascript
toggleCollaboration()          // Enable/disable collaboration
shareLeverChanges()           // Share changes with collaborators
handleCollaborationUpdate()   // Process incoming updates
```

### Performance Considerations
- **Lazy Loading**: Features load on demand
- **Debounced Updates**: Prevents excessive recalculations
- **Memory Management**: Automatic cleanup of unused resources
- **Animation Optimization**: Reduced animations on low-end devices

## 🌍 Environmental Impact

This calculator helps users understand:
- **Emissions Pathways**: How different policies affect UK emissions
- **Sector Interactions**: How changes in one sector affect others
- **Net Zero Feasibility**: What's needed to achieve 2050 targets
- **Cost Implications**: Financial considerations of different approaches

## 🔮 Future Enhancements

Planned features include:
- **Multi-country Support**: Extend beyond UK to other nations
- **Advanced Modeling**: More sophisticated emissions calculations
- **Data Export**: Enhanced export capabilities
- **API Integration**: Real-time data from external sources
- **Machine Learning**: Improved AI insights and predictions

## 📄 License

This project is based on the UK Government's MacKay Carbon Calculator methodology and is intended for educational and research purposes.

## 🤝 Contributing

Contributions are welcome! Please consider:
- Accessibility improvements
- Performance optimizations
- New visualization features
- Documentation enhancements
- Bug reports and fixes

## 📞 Support

For questions or support:
- Review the help modal within the application
- Check the console for debugging information
- Ensure you're using a modern web browser
- Verify JavaScript is enabled

---

**Built with ❤️ for a sustainable future**
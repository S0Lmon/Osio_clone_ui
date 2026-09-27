# DroneWatering App - Specification

## 1. Project Overview

**Project Name:** DroneWatering - Coffee Plantation Drone Management System
**Type:** Web Application (Dashboard - Single Page)
**Core Functionality:** A futuristic dashboard to manage agricultural drones that scan coffee plantations for disease detection, displaying real-time telemetry, weather data, market prices, and AI-powered health analytics.
**Target Users:** Coffee farm managers, agricultural drone operators

---

## 2. UI/UX Specification

### Layout Structure (Grid Dashboard)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              HEADER                                        │
├───────────────┬─────────────────────────────┬─────────────────────────────┤
│               │                             │                             │
│   LEFT        │      MAIN CANVAS            │      RIGHT SIDEBAR          │
│   SIDEBAR     │   (Map + 3D Drone)          │   (Drone + Health)          │
│  (Weather,    │                             │                             │
│   Market)     │                             │                             │
│               │                             │                             │
│   ~20-25%     │       ~50-60%               │      ~20-25%                │
│               │                             │                             │
├───────────────┴─────────────────────────────┴─────────────────────────────┤
│                         BOTTOM PANEL (News + Recommendations)              │
│                         Height: ~180px                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Visual Design

**Theme:** Clean Cyberpunk / Tactical CAD - High-tech agricultural

**Color Palette:**
- Primary Background: `#0A0F0D` (Deep forest black)
- Secondary Background: `#141F1A` (Dark green-gray)
- Accent Green (Healthy): `#00FF88` (Neon green for NDVI)
- Accent Orange (Warning): `#FF6B35` (Rust disease alert)
- Accent Red (Critical): `#FF3366` (Severe disease)
- Accent Cyan: `#00D4FF` (Tech highlights)
- Text Primary: `#E8F5E9` (Soft white-green)
- Text Secondary: `#6B8F71` (Muted green)

**Typography:**
- Font Family: `'Orbitron'` for headings, `'JetBrains Mono'` for data/numbers
- Fallback: `'Segoe UI', system-ui, sans-serif`

### Components List

| Component | File | Description |
|-----------|------|-------------|
| WeatherWidget | `WeatherWidget.jsx` | Temperature, humidity, wind, UV index, 7-day forecast |
| MarketPriceWidget | `MarketPriceWidget.jsx` | Coffee, pepper, rubber prices with sparkline charts |
| Map3DCanvas | `Map3DCanvas.jsx` | Google Maps satellite + 3D drone + disease markers |
| DroneStatusWidget | `DroneStatusWidget.jsx` | Battery, speed, altitude, storage, signal |
| HealthAnalyticsWidget | `HealthAnalyticsWidget.jsx` | Pie chart: healthy/diseased ratios |
| NewsFeedWidget | `NewsFeedWidget.jsx` | Horizontal carousel of agricultural news |
| FertilizerRecommendationWidget | `FertilizerRecommendationWidget.jsx` | Disease-based product recommendations |

---

## 3. Functionality Specification

### Core Features

1. **3D Drone Display**
   - Placeholder 3D drone model (can be replaced with .glb)
   - OrbitControls for rotation/zoom
   - Hover animation (gentle float)
   - Scanning rotation effect

2. **Disease Map Markers**
   - 4 mock disease locations displayed on map
   - Pulsing red/orange/yellow markers
   - Click to show detail popup
   - Different colors by disease type

3. **Scan Simulation**
   - "QUÉT FARM" button triggers scan mode
   - Drone rotates, scan effect appears
   - Overlay animation during scanning

4. **Weather & Market Data**
   - Mock weather with real-time updates
   - Price list with trend sparklines
   - Color-coded change indicators

5. **Health Analytics**
   - Recharts PieChart with animated segments
   - Hover effects on chart
   - Summary statistics

6. **News & Recommendations**
   - Auto-scrolling news carousel
   - Modal popup for news detail
   - Expandable recommendation cards

---

## 4. Technical Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v3
- **3D Engine:** @react-three/fiber, @react-three/drei
- **Charts:** Recharts
- **Animation:** Framer Motion
- **Icons:** Lucide React

---

## 5. API Integration Points

### External APIs (Frontend calls directly)
- Weather: `api.openweathermap.org` (can be integrated)
- Maps: Google Maps JavaScript API (can be integrated)

### Internal APIs (Spring Boot backend - to be implemented)
```
GET /api/v1/drone/status          - Drone telemetry
GET /api/v1/map/disease-clusters  - Disease locations
WS /ws/drone/telemetry            - Real-time GPS
GET /api/v1/market/prices         - Commodity prices
GET /api/v1/news/agricultural     - News feed
GET /api/v1/recommendations       - Fertilizer recommendations
```

---

## 6. File Structure

```
DroneWatering/
├── src/
│   ├── components/
│   │   ├── WeatherWidget.jsx
│   │   ├── MarketPriceWidget.jsx
│   │   ├── Map3DCanvas.jsx
│   │   ├── DroneStatusWidget.jsx
│   │   ├── HealthAnalyticsWidget.jsx
│   │   ├── NewsFeedWidget.jsx
│   │   └── FertilizerRecommendationWidget.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
├── index.html
└── SPEC.md
```

---

## 7. Acceptance Criteria

- [x] App loads without errors
- [x] Dashboard displays all 7 widgets
- [x] 3D drone can be rotated and zoomed
- [x] Disease markers visible on map
- [x] Scan button triggers animation
- [x] News carousel auto-scrolls
- [x] Recommendations expand on click
- [x] No console errors (except expected warnings)
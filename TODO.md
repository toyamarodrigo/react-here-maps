# TODOs - Possible Features

## @TODO: Documentation & Testing Migration (Priority)

### Phase 1: Setup Nextra Documentation Site
- [ ] Create new `apps/docs/` directory in monorepo
- [ ] Install Nextra in `apps/docs/`
- [ ] Configure Nextra with React HERE Maps theme
- [ ] Add docs workspace to `pnpm-workspace.yaml`
- [ ] Setup basic pages structure:
  - [ ] Getting Started guide
  - [ ] Component reference pages
  - [ ] API documentation
  - [ ] Examples gallery
- [ ] Create interactive component playground
- [ ] Configure to import from `@rodrito/react-here-maps`
- [ ] Setup deployment to Vercel/Netlify

### Phase 2: Modern Testing Setup
- [ ] Create `tests/` directory in root
- [ ] Install and configure Vitest
- [ ] Setup React Testing Library
- [ ] Install Playwright for component testing
- [ ] Configure test utilities for HERE Maps components
- [ ] Create test examples for each component
- [ ] Setup CI/CD for automated testing

### Phase 3: Migration from Storybook
- [ ] **Keep Storybook for development** (useful for isolated component work)
- [ ] **Remove Storybook from public docs** (use Nextra instead)
- [ ] Migrate component examples from Storybook to `apps/docs/`
- [ ] Convert Storybook stories to:
  - [ ] Nextra MDX documentation pages in `apps/docs/`
  - [ ] Vitest component tests in `tests/unit/`
  - [ ] Playwright visual regression tests in `tests/integration/`
- [ ] Update README to point to new Nextra docs site

### Phase 4: Testing Strategy Implementation
- [ ] **Unit Tests** (Vitest + RTL):
  - [ ] Component rendering tests
  - [ ] Props validation tests
  - [ ] Hook behavior tests
  - [ ] Event handling tests
- [ ] **Integration Tests** (Playwright):
  - [ ] Component interaction tests
  - [ ] Visual regression tests
  - [ ] Cross-browser compatibility
  - [ ] Mobile responsiveness
- [ ] **E2E Tests** (Playwright):
  - [ ] Full user workflows
  - [ ] API integration tests
  - [ ] Performance testing

### Tools & Dependencies to Install:
```bash
# Documentation (in apps/docs/)
cd apps/docs
pnpm add nextra nextra-theme-docs next react react-dom
pnpm add @rodrito/react-here-maps

# Testing (in root)
cd ../..
pnpm add -D vitest @vitejs/plugin-react
pnpm add -D @testing-library/react @testing-library/jest-dom
pnpm add -D @playwright/test @playwright/experimental-ct-react
pnpm add -D jsdom happy-dom

# Optional: Visual regression
pnpm add -D @percy/playwright chromatic

# Update workspace
# Add "apps/docs" to pnpm-workspace.yaml
```

### File Structure After Migration:
```
/
├── packages/
│   └── lib/              # React HERE Maps library (keep Storybook for dev)
├── apps/
│   ├── www/              # Demo application (existing)
│   └── docs/             # Nextra documentation site (new)
│       ├── pages/
│       │   ├── components/
│       │   ├── guides/
│       │   └── examples/
│       └── components/   # Interactive examples
├── tests/
│   ├── unit/             # Vitest + RTL tests
│   ├── integration/      # Playwright component tests
│   └── e2e/             # End-to-end tests
└── pnpm-workspace.yaml   # Update to include apps/docs
```

### Benefits of This Approach:
- ✅ Keep Storybook for development workflow
- ✅ Modern, fast documentation site for users
- ✅ Comprehensive testing strategy
- ✅ Better maintainability and performance
- ✅ Professional documentation experience

---

## Geometric Shapes

- **Circle** - Display circular areas with radius
- **Polygon** - Create polygons with holes support
- **Rectangle** - Simple rectangular overlays
- **DomMarker** - HTML-based markers with DOM events

### Advanced Markers

- **MarkerCluster** - Group nearby markers for performance
- **InfoBubble** - Display information popups on markers
- **CustomIcon** - SVG-based markers with rotation support
- **AnimatedMarker** - Markers with position animations

## Routing & Directions

### Route Components

- **RoutingService** - Calculate routes between points
- **PedestrianRoute** - Walking directions display
- **DrivingRoute** - Car route visualization
- **TruckRoute** - Commercial vehicle routing with restrictions
- **PublicTransitRoute** - Public transport directions
- **BicycleRoute** - Cycling routes with altitude data

### Isoline & Coverage

- **Isoline** - Display reachable areas (time/distance)
- **ServiceArea** - Coverage area visualization

## Indoor Mapping

- **IndoorMap** - Indoor venue display
- **LevelControl** - Switch between floor levels
- **DrawingControl** - Navigate between buildings
- **VenueSearch** - Search within indoor spaces

## Layers & Visualization

- **TileLayer** - Custom tile overlays
- **HeatmapLayer** - Data density visualization
- **TrafficLayer** - Real-time traffic information
- **WeatherLayer** - Weather data overlay
- **ObjectLayer** - Custom object collections

## Geocoding & Search

- **Geocoder** - Address to coordinates conversion
- **ReverseGeocoder** - Coordinates to address lookup
- **PlaceSearch** - Point of interest search
- **AutoSuggest** - Search suggestions component

## Map Controls & UI

- **CompassControl** - Map orientation indicator
- **FullscreenControl** - Fullscreen toggle
- **LayerSwitcher** - Switch between map types
- **MiniMap** - Overview map component
- **CoordinateDisplay** - Show cursor coordinates

## Events & Interactions

- **ClickHandler** - Map click event management
- **DragHandler** - Drag and drop interactions
- **ContextMenu** - Right-click menu system
- **HoverEffects** - Mouse hover interactions

## Utility Hooks

- **useGeolocation** - User location detection
- **useMapBounds** - Track visible map area
- **useMapEvents** - Event listener management
- **useMapRestriction** - Limit map movement area
- **useMapCapture** - Screenshot functionality
- **useMapStyle** - Dynamic style switching

## Data & Analytics

- **PostcodeLayer** - Postal code boundaries
- **GeoJSON** - Display GeoJSON data
- **KMLLayer** - KML file visualization
- **DataVisualization** - Custom data overlays

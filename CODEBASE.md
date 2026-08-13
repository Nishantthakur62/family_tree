# FamilyRoots Codebase Overview

## 📋 Project Summary

**FamilyRoots** is a modern web application for building and preserving family trees. It allows users to create interactive family diagrams, add family member details, save family archives, and engage with family-themed games and activities. The application emphasizes a calm, thoughtful approach to capturing and sharing family stories.

**Website Tagline:** "Keep the stories that made you"

---

## 🛠 Tech Stack

- **Frontend Framework:** React 19.1.0
- **Routing:** React Router DOM 7.7.0
- **Styling:** Styled Components 6.1.19
- **UI Icons:** React Icons 5.5.0
- **Analytics:** Vercel Analytics 2.0.1
- **Build Tool:** React Scripts 5.0.1
- **Testing Libraries:** Jest, React Testing Library

---

## 📁 Project Structure

```
familyroots/
├── public/                          # Static public assets
│   ├── index.html                   # Main HTML entry point
│   ├── manifest.json                # PWA manifest
│   ├── robots.txt                   # SEO robots configuration
│   └── sitemap.xml                  # SEO sitemap
│
├── src/                             # Source code
│   ├── App.js                       # Main app routing configuration
│   ├── index.js                     # React entry point with Analytics
│   ├── App.css                      # Global styles
│   │
│   ├── Assets/                      # Static media files
│   │   ├── Icons/                   # SVG and icon files
│   │   ├── Images/                  # General images
│   │   └── Logo/                    # Brand logo assets
│   │
│   ├── Components/                  # Reusable UI components
│   │   ├── AlertModal/              # Alert/confirmation dialogs
│   │   ├── ConfirmationModal/       # Confirmation prompts
│   │   ├── DrawingBoard/            # Family tree canvas/visualization
│   │   ├── Family/                  # Family display component
│   │   ├── FamilyCard/              # Card component for family preview
│   │   ├── FamilyMember/            # Individual member node in tree
│   │   ├── Footer/                  # Footer component
│   │   ├── Header/                  # Navigation header
│   │   ├── IntroForm/               # Initial setup form modal
│   │   ├── Layout/                  # Main layout wrapper
│   │   ├── MemberAddForm/           # Form to add family members
│   │   ├── MoreDetailsForm/         # Extended details editor
│   │   └── Modals/                  # Modal management components
│   │
│   ├── Pages/                       # Full-page components (routes)
│   │   ├── BuilderPage/             # Main tree builder interface
│   │   ├── ContactPage/             # Contact/support page
│   │   ├── ExportHistoryPage/       # Export history and archives
│   │   ├── FamiliesPage/            # Browse and manage families
│   │   ├── GamePage/                # Family games/playroom
│   │   ├── HomePage/                # Landing page
│   │   └── NameListsPage/           # Shared name lists/databases
│   │
│   └── utils/                       # Utility functions
│       ├── familyData.js            # Family data models and helpers
│       ├── nameLibrary.js           # Name suggestion database
│       ├── nameLists.js             # Predefined name lists
│       └── uuid.js                  # UUID generation utility
│
├── build/                           # Production build output
│   └── static/                      # Minified CSS and JS bundles
│
├── package.json                     # Dependencies and scripts
└── README.md                        # Project readme
```

---

## 🎯 Key Features & Pages

### 1. **HomePage** (`Pages/HomePage/`)
- Landing page with value proposition
- Call-to-action for starting a new family tree
- Demo options (Morgan family, Winden family)
- Marketing copy about features

### 2. **BuilderPage** (`Pages/BuilderPage/`)
- **Core Feature:** Interactive family tree canvas
- Components:
  - `DrawingBoard`: Canvas for visualizing and editing the tree
  - `FamilyMember`: Individual nodes representing family members
  - `MoreDetailsForm`: Edit detailed information about members
- Functionality:
  - Drag-to-pan navigation
  - Zoom controls (in/out, fit, center)
  - Add people (children, spouses, siblings)
  - Auto-save to local storage
  - Export/import as JSON
  - Access to name lists

### 3. **FamiliesPage** (`Pages/FamiliesPage/`)
- Browse saved family trees
- Create new families from existing profiles
- Rename family profiles
- Delete families
- Import/export family JSON files
- Local storage management

### 4. **ExportHistoryPage** (`Pages/ExportHistoryPage/`)
- View history of exported family trees
- Track archive downloads
- Manage JSON export records

### 5. **GamePage** (`Pages/GamePage/`)
- **Family Playroom** with 4 games:
  1. **Roots Recall**: Memory/matching game
  2. **Branch Battle**: Tic-tac-toe for families
  3. **Family Face-Off**: Choose-your-adventure style game
  4. **Odd One Out**: Spot-the-difference word game

### 6. **ContactPage** (`Pages/ContactPage/`)
- Support/contact information
- Email contact method
- Business hours
- Contact form

### 7. **NameListsPage** (`Pages/NameListsPage/`)
- Shared name databases
- Name suggestions for family members
- Cultural name libraries

---

## 🧩 Component Architecture

### Styled Components Pattern
Each component folder typically contains:
- `ComponentName.js` - Logic and JSX
- `ComponentName.style.js` - Styled-components (CSS-in-JS)

Example structure:
```
DrawingBoard/
├── DrawingBoard.js          # Component logic
└── DrawingBoard.style.js    # Styled components
```

### Key Component Types

**Container Components (Pages):**
- Handle routing and page-level logic
- Manage application state
- Contain layout and multiple sub-components

**UI Components:**
- Reusable across multiple pages
- Handle specific UI concerns (modals, forms, cards)
- Minimal business logic

**Utility Components:**
- `Layout.js` - Wraps all pages with Header, Footer
- `Header.js` - Navigation and mobile menu
- `Footer.js` - Site footer with links

---

## 💾 Data Management

### Local Storage
- Family trees are saved to browser local storage
- Profile information persists between sessions
- Export/import as JSON for backup and sharing

### Data Structures (utils/familyData.js)
- Family tree node structure (id, name, relationships)
- Person object (name, gender, image, birth/death dates, stories)
- Relationship mappings (spouse, children, siblings, parents)

### Name Databases (utils/nameLibrary.js & nameLists.js)
- Pre-populated name suggestions
- Cultural name collections
- Used in name input fields and dropdowns

---

## 🎨 Design System

### Styling Approach
- **Framework**: Styled-components (CSS-in-JS)
- **Philosophy**: Component-scoped styling
- **Color Palette**:
  - Primary: `#bd5b3c` (Rust/burnt orange)
  - Text: `#24312d` (Dark gray-blue)
  - Secondary text: `#52615b` (Muted green-gray)
  - Background: `#f6f4ef` (Off-white/cream)

### Responsive Design
- Mobile-first approach
- Main breakpoint: `768px` (tablet)
- Uses CSS `clamp()` for fluid typography and spacing
- Hamburger menu for mobile navigation

### Accessibility Features
- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management in modals
- Alt text for images
- Form labels properly associated with inputs

---

## 🚀 Running the Application

### Development
```bash
npm start
```
- Runs on `http://localhost:3000`
- Hot-reloads on code changes
- Development build (non-optimized)

### Production Build
```bash
npm run build
```
- Creates optimized production build in `/build`
- Minified and bundled assets
- Ready for deployment

### Testing
```bash
npm test
```
- Runs Jest test suite
- Testing libraries: React Testing Library, Jest DOM

---

## 📊 Routing Configuration (App.js)

```javascript
Routes available:
- /                    → HomePage (landing)
- /families            → FamiliesPage (manage families)
- /export-history      → ExportHistoryPage (export history)
- /builder/:phone      → BuilderPage (tree builder - phone is user ID)
- /contact             → ContactPage (contact form)
- /game                → GamePage (playroom with games)
- /name-lists          → NameListsPage (name suggestions)
- *                    → 404 Not Found
```

---

## 🔧 Development Best Practices Applied

### ✅ Code Quality
- **No Debug Code**: No console.log or debugger statements in production
- **Consistent File Extensions**: Standardized on `.js` (removed duplicate `.jsx` files)
- **Component Organization**: Clear separation of logic and styling
- **Reusable Components**: Common UI patterns abstracted into components

### ✅ Accessibility
- Semantic HTML (`<button>`, `<header>`, `<nav>`, `<main>`, `<footer>`)
- ARIA attributes for screen readers
- Keyboard-accessible interactive elements
- Descriptive button labels and form inputs

### ✅ Performance
- Client-side rendering with React
- Vercel Analytics for performance monitoring
- Optimized styled-components usage
- Minimal re-renders through proper React patterns

### ✅ Styling
- Styled-components for scoped CSS
- No CSS conflicts or specificity issues
- Consistent theming across the app
- Mobile-responsive design

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.1.0 | UI framework |
| react-dom | 19.1.0 | DOM rendering |
| react-router-dom | 7.7.0 | Client-side routing |
| styled-components | 6.1.19 | CSS-in-JS styling |
| react-icons | 5.5.0 | Icon library (Feather icons) |
| @vercel/analytics | 2.0.1 | Usage analytics |
| react-scripts | 5.0.1 | Create React App tools |

---

## 🎯 Common Development Tasks

### Adding a New Page
1. Create folder in `src/Pages/PageName/`
2. Create `PageName.js` with component logic
3. Create `PageName.style.js` with styled components
4. Import and add route in `App.js`

### Adding a New Component
1. Create folder in `src/Components/ComponentName/`
2. Create `ComponentName.js` with component logic
3. Create `ComponentName.style.js` with styled components
4. Import where needed

### Styling a Component
1. Create `.style.js` file alongside component
2. Use `styled.elementName` or `styled(Component)` syntax
3. Import styled components in main component file
4. Use styled components as regular components in JSX

### Adding Icons
- Import from `react-icons` library
- Available icon sets: Feather (Fi*), Font Awesome (Fa*), etc.
- Example: `import { FiPlus, FiArrowRight } from 'react-icons/fi'`

---

## 🐛 Troubleshooting

### App doesn't load
- Clear browser cache
- Check console for errors
- Verify all imports are correct
- Ensure port 3000 is available

### Styles not applying
- Check if styled-components are imported
- Verify component names match export names
- Check for CSS specificity conflicts
- Browser dev tools → Elements → Styles tab

### Local storage not persisting
- Check browser's local storage limits
- Clear browser data (Settings → Clear browsing data)
- Verify localStorage is enabled in browser

---

## 📝 Notes on Recent Refactoring

**Date**: 2026-08-13

**Changes Made:**
- Removed 8 duplicate `.jsx` files to standardize on `.js` extension
- Consolidated routing in single `App.js` file
- Updated browserslist database for current browser support data
- All functionality verified and working correctly

**Quality Improvements:**
- More maintainable codebase with consistent file naming
- Reduced confusion from duplicate files
- Better alignment with project conventions
- Cleaner project structure

---

## 📞 Support & Contact

**Contact Email**: nishantthakur13579@gmail.com
**Business Hours**: Monday to Friday, 9am–5pm
**Response Time**: Usually within 2 working days

---

**Last Updated**: 2026-08-13  
**Version**: 0.1.0  
**Status**: Production Ready

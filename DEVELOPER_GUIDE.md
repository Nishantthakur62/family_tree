# FamilyRoots Developer Quick Reference

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## 📂 Quick File Reference

| File/Folder | Purpose |
|-------------|---------|
| `App.js` | Main routing configuration |
| `src/index.js` | React entry point + Analytics setup |
| `src/App.css` | Global styles |
| `src/Components/Layout/Layout.js` | Page wrapper (Header + Footer) |
| `src/Components/Header/Header.js` | Navigation bar |
| `src/Pages/BuilderPage/` | Family tree builder (main feature) |
| `src/Pages/GamePage/` | Games and playroom |
| `src/utils/familyData.js` | Family data structures and helpers |

---

## 🎨 Component Template

### Basic Component Structure

**MyComponent.js**
```javascript
import styled from 'styled-components';
import { MyComponentStyles } from './MyComponent.style';

const MyComponent = ({ prop1, prop2 }) => {
  return (
    <MyComponentStyles>
      <h2>My Component</h2>
      <p>{prop1}</p>
    </MyComponentStyles>
  );
};

export default MyComponent;
```

**MyComponent.style.js**
```javascript
import styled from 'styled-components';

export const MyComponentStyles = styled.div`
  padding: 1rem;
  background: #f6f4ef;
  border-radius: 8px;
  
  h2 {
    color: #24312d;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;
```

---

## 🌳 Family Tree Data Structure

```javascript
// Family member object
{
  id: "unique-id",           // UUID
  name: "John Doe",
  gender: "Male",
  image: "base64-or-url",    // Optional
  phone: "1234567890",       // User identifier
  familyName: "Doe Family",
  spouse: { /* nested person */ },
  children: [ /* array of persons */ ],
  siblings: [ /* array of persons */ ],
  parents: [ /* array of persons */ ],
  birthDate: "YYYY-MM-DD",   // Optional
  deathDate: "YYYY-MM-DD",   // Optional
  stories: [ /* array of stories */ ]
}
```

---

## 🔌 Common Patterns

### Form Submission
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // Validate inputs
  if (!name || !phone) {
    alert('Please fill in all fields');
    return;
  }
  // Process form data
  saveFamily(name, phone, familyName, gender);
  // Navigate or close modal
  navigate(`/builder/${phone}`);
};
```

### Local Storage
```javascript
// Save
localStorage.setItem('familyKey', JSON.stringify(familyData));

// Retrieve
const data = JSON.parse(localStorage.getItem('familyKey'));

// Delete
localStorage.removeItem('familyKey');
```

### Modal Pattern
```javascript
const [isOpen, setIsOpen] = useState(false);

return (
  <>
    <button onClick={() => setIsOpen(true)}>Open</button>
    {isOpen && (
      <Modal onClick={() => setIsOpen(false)}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <button onClick={() => setIsOpen(false)}>Close</button>
          {/* Modal content */}
        </ModalContent>
      </Modal>
    )}
  </>
);
```

---

## 🎨 Styling Tips

### Color Palette
```javascript
// Primary colors
const colors = {
  primary: '#bd5b3c',        // Rust/burnt orange
  primaryDark: '#a4492f',    // Darker rust
  text: '#24312d',           // Dark text
  textSecondary: '#52615b',  // Muted text
  background: '#f6f4ef',     // Off-white
  border: 'rgba(36, 49, 45, 0.1)' // Light border
};
```

### Media Queries
```javascript
// Standard breakpoint
@media (max-width: 768px) {
  // Mobile styles
}

// Use clamp for fluid sizing
font-size: clamp(1rem, 2vw, 2rem);
padding: clamp(1rem, 5vw, 4.5rem);
```

### Common Styled Components
```javascript
// Button
const Button = styled.button`
  padding: 0.65rem 0.9rem;
  background: #bd5b3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.2s;
  
  &:hover {
    background: #a4492f;
  }
`;

// Modal overlay
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;
```

---

## ♿ Accessibility Checklist

- [ ] Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- [ ] Add `aria-label` to icon buttons
- [ ] Add `title` attribute for tooltips
- [ ] Link form labels to inputs with `htmlFor`
- [ ] Use `aria-expanded` for toggles
- [ ] Add `aria-hidden="true"` to decorative elements
- [ ] Test with keyboard navigation (Tab key)
- [ ] Ensure color contrast ratio ≥ 4.5:1
- [ ] Add `alt` text to meaningful images
- [ ] Manage focus in modals and dropdowns

---

## 🐛 Debugging Tips

### Console Errors
```javascript
// Use Chrome DevTools → Console tab
// Check for component errors
// Verify imports are correct
// Check network tab for failed API calls
```

### React DevTools
- Install React DevTools browser extension
- Inspect component props and state
- Track component re-renders

### Local Storage Issues
```javascript
// Clear all data
localStorage.clear();

// View all data
Object.keys(localStorage).forEach(key => {
  console.log(key, localStorage.getItem(key));
});
```

---

## 📋 Performance Checklist

- [ ] No console.log statements in production code
- [ ] No debugger statements
- [ ] Images optimized
- [ ] Unnecessary re-renders minimized
- [ ] Large lists use keys
- [ ] Code splitting considered for large components
- [ ] Analytics integrated (Vercel Analytics present)

---

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "description of changes"

# Push to repository
git push origin feature/feature-name

# Create pull request on GitHub
```

---

## 📝 Naming Conventions

### Components
- PascalCase: `FamilyMember.js`, `DrawingBoard.js`

### Variables & Functions
- camelCase: `handleClick`, `familyData`, `onSubmit`

### Constants
- UPPER_SNAKE_CASE: `MAX_ZOOM`, `MIN_ZOOM`

### Files
- `.js` files for components (standardized)
- `.style.js` files for styled-components
- Folder name matches component name

---

## 🚀 Deployment Considerations

### Build Process
```bash
npm run build
# Creates optimized production build in /build folder
```

### Environment Variables
- Create `.env` file in root
- Add variables like `REACT_APP_API_URL=...`
- Access via `process.env.REACT_APP_*`

### Analytics
- Vercel Analytics automatically integrated
- Tracks page views and performance metrics

---

## 📚 Useful Resources

- **React Docs**: https://react.dev
- **React Router**: https://reactrouter.com
- **Styled Components**: https://styled-components.com
- **React Icons**: https://react-icons.github.io/react-icons/
- **MDN Web Docs**: https://developer.mozilla.org

---

## 🤝 Contributing Guidelines

1. Follow existing code style
2. Use semantic commit messages
3. Test changes locally before pushing
4. Keep components small and focused
5. Document complex logic
6. Update CODEBASE.md if adding major features

---

## ❓ FAQ

**Q: How do I add a new page?**
A: Create folder in `src/Pages/`, add `.js` and `.style.js` files, then add route to `App.js`

**Q: Where do I put utility functions?**
A: Use `src/utils/` folder for shared helper functions

**Q: How do I import assets?**
A: Images/icons go in `src/Assets/` and import as needed

**Q: How do I test locally?**
A: Run `npm start` and navigate to `http://localhost:3000`

**Q: How do I debug styling?**
A: Use Chrome DevTools → Elements tab, inspect styled-components

---

**Last Updated**: 2026-08-13  
**Current Version**: 0.1.0

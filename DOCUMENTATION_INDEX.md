# 📖 FamilyRoots Documentation Index

Welcome to the FamilyRoots documentation. This guide will help you navigate the available resources.

---

## 📚 Documentation Files

### 1. **CODEBASE.md** (This is the main document)
Complete overview of the entire codebase.

**What you'll find:**
- 📋 Project summary and tagline
- 🛠 Tech stack details
- 📁 Complete project structure with descriptions
- 🎯 Feature breakdown for each page
- 🧩 Component architecture and patterns
- 💾 Data management and local storage
- 🎨 Design system and color palette
- ♿ Accessibility features
- 🚀 How to run the application
- 📊 Routing configuration
- 🔧 Development best practices
- 📦 Dependencies list
- 🐛 Troubleshooting guide

**Best for:** Understanding how the entire application works, learning about features, and finding where things are located.

---

### 2. **DEVELOPER_GUIDE.md** (Quick reference)
Hands-on guide for developers actively working on the code.

**What you'll find:**
- 🚀 Quick start commands
- 📂 Quick file reference table
- 🎨 Component templates and boilerplate
- 🌳 Data structure examples
- 🔌 Common coding patterns
- 🎨 Styling tips and color palette
- ♿ Accessibility checklist
- 🐛 Debugging tips and tricks
- 📋 Performance checklist
- 🔄 Git workflow
- 📝 Naming conventions
- 🚀 Deployment considerations
- ❓ FAQ

**Best for:** Quick lookups while coding, copy-paste templates, and common patterns.

---

### 3. **README.md** (Original project file)
Basic project information and setup instructions.

**What you'll find:**
- Project description
- Installation steps
- Available scripts
- ESLint configuration
- Browser support

**Best for:** First-time setup and basic project info.

---

## 🗺 Navigation Guide

### "I want to understand..."

| Question | Document | Section |
|----------|----------|---------|
| ...how the app is structured | CODEBASE.md | 📁 Project Structure |
| ...what each page does | CODEBASE.md | 🎯 Key Features & Pages |
| ...how to build a new component | DEVELOPER_GUIDE.md | 🎨 Component Template |
| ...how styling works | DEVELOPER_GUIDE.md | 🎨 Styling Tips |
| ...what data looks like | DEVELOPER_GUIDE.md | 🌳 Family Tree Data Structure |
| ...how to run the app | CODEBASE.md | 🚀 Running the Application |
| ...how accessibility works | CODEBASE.md | ♿ Accessibility Features |
| ...how to deploy | DEVELOPER_GUIDE.md | 🚀 Deployment Considerations |
| ...the tech stack used | CODEBASE.md | 🛠 Tech Stack |
| ...common code patterns | DEVELOPER_GUIDE.md | 🔌 Common Patterns |

---

## 🎯 Quick Start Paths

### I'm a New Developer
1. Start with **README.md** - Basic setup
2. Read **CODEBASE.md** - Project overview and 📁 Project Structure
3. Check **DEVELOPER_GUIDE.md** - 🎨 Component Template and common patterns
4. Run `npm start` and explore the app

### I'm Adding a New Feature
1. Review **CODEBASE.md** - 🎯 Key Features & Pages to understand related features
2. Check **DEVELOPER_GUIDE.md** - 🎨 Component Template for boilerplate
3. Reference **CODEBASE.md** - 🧩 Component Architecture for best practices
4. Use **DEVELOPER_GUIDE.md** - 🔌 Common Patterns for implementation

### I'm Fixing a Bug
1. Use **DEVELOPER_GUIDE.md** - 🐛 Debugging Tips to diagnose
2. Check **CODEBASE.md** - 📁 Project Structure to find the right file
3. Reference **DEVELOPER_GUIDE.md** - 📝 Naming Conventions and patterns
4. Test locally with `npm start`

### I'm Styling Something
1. Check **DEVELOPER_GUIDE.md** - 🎨 Styling Tips and Color Palette
2. Review **CODEBASE.md** - 🎨 Design System
3. Reference **DEVELOPER_GUIDE.md** - Common Styled Components examples
4. Test with browser DevTools

### I Need Help
1. Check **DEVELOPER_GUIDE.md** - ❓ FAQ
2. Review **CODEBASE.md** - 🐛 Troubleshooting
3. Look for similar patterns in **DEVELOPER_GUIDE.md** - 🔌 Common Patterns

---

## 🏗 Code Organization

```
UNDERSTANDING THE PROJECT LAYOUT:

📁 src/
   ├── Pages/          ← Full page components (each route)
   ├── Components/     ← Reusable UI components
   ├── Assets/         ← Images, icons, logos
   ├── utils/          ← Shared utility functions
   ├── App.js          ← Main routing (READ THIS FIRST)
   └── index.js        ← Entry point with Analytics

REFER TO: CODEBASE.md → 📁 Project Structure
```

---

## 🎨 Design Consistency

### Colors to Use
```
Primary Actions:    #bd5b3c (rust orange)
Text:              #24312d (dark gray)
Secondary Text:    #52615b (muted green)
Background:        #f6f4ef (cream)
Borders:           rgba(36, 49, 45, 0.1)
```

### Responsive Breakpoint
```
Mobile → Tablet: 768px media query
Use clamp() for fluid sizing
```

**REFER TO:** DEVELOPER_GUIDE.md → 🎨 Styling Tips

---

## 📦 Dependencies

**Key packages used:**
- React 19.1.0
- React Router 7.7.0
- Styled Components 6.1.19
- React Icons 5.5.0
- Vercel Analytics 2.0.1

**REFER TO:** CODEBASE.md → 📦 Key Dependencies

---

## 🚀 Common Commands

```bash
npm start          # Dev server on localhost:3000
npm run build      # Production build
npm test           # Run tests
```

**REFER TO:** DEVELOPER_GUIDE.md → Quick Start

---

## ✅ Quality Standards

The codebase follows these standards:

- ✅ No console.log or debugger statements
- ✅ Consistent `.js` file extension (no duplicate `.jsx` files)
- ✅ Semantic HTML and ARIA labels for accessibility
- ✅ Responsive design with mobile-first approach
- ✅ Styled-components for scoped CSS
- ✅ Reusable components architecture

**REFER TO:** CODEBASE.md → 🔧 Development Best Practices Applied

---

## 📚 Learning Path

### Beginner
1. 📖 Read CODEBASE.md introduction
2. 🚀 Run `npm start`
3. ✨ Explore the UI in browser
4. 🔍 Open src/Pages/HomePage/HomePage.js
5. 🧩 Understand component structure

### Intermediate
1. 📂 Study project structure in CODEBASE.md
2. 🎨 Review styling approach in DEVELOPER_GUIDE.md
3. 🔌 Learn common patterns in DEVELOPER_GUIDE.md
4. 🏗 Try adding a simple component

### Advanced
1. 🏗 Understand data structures in DEVELOPER_GUIDE.md
2. 🌳 Study family tree logic in familyData.js
3. 🎯 Review BuilderPage for complex interactions
4. 📊 Analyze routing in App.js
5. 🧩 Refactor and optimize components

---

## 🤝 Contributing

When contributing to FamilyRoots:

1. Follow patterns in DEVELOPER_GUIDE.md
2. Use naming conventions (DEVELOPER_GUIDE.md → 📝 Naming Conventions)
3. Maintain accessibility standards (CODEBASE.md → ♿ Accessibility Features)
4. Test locally before committing
5. Update documentation if adding features

---

## 🔍 Search Quick References

### By Topic

**Components**
- How to structure a component → DEVELOPER_GUIDE.md → 🎨 Component Template
- Reusable component examples → CODEBASE.md → 🧩 Component Architecture

**Styling**
- Color palette → DEVELOPER_GUIDE.md → 🎨 Styling Tips
- Responsive design → CODEBASE.md → 🎨 Design System

**Data**
- Family tree structure → DEVELOPER_GUIDE.md → 🌳 Family Tree Data Structure
- Local storage usage → CODEBASE.md → 💾 Data Management

**Development**
- Getting started → DEVELOPER_GUIDE.md → 🚀 Quick Start
- Best practices → CODEBASE.md → 🔧 Development Best Practices

**Debugging**
- Common issues → CODEBASE.md → 🐛 Troubleshooting
- Debug tips → DEVELOPER_GUIDE.md → 🐛 Debugging Tips

---

## 📝 Documentation Updates

**Last Updated:** 2026-08-13

**Recent Changes:**
- ✅ Removed duplicate .jsx files (standardized on .js)
- ✅ Comprehensive CODEBASE.md created
- ✅ Developer quick reference guide created
- ✅ Documentation index created

**Next Documentation Improvements:**
- Video walkthroughs (optional)
- Architecture diagrams (optional)
- Component interaction examples (optional)

---

## 💬 Questions & Feedback

**Need help?**
- Check DEVELOPER_GUIDE.md → ❓ FAQ
- Review CODEBASE.md → 🐛 Troubleshooting
- Look for similar patterns in the codebase

**Want to improve documentation?**
- Update the relevant .md file
- Add examples and clarifications
- Keep consistency with existing style

---

## 🎓 Learning Resources

**Internal References:**
- CODEBASE.md - Full reference
- DEVELOPER_GUIDE.md - Practical guide
- README.md - Setup instructions
- Source code comments

**External Resources:**
- React Docs: https://react.dev
- React Router: https://reactrouter.com
- Styled Components: https://styled-components.com
- MDN Web Docs: https://developer.mozilla.org

---

**Welcome to FamilyRoots! 🌳**

Start with the documentation that matches your goal, and you'll find everything you need to understand and develop this application.

Happy coding! 🚀

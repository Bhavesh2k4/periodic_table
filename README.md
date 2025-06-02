# 🧪 Interactive Periodic Table

A modern, responsive periodic table application built with **Next.js 15** and **TypeScript**. Explore the elements of the periodic table with an intuitive interface, detailed element information, and powerful filtering capabilities.

![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-19.0.0-blue)

## ✨ Features

### 🔍 **Interactive Element Grid**
- **Authentic Periodic Layout** - Traditional 18-column periodic table arrangement
- **Visual Category Coding** - Color-coded elements by chemical categories
- **Hover Effects** - Smooth animations and element highlighting
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### 📊 **Advanced Filtering System**
- **Filter by Properties**: Period, Group, Phase, Block, Category
- **Quick Filter Buttons**: Metals, Nonmetals, Noble Gases, Transition Metals
- **Dynamic Categories**: Alkali metals, Alkaline earth metals, Lanthanides, Actinides
- **Real-time Updates** - Instant visual feedback as you filter

### 🔬 **Comprehensive Element Details**
- **Detailed Element Cards** - Atomic mass, electron configuration, physical properties
- **Discovery Information** - Who discovered it and when
- **Electron Shell Visualization** - Shell-by-shell electron distribution
- **Ionization Energies** - Multiple ionization energy levels
- **Physical Properties** - Melting point, boiling point, density, electronegativity

### 🎨 **Modern UI/UX**
- **Dark Theme** - Easy on the eyes with professional dark design
- **Zoom Controls** - Scale the periodic table from 60% to 150%
- **Smooth Animations** - Polished interactions and transitions
- **Category Legend** - Visual guide to element classifications

### 📱 **Mobile Optimized**
- **Touch-Friendly** - Optimized for touch interactions
- **Responsive Grid** - Adapts to different screen sizes
- **Mobile Zoom** - Pinch-to-zoom functionality on mobile devices

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bhavesh2k4/periodic_table
   cd periodic_table
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Main periodic table page
│   └── page.module.css      # Page-specific styles
├── components/
│   ├── ElementCard.tsx      # Detailed element information modal
│   ├── ElementCard.module.css
│   ├── FilterBar.tsx        # Filtering controls component
│   └── FilterBar.module.css
├── data/
│   └── elements.json        # Complete element dataset
└── types.d.ts              # TypeScript type definitions
```

## 🎯 Key Features Explained

### **Smart Filtering System**
```typescript
// Filter by multiple criteria
const filterElements = (element: ChemicalElement) => {
  if (filter === 'period') return element.period.toString() === categoryFilter;
  if (filter === 'group') return element.group?.toString() === categoryFilter;
  if (filter === 'phase') return element.phase.toLowerCase() === categoryFilter;
  // ... more filter logic
};
```

### **Element Categories**
- **Alkali Metals** - Highly reactive metals (Li, Na, K, etc.)
- **Alkaline Earth Metals** - Group 2 elements (Be, Mg, Ca, etc.)
- **Transition Metals** - Central block elements with d-electrons
- **Post-Transition Metals** - Metals after transition metals
- **Metalloids** - Semi-metallic elements (B, Si, As, etc.)
- **Nonmetals** - Non-metallic elements
- **Noble Gases** - Inert gases (He, Ne, Ar, etc.)
- **Lanthanides** - Rare earth elements (Ce, Pr, Nd, etc.)
- **Actinides** - Radioactive elements (Th, U, Pu, etc.)

### **Comprehensive Data**
Each element includes:
- **Basic Properties**: Name, symbol, atomic number, atomic mass
- **Physical Properties**: Melting/boiling points, density, appearance
- **Electronic Structure**: Electron configuration, shells, ionization energies
- **Chemical Properties**: Electronegativity, electron affinity
- **Historical Data**: Discovery information, naming origin

## 🎨 Styling & Themes

### **CSS Modules**
- Scoped styling to prevent conflicts
- Modular component-based approach
- Easy customization and maintenance

### **Responsive Design**
```css
/* Mobile optimization */
@media (max-width: 768px) {
  .element {
    width: 40px;  /* Smaller on mobile */
    height: 40px;
  }
  
  .mass {
    display: none; /* Hide on very small screens */
  }
}
```

### **Color Coding System**
Elements are visually distinguished by their chemical categories:
- 🔴 **Alkali Metals** - Red tones
- 🟠 **Alkaline Earth** - Orange/yellow tones  
- 🟡 **Transition Metals** - Light red/pink tones
- 🟢 **Nonmetals** - Green tones
- 🔵 **Noble Gases** - Blue/cyan tones
- 🟣 **Lanthanides** - Purple/magenta tones

## 🔧 Customization

### **Adding New Filters**
1. Update the `FilterBar` component with new filter options
2. Extend the `filterElements` function logic
3. Add corresponding UI controls

### **Styling Modifications**
- Edit CSS modules for component-specific changes
- Modify `globals.css` for app-wide styling
- Update color schemes in element category classes

### **Data Extensions**
The element data structure supports additional properties:
```typescript
interface ChemicalElement {
  // Core properties
  name: string;
  symbol: string;
  number: number;
  atomic_mass: number;
  
  // Add custom properties here
  customProperty?: string;
}
```

## 📊 Data Source

https://docs.apiverve.com/api/periodictable

## 📚 Learning Resources

This project demonstrates:
- **Next.js 15** - App Router, Server Components
- **TypeScript** - Type safety and modern JavaScript
- **CSS Modules** - Scoped styling architecture
- **Responsive Design** - Mobile-first development
- **Data Visualization** - Interactive scientific data presentation

## 🐛 Troubleshooting

### **Common Issues**

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
```

**Styling Issues**
- Check CSS Module imports
- Verify class name conventions
- Ensure responsive breakpoints

## 📄 License

This project is licensed under the **MIT License** .

---

**⚗️ Built for chemistry enthusiasts, students, and educators who love interactive learning experiences.**

**🚀 Ready to explore the building blocks of matter? Start the development server and dive in!**

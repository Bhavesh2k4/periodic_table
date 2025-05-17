// components/FilterBar.tsx
import { useState, useEffect } from 'react';
import styles from './FliterBar.module.css';

interface Element {
  name: string;
  category: string;
  phase: string;
  period: number;
  group: number | null;
  block: string;
  number: number;
}

interface FilterBarProps {
  filter: string;
  setFilter: (filter: string) => void;
  categoryFilter: string;
  setCategoryFilter: (categoryFilter: string) => void;
  elements: Element[];
}

const FilterBar = ({ 
  filter, 
  setFilter, 
  categoryFilter, 
  setCategoryFilter,
  elements 
}: FilterBarProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [blocks, setBlocks] = useState<string[]>([]);
  const [phases, setPhases] = useState<string[]>([]);
  
  // Extract unique categories, blocks, and phases when elements change
  useEffect(() => {
    if (elements.length > 0) {
      // Extract categories
      const uniqueCategories = [...new Set(elements.map(el => {
        // Simplify category names for better grouping
        const cat = el.category.toLowerCase();
        if (cat.includes('noble gas')) return 'noble gas';
        if (cat.includes('alkali metal')) return 'alkali metal';
        if (cat.includes('alkaline earth metal')) return 'alkaline earth metal';
        if (cat.includes('transition metal')) return 'transition metal';
        if (cat.includes('post-transition metal') || cat.includes('poor metal')) return 'post-transition metal';
        if (cat.includes('metalloid')) return 'metalloid';
        if (cat.includes('nonmetal') && !cat.includes('diatomic')) return 'nonmetal';
        if (cat.includes('diatomic nonmetal')) return 'diatomic nonmetal';
        if (cat.includes('lanthanide')) return 'lanthanide';
        if (cat.includes('actinide')) return 'actinide';
        return cat;
      }))];
      
      setCategories(uniqueCategories as string[]);
      
      // Extract blocks
      const uniqueBlocks = [...new Set(elements.map(el => el.block))];
      setBlocks(uniqueBlocks as string[]);
      
      // Extract phases
      const uniquePhases = [...new Set(elements.map(el => el.phase))];
      setPhases(uniquePhases as string[]);
    }
  }, [elements]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
    setCategoryFilter('all'); // Reset category filter when changing main filter
  };
  
  const handleCategoryFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  // Create options based on the selected filter
  const renderFilterOptions = () => {
    if (filter === 'period') {
      return Array.from({ length: 7 }, (_, i) => i + 1).map(period => (
        <option key={period} value={period.toString()}>Period {period}</option>
      ));
    }
    
    if (filter === 'group') {
      return Array.from({ length: 18 }, (_, i) => i + 1).map(group => (
        <option key={group} value={group.toString()}>Group {group}</option>
      ));
    }
    
    if (filter === 'phase') {
      return phases.map(phase => (
        <option key={phase} value={phase}>{phase.charAt(0).toUpperCase() + phase.slice(1)}</option>
      ));
    }
    
    if (filter === 'block') {
      return blocks.map(block => (
        <option key={block} value={block}>Block {block.toUpperCase()}</option>
      ));
    }
    
    if (filter === 'category') {
      return categories.map(category => (
        <option key={category} value={category}>
          {category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </option>
      ));
    }
    
    return null;
  };

  // Function to handle common element categories
  const handleSpecialFilter = (category: string) => {
    setFilter('category');
    setCategoryFilter(category);
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.mainFilters}>
        <div className={styles.filterGroup}>
          <label htmlFor="filter">Filter By:</label>
          <select 
            id="filter" 
            className={styles.select} 
            value={filter} 
            onChange={handleFilterChange}
          >
            <option value="all">All Elements</option>
            <option value="period">Period</option>
            <option value="group">Group</option>
            <option value="phase">Phase</option>
            <option value="block">Block</option>
            <option value="category">Category</option>
          </select>
        </div>
        
        {filter !== 'all' && (
          <div className={styles.filterGroup}>
            <label htmlFor="categoryFilter">Select {filter.charAt(0).toUpperCase() + filter.slice(1)}:</label>
            <select 
              id="categoryFilter" 
              className={styles.select} 
              value={categoryFilter} 
              onChange={handleCategoryFilterChange}
            >
              <option value="all">All</option>
              {renderFilterOptions()}
            </select>
          </div>
        )}
      </div>
      
      <div className={styles.quickFilters}>
        <button 
          className={`${styles.quickFilterBtn} ${filter === 'category' && categoryFilter === 'metal' ? styles.active : ''}`} 
          onClick={() => handleSpecialFilter('metal')}
        >
          Metals
        </button>
        <button 
          className={`${styles.quickFilterBtn} ${filter === 'category' && categoryFilter === 'nonmetal' ? styles.active : ''}`} 
          onClick={() => handleSpecialFilter('nonmetal')}
        >
          Nonmetals
        </button>
        <button 
          className={`${styles.quickFilterBtn} ${filter === 'category' && categoryFilter === 'noble gas' ? styles.active : ''}`} 
          onClick={() => handleSpecialFilter('noble gas')}
        >
          Noble Gases
        </button>
        <button 
          className={`${styles.quickFilterBtn} ${filter === 'category' && categoryFilter === 'transition metal' ? styles.active : ''}`} 
          onClick={() => handleSpecialFilter('transition metal')}
        >
          Transition Metals
        </button>
        <button 
          className={`${styles.quickFilterBtn} ${filter === 'phase' && categoryFilter === 'Solid' ? styles.active : ''}`} 
          onClick={() => {
            setFilter('phase');
            setCategoryFilter('Solid');
          }}
        >
          Solids
        </button>
        <button 
          className={`${styles.quickFilterBtn} ${filter === 'phase' && categoryFilter === 'Gas' ? styles.active : ''}`} 
          onClick={() => {
            setFilter('phase');
            setCategoryFilter('Gas');
          }}
        >
          Gases
        </button>
        <button 
          className={`${styles.quickFilterBtn} ${filter === 'category' && categoryFilter === 'lanthanide' ? styles.active : ''}`} 
          onClick={() => handleSpecialFilter('lanthanide')}
        >
          Lanthanides
        </button>
        <button 
          className={`${styles.quickFilterBtn} ${filter === 'category' && categoryFilter === 'actinide' ? styles.active : ''}`} 
          onClick={() => handleSpecialFilter('actinide')}
        >
          Actinides
        </button>
        <button 
          className={`${styles.quickFilterBtn} ${filter === 'all' ? styles.active : ''}`} 
          onClick={() => {
            setFilter('all');
            setCategoryFilter('all');
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
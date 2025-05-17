// app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import ElementCard from '@/components/ElementCard';
import FilterBar from '@/components/FliterBar';
import elementsData from '@/data/elements.json';
import styles from './page.module.css';
import { ChemicalElement } from '../../types';

export default function Home() {
  const [selectedElement, setSelectedElement] = useState<ChemicalElement | null>(null);
  const [elements, setElements] = useState<ChemicalElement[]>([]);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    // Convert elements object to array
    const elementsArray = Object.values(elementsData);
    setElements(elementsArray);
  }, []);

  const handleElementClick = (element: ChemicalElement) => {
    setSelectedElement(element);
  };

  const closeElementCard = () => {
    setSelectedElement(null);
  };

  const filterElements = (element: ChemicalElement) => {
    if (filter === 'all') return true;
    
    if (filter === 'period') {
      return element.period.toString() === categoryFilter;
    }
    
    if (filter === 'group') {
      return element.group?.toString() === categoryFilter;
    }
    
    if (filter === 'phase') {
      return element.phase.toLowerCase() === categoryFilter.toLowerCase();
    }
    
    if (filter === 'block') {
      return element.block === categoryFilter;
    }
    
    if (filter === 'category') {
      return element.category.includes(categoryFilter);
    }
    
    return true;
  };

  // Get an array with periods 1-7 and special row 8 (for actinides/lanthanides)
  const periods = Array.from({ length: 8 }, (_, i) => i + 1);
  // Groups 1-18
  const groups = Array.from({ length: 18 }, (_, i) => i + 1);

  // Get empty cell positions (to create the correct table layout)
  const getEmptyCells = (period: number, group: number) => {
    // Empty cells for top rows
    if (period === 1 && group > 1 && group < 18) return true;
    if (period === 2 && group > 2 && group < 13) return true;
    if (period === 3 && group > 2 && group < 13) return true;
    
    // Special rows for lanthanides and actinides
    if ((period === 6 && group >= 3 && group <= 17) && Array.from({ length: 15 }, (_, i) => i + 58).includes(findElementByPosition(period, group)?.number || 0)) {
      return true;
    }
    if ((period === 7 && group >= 3 && group <= 17) && Array.from({ length: 15 }, (_, i) => i + 90).includes(findElementByPosition(period, group)?.number || 0)) {
      return true;
    }
    
    return false;
  };

  // Find element by its position in the table
  const findElementByPosition = (period: number, group: number) => {
    return elements.find(el => el.period === period && el.group === group);
  };

  // Find element by its atomic number
  const findElementByNumber = (number: number) => {
    return elements.find(el => el.number === number);
  };

  // Is this position a lanthanide element?
  const isLanthanide = (number: number) => {
    return number >= 57 && number <= 71;
  };

  // Is this position an actinide element?
  const isActinide = (number: number) => {
    return number >= 89 && number <= 103;
  };

  // Get the category class for styling elements
  const getCategoryClass = (element: ChemicalElement) => {
    if (!element) return '';
    
    const category = element.category.toLowerCase();
    
    if (category.includes('noble gas')) return styles.nobleGas;
    if (category.includes('alkali metal')) return styles.alkaliMetal;
    if (category.includes('alkaline earth metal')) return styles.alkalineEarthMetal;
    if (category.includes('transition metal')) return styles.transitionMetal;
    if (category.includes('post-transition metal') || category.includes('poor metal')) return styles.postTransitionMetal;
    if (category.includes('metalloid')) return styles.metalloid;
    if (category.includes('nonmetal') && !category.includes('diatomic')) return styles.nonmetal;
    if (category.includes('diatomic nonmetal')) return styles.diatomicNonmetal;
    if (category.includes('lanthanide')) return styles.lanthanide;
    if (category.includes('actinide')) return styles.actinide;
    
    return '';
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Interactive Periodic Table</h1>
        <FilterBar 
          filter={filter} 
          setFilter={setFilter} 
          categoryFilter={categoryFilter} 
          setCategoryFilter={setCategoryFilter} 
          elements={elements}
        />
      </div>
      
      <div className={styles.tableContainer}>
        <div className={styles.periodicTable}>
          {/* Main table */}
          {periods.slice(0, 7).map(period => (
            <div key={period} className={styles.period}>
              {groups.map(group => {
                const element = findElementByPosition(period, group);
                const isEmpty = getEmptyCells(period, group);
                
                if (isEmpty) return <div key={`${period}-${group}`} className={styles.emptyCell}></div>;
                
                return element && filterElements(element) ? (
                  <div
                    key={element.number}
                    className={`${styles.element} ${getCategoryClass(element)}`}
                    onClick={() => handleElementClick(element)}
                  >
                    <div className={styles.number}>{element.number}</div>
                    <div className={styles.symbol}>{element.symbol}</div>
                    <div className={styles.name}>{element.name}</div>
                    <div className={styles.mass}>{element.atomic_mass.toFixed(2)}</div>
                  </div>
                ) : element ? (
                  <div key={element.number} className={`${styles.element} ${styles.filtered}`}>
                    <div className={styles.number}>{element.number}</div>
                    <div className={styles.symbol}>{element.symbol}</div>
                    <div className={styles.name}>{element.name}</div>
                    <div className={styles.mass}>{element.atomic_mass.toFixed(2)}</div>
                  </div>
                ) : <div key={`${period}-${group}`} className={styles.emptyCell}></div>;
              })}
            </div>
          ))}
          
          {/* Lanthanides row */}
          <div className={styles.period}>
            {Array.from({ length: 15+3 }, (_, i) => i + 1).map(pos => {
              if (pos <= 2) return <div key={`lanthanide-space-${pos}`} className={styles.emptyCell}></div>;
              
              const atomicNumber = pos - 2 + 56;
              const element = findElementByNumber(atomicNumber);
              
              return element && filterElements(element) ? (
                <div
                  key={element.number}
                  className={`${styles.element} ${getCategoryClass(element)}`}
                  onClick={() => handleElementClick(element)}
                >
                  <div className={styles.number}>{element.number}</div>
                  <div className={styles.symbol}>{element.symbol}</div>
                  <div className={styles.name}>{element.name}</div>
                  <div className={styles.mass}>{element.atomic_mass.toFixed(2)}</div>
                </div>
              ) : element ? (
                <div key={element.number} className={`${styles.element} ${styles.filtered}`}>
                  <div className={styles.number}>{element.number}</div>
                  <div className={styles.symbol}>{element.symbol}</div>
                  <div className={styles.name}>{element.name}</div>
                  <div className={styles.mass}>{element.atomic_mass.toFixed(2)}</div>
                </div>
              ) : <div key={`lanthanide-${pos}`} className={styles.emptyCell}></div>;
            })}
          </div>
          
          {/* Actinides row */}
          <div className={styles.period}>
            {Array.from({ length: 15+3 }, (_, i) => i + 1).map(pos => {
              if (pos <= 2) return <div key={`actinide-space-${pos}`} className={styles.emptyCell}></div>;
              
              const atomicNumber = pos - 2 + 88;
              const element = findElementByNumber(atomicNumber);
              
              return element && filterElements(element) ? (
                <div
                  key={element.number}
                  className={`${styles.element} ${getCategoryClass(element)}`}
                  onClick={() => handleElementClick(element)}
                >
                  <div className={styles.number}>{element.number}</div>
                  <div className={styles.symbol}>{element.symbol}</div>
                  <div className={styles.name}>{element.name}</div>
                  <div className={styles.mass}>{element.atomic_mass.toFixed(2)}</div>
                </div>
              ) : element ? (
                <div key={element.number} className={`${styles.element} ${styles.filtered}`}>
                  <div className={styles.number}>{element.number}</div>
                  <div className={styles.symbol}>{element.symbol}</div>
                  <div className={styles.name}>{element.name}</div>
                  <div className={styles.mass}>{element.atomic_mass.toFixed(2)}</div>
                </div>
              ) : <div key={`actinide-${pos}`} className={styles.emptyCell}></div>;
            })}
          </div>
        </div>
      </div>
      
      {/* Element details card */}
      {selectedElement && (
        <ElementCard element={selectedElement} onClose={closeElementCard} />
      )}
      
      {/* Legend */}
      <div className={styles.legend}>
        <h3>Element Categories</h3>
        <div className={styles.legendItems}>
          <div className={styles.legendItem}>
            <span className={`${styles.legendColor} ${styles.alkaliMetal}`}></span>
            <span>Alkali Metals</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendColor} ${styles.alkalineEarthMetal}`}></span>
            <span>Alkaline Earth Metals</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendColor} ${styles.transitionMetal}`}></span>
            <span>Transition Metals</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendColor} ${styles.postTransitionMetal}`}></span>
            <span>Post-Transition Metals</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendColor} ${styles.metalloid}`}></span>
            <span>Metalloids</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendColor} ${styles.nonmetal}`}></span>
            <span>Other Nonmetals</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendColor} ${styles.diatomicNonmetal}`}></span>
            <span>Diatomic Nonmetals</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendColor} ${styles.nobleGas}`}></span>
            <span>Noble Gases</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendColor} ${styles.lanthanide}`}></span>
            <span>Lanthanides</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendColor} ${styles.actinide}`}></span>
            <span>Actinides</span>
          </div>
        </div>
      </div>
    </main>
  );
}
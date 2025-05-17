// components/ElementCard.tsx
import { useEffect, useRef } from 'react';
import styles from './ElementCard.module.css';

import { ChemicalElement } from '../../types';
const ElementCard = ({ element, onClose }: { element: ChemicalElement; onClose: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // ESC key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  // Get category class for styling
  const getCategoryClass = () => {
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
    <div className={styles.overlay}>
      <div className={`${styles.card} ${getCategoryClass()}`} ref={cardRef}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <div className={styles.header}>
          <div className={styles.number}>{element.number}</div>
          <div className={styles.symbol}>{element.symbol}</div>
          <div className={styles.details}>
            <h2 className={styles.name}>{element.name}</h2>
            <p className={styles.category}>{element.category}</p>
          </div>
        </div>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Atomic Mass</span>
            <span className={styles.value}>{element.atomic_mass.toFixed(4)} u</span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.label}>Period</span>
            <span className={styles.value}>{element.period}</span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.label}>Group</span>
            <span className={styles.value}>{element.group || 'N/A'}</span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.label}>Block</span>
            <span className={styles.value}>{element.block}</span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.label}>Phase</span>
            <span className={styles.value}>{element.phase}</span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.label}>Electron Config</span>
            <span className={styles.value}>{element.electron_configuration_semantic}</span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.label}>Melting Point</span>
            <span className={styles.value}>{element.melt ? `${element.melt} K` : 'N/A'}</span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.label}>Boiling Point</span>
            <span className={styles.value}>{element.boil ? `${element.boil} K` : 'N/A'}</span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.label}>Density</span>
            <span className={styles.value}>{element.density ? `${element.density} g/cm³` : 'N/A'}</span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.label}>Electronegativity</span>
            <span className={styles.value}>{element.electronegativity_pauling || 'N/A'}</span>
          </div>
          
          <div className={styles.infoItem}>
            <span className={styles.label}>Discovered By</span>
            <span className={styles.value}>{element.discovered_by || 'Unknown'}</span>
          </div>
          
          <div className={`${styles.infoItem} ${styles.appearance}`}>
            <span className={styles.label}>Appearance</span>
            <span className={styles.value}>{element.appearance || 'N/A'}</span>
          </div>
        </div>
        
        <div className={styles.summary}>
          <h3>Summary</h3>
          <p>{element.summary}</p>
        </div>
        
        <div className={styles.shells}>
          <h3>Electron Shells</h3>
          <div className={styles.shellDisplay}>
            {element.shells.map((shellElectrons, index) => (
              <div key={index} className={styles.shell}>
                <div className={styles.shellLabel}>Shell {index + 1}</div>
                <div className={styles.shellValue}>{shellElectrons} electrons</div>
              </div>
            ))}
          </div>
        </div>
        
        {element.ionization_energies && element.ionization_energies.length > 0 && (
          <div className={styles.ionization}>
            <h3>Ionization Energies (kJ/mol)</h3>
            <div className={styles.ionizationList}>
              {element.ionization_energies.map((energy, index) => (
                <div key={index} className={styles.ionizationItem}>
                  <span className={styles.ionizationLabel}>{index + 1}</span>
                  <span className={styles.ionizationValue}>{energy}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElementCard;
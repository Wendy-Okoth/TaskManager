import { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

const FONT_SIZES = {
  small: '14px',
  medium: '18px',
  large: '22px',
};

const FONT_FAMILIES = {
  sans: 'Inter, system-ui, sans-serif',
  serif: 'Georgia, serif',
  mono: 'ui-monospace, "JetBrains Mono", monospace',
};

export function AccessibilityProvider({ children }) {
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('accessibility-fontSize') || 'medium';
  });
  const [fontFamily, setFontFamily] = useState(() => {
    return localStorage.getItem('accessibility-fontFamily') || 'sans';
  });

  useEffect(() => {
    localStorage.setItem('accessibility-fontSize', fontSize);
    document.documentElement.style.setProperty('--accessibility-font-size', FONT_SIZES[fontSize]);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('accessibility-fontFamily', fontFamily);
    document.documentElement.style.setProperty('--accessibility-font-family', FONT_FAMILIES[fontFamily]);
  }, [fontFamily]);

  const value = {
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    FONT_SIZES,
    FONT_FAMILIES,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
}
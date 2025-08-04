import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  }
  return context;
};

export const themes = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    cardBackgroundColor: '#f5f5f5',
    buttonBackgroundColor: '#AEEA00',
    buttonTextColor: '#121212',
    borderColor: '#e0e0e0',
    headerBackgroundColor: '#ffffff',
    tabBarBackgroundColor: '#ffffff',
    tabBarActiveColor: '#AEEA00',
    tabBarInactiveColor: '#999999',
    
    // Nouvelles propriétés ajoutées
    inputBackground: '#f5f5f5',
    inputInnerBackground: '#ffffff',
    placeholderColor: '#888888',
    primaryColor: '#AEEA00', // Couleur principale (vert clair)
    secondaryColor: '#AEEA00', // Couleur secondaire (vert plus foncé)
    scanIconColor: '#121212', // Couleur de l'icône QR en mode clair
    scanTextColor: '#121212', // Couleur du texte QR en mode clair
     successColor: '#AEEA00', // Vert clair pour le toast de succès
    successTextColor: '#000000', // Texte noir pour meilleur contraste
    iconColor: '#333333',
    searchButtonColor: '#AEEA00',
    mode: 'light',
    
    fonts: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '900',
      },
    },
  },
  dark: {
    backgroundColor: '#121212',
    textColor: '#ffffff',
    cardBackgroundColor: '#1e1e1e',
    buttonBackgroundColor: '#AEEA00',
    buttonTextColor: '#121212',
    borderColor: '#333333',
    headerBackgroundColor: '#1e1e1e',
    tabBarBackgroundColor: '#1e1e1e',
    tabBarActiveColor: '#AEEA00',
    tabBarInactiveColor: '#888888',
    
    // Nouvelles propriétés ajoutées
    inputBackground: '#1e1e1e',
    inputInnerBackground: '#2d2d2d',
    placeholderColor: '#aaaaaa',
    primaryColor: '#AEEA00', // Même couleur principale
    secondaryColor: '#AEEA00', // Vert plus foncé pour le mode sombre
    scanIconColor: '#ffffff', // Icône QR blanche en mode sombre
    scanTextColor: '#ffffff', // Texte QR blanc en mode sombre
     successColor: '#AEEA00', // Vert clair pour le toast de succès
    successTextColor: '#000000', // Texte noir pour meilleur contraste
    iconColor: '#ffffff',
    searchButtonColor: '#AEEA00',
    mode: 'dark',
    
    fonts: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '900',
      },
    },
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
  
  const currentTheme = isDarkMode ? themes.dark : themes.light;
  
  const value = {
    isDarkMode,
    toggleTheme,
    theme: currentTheme,
    colors: currentTheme,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
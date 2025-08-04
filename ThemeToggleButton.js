import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from './ThemeContext';

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme();
  
  return (
    <View style={styles.floatingContainer}>
      <TouchableOpacity
        style={[
          styles.button,
          {
        
            borderColor: theme.borderColor,
            shadowColor: theme.shadowColor,
          }
        ]}
        onPress={toggleTheme}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText]}>
          {isDarkMode ? '☀️' : '🌙'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    top: -37,
    right: 50,
    zIndex: 1000, // Assure que le bouton est au-dessus de tout
  },
  button: {
    width: 30,
    height: 30,
    top: 1,
    
  },
  buttonText: {
    fontSize: 24,
  },
});

export default ThemeToggleButton;
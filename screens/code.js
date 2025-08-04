import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function PhoneNumberScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const handleKeyPress = (key) => {
    if (key === '⌫') {
      setPhoneNumber(prev => prev.slice(0, -1));
    } else if (typeof key === 'number') {
      setPhoneNumber(prev => prev + key);
    }
  };

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <Image 
        source={require('../assets/icone carte.png')} 
        style={styles.logo}
      />

      {/* Texte d'accueil */}
      <Text style={styles.welcomeText}>Welcome.</Text>
      <Text style={styles.instructionText}>Quel est votre numéro de téléphone?</Text>

      {/* Affichage du numéro avec cadre */}
      <View style={styles.phoneNumberContainer}>
        <View style={styles.prefixContainer}>
          <Text style={styles.phonePrefix}>+225</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.phoneNumber}>
            {phoneNumber || ' '}
          </Text>
        </View>
      </View>

      {/* Bouton de confirmation */}
      <TouchableOpacity 
        style={[
          styles.continueButton,
          phoneNumber.length >= 8 && styles.activeButton
        ]}
        onPress={() => navigation.navigate('Verification')}
        disabled={phoneNumber.length < 8}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      <Image 
        source={require('../assets/TRAIT.png')} 
        style={[styles.bottomLine, { borderWidth: 0 }]}
      />
      {/* Clavier numérique */}
      <View style={styles.keypadContainer}>
        <View style={styles.keypad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map((key, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.key,
                key === '' && styles.emptyKey,
                key === '⌫' && styles.deleteKey
              ]}
              onPress={() => handleKeyPress(key)}
              disabled={key === ''}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 25,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginTop: 40,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 22,
    color: '#333333',
    fontWeight: '600',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    
    
    borderRadius: 12,
    backgroundColor: '#f5f9ff',
    width: '90%',
    height: 40,
    overflow: 'hidden',
  },
  prefixContainer: {
    paddingHorizontal: 15,
    borderRightWidth: 1.5,
   
    height: '100%',
    justifyContent: 'center',
    
  },
  numberContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  phonePrefix: {
    fontSize: 18,
  
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#AEEA00',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 30,
    width: '80%',
    color:'#000000',
  },
  activeButton: {
    backgroundColor: '#AEEA00',
  },
  continueButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  keypadContainer: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 40,
    padding: 15,
    width: '100%',
    maxWidth: 350,
 
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  key: {
    width: 90,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    padding:1,
   
   
   
    
  },
  emptyKey: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  deleteKey: {
   
    borderColor: '#ff4d4d',
  },
  keyText: {
    fontSize: 28,
    color: '#333333',
    fontWeight: '400',
  },
  bottomLine: {
    width: '70%',
    height: 4,
    marginBottom: 0,
    top:247,
  },
});
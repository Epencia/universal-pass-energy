import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { View, Text, StyleSheet } from 'react-native';

const FuelCardScreen = () => {
  return (
    <View style={styles.container}>
      {/* Affichage du QR Code au centre */}
      <View style={styles.qrCodeContainer}>
        <QRCode 
          value="pf6Fwdza82xCoWw" // La valeur fixe
          size={150} // Un peu plus grand pour être bien visible
          color="#000" 
          backgroundColor="#FFF" 
        />
        <Text style={styles.qrCodeLabel}>Scan this QR code</Text>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  qrCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  qrCodeLabel: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
});

export default FuelCardScreen;
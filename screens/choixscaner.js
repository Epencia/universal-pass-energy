import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importation de useRoute pour récupérer route.params
import QRCode from 'react-native-qrcode-svg';

const QRCarte = () => {
  const navigation = useNavigation();
  const route = useRoute();  // Utilisation de useRoute pour récupérer les paramètres

  // Vérifier si qrData est disponible, sinon utiliser une valeur par défaut
  const { qrData } = route.params || { qrData: "DEFAULT-CODE-123" }; // Valeur par défaut si qrData n'est pas passé

  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.background}
        resizeMode="cover"
      >
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ma Carte</Text>
          <TouchableOpacity 
            style={styles.scanButton} 
            onPress={() => navigation.navigate("scaner")}  // Navigation vers une autre page
          >
            <Text style={styles.scanButtonText}>Scanner un QRcode</Text>
          </TouchableOpacity>
        </View>

        {/* Conteneur de la carte avec QR code */}
        <View style={styles.cardContainer}>
          <Image 
            source={require('../assets/cartes/carte_verticale.png')} 
            style={styles.cardImage}
          />
          
          {/* QR Code superposé */}
          <View style={styles.qrCodeContainer}>
            <QRCode 
              value={qrData}  // Valeur du QR Code
              size={120}
              color="#000"
              backgroundColor="transparent"
            />
          </View>
        </View>
                              
        {/* Bouton Partager */}
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={() => Alert.alert("Partager", `Code QR partagé: ${qrData}`)}  // Action de partage
        >
          <Text style={styles.shareButtonText}>Partager mon code QR</Text>
        </TouchableOpacity>
      </ImageBackground>
      
      <Image 
        source={require('../assets/TRAIT.png')} 
        style={styles.bottomLine}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 20,
  },
  header: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 7,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#AEEA00',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  scanButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  scanButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  cardContainer: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 50,
  },
  cardImage: {
    width: 240,
    height: 400,
    borderRadius: 20,
  },
  qrCodeContainer: {
 
    top:'110',
    position: 'absolute',
    bottom: 70,  // Ajuster pour positionner le QR Code à une hauteur correcte
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    
  },
  shareButton: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#AEEA00',
    padding: 15,
    borderRadius: 25,
    alignSelf: 'center',
    width: '80%',
  },
  shareButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomLine: {
    width: 300,
    height: 4,
    marginBottom: 30,
    alignSelf: 'center',
  },
});

export default QRCarte;

import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [stationInfo, setStationInfo] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) return <View style={styles.container} />;
  
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          L'application a besoin d'accéder à votre caméra
        </Text>
        <Button title="Autoriser la caméra" onPress={requestPermission} />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setStationInfo(null); // Réinitialiser l'ancienne info

    try {
      const response = await fetch('https://upe.rivierahills.net/api/client/utilisateur/scan/station', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'ApiKey f2cd00778a66f78b4c64c5ee5f0373e13496c525'
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) throw new Error('Erreur lors de la requête');

      const result = await response.json();

      if (result && result.nom) {
        setStationInfo(result); // Affiche le nom
      } else {
        throw new Error('Station introuvable');
      }

    } catch (error) {
      Alert.alert('Erreur', error.message);
    }
  };

  const handleConfirm = () => {
    if (stationInfo) {
      navigation.navigate('energie', { station: stationInfo });
    }
  };

  const handleRescan = () => {
    setScanned(false);
    setStationInfo(null);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <Image source={require('../assets/icone carte.png')} style={styles.logo} />
          <Text style={styles.instruction}>Scannez un code QR</Text>
          <View style={styles.scanBox} />

          {stationInfo && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Station : {stationInfo.nom}</Text>
              <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          )}

          {scanned && (
            <TouchableOpacity style={styles.button} onPress={handleRescan}>
              <Text style={styles.buttonText}>Scanner un autre code</Text>
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 20,
  },
  instruction: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    top: -100,
    alignSelf: 'center',
    marginTop: 200,
  },
  resultBox: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
    borderRadius: 10,
  },
  resultText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
});

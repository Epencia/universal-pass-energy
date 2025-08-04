import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert
} from 'react-native';

const LogoutScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Ici tu peux ajouter la logique de déconnexion (vider les tokens, naviguer, etc.)
    Alert.alert("Déconnecté", "Vous avez été déconnecté.");
    // navigation.replace("Login"); // par exemple
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Déconnexion</Text>

      <Image
        // source={require('../assets/logo.png')} // ajuste le chemin vers ton logo
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.brand}>Universal{"\n"}<Text style={styles.brandBold}>Pass Energy</Text></Text>

      <View style={styles.confirmBox}>
        <Text style={styles.confirmText}>Voulez-vous vraiment vous{'\n'}déconnecter?</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Annuler</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Déconnecter</Text>
          </TouchableOpacity>
        </View>
 KI     </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    backgroundColor: '#CCFF00',
    borderRadius: 20,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 30,
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginTop: 10,
  },
  brand: {
    textAlign: 'center',
    color: '#7AC100',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  brandBold: {
    fontWeight: '900',
  },
  confirmBox: {
    backgroundColor: '#CCFF00',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  confirmText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  cancelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#CCFF00',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logoutText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default LogoutScreen;

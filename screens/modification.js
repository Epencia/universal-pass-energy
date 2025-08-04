import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Pour l’icône d'œil

const ChangePasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Modifier mon mot de passe</Text>

      <View style={styles.messageBox}>
        <Text style={styles.messageText}>Merci de remplir{"\n"}les informations demandées.</Text>
      </View>

      <Image
        // source={require('../assets/logo.png')} // Remplace par le bon chemin de ton logo
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.brand}>Universal{"\n"}<Text style={styles.brandBold}>Pass Energy</Text></Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nouveau mot de passe</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              secureTextEntry={secureTextEntry}
              value={password}
              onChangeText={setPassword}
              placeholder=""
            />
            <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
              <Icon name={secureTextEntry ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmer nouveau mot de passe</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              secureTextEntry={secureTextEntryConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder=""
            />
            <TouchableOpacity onPress={() => setSecureTextEntryConfirm(!secureTextEntryConfirm)}>
              <Icon name={secureTextEntryConfirm ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Valider</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
    fontSize: 16,
  },
  messageBox: {
    backgroundColor: '#CCFF00',
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
  },
  messageText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
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
  },
  brandBold: {
    fontWeight: '900',
  },
  form: {
    marginTop: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: '#000',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 30,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#CCFF00',
    borderRadius: 30,
    padding: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  submitText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChangePasswordScreen;

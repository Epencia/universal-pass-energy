import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../ThemeContext';
import ThemeToggleButton from '../ThemeToggleButton';

const screenWidth = Dimensions.get('window').width;

export default function Table({ navigation }) {
  // Utilisation correcte du hook useTheme
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    numero: '',
    email: '',
    adresse: '',
    password: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const slideAnim = useState(new Animated.Value(-100))[0]; // Pour animation toast

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const normalizePhoneNumber = (number) => number.replace(/\D/g, '');

  const showSuccessToast = () => {
    setShowSuccess(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setShowSuccess(false));
    }, 2000);
  };

  const handleInscription = async () => {
    const { nom, prenom, numero, email, adresse, password, confirmPassword } = formData;

    if (!nom || !prenom || !numero || !email || !adresse || !password || !confirmPassword) {
      alert('Tous les champs sont obligatoires');
      return;
    }

    if (numero.length < 8) {
      alert('Le numéro doit contenir au moins 8 chiffres');
      return;
    }

    if (password.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    setIsLoading(true);
    const cleanedNumero = normalizePhoneNumber(numero);

    try {
      const response = await fetch('https://upe.rivierahills.net/api/client/utilisateur/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'ApiKey f2cd00778a66f78b4c64c5ee5f0373e13496c525'
        },
        body: JSON.stringify({
          code: `U${Date.now()}`,
          nom,
          prenom,
          telephone: cleanedNumero,
          email,
          adresse,
          login: email,
          mdp: password
        })
      });

      const data = await response.json();

      if (response.ok && data.data) {
        const userData = data.data;
        showSuccessToast();
        setTimeout(() => {
          navigation.navigate('code3', {
            nom: userData.nom,
            prenom: userData.prenom,
            code: userData.code,
            tkn: userData.tkn,
            otp: userData.otp?.code || '',
            telephone: userData.telephone,
            cartes: userData.carte || [],
            userData
          });
        }, 2000);
      } else {
        alert(data.message || data.error || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert(error.message || 'Erreur réseau ou serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showSuccess && (
        <Animated.View style={[styles.toast, { backgroundColor: theme.successColor, transform: [{ translateY: slideAnim }] }]}>
          <Text style={[styles.toastText, { color: theme.successTextColor }]}>Inscription réussie !</Text>
        </Animated.View>
      )}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20}
      >
        <ScrollView 
          contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]} 
          keyboardShouldPersistTaps="handled"
        >
          {/* Ajout du bouton de basculement de thème */}
          <View style={styles.themeToggleContainer}>
            <ThemeToggleButton />
          </View>

          <Image source={require('../assets/icone carte.png')} style={styles.logo} />

          <View style={[styles.inputsContainer, { backgroundColor: theme.cardBackgroundColor }]}>
            <Text style={[styles.title, { color: theme.textColor }]}>Commencer</Text>
            <Text style={[styles.subtitle, { color: theme.textColor }]}>Créer un compte pour continuer !</Text>

            {[
              { label: 'Nom', icon: 'account', field: 'nom' },
              { label: 'Prénom', icon: 'account-outline', field: 'prenom' },
              { label: 'Téléphone', icon: 'phone', field: 'numero', keyboardType: 'phone-pad' },
              { label: 'Adresse', icon: 'map-marker-outline', field: 'adresse' },
              { label: 'Email', icon: 'email-outline', field: 'email', keyboardType: 'email-address', autoCapitalize: 'none' },
              { label: 'Mot de passe', icon: 'lock-outline', field: 'password', secureTextEntry: true },
              { label: 'Confirmer le mot de passe', icon: 'lock-outline', field: 'confirmPassword', secureTextEntry: true }
            ].map((item, index) => (
              <React.Fragment key={index}>
                <Text style={[styles.label, { color: theme.textColor }]}>{item.label}</Text>
                <View style={[styles.inputWrapper, { backgroundColor: theme.backgroundColor, borderColor: theme.borderColor }]}>
                  <Icon name={item.icon} size={18} color="#AEEA00" style={styles.icon} />
                  <TextInput
                    style={[styles.input, { color: theme.textColor }]}
                    placeholder={item.label}
                    placeholderTextColor={theme.textColor + '80'} // Ajout de transparence
                    value={formData[item.field]}
                    onChangeText={(text) => handleChange(item.field, text)}
                    keyboardType={item.keyboardType}
                    secureTextEntry={item.secureTextEntry}
                    autoCapitalize={item.autoCapitalize || 'sentences'}
                  />
                </View>
              </React.Fragment>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: theme.buttonBackgroundColor }, isLoading && styles.disabledBtn]}
            onPress={handleInscription}
            disabled={isLoading}
          >
            <Text style={[styles.btnText, { color: theme.buttonTextColor }]}>
              {isLoading ? 'Traitement...' : 'S\'inscrire'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('connexion')}>
            <Text style={[styles.secondaryText, { color: theme.textColor }]}>
              Déjà un compte ? <Text style={[styles.link, { color: theme.primaryColor }]}>Se connecter</Text>
            </Text>
          </TouchableOpacity>

          <StatusBar backgroundColor="#fff" />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
  },
  themeToggleContainer: {
    alignItems: 'flex-end',
     top:70,
     right:12,
    marginBottom: 30,
  },
  toast: {
    position: 'absolute',
    top: 40,
    left: screenWidth * 0.1,
    width: screenWidth * 0.8,
    backgroundColor: '#AEEA00',
    padding: 15,
    borderRadius: 15,
    zIndex: 999,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  toastText: {
    fontWeight: 'bold',
    color: '#000',
  },
  logo: {
    width: '60%',
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'Roboto-Bold',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Roboto-Regular',
    opacity: 0.7,
  },
  inputsContainer: {
    borderRadius: 30,
    padding: 15,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 3,
    marginLeft: 10,
    fontFamily: 'Roboto-Medium',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 30,
    height: 45,
    borderWidth: 1,
    marginBottom: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
  },
  btn: {
    width: '85%',
    backgroundColor: '#AEEA00',
    paddingVertical: 13,
    borderRadius: 30,
    marginTop: 5,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  disabledBtn: {
    opacity: 0.6,
  },
  btnText: {
    color: '#AEEA00',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
  },
  secondaryText: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 12,
  },
  link: {
    color: '#AEEA00',
    fontWeight: 'bold',
  },
});
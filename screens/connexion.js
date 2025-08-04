import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../ThemeContext';
import ThemeToggleButton from '../ThemeToggleButton';
import { UserContext } from '../UserContext';

export default function ConnexionScreen({ navigation }) {
  // États pour les champs de formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Références pour les animations
  const logoScale = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0)).current;
  
  // Gestion du thème
  const { theme } = useTheme();
  const { setUser } = useContext(UserContext);

  // Animation au chargement
  useEffect(() => {
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 4,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Fonction de connexion
  const handleConnexion = async () => {
    // Validation des champs
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);

    try {
      // Appel à l'API
      const response = await fetch('https://upe.rivierahills.net/api/client/utilisateur/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'ApiKey f2cd00778a66f78b4c64c5ee5f0373e13496c525'
        },
        body: JSON.stringify({
          login: email,
          mdp: password
        })
      });

      const data = await response.json();
      
      // Gestion de la réponse
      if (response.ok && data.data) {
        const userData = data.data;
        setUser(userData);
        
        // Préparation des données pour la page Interface
        const defaultCard = {
          type: 'Carte Standard',
          numero: '•••• •••• •••• ••••',
          solde: 0,
          statut: 'Active',
          dateExpiration: 'N/A',
          code: '••••'
        };

        const userCards = userData.carte || [defaultCard];
        const mainCard = userCards.length > 0 ? userCards[0] : defaultCard;

        // Navigation vers Interface avec toutes les données nécessaires
        navigation.navigate('interface', {
          // Informations utilisateur
          userData,
          nom: userData.nom,
          prenom: userData.prenom,
          telephone: userData.telephone,
          code: userData.code,
          tkn: userData.tkn,
          
          // Informations carte
          cardInfo: mainCard,
          cards: userCards,
          
          // Données supplémentaires
          otp: userData.otp?.code || ''
        });
      } else {
        Alert.alert('Erreur', data.message || 'Échec de la connexion');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Problème de connexion au serveur');
      console.error('Erreur connexion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Composant d'entrée réutilisable
  const renderInput = (value, setValue, iconName, placeholder, secure = false, keyboard = 'default') => (
    <View style={[styles.inputWrapper, { 
      backgroundColor: theme.cardBackgroundColor, 
      borderColor: theme.borderColor 
    }]}>
      <Icon name={iconName} size={18} color="#AEEA00" style={styles.icon} />
      <TextInput
        style={[styles.input, { color: theme.textColor }]}
        placeholder={placeholder}
        placeholderTextColor={theme.textColor + '80'}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secure}
        keyboardType={keyboard}
        autoCapitalize="none"
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Bouton de changement de thème */}
        <View style={styles.themeToggleContainer}>
          <ThemeToggleButton />
        </View>

        {/* Logo animé */}
        <Animated.Image
          source={require('../assets/icone carte.png')}
          style={[styles.logo, { transform: [{ scale: logoScale }] }]}
        />

        {/* Titre */}
        <Text style={[styles.title, { color: theme.textColor }]}>Connexion</Text>

        {/* Formulaire */}
        {renderInput(email, setEmail, 'email-outline', 'Email', false, 'email-address')}
        {renderInput(password, setPassword, 'lock-outline', 'Mot de passe', true)}

        {/* Bouton de connexion animé */}
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[
              styles.button, 
              isLoading && styles.buttonDisabled
            ]}
            onPress={handleConnexion}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Lien vers l'inscription */}
        <TouchableOpacity onPress={() => navigation.navigate('table')}>
          <Text style={[styles.linkText, { color: theme.textColor }]}>
            Pas encore de compte ? <Text style={[styles.link, { color: theme.linkColor }]}>S'inscrire</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 15,
  },
  themeToggleContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  logo: {
    width: 300,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
    left: -20,
    top: -20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
  },
  button: {
    backgroundColor: '#AEEA00',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    minWidth: '70%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
    backgroundColor: '#AEEA00',
  },
  linkText: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 13,
  },
  link: {
    fontWeight: 'bold',
  },
});
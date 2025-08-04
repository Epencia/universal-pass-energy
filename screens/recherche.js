import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import ThemeToggleButton from '../ThemeToggleButton';

const FuelCardDetailScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [cardNumber, setCardNumber] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cardNumber.trim() === '') {
      setResults([]);
    }
  }, [cardNumber]);

  const handleSearch = async () => {
    const recherche = cardNumber.trim();

    if (!recherche) {
      Alert.alert('Erreur', 'Veuillez entrer un numéro, un nom ou un numéro de carte.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://upe.rivierahills.net/api/client/utilisateur/recherche',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'ApiKey f2cd00778a66f78b4c64c5ee5f0373e13496c525',
          },
          body: JSON.stringify({ data: recherche }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTPS ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Réponse complète du serveur:', data);

      if (data && typeof data === 'object' && !Array.isArray(data)) {
        setResults([data]);
        navigation.navigate('transfere', { cardData: data });
      } else {
        setResults([]);
        Alert.alert('Aucun résultat', 'Aucun utilisateur correspondant trouvé.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error.message);
      Alert.alert('Erreur de connexion', 'Impossible de contacter le serveur ou la réponse est invalide.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header avec bouton thème */}
      <View style={styles.header}>
        <ThemeToggleButton />
      </View>

      <Image 
        source={require('../assets/cartes/carte1.png')} 
        style={styles.cardImage} 
      />

      {/* Barre de recherche - Conteneur principal */}
      <View style={[styles.searchContainer, { 
        backgroundColor: theme.inputBackground,
        shadowColor: theme.mode === 'dark' ? '#FFF' : '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
      }]}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Numéro, nom ou carte"
            placeholderTextColor={theme.placeholderColor}
            style={[styles.input, { 
              color: theme.textColor,
              backgroundColor: theme.inputInnerBackground || theme.inputBackground,
            }]}
            value={cardNumber}
            onChangeText={setCardNumber}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity 
            style={[styles.searchButton, { 
              backgroundColor: theme.primaryColor,
            }]}
            onPress={handleSearch}
          >
            <Icon name="magnify" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bouton Scanner QR Code */}
      <TouchableOpacity 
        style={[styles.scanButton, { 
          backgroundColor: theme.secondaryColor || theme.primaryColor,
          borderColor: theme.primaryColor,
        }]} 
        onPress={() => navigation.navigate('scaner')}
      >
        <Icon name="qrcode-scan" size={24} color={theme.scanIconColor || '#FFFFFF'} />
        <Text style={[styles.scanButtonText, { color: theme.scanTextColor || '#FFFFFF' }]}>
          Scanner le code QR
        </Text>
      </TouchableOpacity>

      <View style={[styles.separator, { backgroundColor: theme.separatorColor || theme.primaryColor }]} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primaryColor} />
          <Text style={[styles.loadingText, { color: theme.textColor }]}>
            Chargement en cours...
          </Text>
        </View>
      ) : results.length > 0 ? (
        <View style={styles.resultsContainer}>
          <Text style={[styles.dataKey, { color: theme.textColor }]}>Nom :</Text>
          <Text style={[styles.dataText, { color: theme.textColor }]}>
            {results[0]?.nom ?? '---'} {results[0]?.prenom}
          </Text>
        </View>
      ) : (
        <Text style={[styles.emptyListText, { color: theme.textColor }]}>
          Aucun résultat trouvé.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 25,
    resizeMode: 'contain',
  },
  searchContainer: {
    borderRadius: 30,
    marginBottom: 25,
    padding: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  searchButton: {
    padding: 14,
    position: 'absolute',
    right: 0,
    borderRadius: 25,
  },
  scanButton: {
    flexDirection: 'row',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    borderWidth: 1,
  },
  scanButtonText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    marginVertical: 25,
    width: '100%',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
  },
  emptyListText: {
    marginTop: 25,
    fontSize: 16,
    textAlign: 'center',
  },
  resultsContainer: {
    marginTop: 25,
    paddingHorizontal: 15,
  },
  dataKey: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  dataText: {
    fontSize: 16,
  },
});

export default FuelCardDetailScreen;
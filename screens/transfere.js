import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../UserContext';
import { useTheme } from '../ThemeContext';

const TransferEnergyScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useContext(UserContext);
  const { theme } = useTheme();

  const sourceCard = user?.cartes?.[0] ?? user?.carte?.[0] ?? null;
  const destinationCard = route.params?.cardData ?? null;
  const destCardData = destinationCard?.carte?.[0] ?? null;

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateTransfer = () => {
    if (!sourceCard?.numero || !sourceCard?.cle) {
      setError('Votre carte source est incomplète');
      return false;
    }

    if (!destCardData?.numero || !(destCardData?.cle || destCardData?.code)) {
      setError('La carte destination est incomplète');
      return false;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Veuillez entrer un montant valide (en litres)');
      return false;
    }

    setError(null);
    return true;
  };

  const handleTransfer = async () => {
    if (!validateTransfer()) return;

    setLoading(true);

    try {
      const payload = {
        carte_exp: sourceCard.numero,
        tkn_exp: sourceCard.cle,
        carte_des: destCardData.numero,
        tkn_des: destCardData.cle || destCardData.code,
        valeur: amount,
      };

      const response = await fetch('https://upe.rivierahills.net/api/client/utilisateur/transfert/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'ApiKey f2cd00778a66f78b4c64c5ee5f0373e13496c525',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Échec du transfert');
      }

      Alert.alert(
        'Transfert réussi',
        `Vous avez transféré ${amount} unités`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.headerBackgroundColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.headerTextColor }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: theme.headerTextColor }]}>TRANSFERE DE L’ÉNERGIE</Text>
      </View>

      {/* Carte destination */}
      <View style={[styles.cardBox, { backgroundColor: theme.cardBackgroundColor, borderColor: theme.borderColor }]}>
        <Text style={[styles.label, { color: theme.secondaryTextColor }]}>NUMERO CARTE</Text>
        <Text style={[styles.value, { color: theme.textColor, borderBottomColor: theme.borderColor }]}>{destCardData?.numero ?? '----'}</Text>

        <Text style={[styles.label, { color: theme.secondaryTextColor }]}>TITULAIRES</Text>
        <Text style={[styles.value, { color: theme.textColor, borderBottomColor: theme.borderColor }]}>{destCardData?.cle || destCardData?.code || '----'}</Text>

        <Text style={[styles.label, { color: theme.secondaryTextColor }]}>Volumes</Text>
        <View style={[styles.volumeBox, { backgroundColor: theme.inputBackgroundColor }]}>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={theme.placeholderTextColor}
            style={[styles.volumeInput, { color: theme.textColor }]}
          />
          <Text style={[styles.litreText, { color: theme.secondaryTextColor }]}>unités</Text>
        </View>
      </View>

      {/* Erreur */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* Bouton envoyer */}
      <TouchableOpacity
        onPress={handleTransfer}
        style={[styles.submitButton, { backgroundColor: theme.buttonBackgroundColor }, loading && { opacity: 0.6 }]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={theme.buttonTextColor} />
        ) : (
          <Text style={[styles.submitText, { color: theme.buttonTextColor }]}>Envoyer</Text>
        )}
      </TouchableOpacity>

      {/* Logo Universal Pass Energy */}
      <Text style={styles.logo}>Universal{"\n"}Pass Energy</Text>

      {/* Logos partenaires (remplace par une vraie image si nécessaire) */}
      <Image
        // source={require('../assets/partenaires.png')}
        style={styles.partnersImage}
        resizeMode="contain"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  backText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#000',
  },
  cardBox: {
    width: '100%',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginTop: 10,
  },
  value: {
    borderBottomWidth: 2,
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 4,
  },
  volumeBox: {
    flexDirection: 'row',
    borderRadius: 20,
    marginTop: 8,
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  volumeInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  litreText: {
    fontWeight: 'bold',
  },
  submitButton: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 10,
  },
  submitText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  logo: {
    marginTop: 30,
    textAlign: 'center',
    color: '#B7EF00',
    fontWeight: 'bold',
    fontSize: 18,
  },
  partnersImage: {
    width: '100%',
    height: 60,
    marginTop: 20,
  },
  error: {
    color: '#e74c3c',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default TransferEnergyScreen;

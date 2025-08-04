import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, Image, SafeAreaView, StatusBar, Platform, Alert,
  ActivityIndicator, Keyboard, Animated, Dimensions, KeyboardAvoidingView
} 
from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../ThemeContext';
import ThemeToggleButton from '../ThemeToggleButton';

const screenWidth = Dimensions.get('window').width;

const OPERATORS = [
  { id: 'moov', name: 'Moov', icon: require('../assets/icones/moov.png') },
  { id: 'mtn', name: 'MTN', icon: require('../assets/icones/MTN.png') },
  { id: 'orange', name: 'Orange', icon: require('../assets/icones/orange.png') },
  { id: 'wave', name: 'Wave', icon: require('../assets/icones/wave.png') }
];

const PaymentForm = ({ route }) => {
  const { theme } = useTheme();
  const { cardInfo } = route.params || {};
  const [formData, setFormData] = useState({ numero: '', valeur: '', total: '' });
  const [fees, setFees] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const slideAnim = useState(new Animated.Value(-100))[0];
  const lastChanged = useRef(null);
  const navigation = useNavigation();

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

  const calculateFromValue = useCallback((value) => {
    if (!value || isNaN(value)) {
      setFees(0);
      setFormData(prev => ({ ...prev, total: '' }));
      return;
    }
    const amt = parseFloat(value);
    const fee = amt * 0.015;
    setFees(fee);
    setFormData(prev => ({ ...prev, total: (amt + fee).toFixed(0) }));
  }, []);

  const calculateFromTotal = useCallback((totalValue) => {
    if (!totalValue || isNaN(totalValue)) {
      setFees(0);
      setFormData(prev => ({ ...prev, valeur: '' }));
      return;
    }
    const totalNum = parseFloat(totalValue);
    const baseValue = totalNum / 1.015;
    const fee = totalNum - baseValue;
    setFees(fee);
    setFormData(prev => ({ ...prev, valeur: baseValue.toFixed(0) }));
  }, []);

  useEffect(() => {
    if (lastChanged.current === 'valeur') {
      calculateFromValue(formData.valeur);
    }
  }, [formData.valeur]);

  useEffect(() => {
    if (lastChanged.current === 'total') {
      calculateFromTotal(formData.total);
    }
  }, [formData.total]);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ numero: '', valeur: '', total: '' });
    setFees(0);
  };

  const handleConfirm = async () => {
    Keyboard.dismiss();

    const cleanNumero = formData.numero.replace(/\D/g, '');
    if (cleanNumero.length !== 10) {
      Alert.alert('Erreur', '📱 Le numéro doit contenir exactement 10 chiffres (ex: 0748753992)');
      return;
    }

    if (!formData.valeur || parseFloat(formData.valeur) <= 0) {
      Alert.alert('Erreur', '💰 Veuillez entrer un montant valide');
      return;
    }

    if (!cardInfo?.numero || !cardInfo?.cle) {
      Alert.alert('Erreur', '❌ Informations de carte manquantes.');
      return;
    }

    const payload = {
      carte: cardInfo.numero,
      mode: 'Wave',
      numero: cleanNumero,
      valeur: parseFloat(formData.valeur).toFixed(0),
      tkn: cardInfo.cle
    };

    Alert.alert(
      '💳 Confirmation du paiement',
      `✅ Montant: ${formData.valeur} FCFA\n➕ Frais: ${fees.toFixed(0)} FCFA\n💸 Total: ${formData.total} FCFA\n\n📞 Vers: ${cleanNumero}\n🔁 Méthode: Wave`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Confirmer',
          onPress: async () => {
            setLoading(true);
            try {
              const response = await fetch('https://upe.rivierahills.net/api/client/utilisateur/recharge/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'ApiKey f2cd00778a66f78b4c64c5ee5f0373e13496c525'
                },
                body: JSON.stringify(payload),
              });

              const data = await response.json();

              if (response.ok) {
                showSuccessToast();
                setTimeout(() => {
                  navigation.navigate('payementsucces', {
                    paymentData: {
                      titre: 'Paiement Réussi',
                      message: `🧾 Référence: ${data.reference}\n💰 Montant envoyé: ${data.valeur} FCFA\n💸 Frais: ${data.frais} FCFA\n🔐 Code: ${data.code}\n📅 Date: ${new Date(data.created_on).toLocaleString()}`
                    }
                  });
                }, 2000);
              } else {
                navigation.navigate('payementechec', {
                  errorMessage: data.message || `Échec du paiement (${response.status})`
                });
              }
            } catch (error) {
              navigation.navigate('Echec', {
                errorMessage: '❌ Impossible de contacter le serveur: ' + error.message
              });
            } finally {
              setLoading(false);
              resetForm();
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}>
      {showSuccess && (
        <Animated.View style={[styles.toast, { backgroundColor: theme.successColor, transform: [{ translateY: slideAnim }] }]}>
          <Text style={[styles.toastText, { color: theme.successTextColor }]}>Paiement réussi !</Text>
        </Animated.View>
      )}

      <View style={styles.themeToggleContainer}>
        <ThemeToggleButton />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20}
      >
        <ScrollView 
          contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]} 
          keyboardShouldPersistTaps="handled"
        >
          <Image source={require('../assets/icone carte.png')} style={styles.logo} />

          <View style={[styles.header, { backgroundColor: theme.cardBackgroundColor }]}>
            <Text style={[styles.sectionHeader, { color: theme.textColor }]}>Opérateurs Mobiles</Text>
            <Text style={[styles.sectionTitle, { color: theme.primaryColor }]}>Méthode de paiement: Wave</Text>
            <View style={styles.operatorsRow}>
              {OPERATORS.map(operator => (
                <TouchableOpacity
                  key={operator.id}
                  style={[
                    styles.operatorCircle, 
                    { backgroundColor: theme.inputBackgroundColor, borderColor: theme.borderColor },
                    selectedOperator === operator.id && { borderColor: theme.primaryColor }
                  ]}
                  onPress={() => setSelectedOperator(operator.id)}
                >
                  <Image source={operator.icon} style={styles.operatorIcon} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={[styles.formContainer, { backgroundColor: theme.cardBackgroundColor }]}>
            <View style={[styles.formSection, { backgroundColor: theme.inputBackgroundColor }]}>
              <Text style={[styles.inputLabel, { color: theme.textColor }]}>Numéro de téléphone</Text>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: theme.inputBackgroundColor, 
                    borderColor: theme.borderColor,
                    color: theme.textColor
                  }
                ]}
                value={formData.numero}
                onChangeText={(text) => handleInputChange('numero', text.replace(/\D/g, '').slice(0, 10))}
                keyboardType="phone-pad"
                placeholder="Ex: 0748753992"
                placeholderTextColor={theme.placeholderTextColor}
                maxLength={10}
                editable={!loading}
              />

              <Text style={[styles.inputLabel, { color: theme.textColor }]}>Montant à envoyer</Text>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: theme.inputBackgroundColor, 
                    borderColor: theme.borderColor,
                    color: theme.textColor
                  }
                ]}
                value={formData.valeur}
                onChangeText={(value) => {
                  lastChanged.current = 'valeur';
                  handleInputChange('valeur', value.replace(/[^0-9]/g, ''));
                }}
                keyboardType="numeric"
                placeholder="Ex: 15000"
                placeholderTextColor={theme.placeholderTextColor}
                editable={!loading}
              />

              <Text style={[styles.feesText, { color: theme.errorColor }]}>
                Frais (1.5%) estimés: {fees.toFixed(0)} FCFA
              </Text>

              <Text style={[styles.inputLabel, { color: theme.textColor }]}>Total à débiter</Text>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: theme.inputBackgroundColor, 
                    borderColor: theme.borderColor,
                    color: theme.textColor
                  }
                ]}
                value={formData.total}
                onChangeText={(value) => {
                  lastChanged.current = 'total';
                  handleInputChange('total', value.replace(/[^0-9]/g, ''));
                }}
                keyboardType="numeric"
                placeholder="Ex: 15225"
                placeholderTextColor={theme.placeholderTextColor}
                editable={!loading}
              />

              <View style={[styles.warningBox, { backgroundColor: theme.warningBackgroundColor }]}>
                <Text style={[styles.warningText, { color: theme.warningTextColor }]}>
                  ⚠️ Générez votre code de paiement en composant.
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.button, 
                  styles.confirmButton, 
                  { backgroundColor: theme.buttonBackgroundColor },
                  loading && styles.buttonDisabled
                ]}
                onPress={handleConfirm}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={theme.buttonTextColor} />
                ) : (
                  <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>✅ Confirmer</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button, 
                  styles.cancelButton, 
                  { backgroundColor: theme.secondaryButtonBackgroundColor }
                ]}
                onPress={resetForm}
                disabled={loading}
              >
                <Text style={[styles.cancelButtonText, { color: theme.secondaryButtonTextColor }]}>
                  ❌ Annuler
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.warningTextBottom, { color: theme.textSecondaryColor }]}>
              Cher client, avant de poursuivre avec le paiement, merci de vérifier que le montant nécessaire à la transaction est bien disponible.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar backgroundColor="#fff" /> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
  },
  themeToggleContainer: {
    position: 'absolute',
    right: 20,
    top:  70,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  toast: {
    position: 'absolute',
    top: 40,
    left: screenWidth * 0.1,
    width: screenWidth * 0.8,
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
  },
  logo: {
    width: '60%',
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  operatorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  operatorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  operatorIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    borderRadius: 16,
    padding: 20,
  },
  formSection: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  feesText: {
    fontSize: 13,
    marginTop: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  warningBox: {
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  warningText: {
    fontSize: 11,
    textAlign: 'center',
  },
  warningTextBottom: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 15,
  },
  button: {
    height: 50,
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    marginTop: 20,
  },
  cancelButton: {
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  cancelButtonText: {
    fontWeight: '700',
    fontSize: 16,
  },
});

export default PaymentForm;
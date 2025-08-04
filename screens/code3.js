import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  ToastAndroid,
  Platform,
  Modal,
} from 'react-native';
import { UserContext } from '../UserContext';
import { useTheme } from '../ThemeContext';
import ThemeToggleButton from '../ThemeToggleButton';

const VerificationScreen = ({ navigation, route }) => {
  const { setUser } = useContext(UserContext);
  const { theme } = useTheme();

  const {
    nom = '',
    prenom = '',
    code: login = '',
    tkn = '',
    otp = '',
    telephone = '',
    cartes = [],
  } = route.params || {};

  const [userCode, setUserCode] = useState(['', '', '', '', '', '']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [validatedData, setValidatedData] = useState(null);
  const [showOtp, setShowOtp] = useState(false);

  useEffect(() => {
    if (otp) {
      const timer = setTimeout(() => {
        setShowOtp(true);
        if (Platform.OS === 'android') {
          ToastAndroid.show(`Votre code est : ${otp}`, ToastAndroid.LONG);
        }
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [otp]);

  const handleKeyPress = (num) => {
    if (currentIndex < 6) {
      const updated = [...userCode];
      updated[currentIndex] = num.toString();
      setUserCode(updated);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBackspace = () => {
    if (currentIndex > 0) {
      const updated = [...userCode];
      updated[currentIndex - 1] = '';
      setUserCode(updated);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const fullCode = userCode.join('');
    if (fullCode.length !== 6) {
      Alert.alert('Erreur', 'Le code doit contenir 6 chiffres.');
      return;
    }
    if (!login || !tkn) {
      Alert.alert('Erreur', 'Login ou token manquant.');
      return;
    }

    setLoading(true);

    const requestBody = { login, tkn, code: fullCode };

    try {
      const response = await fetch('http://upe.rivierahills.net/api/client/utilisateur/confirm-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'ApiKey f2cd00778a66f78b4c64c5ee5f0373e13496c525',
        },
        body: JSON.stringify(requestBody),
      });

      const raw = await response.text();
      const json = JSON.parse(raw);

      if (!response.ok || !json?.data) {
        throw new Error(json?.message || 'Réponse invalide.');
      }

      setUser(json.data);

      const carte = json.data.carte?.[0] || {};
      const carteInfo = {
        numero: carte.numero || 'Aucune',
        solde: carte.solde || 0,
        code: carte.code || 'Aucun',
        dateExpiration: carte.date_expiration || 'Inconnue',
        statut: carte.statut || 'Inconnu',
        type: carte.type || 'Non spécifié',
      };

      setValidatedData({
        nom: json.data.nom,
        prenom: json.data.prenom,
        telephone: json.data.telephone,
        code: fullCode,
        message: json.message,
        cartes: json.data.carte,
        carteInfo,
        userData: json.data,
      });

      setSuccessModalVisible(true);
    } catch (err) {
      Alert.alert('Erreur de vérification', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setSuccessModalVisible(false);
    if (validatedData) {
      navigation.navigate('bienvenu', {
        ...validatedData,
        verificationCode: validatedData.code,
      });
    }
  };

  const isCodeComplete = userCode.every((digit) => digit !== '');
  const displayCode = userCode.join('');

  // Configuration du clavier numérique
  const keypadLayout = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [null, 0, 'backspace']
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.themeToggleContainer}>
        <ThemeToggleButton />
      </View>
      
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={[styles.header, { color: theme.textColor }]}>VERIFICATION</Text>
          
          <View style={[styles.messageBox, { backgroundColor: theme.cardBackgroundColor }]}>
            <Text style={[styles.messageText, { color: theme.textColor }]}>
              Un code a été envoyé pour la vérification :
            </Text>
            
            {showOtp && (
              <Text style={[styles.codeShown, { color: theme.textColor }]}>
                <Text style={{ fontWeight: 'bold' }}>{otp}</Text>
              </Text>
            )}
          </View>
          
          <Text style={[styles.passwordPrompt, { color: theme.textColor }]}>
            Code de vérification
          </Text>
          
          <View style={[styles.codeDisplay, { backgroundColor: theme.cardBackgroundColor }]}>
            <Text style={[styles.codeText, { color: theme.textColor }]}>
              {displayCode}
            </Text>
          </View>
        </View>

        <View style={styles.codeIndicatorContainer}>
          {userCode.map((digit, index) => (
            <View
              key={index}
              style={[
                styles.codeDot,
                digit !== '' && styles.codeDotFilled,
                index === currentIndex && styles.codeDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton, 
            (!isCodeComplete || loading) && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!isCodeComplete || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Valider</Text>
          )}
        </TouchableOpacity>

        {/* Clavier numérique amélioré */}
        <View style={styles.keypad}>
          {keypadLayout.map((row, rowIndex) => (
            <View style={styles.keyRow} key={`row-${rowIndex}`}>
              {row.map((key, keyIndex) => {
                if (key === null) {
                  return (
                    <View style={styles.emptyKey} key={`empty-${keyIndex}`} />
                  );
                }
                
                if (key === 'backspace') {
                  return (
                    <TouchableOpacity
                      key="backspace"
                      style={[
                        styles.key, 
                        { backgroundColor: theme.cardBackgroundColor }
                      ]}
                      onPress={handleBackspace}
                      disabled={loading}
                    >
                      <Text style={[styles.backspaceText, { color: theme.textColor }]}>
                        ⌫
                      </Text>
                    </TouchableOpacity>
                  );
                }
                
                return (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.key, 
                      { backgroundColor: theme.cardBackgroundColor }
                    ]}
                    onPress={() => handleKeyPress(key)}
                    disabled={loading}
                  >
                    <Text style={[styles.keyText, { color: theme.textColor }]}>
                      {key}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>

      {/* Modal de succès */}
      <Modal visible={successModalVisible} animationType="slide" transparent>
        <View style={[styles.modalContainer, { backgroundColor: theme.modalOverlay }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackgroundColor }]}>
            <Text style={styles.modalIcon}>🎉</Text>
            <Text style={[styles.modalTitle, { color: theme.textColor }]}>
              Bienvenue, {validatedData?.prenom} !
            </Text>
            <Text style={[styles.modalSubTitle, { color: theme.textColor }]}>
              🎊 Votre compte est actif 🎊
            </Text>
            <Text style={[styles.modalMessage, { color: theme.textColor }]}>
              <Text style={{ fontWeight: 'bold' }}>
                {validatedData?.prenom} {validatedData?.nom}
              </Text>, votre compte a été validé avec succès !
            </Text>
            <Text style={[styles.modalFooter, { color: theme.textColor }]}>
              {validatedData?.message}
            </Text>
            <TouchableOpacity 
              onPress={handleModalClose} 
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Continuer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  themeToggleContainer: {
    alignItems: 'flex-end',
    padding: 15,
  },
  content: { 
    flex: 1, 
    justifyContent: 'space-between', 
    paddingBottom: 20,
  },
  headerSection: { 
    marginTop: 20, 
    paddingHorizontal: 25, 
    alignItems: 'center',
  },
  header: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 15,
  },
  messageBox: {
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  messageText: { 
    fontSize: 16, 
    textAlign: 'center',
  },
  codeShown: {
    fontSize: 22,
    marginTop: 10,
    textAlign: 'center',
  },
  passwordPrompt: { 
    fontSize: 18, 
    marginVertical: 15, 
    fontWeight: '500', 
    textAlign: 'center',
  },
  codeDisplay: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  codeText: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    letterSpacing: 5,
  },
  codeIndicatorContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 20,
  },
  codeDot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 8,
  },
  codeDotFilled: { 
    backgroundColor: '#B7E2C7',
  },
  codeDotActive: { 
    backgroundColor: '#AEEA00',
  },
  submitButton: {
    backgroundColor: '#AEEA00',
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 30,
    marginBottom: 15,
    alignItems: 'center',
  },
  disabledButton: { 
    backgroundColor: '#A9A9A9',
  },
  submitButtonText: { 
    color: '#FFFFFF', 
    fontWeight: 'bold', 
    fontSize: 18,
  },
  keypad: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  key: {
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyKey: {
    width: 70,
    height: 70,
    backgroundColor: 'transparent',
  },
  keyText: { 
    fontSize: 28, 
    fontWeight: 'bold',
  },
  backspaceText: { 
    fontSize: 28, 
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
  },
  modalIcon: { 
    fontSize: 65, 
    marginBottom: 10,
  },
  modalTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10,
  },
  modalSubTitle: { 
    fontSize: 20, 
    marginBottom: 15,
  },
  modalMessage: { 
    fontSize: 18, 
    marginBottom: 15, 
    textAlign: 'center',
  },
  modalFooter: { 
    fontSize: 14, 
    fontStyle: 'italic', 
    marginBottom: 25,
  },
  modalButton: {
    backgroundColor: '#AEEA00',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 45,
  },
  modalButtonText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 18,
  },
});

export default VerificationScreen;
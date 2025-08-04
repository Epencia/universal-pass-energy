import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions,  StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const { width } = Dimensions.get('window');

const PaymentConfirmationScreen = ({ route, navigation }) => {
  const { paymentData } = route.params;

  // Fonction pour générer et partager le PDF via expo-print
  const handleDownloadReceipt = async () => {
   const htmlContent = `
  <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; color: #333;">
    <img src="https://example.com/logo.png" alt="Logo" style="width: 100px; margin-bottom: 20px;" />
    
    <h1 style="color: green; font-size: 24px; margin-bottom: 10px;">${paymentData.titre}</h1>

    <div style="border: 1px solid #ccc; padding: 20px; border-radius: 10px; background-color: #f9f9f9; text-align: left; display: inline-block; margin-top: 20px;">
      ${paymentData.message.replace(/\n/g, '<br/>')}
    </div>

    <p style="margin-top: 40px; font-size: 12px; color: gray;">Paiement sécurisé - UPE</p>
  </div>
`;


    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        alert('Partage non disponible sur ce périphérique');
      }
    } catch (error) {
      console.error('Erreur PDF:', error);
      alert("Échec de la génération du reçu.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity
  onPress={() => navigation.goBack()}
  style={{ marginTop: -100, marginLeft: -30 }}
>
  <Ionicons name="arrow-back" size={24} color="#fff" />
</TouchableOpacity>

         <Image
                      source={require('../assets/seeting.png')}
                      style={styles.settingsIcon}
                    />
        <View>
          
          <Text style={styles.operatorLabel}>Opérateur Mobile</Text>
          <Text style={styles.operatorName}>UPE</Text>
          <Text style={styles.total}>
            {paymentData?.message?.match(/Montant envoyé: (.*) FCFA/)?.[0] || ''}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.approvalText}>{paymentData?.titre || 'Paiement Approuvé'}</Text>

        <View style={styles.card}>
          <Ionicons name="checkmark-circle" size={90} color="green" />
          <View style={styles.details}>
            {paymentData?.message?.split('\n').map((line, index) => (
              <Text key={index} style={styles.detailText}>{line}</Text>
            ))}
          </View>

          <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadReceipt}>
            <Text style={styles.downloadButtonText}>Télécharger mon reçu</Text>
          </TouchableOpacity>

          <Image source={require('../assets/ICONE ENVOIE.png')} style={styles.ICOENSTATION} />
        </View>

        <Image source={require('../assets/TRAIT.png')} style={styles.trai} />
        <Text style={styles.securedText}>Paiement sécurisé</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#000',
    paddingTop: 70,
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  operatorLabel: { color: '#6EFF00', fontWeight: 'bold', fontSize: 14, right: 120, top: -30 },
  operatorName: { color: '#6EFF00', fontWeight: 'bold', fontSize: 16, right: 140 },
  total: { color: '#6EFF00', fontWeight: 'bold', fontSize: 14, right: 140 },

  body: {
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  approvalText: { color: 'green', fontWeight: 'bold', marginBottom: 20, fontSize: 16 },
  card: {
    top: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: width * 0.8,
    alignItems: 'center',
    elevation: 20,
  },
  details: { width: '100%', marginBottom: 20 },
  detailText: { fontSize: 14, marginBottom: 4 },
  bold: { fontWeight: 'bold' },

  downloadButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 240,
    borderRadius: 25,
    marginTop: 10,
  },
  downloadButtonText: { color: 'black', fontWeight: 'bold' },

  securedText: {
    marginTop: 100,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
   settingsIcon: {
    left:230,
    width: 70,
    top: -40,  
    color: 'white',
    height: 40,
  },
  trai: {
    top: 140,
    borderRadius: 12,
    width: 300,
    height: 5,
  },
  ICOENSTATION: {
    top: 12,
    borderRadius: 12,
    borderColor: 'green',
    width: 100,
    height: 100,
    opacity: 0.1,
  },
});

export default PaymentConfirmationScreen;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; // Pour l'icône de croix

const { width } = Dimensions.get('window');

const PaymentFailedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" />

      {/* En-tête */}

      <View style={styles.header}>
        <Image source={require('../assets/icone carte.png')} style={styles.logo} />
            <TouchableOpacity
         onPress={() => navigation.goBack()}
         style={{ marginTop: -80 }}
       >
         <Ionicons name="arrow-back" size={24} color="#fff" />
       </TouchableOpacity>
       
        <View style={styles.headerTextContainer}>
          <Text style={styles.operatorLabel}>Cyberateur Mobile</Text>
          <Text style={styles.total}>Total à payer 50 000 XOF</Text>
        </View>
      </View>

      {/* Corps principal */}
      <View style={styles.body}>

        {/* Icône croix rouge */}
        <View style={styles.crossContainer}>
          <MaterialIcons name="cancel" size={109} color="red" />
        </View>

        {/* Message d'échec */}
        <Text style={styles.failureText}>Votre paiement a échoué</Text>
        <Text style={styles.contactText}>Contactez le support</Text>

        {/* Icône d’échec */}
        <Image
                              source={require('../assets/seeting.png')}
                              style={styles.settingsIcon}
                            />
        <Image
          source={require('../assets/ICONE ENVOIE.png')}
          style={styles.iconStation}
        />
        <Image
          source={require('../assets/TRAIT.png')}
          style={styles.trait}
        />

        {/* Détails de la transaction */}
        <View style={styles.transactionDetails}>
          <Text style={styles.detailItem}><Text style={styles.detailLabel}>Marchand:</Text> UPE Total</Text>
          <Text style={styles.detailItem}><Text style={styles.detailLabel}>Méthode:</Text> MODE MONEY</Text>
          <Text style={styles.detailItem}><Text style={styles.detailLabel}>Payeur:</Text> 075757558</Text>
          <Text style={styles.detailItem}><Text style={styles.detailLabel}>Montant:</Text> 800 XOF</Text>
          <Text style={styles.detailItem}><Text style={styles.detailLabel}>Date:</Text> 2025-05-05</Text>
          <Text style={styles.detailItem}><Text style={styles.detailLabel}>Référence:</Text> KS312</Text>
        </View>

        {/* Bouton de retour */}
        <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate('interface')}>
          <Text style={styles.returnButtonText}>Retourner sur le site</Text>
        </TouchableOpacity>

        {/* Message de sécurité */}
        <Text style={styles.securedText}>Paiement sécurisé</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#000',
    paddingTop: 40,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: { marginLeft: 15 },
  operatorLabel: { color: 'green', fontWeight: 'bold', fontSize: 16,top: -30 ,right: 10 },
  total: { color: 'green', fontSize: 14, marginTop: 5 ,right: 40},

  body: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
crossContainer: {
  position: 'absolute',  // obligatoire pour zIndex fonctionner comme prévu
  top: 100,              // position verticale, ajuste selon besoin
  height: 100,
  width: 200,
  marginBottom: 10,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,          // valeur très haute pour être au-dessus de tout
},

  failureText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },

  iconStation: {
    top: 330,
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
    opacity: 0.3,
    transform: [{ scaleX: -2 }],
  },

  transactionDetails: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 2,
    height: 170,
    backgroundColor: '#ffcccc',
    marginBottom: 30,
    borderRadius: 22,
    marginTop: -100,
  },
  detailItem: {
    fontSize: 12,
    marginBottom: 1,
    top: 50,
    textAlign: 'center',
  },
  detailLabel: { fontWeight: 'bold' },

  returnButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 20,
    marginBottom: 30,
  },
  returnButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  securedText: {
    top: 170,
    fontSize: 12,
    color: '#999',
    marginTop: 20,
  },
  trait: {
    top: 390,
    width: 310,
    borderRadius: 20,
    height: 7,
  },
  settingsIcon: {
    left: 130,
    width: 70,
    top: -320,
    color: 'white',
    height: 40,
  },
    logo: {
    width: 140,
    height: 100,
    left: '65%',
    resizeMode: 'contain',
    position: 'absolute',
    top: -180,
    alignSelf: 'center',
    marginTop: 200,
  },
});

export default PaymentFailedScreen;

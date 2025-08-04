import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
   StatusBar,
  Modal,
  Pressable
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const FuelCardScreen = () => {
  const [scales] = useState([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1)
  ]);
  const [fadeAnims] = useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]);
  
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const {
    allCards = [],
    userInfo = {},
    verificationCode = 'N/A',
  } = route.params || {};

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(fadeAnims[0], { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(fadeAnims[1], { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(fadeAnims[2], { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleCardPress = (cardData, index) => {
    if (index === 0) {
      // Première carte : navigation normale
      navigation.navigate('interface', {
        cardInfo: cardData,
        userInfo,
        verificationCode,
        allCards,
        cardIndex: index
      });
    } else {
      // Autres cartes : afficher modal avec cadenas + message
      setModalVisible(true);
    }
  };

  const renderCard = (card, index) => (
    <Animated.View 
      key={index}
      style={[
        styles.cardWrapper,
        { 
          opacity: fadeAnims[index],
          transform: [{ scale: scales[index] }] 
        }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={() => {
          Animated.spring(scales[index], {
            toValue: 1.05,
            friction: 3,
            useNativeDriver: true
          }).start();
        }}
        onPressOut={() => {
          Animated.spring(scales[index], {
            toValue: 1,
            friction: 3,
            useNativeDriver: true
          }).start();
        }}
        onPress={() => handleCardPress(card, index)}
        style={styles.card}
      >
        <Image
          source={
            index === 0 ? require('../assets/cartes/carte1.png') :
            index === 1 ? require('../assets/cartes/carte2.png') :
            require('../assets/cartes/carte3.png')
          }
          style={styles.cardImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" />
      <ImageBackground 
        // source={require('../assets/background.png')} 
        style={styles.background}
      >
        <View style={styles.header}>
          <Image
            source={require('../assets/icone.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Vos cartes d'energy</Text>
          <TouchableOpacity>
            {/* <Image
              source={require('../assets/seeting.png')}
              style={styles.settings}
            /> */}
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.cardsRow}>
            {renderCard(allCards[0] || {}, 0)}
            {renderCard(allCards[1] || {}, 1)}
            {renderCard(allCards[2] || {}, 2)}
          </View>
        </ScrollView>

        {/* Modal cadenas + message */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image
                source={require('../assets/cadenas.png')} // met ton icône cadenas ici
                style={styles.lockIcon}
              />
              <Text style={styles.modalText}>La carte est bloquée pour le moment</Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  background: {
    flex: 1,
  },
  header: {
    top: -30,
    flexDirection: 'row',
    padding: 30,
    backgroundColor: 'black',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    top:1,
    width: 70,
    height: 90,
    left:-30,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10
  },
  // settings: {
  //   width: 25,
  //   height: 25,
  //   resizeMode: 'contain'
  // },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20
  },
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10
  },
  cardWrapper: {
    width: width * 0.9,
    marginBottom: 20,
    overflow: 'visible'
  },
  card: {
    position: 'relative',
    width: '100%',
    height: 170,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    overflow: 'visible',
    
  },
  cardImage: {
    position: 'absolute',
    top: 40,
    width: '90%',
    height: '90%',
    borderRadius: 10,
    zIndex: 999,
    alignSelf: 'center'
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
   
    justifyContent: 'center',
    alignItems: 'center',
  },

   modalContent: {
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // blanc transparent à 80% d'opacité
  padding: 14,
  borderRadius: 25,
  width:270,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOpacity: 0.9,      // un peu moins fort pour s’accorder avec le blanc
  shadowRadius: 10,
  elevation: 10
},

  lockIcon: {
    width: 80,
    height: 60,
    
  },
  modalText: {
    color: 'BLACK',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15
  },
  closeButton: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default FuelCardScreen;

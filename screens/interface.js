import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  SafeAreaView,
   StatusBar,
  TextInput,
  Platform,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useTheme } from '../ThemeContext';
import ThemeToggleButton from '../ThemeToggleButton';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth * 0.8;
const cardSpacing = (screenWidth - cardWidth) / 2;

const FuelCardScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { cardInfo = {}, userInfo = {} } = route.params || {};
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const cards = [
    {
      ...cardInfo,
      image: require('../assets/cartes/carte1.png'),
      type: cardInfo.type || 'N/A',
      numero: cardInfo.numero || '•••• •••• •••• ••••',
      code: cardInfo.code || '••••',
      solde: cardInfo.solde || 0,
      cle: cardInfo.cle || 'N/A',
      dateExpiration: cardInfo.dateExpiration || 'N/A',
      statut: cardInfo.statut || 'N/A',
      numeroCarte: cardInfo.numeroCarte || null,
      codeCarte: cardInfo.codeCarte || null,
    },
  ];

  const scaleValues = useRef(cards.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      const newIndex = Math.round(value / cardWidth);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    });
    return () => scrollX.removeListener(listener);
  }, [scrollX, currentIndex]);

  const handlePressIn = (index) => {
    Animated.spring(scaleValues[index], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index) => {
    Animated.spring(scaleValues[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleCardPress = (card) => {
    navigation.navigate('interface', {
      cardInfo: card,
      userInfo: userInfo,
    });
  };

  const masquerNumero = (numero) => {
    if (!numero || numero.length < 10) return numero;
    return '*****' + numero.slice(5);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}>
       <StatusBar backgroundColor="#fff" />
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        {/* Bouton de mode nuit positionné en haut à droite */}
        <View style={[styles.themeToggleContainer, { backgroundColor: theme.cardBackgroundColor }]}>
          <ThemeToggleButton />
        </View> 

        <ImageBackground 
          style={styles.backgroundImage} 
          resizeMode="cover"
        >
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth}
            decelerationRate="fast"
            contentContainerStyle={styles.cardsScrollContent}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            {cards.map((card, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPressIn={() => handlePressIn(index)}
                onPressOut={() => handlePressOut(index)}
                onPress={() => handleCardPress(card)}
              >
                <Animated.View
                  style={[
                    styles.cardWrapper,
                    {
                      transform: [{ scale: scaleValues[index] }],
                      marginLeft: index === 0 ? cardSpacing : 10,
                      marginRight: index === cards.length - 1 ? cardSpacing : 10,
                    },
                  ]}
                >
                  <View style={[styles.cardShadow, { shadowColor: theme.shadowColor }]}>
                    <ImageBackground 
                      source={card.image} 
                      style={styles.card} 
                      imageStyle={styles.cardImage}
                    >
                      <View style={styles.cardContent}>
                        <View style={styles.cardInfo}>
                          <Text style={[styles.cardText1, { color: theme.cardTextColor }]}>
                            {masquerNumero(card.numero)}
                          </Text>
                          <View style={styles.soldeContainer}>
                            <Text style={[styles.cardBalance, { color: theme.cardTextColor }]}>
                              {card.solde} FCFA
                            </Text>
                            <Image 
                              source={require('../assets/oeil.png')} 
                              style={styles.eyeIcon} 
                            />
                          </View>
                          {card.image && card.code ? (
                            <TouchableOpacity 
                              style={styles.qrCodeOnCard}
                              onPress={() => navigation.navigate("choixscaner", { qrData: card.code })}
                            >
                              <QRCode 
                                value={card.code} 
                                size={80} 
                                color={theme.qrCodeColor || '#000'} 
                                backgroundColor="transparent" 
                              />
                            </TouchableOpacity>
                          ) : (
                            <Text style={{ color: 'red', fontSize: 12 }}>QR code non disponible</Text>
                          )}
                        </View>
                      </View>
                    </ImageBackground>
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
            ))}
          </Animated.ScrollView>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.buttonColor || '#AEEA00' }]}
              onPress={() => navigation.navigate('opperation')}
            >
              <Text style={styles.actionButtonText}>Activer une carte</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.buttonColor || '#AEEA00' }]}
              onPress={() => navigation.navigate('inscription')}
            >
              <Text style={styles.actionButtonText}>Ajouter une carte</Text>
            </TouchableOpacity>
          </View>
  <View style={styles.imagesContainer}>
  {/* Icônes de fonctionnalités */}
  {[
    { 
      id: 1, 
      image: require('../assets/icones/pngegg (71).png'), 
      label: 'RECHARGE CARTE ENERGIE',
      bgColor: theme.iconBgColor1 || 'green',
      textColor: theme.iconTextColor,
      onPress: () => navigation.navigate('opperation', { cardInfo: cards[0] })
    },
    {
      id: 2,
      image: require('../assets/pngegg (70).png'),
      label: 'PAYEMENT ENERGIE',
      bgColor: theme.iconBgColor2 || 'orange',
      textColor: theme.iconTextColor,
      onPress: () => navigation.navigate('scaner')
    },
    {
      id: 3,
      image: require('../assets/ICONE ENVOIE.png'),
      label: 'TRANSFERT CARBURANT',
      bgColor: theme.iconBgColor3 || '#ffea00',
      textColor: theme.iconTextColor,
      onPress: () => navigation.navigate('recherche')
    },
    {
      id: 4,
      image: require('../assets/localisation.png'),
      label: 'STATION PARTENAIRES',
      bgColor: theme.iconBgColor4 || 'black',
      textColor: theme.iconTextColor,
      onPress: () => {}
    }
  ].map(icon => (
    <View 
      key={icon.id} 
      style={[
        styles.imageWrapper, 
        { backgroundColor: icon.bgColor }
      ]}
    >
      <TouchableOpacity onPress={icon.onPress}>
        <Image source={icon.image} style={styles.image} />
        <Text style={[styles.iconLabel, { color: '#0000FF' }]}> {/* Texte en bleu */}
          {icon.label}
        </Text>
      </TouchableOpacity>
    </View>
  ))}
</View>

          {/* Boutons de navigation */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('parametre')}
            style={styles.settingsButton}
          >
            <Image 
              source={require('../assets/seeting.png')} 
              style={[styles.settingsIcon, { tintColor: theme.iconColor }]} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('ok')}
            style={styles.profileButton}
          >
            <Image 
              source={require('../assets/user.png')} 
              style={[styles.logo, { tintColor: theme.iconColor }]} 
            />
          </TouchableOpacity>

          {/* Séparateurs */}
          <Image 
            source={require('../assets/TRAIT.png')} 
            style={[styles.separatorImage1, { tintColor: theme.separatorColor }]} 
          />
          <Image 
            source={require('../assets/TRAIT.png')} 
            style={[styles.separatorImage2, { tintColor: theme.separatorColor }]} 
          />

          {/* Barre de recherche */}
          {/* Barre de recherche - Modifiée pour rester blanche en mode nuit */}
<View style={[styles.searchContainer, { 
  backgroundColor: '#FFFFFF', // Toujours blanc
  shadowColor: theme.shadowColor,
  borderWidth: theme.dark ? 1 : 0,
  borderColor: theme.dark ? '#E0E0E0' : 'transparent'
}]}>
  <Image 
    source={require('../assets/search.png')} 
    style={[styles.searchIcon, { 
      tintColor: theme.dark ? '#000000' : theme.searchIconColor 
    }]} 
  />
  <TextInput
    placeholder="Rechercher une carte..."
    placeholderTextColor={theme.dark ? '#888888' : theme.placeholderColor}
    style={[styles.searchInput, { 
      color: '#000000' // Texte toujours noir pour contraste
    }]}
    value={searchQuery}
    onChangeText={setSearchQuery}
  />
</View>

          {/* Historique */}
          <View style={styles.historyContainer}>
            <Text style={[styles.historyTitle, { color: theme.textColor }]}>Historique</Text>
            {[
              { id: 1, label: 'Recharge carte 1', date: '2025-05-18', montant: '5000 FCFA' },
              { id: 2, label: 'Paiement station X', date: '2025-05-17', montant: '3000 FCFA' },
              { id: 3, label: 'Transfert vers carte 2', date: '2025-05-16', montant: '1500 FCFA' },
            ].map(item => (
              <View key={item.id} style={[
                styles.historyItem,
                { borderBottomColor: theme.borderColor }
              ]}>
                <Text style={[styles.historyLabel, { color: theme.textColor }]}>{item.label}</Text>
                <Text style={[styles.historyDate, { color: theme.secondaryTextColor }]}>{item.date}</Text>
                <Text style={[styles.historyAmount, { color: theme.textColor }]}>{item.montant}</Text>
              </View>
            ))}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ?  <StatusBar backgroundColor="#fff" />.currentHeight : 0,
  },
 themeToggleContainer: {
  position: 'absolute',
  top: Platform.OS === 'ios' ? 30 : 10, // Réduit de 50 à 40 pour iOS et de 30 à 20 pour Android
  right: 20,
  
  zIndex: 1000,
  borderRadius: 20,
  padding: 8,
  elevation: 3,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
  container: { 
    flex: 1,
  },
  backgroundImage: { 
    flex: 1,
    paddingTop: 20
  },
  cardsScrollContent: { 
    alignItems: 'center',
    paddingVertical: 20
  },
  cardWrapper: {  
    left:-20,
    width: 330,
    height: 200,
    borderRadius: 15,
    marginBottom: 70
  },
  cardShadow: {
    flex: 1,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    top: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardImage: { 
    borderRadius: 20,
   
    resizeMode: 'cover'
  },
  cardContent: { 
    flex: 1, 
    justifyContent: 'space-between' 
  },
  cardInfo: { 
    
    marginTop: 20 
  },
  cardText1: { 
    top: 12,
    left: 180,
    fontSize: 12, 
    fontWeight: '600', 
    letterSpacing: 1.5,
  },
  soldeContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 10 
  },
  cardBalance: { 
    top: 110,
    fontSize: 13, 
    fontWeight: 'bold', 
    marginRight: 10,
  },
  eyeIcon: { 
    top: 110,
    width: 20, 
    height: 20, 
  },
  qrCodeOnCard: {
    position: 'absolute',
    bottom: -80,
    right: 200,
    padding: 8,
    borderRadius: 10,
  },
  actionButtons: {
    top:'-18',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 14,
    paddingHorizontal: 20
  },
  actionButton: {
    top: -50,
    height: 20,
    paddingHorizontal: 20,
    paddingVertical: 1,
    borderRadius: 20,
    minWidth: 110,
    alignItems: 'center'
  },
  actionButtonText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 12, 
  },
  imagesContainer: {
    top: -300,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 10
  },
  imageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 70,
    top: 230,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  image: { 
    width: 30, 
    height: 45,
    textAlign: 'center',
    left: 10,
    top: 10,
    resizeMode: 'contain',
  },
  iconLabel: {
    textAlign: 'center',
    top: 20, 
    color:'bleu',
    fontSize: 9,
    fontWeight: 'bold',
  },
  settingsButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 20,
  },
  profileButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
  },
  settingsIcon: {
    top:-60,
    width: 60,
    height: 40,
  },
  logo: {
    top:-60,
    width: 40,
    height: 40,
  },
  historyContainer: {
    top: -80,
    padding: 15,
    marginTop: 30,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    flexDirection: 'row',
    paddingVertical: 8,
   
  },
  historyLabel: {
    flex: 2,
    fontWeight: '600',
  },
  historyDate: {
    flex: 1,
    textAlign: 'right',
  },
  historyAmount: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  searchContainer: {
  flexDirection: 'row',
  borderRadius: 30,
  height: 40,
  paddingVertical: 6,
  paddingHorizontal: 20,
  alignItems: 'center',
  marginBottom: 20,
  shadowOpacity: 0.1,
  shadowRadius: 5,
  top: 190,
  width: '90%',
  alignSelf: 'center',
  elevation: 3,
  shadowOffset: { width: 0, height: 2 },
},
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  separatorImage1: {
    height: 5,
    width: 290,
    top: -170,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  separatorImage2: {
    height: 5,
    width: 290,
    top: 260,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default FuelCardScreen;
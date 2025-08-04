import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const FuelCardScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentIndex(pageNum);
  };

  const scrollToCard = (index) => {
    scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
  };

  const renderCard = (color, type, numberColor = 'white') => (
    <View style={[styles.card, { backgroundColor: color }]}> 
      <View style={styles.cardContent}>
        <View style={styles.topSection}>
          <Image source={require('../assets/512PX.png')} style={styles.logo} />
          <Text style={styles.cardType}>{type}</Text>
        </View>
        <Text style={[styles.cardNumber, { color: numberColor }]}>*****967988</Text>
        <Image source={require('../assets/ICOEN STATION.png')} style={styles.stationIcon} />
        <View style={styles.bottomRow}>
          <Text style={styles.amount}>250.000 XOD</Text>
          <Text style={styles.liters}>10 LITRE</Text>
          <Image source={require('../assets/oeil.png')} style={styles.eyeIcon} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Les paiements</Text>
        </View>

        <View style={styles.cardsOverlay}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContainer}
          >
            {renderCard('#4CAF50', 'Essentiel', 'black')}
            {renderCard('#FFD700', 'Premium')}
            {renderCard('#A9A9A9', 'Pro')}
          </ScrollView>

          <View style={styles.indicatorsContainer}>
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                style={[styles.indicator, currentIndex === index && styles.activeIndicator]}
                onTouchEnd={() => scrollToCard(index)}
              />
            ))}
          </View>
        </View>

        <View style={styles.buttonsWrapper}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonCard} onPress={() => console.log('Recharge carte 1')}>
              <View style={styles.im1}>
                <Image source={require('../assets/pngegg (61).png')} style={styles.img1} />
              </View>
              <Text style={styles.texte}>E</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCard} onPress={() => console.log('Recharge carte 2')}>
              <View style={styles.im1}>
                <Image source={require('../assets/pngegg (61).png')} style={styles.img1} />
              </View>
              <Text style={styles.texte}>RECHARGE DE CARTE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonCard} onPress={() => console.log('Recharge carte 3')}>
              <View style={styles.im3}>
                <Image source={require('../assets/pngegg (61).png')} style={styles.img1} />
              </View>
              <Text style={styles.texte}>R</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCard} onPress={() => console.log('Recharge carte 4')}>
              <View style={styles.im2}>
                <Image source={require('../assets/localisation.png')} style={styles.img2} />
              </View>
              <Text style={styles.texte}>STATION PARTENAIRE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Image source={require('../assets/TRAIT.png')} style={styles.separatorImage1} />
        <Image source={require('../assets/TRAIT.png')} style={styles.separatorImage} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1 },
  headerContainer: {
    position: 'absolute',
    top: -20,
    width: '100%',
    zIndex: 1,
    backgroundColor: '#A9A9A9',
    borderRadius: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
    height: 220,
    margin: 1,
    top: 90,
  },
  cardsOverlay: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 2,
  },
  scrollContainer: {
    paddingHorizontal: (screenWidth * 0.1) / 2,
    marginTop: 60,
  },
  card: {
    left: -15,
    width: screenWidth * 0.9,
    borderRadius: 20,
    marginHorizontal: (screenWidth * 0.1) / 2,
    padding: 20,
    height: 220,
    justifyContent: 'space-between',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    zIndex: 3,
    top: 70,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardNumber: {
    fontSize: 14,
    textAlign: 'right',
    marginVertical: 5,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  liters: {
    fontSize: 14,
    color: '#FFF',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  stationIcon: {
    width: 60,
    height: 60,
    alignSelf: 'flex-end',
    resizeMode: 'contain',
  },
  eyeIcon: {
    width: 20,
    height: 17,
    marginLeft: 10,
  },
  indicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  indicator: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
    top: -100,
  },
  activeIndicator: {
    backgroundColor: 'green',
  },
  separatorImage1: {
    width: '50%',
    height: 3,
    alignSelf: 'center',
    marginBottom: 20,
    top: -380,
  },
  separatorImage: {
    width: '80%',
    height: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonsWrapper: {
    marginTop: 30,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  buttonCard: {
    borderColor: '#AEEA00',
    borderWidth: 2,
    borderRadius: 10,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  im1: {
    top:-2,
    right:18,
    borderWidth: 1,
    borderColor: 'rgb(75, 176, 223)',
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: 'rgb(75, 176, 223)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  im2: {
    top:-2,
    right:18,
    borderWidth: 1,
    borderColor: 'rgb(0, 153, 46)',
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: 'rgb(0, 153, 46)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img1: {
    height: 30,
    width: 30,
  },
  img2:{
    height: 30,
    width: 30,
  },
  texte: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default FuelCardScreen;

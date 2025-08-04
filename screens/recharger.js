import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

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

  const renderCard = (imageSource, type) => (
    <View style={styles.card} key={type}>
      <Image source={imageSource} style={styles.cardImage} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
       
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image source={require('../assets/icone carte.png')} style={styles.logo1} />
          <Text style={styles.mainTitle}>Recharge</Text>
          <Text style={styles.title}>RECHARGE MA CARTE</Text>

          <View style={styles.mainContent}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              ref={scrollViewRef}
            >
               {renderCard(require('../assets/cartes/carte1.png'), 'Essentiel')}
                {renderCard(require('../assets/cartes/carte2.png'), 'Premium')}
                {renderCard(require('../assets/cartes/carte3.png'), 'Pro')}
            
            </ScrollView>

            {/* Points de pagination */}
            <View style={styles.pagination}>
              {[0, 1, 2].map((index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentIndex === index ? styles.activeDot : null,
                  ]}
                />
              ))}
            </View>

            <Image
              source={require('../assets/TRAIT.png')}
              style={styles.bottomLine1}
            />

            <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Bouton E')}>
              <View style={[styles.iconContainer, { backgroundColor: 'green' }]}>
                <Image source={require('../assets/pngegg (61).png')} style={styles.buttonIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    paddingBottom: 30,
    alignItems: 'center',
  },
  logo1: {
    width: 200,
    height: 70,
    resizeMode: 'contain',
    marginTop: 60,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
    marginBottom: 20,
  },
  mainContent: {
    backgroundColor: 'white',
    borderRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 10,
    width: screenWidth - 40,
    alignItems: 'center',
    elevation: 5,
  },
  card: {
    width: screenWidth - 80,
    height: 200,
    borderRadius: 20,
    marginHorizontal: 10,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#bbb',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'green',
  },
  bottomLine1: {
    height: 4,
    width: 210,
    borderRadius: 30,
    marginTop: 10,
  },
  iconButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  iconContainer: {
    width: 310,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: 30,
    height: 30,
    tintColor: '#FFF',
  },
});

export default FuelCardScreen;

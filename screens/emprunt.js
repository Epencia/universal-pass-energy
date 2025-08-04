import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const App = () => {
  const useLocalImage = true;
  const imageOpacity = 0.7; // Définissez l'opacité souhaitée ici (entre 0 et 1)

  return (
    <View style={styles.container}>
      {useLocalImage && (
        <Image 
          source={require('../assets/station.jpg')}
          style={styles.image}
        />
      )}
      
      <Image 
        source={require('../assets/TRAIT.png')} 
        style={styles.separatorImage}
      />
      
      <View style={styles.textOverlay}>
        <Text style={styles.instruction}>Touchez ID pour ouvrir</Text>
        <Image 
          source={require('../assets/ICONE ENVOIE.png')} 
          style={[styles.envoie, { opacity: imageOpacity }]} // Application de l'opacité ici
        />
      </View>
      
      <Image 
        source={require('../assets/icone carte.png')}
        style={styles.logo}
      />
      
      <Image 
        source={require('../assets/emprunte.png')}
        style={styles.empreunte}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: '0%',
  },
  textOverlay: {
    alignItems: 'center',
    backgroundColor: '#eeff41',
    padding: 95,
    borderRadius: 30,
    paddingBottom: 1,
    marginTop: 100,
    top: 2,
    height: 300,
    width: 300,
    position: 'relative',
    zIndex: 10,
  },
  empreunte: {
    position: 'absolute',
    top: 320,
    height: 70,
    width: 70,
    zIndex: 100,
  },
  instruction: {
    color: '#000000',
    fontSize: 11,
    fontFamily: 'Roboto',
  },
  separatorImage: {
    position: 'absolute',
    top: 780,
    width: '70%',
    height: 4,
    zIndex: 50,
  },
  logo: {
    position: 'absolute',
    top: 200,
    height: 100,
    width: 200,
    zIndex: 100,
    resizeMode: 'contain',
  },
  envoie: {
    height: 230,
    width: 200,
    top: -40,
    // L'opacité est maintenant gérée directement dans le composant
  }
});

export default App;
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image,  StatusBar } from 'react-native';

export default function Menu({ navigation }) {

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000000" />

      <ImageBackground 
        source={require('../assets/Plan de travail 1.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Contenu principal */}
        <View style={styles.mainContent}>
          <Image 
            source={require('../assets/icone carte.png')} 
            style={styles.logo} 
          />
          <Text style={styles.title}>Bienvenue</Text>
        </View>

        {/* Boutons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.btnPrimary}
            onPress={() => navigation.navigate("connexion")}
          >
            <Text style={styles.btnSecondaryText}>Se connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnSecondary}
            onPress={() => navigation.navigate("table")}
          >
            <Text style={styles.btnSecondaryText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>

        {/* Ligne décorative en bas */}
        <Image 
          source={require('../assets/TRAIT.png')} 
          style={styles.bottomLine}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    //paddingTop: RNStatusBar.currentHeight, // Compensation pour la  <StatusBar backgroundColor="#fff" />
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 50,
  },
  buttonsContainer: {
    paddingBottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  btnPrimary: {
    width: '80%',
    height: 50,
    backgroundColor: '#AEEA00',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnSecondary: {
    width: '80%',
    height: 50,
    backgroundColor: '#c6ff00',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnPrimaryText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
  },
  btnSecondaryText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
  },
  bottomLine: {
    width: '70%',
    height: 3,
    marginBottom: 30,
    alignSelf: 'center',
  },
});
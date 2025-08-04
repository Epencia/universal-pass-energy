import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Animated, 
  ScrollView,
  Platform 
} from 'react-native';
import { useTheme } from '../ThemeContext';
import ThemeToggleButton from '../ThemeToggleButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FelicitationScreen({ route, navigation }) {
  const { theme } = useTheme();
  
  // Récupération des données
  const { 
    nom = '',
    prenom = '',
    telephone = '',
    verificationCode = '',
    carteInfo = {},
    cartes = [],
    userData = {}
  } = route.params || {};

  const {
    numero = 'N/A',
    solde = 0,
    code = 'N/A',
    dateExpiration = 'N/A',
    statut = 'N/A',
    type = 'N/A',
    cle = 'N/A'
  } = carteInfo;

  const prepareCardData = () => {
    return {
      userInfo: {
        nom,
        prenom,
        telephone,
        codeClient: userData.code || 'N/A',
        email: userData.email || 'N/A'
      },
      cardInfo: {
        numero,
        solde,
        code,
        dateExpiration,
        statut,
        type,
        cle
      },
      verificationCode,
      allCards: cartes,
      rawData: userData
    };
  };

  // Animations
  const cardFadeAnim = useRef(new Animated.Value(0)).current;
  const cardScaleAnim = useRef(new Animated.Value(0.7)).current;
  const fadeTitleAnim = useRef(new Animated.Value(0)).current;
  const fadeButtonAnim = useRef(new Animated.Value(0)).current;
  const fadeDetailsAnim = useRef(new Animated.Value(0)).current;
  const nameBounceAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(cardFadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(cardScaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      })
    ]).start(() => {
      Animated.stagger(800, [
        Animated.timing(fadeTitleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(nameBounceAnim, {
          toValue: 0,
          friction: 3,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(fadeDetailsAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeButtonAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        })
      ]).start();
    });
  }, []);

  return (
    <ScrollView 
      contentContainerStyle={[
        styles.scrollContainer, 
        { backgroundColor: theme.backgroundColor }
      ]}
    >
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        {/* Bouton de mode nuit bien positionné */}
        <View style={[
          styles.themeToggleContainer, 
          { backgroundColor: theme.cardBackgroundColor }
        ]}>
          <ThemeToggleButton />
        </View>
        
        <Image 
          source={require('../assets/icone carte.png')} 
          style={styles.headerIcon}
        />

        <View style={styles.contentWrapper}>
          <Animated.View 
            style={[
              styles.card, 
              {
                opacity: cardFadeAnim,
                transform: [{ scale: cardScaleAnim }],
                backgroundColor: '#AEEA00', // Couleur fixe pour le cadre comme demandé
                shadowColor: theme.shadowColor || '#red',
              }
            ]}
          >
            <Animated.Text style={[
              styles.title, 
              { 
                opacity: fadeTitleAnim, 
                color: 'red' // Texte en noir pour meilleur contraste
              }
            ]}>
              Félicitations
            </Animated.Text>

            <Animated.Text 
              style={[
                styles.subtitle, 
                { 
                  transform: [{ translateY: nameBounceAnim }],
                  color: '#000' // Texte en noir pour meilleur contraste
                }
              ]}
            >
              {prenom} {nom}
            </Animated.Text>

            <Image 
              source={require('../assets/ICONE ENVOIE.png')}
              style={[
                styles.sendIcon, 
                { 
                  tintColor: 'rgba(0,0,0,0.1)' // Icône semi-transparente
                }
              ]}
            />

            <View style={[
              styles.separator, 
              { backgroundColor: 'rgba(0,0,0,0.2)' } // Séparateur plus visible
            ]} />
          </Animated.View>

          <View style={styles.messageBox}>
            <Text style={[
              styles.messageLine, 
              { color: theme.textColor }
            ]}>
              Bienvenue dans la grande communauté
            </Text>
            <Text style={[
              styles.brandName, 
              { color: theme.textColor }
            ]}>
              Universal Pass Énergy
            </Text>
          </View>

          <Text style={[
            styles.congratsText, 
            { color: theme.secondaryTextColor || '#555' }
          ]}>
            Encore bravo pour ce premier pas vers une expérience énergétique plus intelligente et connectée.
          </Text>

          <Animated.View style={{ opacity: fadeButtonAnim }}>
            <TouchableOpacity 
              style={[
                styles.mainButton, 
                { 
                  backgroundColor: '#AEEA00', // Bouton dans la même couleur
                  shadowColor: theme.shadowColor || '#000',
                }
              ]}
              onPress={() => navigation.navigate('carte', prepareCardData())}
            >
              <Text style={[styles.buttonText, { color: '#000' }]}>COMMENCER</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Image 
          source={require('../assets/TRAIT.png')} 
          style={[
            styles.bottomLine, 
        
          ]}
        />
      </View>
    </ScrollView>
  );
}

// STYLES
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  themeToggleContainer: {
    position: 'absolute',
    top:70,
    right: 20,
    zIndex: 1000,
    borderRadius: 20,
    padding: 8,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 10,
    marginTop: 20,
  },
  headerIcon: {
    top:27,
    width: 270,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  card: {
    borderRadius: 25,
    padding: 20,
    backgroundColor: '#AEEA00', // Couleur principale du cadre
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    minHeight: 270,
    maxWidth: 350,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    top: 55,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  subtitle: {
    top: 70,
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  sendIcon: {
    position: 'absolute',
    top: -60,
    left: '65%',
    transform: [{ translateX: -200 }],
    width: 400,
    height: 400,
    resizeMode: 'contain',
    opacity: 0.1,
  },
  separator: {
    height: 1,
    marginVertical: 15,
    width: '80%',
    alignSelf: 'center',
  },
  messageBox: {
    marginBottom: 20,
  },
  messageLine: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
  },
  brandName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  congratsText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  mainButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  bottomLine: {
    borderRadius: 20,
    width: 300,
    height: 7,
    marginTop: 10,
    alignSelf: 'center',
  },
});
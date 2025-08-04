import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../ThemeContext';
import ThemeToggleButton from '../ThemeToggleButton';

const ReferralScreen = () => {
  const { theme } = useTheme();
  const referralCode = "BDWH6HGP";

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Rejoins-moi sur Universal Pass Energy avec mon code de parrainage : ${referralCode}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Couleurs brandées fixes
  const brandColors = {
    primary: '#AEEA00',
    secondary: '#7AC100',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header avec bouton retour et bouton thème */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.textColor }]}>{'<'}</Text>
        </TouchableOpacity>
        
        <View style={styles.themeButtonWrapper}>
          <ThemeToggleButton />
        </View>
      </View>

      {/* Contenu principal */}
      <View style={styles.content}>
        <Text style={[styles.title, { backgroundColor: brandColors.primary }]}>
          Modifier mon mot de passe
        </Text>

        <View style={[styles.messageBox, { backgroundColor: brandColors.primary }]}>
          <Text style={styles.messageText}>
            Parrainez un ami et recevez{"\n"}20 % de points de fidélité sur{"\n"}son premier abonnement !
          </Text>
        </View>

        <View style={styles.logoSection}>
          <Image
            // source={require('../assets/logo.png')} // Remplacez par votre chemin d'image
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.brand, { color: brandColors.secondary }]}>
            Universal{"\n"}
            <Text style={styles.brandBold}>Pass Energy</Text>
          </Text>
        </View>

        <View style={[styles.referralContainer, { 
          backgroundColor: theme.cardBackgroundColor,
          borderColor: theme.borderColor 
        }]}>
          <TextInput
            value={referralCode}
            editable={false}
            style={[styles.referralInput, { 
              backgroundColor: theme.backgroundColor, 
              color: theme.textColor,
              borderColor: theme.borderColor
            }]}
          />

          <TouchableOpacity 
            style={[styles.shareButton, { backgroundColor: brandColors.primary }]} 
            onPress={handleShare}
          >
            <Icon name="share-social-outline" size={18} color="#000" style={styles.icon} />
            <Text style={styles.shareText}>Inviter un ami</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.closeButton, { backgroundColor: brandColors.primary }]}>
            <Text style={styles.closeText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 15,
    marginBottom: 20,
  },
  backButton: {
    marginLeft: 5,
  },
  backText: {
    fontSize: 32,
    marginTop: 5,
  },
  themeButtonWrapper: {
    marginTop: 60, // Ajustez cette valeur pour positionner le bouton thème
    marginRight: 5,
  },
  content: {
    flex: 1,
  },
  title: {
    borderRadius: 20,
    padding: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
  messageBox: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 30,
  },
  messageText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
    lineHeight: 22,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    height: 70,
    width: 70,
    marginBottom: 15,
  },
  brand: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  brandBold: {
    fontWeight: '900',
  },
  referralContainer: {
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
  },
  referralInput: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 25,
    borderWidth: 1,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: 14,
    justifyContent: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  shareText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
});

export default ReferralScreen;
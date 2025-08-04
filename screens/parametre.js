import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,StatusBar, 
  ScrollView 
} from 'react-native';
import { Ionicons, MaterialIcons, Entypo, FontAwesome5, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import ThemeToggleButton from '../ThemeToggleButton';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  // Couleurs brandées fixes
  const brandColors = {
    primary: '#AEEA00',
    secondary: '#7AC100',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <StatusBar backgroundColor="#fff" />
      
      {/* En-tête fixe */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color={theme.textColor} />
        </TouchableOpacity>
        
        <Text style={[styles.header, { color: theme.textColor }]}>Paramètres</Text>
        
        <View style={styles.themeButtonContainer}>
          <ThemeToggleButton />
        </View>
      </View>

      {/* Contenu scrollable */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Vérifier Mon Compte */}
        <TouchableOpacity style={[styles.itemRounded, { backgroundColor: brandColors.primary }]}>
          <View style={styles.itemRow}>
            <Ionicons name="person-circle-outline" size={20} color="#000" />
            <Text style={styles.itemText}>Vérifier Mon Compte</Text>
          </View>
        </TouchableOpacity>

        {/* Partager */}
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Partager</Text>
        <TouchableOpacity style={[styles.itemSquare, { backgroundColor: brandColors.primary }]}
          onPress={() => navigation.navigate('parainnage')}
        >
          <View style={styles.itemRow}>
            <MaterialIcons name="share" size={18} color="#000" />
            <Text style={styles.itemText}>Inviter un ami</Text>
          </View>
        </TouchableOpacity>

        {/* Support */}
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Support</Text>
        <TouchableOpacity style={[styles.itemRounded, { backgroundColor: brandColors.primary }]}>
          <View style={styles.itemRow}>
            <Entypo name="chat" size={18} color="#000" />
            <Text style={styles.itemText}>Service client</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.itemSquare, { backgroundColor: brandColors.primary }]}>
          <View style={styles.itemRow}>
            <Ionicons name="checkmark-done-circle" size={18} color="#000" />
            <Text style={styles.itemText}>Vérifiez plafond</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.itemSquare, { backgroundColor: brandColors.primary }]}>
          <View style={styles.itemRow}>
            <FontAwesome5 name="map-marker-alt" size={16} color="#000" />
            <Text style={styles.itemText}>Agents proches</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.itemSquare, { backgroundColor: brandColors.primary }]}
          onPress={() => navigation.navigate('confidentialite')}
        >
          <View style={styles.itemRow}>
            <Feather name="file-text" size={18} color="#000" />
            <Text style={styles.itemText}>Conditions</Text>
          </View>
        </TouchableOpacity>

        {/* Sécurité */}
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Sécurité</Text>
        <TouchableOpacity style={[styles.itemWhite, { 
          backgroundColor: theme.cardBackgroundColor,
          borderColor: theme.borderColor 
        }]}>
          <View style={styles.itemRow}>
            <MaterialIcons name="devices-other" size={18} color={theme.textColor} />
            <Text style={[styles.itemText, { color: theme.textColor }]}>Appareils connectés</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.itemWhite, { 
          backgroundColor: theme.cardBackgroundColor,
          borderColor: theme.borderColor 
        }]}>
          <View style={styles.itemRow}>
            <Feather name="lock" size={18} color={theme.textColor} />
            <Text style={[styles.itemText, { color: theme.textColor }]}>Modifier code secret</Text>
          </View>
        </TouchableOpacity>

        {/* Logo et Déconnexion */}
        <View style={[styles.logoBox, { backgroundColor: brandColors.primary }]}>
          <Text style={styles.logoText}>
            Universal{"\n"}<Text style={styles.logoBold}>Pass Energy</Text>
          </Text>
        </View>

        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: brandColors.primary }]}>
          <View style={styles.itemRow}>
            <Feather name="log-out" size={18} color="#000" />
            <Text style={styles.itemText}>Déconnexion (07 57 96 79 88)</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
  },
  backButton: {
    width: 25,
  },
  themeButtonContainer: {
    marginRight: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 5,
    marginBottom: 5,
  },
  itemRounded: {
    padding: 12,
    borderRadius: 25,
    marginTop: 8,
  },
  itemSquare: {
    padding: 12,
    borderRadius: 5,
    marginTop: 8,
  },
  itemWhite: {
    padding: 12,
    borderRadius: 5,
    marginTop: 8,
    borderWidth: 1,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemText: {
    fontSize: 13,
    flexShrink: 1,
    fontWeight: '500',
    color: '#000',
  },
  logoBox: {
    marginTop: 25,
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
  logoBold: {
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 10,
    borderRadius: 25,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
});
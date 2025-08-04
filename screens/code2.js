import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';

const PassEnergieScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <Image 
              source={require('../assets/icone.png')}
              style={styles.headerLogo}
            />
            <Text style={styles.title}>Recharge</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Image 
              source={require('../assets/seeting.png')}
              style={styles.settingsIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
         

          {/* Centered Icon */}
          <View style={styles.iconContainer}>
            <Image 
              source={require('../assets/icone carte.png')} 
              style={styles.centeredIcon} 
            />
          </View>

          {/* Input Field 2 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre de factures à payer</Text>
            <View style={styles.inputField}>
              <Text style={[styles.inputText, styles.greenText]}>Nombre de factures à payer</Text>
            </View>
          </View>
        </View>

        {/* Numeric Keypad - Version corrigée */}
        <View style={styles.keypad}>
          {/* Première ligne */}
          <View style={styles.keyRow}>
            {[1, 2, 3].map(num => (
              <TouchableOpacity key={num} style={styles.key}>
                <Text style={styles.greenKeyText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Deuxième ligne */}
          <View style={styles.keyRow}>
            {[4, 5, 6].map(num => (
              <TouchableOpacity key={num} style={styles.key}>
                <Text style={styles.greenKeyText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Troisième ligne */}
          <View style={styles.keyRow}>
            {[7, 8, 9].map(num => (
              <TouchableOpacity key={num} style={styles.key}>
                <Text style={styles.greenKeyText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Quatrième ligne (0 centré) */}
          <View style={styles.keyRow}>
            <View style={styles.emptyKey} />
            <TouchableOpacity style={styles.key}>
              <Text style={styles.greenKeyText}>0</Text>
            </TouchableOpacity>
            <View style={styles.emptyKey} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerLogo: {
    width: 70,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#aeea00',
    marginLeft: -20,
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    width: 30,
    height: 30,
    tintColor: '#333',
  },
  mainContent: {
    marginBottom: 3,
    justifyContent: 'center',
  },
  inputGroup: {
    justifyContent: 'center',
    marginBottom: 25,
    alignItems: 'center'
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    marginLeft: 10,
    
  },
  inputField: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#808080',
  },
  inputText: {
    color: '#666',
    textAlign: 'center',
    
  },
  greenText: {
    color: '#AEEA00',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  centeredIcon: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
  },
  keypad: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 15,
    marginTop: 10,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  key: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  emptyKey: {
    width: 70,
    height: 70,
    marginHorizontal: 8,
    backgroundColor: 'transparent',
  },
  greenKeyText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#aeea00',
  },
});

export default PassEnergieScreen;
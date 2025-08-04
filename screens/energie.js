import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '../ThemeContext';

export default function Energie() {
  const { theme } = useTheme();
  const [typeCarburant, setTypeCarburant] = useState('Essence');
  const [montant, setMontant] = useState('1000');
  const [litres, setLitres] = useState('1.770');
  const [prixUnitaire, setPrixUnitaire] = useState('855');

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: '⛽ Super sans plomb', value: 'Super sans plomb' },
    { label: '⛽ Gazoil', value: 'Gasoil' },
    { label: '⛽ Gaz B12', value: 'Gaz B12' },
    { label: '⛽ Gaz B6', value: 'Gaz B6' },
    { label: '⛽ Pétrole', value: 'Pétrole' },
  ]);

  // Recalculer les litres automatiquement quand montant ou prix unitaire changent
  useEffect(() => {
    if (!isNaN(montant) && !isNaN(prixUnitaire) && Number(prixUnitaire) !== 0) {
      const newLitres = (parseFloat(montant) / parseFloat(prixUnitaire)).toFixed(3);
      setLitres(newLitres);
    }
  }, [montant, prixUnitaire]);

  const qrData = `${typeCarburant}-${montant}-${litres}-${prixUnitaire}`;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color={theme.iconColor} />
        <Image
          // source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Ionicons name="settings" size={24} color={theme.iconColor} />
      </View>

      {/* QR code & Form */}
      <View style={[styles.card, { backgroundColor: theme.cardBackgroundColor }]}>
        <QRCode value={qrData} size={150} backgroundColor={theme.cardBackgroundColor} color={theme.textColor} />

        <View style={[styles.form, { zIndex: 1000 }]}>
          <DropDownPicker
            open={open}
            value={typeCarburant}
            items={items}
            setOpen={setOpen}
            setValue={setTypeCarburant}
            setItems={setItems}
            style={{ backgroundColor: theme.inputBackgroundColor, borderColor: theme.borderColor }}
            dropDownContainerStyle={{ backgroundColor: theme.inputBackgroundColor, borderColor: theme.borderColor }}
            textStyle={{ color: theme.textColor }}
            listItemLabelStyle={{ color: theme.textColor }}
            placeholder="Choisir un type de carburant"
            placeholderStyle={{ color: theme.placeholderTextColor }}
          />

          <TextInput
            style={[styles.input, { backgroundColor: theme.inputBackgroundColor, borderColor: theme.borderColor, color: theme.textColor }]}
            value={montant}
            onChangeText={setMontant}
            keyboardType="numeric"
            placeholder="Montant"
            placeholderTextColor={theme.placeholderTextColor}
          />
          <Text style={[styles.label, { color: theme.secondaryTextColor }]}>LITRES</Text>

          <TextInput
            style={[styles.input, { backgroundColor: theme.inputBackgroundColor, borderColor: theme.borderColor, color: theme.textColor }]}
            value={litres}
            editable={false}
            keyboardType="decimal-pad"
            placeholder="Litres"
            placeholderTextColor={theme.placeholderTextColor}
          />
          <Text style={[styles.label, { color: theme.secondaryTextColor }]}>PRIX UNITAIRES</Text>

          <TextInput
            style={[styles.input, { backgroundColor: theme.inputBackgroundColor, borderColor: theme.borderColor, color: theme.textColor }]}
            value={prixUnitaire}
            onChangeText={setPrixUnitaire}
            keyboardType="numeric"
            placeholder="Prix unitaire"
            placeholderTextColor={theme.placeholderTextColor}
          />
        </View>
      </View>

      {/* Bouton payer */}
      <TouchableOpacity style={[styles.payerButton, { backgroundColor: theme.buttonBackgroundColor }]}>
        <Text style={[styles.payerText, { color: theme.buttonTextColor }]}>PAYER</Text>
      </TouchableOpacity>

      {/* Bouton flottant pour éditer */}
      <TouchableOpacity style={[styles.floatingButton, { backgroundColor: theme.errorColor }]}>
        <Ionicons name="pencil" size={24} color={theme.buttonTextColor} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    flexGrow: 1,
  },
  header: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 40,
  },
  card: {
    top: 100,
    padding: 20,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  form: {
    marginTop: 20,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  payerButton: {
    top: 130,
    padding: 14,
    borderRadius: 30,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  payerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'red',
    padding: 14,
    borderRadius: 50,
  },
});

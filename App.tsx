import { enableScreens } from 'react-native-screens';
enableScreens();
import {  StatusBar  } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './screens/menu';
import Table from './screens/table';
import Code from './screens/code';
import Code2 from './screens/code2';
import Code3 from './screens/code3';
import Bienvenue from './screens/bienvenu';
import Emprunt from './screens/emprunt';
import Carte from './screens/carte';
import PayementSucces from './screens/payementsucces';
import PayementEchec from './screens/payementechec';
import Interface from './screens/interface';
import Recharger from './screens/recharger';
import Opperation from './screens/opperation';
import Scaner from './screens/scaner';
import Stationqr from './screens/stationqr';
import Energie from './screens/energie';
import Choixscaner from './screens/choixscaner';
import Transfere from './screens/transfere';
import Recherche from './screens/recherche';
import Parametre from './screens/parametre';
import Confidentialite from './screens/confidentialite';
import Modification from './screens/modification';
import Parainnage from './screens/parainnage';
import Deconnexion from './screens/deconnexion';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import des contextes
import { UserProvider } from './UserContext';
import { ThemeProvider, useTheme } from './ThemeContext';
import ConnexionScreen from './screens/connexion';

const Stack = createStackNavigator();

// Composant NavigationContent qui utilise le thème
const NavigationContent = () => {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <>
      <StatusBar backgroundColor="#fff" />
      <NavigationContainer
        theme={{
          dark: isDarkMode,
          colors: {
            primary: theme.buttonBackgroundColor,
            background: theme.backgroundColor,
            card: theme.cardBackgroundColor,
            text: theme.textColor,
            border: theme.borderColor,
            notification: theme.buttonBackgroundColor,
          },
        }}
      >
        <Stack.Navigator
          initialRouteName="menu"
          screenOptions={{ 
            headerShown: false,
            cardStyle: { backgroundColor: theme.backgroundColor }
          }}
        >
          <Stack.Screen name="menu" component={Menu} />
          <Stack.Screen name="recherche" component={Recherche} />
          <Stack.Screen name="transfere" component={Transfere} />
          <Stack.Screen name="parainnage" component={Parainnage} />
          <Stack.Screen name="deconnexion" component={Deconnexion} />
          <Stack.Screen name="modification" component={Modification} />
          <Stack.Screen name="energie" component={Energie} />
          <Stack.Screen name="bienvenu" component={Bienvenue} />
          <Stack.Screen name="choixscaner" component={Choixscaner} />
          <Stack.Screen name="connexion" component={ConnexionScreen} />
          <Stack.Screen name="table" component={Table} />
          <Stack.Screen name="code" component={Code} />
          <Stack.Screen name="code2" component={Code2} />
          <Stack.Screen name="code3" component={Code3} />
          <Stack.Screen name="scaner" component={Scaner} />
          <Stack.Screen name="stationqr" component={Stationqr} />
          <Stack.Screen name="emprunt" component={Emprunt} />
          <Stack.Screen name="carte" component={Carte} />
          <Stack.Screen name="opperation" component={Opperation} />
          <Stack.Screen name="payementsucces" component={PayementSucces} />
          <Stack.Screen name="payementechec" component={PayementEchec} />
          <Stack.Screen name="interface" component={Interface} />
          <Stack.Screen name="recharger" component={Recharger} />
          <Stack.Screen name="parametre" component={Parametre} />
          <Stack.Screen name="confidentialite" component={Confidentialite} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <NavigationContent />
      </ThemeProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
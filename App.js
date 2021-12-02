import { StatusBar } from 'expo-status-bar';
// import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import RootStackScreen from './src/screens/RootStackScreen'
import firebase from "firebase";
import Web from "./experimental/web"

const firebaseConfig = require("./keys.json");

if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {

  return (
    <PaperProvider theme={theme}>
      <RootStackScreen />
    </PaperProvider>
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

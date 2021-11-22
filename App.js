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
  /*return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
          />
          <Stack.Screen
              name="DetailsScreen"
              options={{"title": "Details"}}
              component={DetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )*/
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

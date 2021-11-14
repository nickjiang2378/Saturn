import { StatusBar } from 'expo-status-bar';
// import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import MainStack from './screens/MainStack';
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen/DetailsScreen";
// import { NavigationContainer } from '@react-navigation/native';

// export default function App() {
//   return (
//     <MainStack />
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBinxL8cmRzaKQKAkeFGtyGweYp24DCRiE",
  authDomain: "mdb-socials-75dcd.firebaseapp.com",
  projectId: "mdb-socials-75dcd",
  storageBucket: "mdb-socials-75dcd.appspot.com",
  messagingSenderId: "151253228239",
  appId: "1:151253228239:web:59bdcb5f1dca129b2e35ba",
  measurementId: "G-ESK699VDW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
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
  )
}

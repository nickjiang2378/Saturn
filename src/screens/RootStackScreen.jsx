import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AuthStackScreen from "./AuthStack/AuthStackScreen";
import MainStackScreen from "./MainStack/MainStackScreen";
import firebase from "firebase";

export default function RootStackScreen() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((currentUser) => {
        console.log("Auth State changed")
        console.log(currentUser?.uid)
        setUser(currentUser);
        if (initializing) setInitializing(false);
      });
    return unsubscribe;
  }, [setUser]);

  if (initializing) {
    return <View />;
  } else if (!user) {
    return (
      <NavigationContainer>
        <AuthStackScreen />
      </NavigationContainer>
    );
  } else {
    return (
      <MainStackScreen />
    );
  }
}
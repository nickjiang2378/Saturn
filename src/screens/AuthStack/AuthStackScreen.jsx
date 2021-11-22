import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./StartScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";

const AuthStack = createStackNavigator();

export default function AuthStackScreen() {
  const options = { 
    headerShown: false
  };
  return (
    <AuthStack.Navigator 
        initialRouteName="SignInScreen" 
        screenOptions={options}
    >
        <AuthStack.Screen name="StartScreen" component={StartScreen} />
        <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
        <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
        <AuthStack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
        />
    </AuthStack.Navigator>
  );
}
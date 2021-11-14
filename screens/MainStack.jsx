import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen/HomeScreen";
import DetailsScreen from "./DetailsScreen/DetailsScreen";

const MainStackNavigator = createNativeStackNavigator();

export default function MainStack() {
    return (
        <NavigationContainer>
            <MainStackNavigator.Navigator>
                <MainStackNavigator.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                />
                <MainStackNavigator.Screen
                    name="DetailsScreen"
                    options={{"title": "Details"}}
                    component={DetailsScreen}
                />
            </MainStackNavigator.Navigator>
        </NavigationContainer>
        
    );
}
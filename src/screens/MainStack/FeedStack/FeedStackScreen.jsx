import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";

const FeedStackNavigator = createNativeStackNavigator();

export default function FeedStackScreen() {
    return (
        <NavigationContainer>
            <FeedStackNavigator.Navigator>
                <FeedStackNavigator.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                />
                <FeedStackNavigator.Screen
                    name="DetailsScreen"
                    options={{"title": "Details"}}
                    component={DetailsScreen}
                />
            </FeedStackNavigator.Navigator>
        </NavigationContainer>
        
    );
}
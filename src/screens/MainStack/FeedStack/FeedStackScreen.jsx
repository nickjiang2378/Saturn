import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";

const FeedStackNavigator = createNativeStackNavigator();

export default function FeedStackScreen({ recommendedGrants }) {
    console.log("===== FeedStackScreen =====")
    //console.log(userInfo)
    console.log(recommendedGrants)
    return (
        <NavigationContainer>
            <FeedStackNavigator.Navigator>
                <FeedStackNavigator.Screen
                    name="HomeScreen"
                    options={{"title": "Saturn"}}
                >
                    {(props) => {return (<HomeScreen {...props} recommendedGrants={recommendedGrants} />);}}
                </FeedStackNavigator.Screen>
                <FeedStackNavigator.Screen
                    name="DetailsScreen"
                    options={{"title": "Details"}}
                    component={DetailsScreen}
                />
            </FeedStackNavigator.Navigator>
        </NavigationContainer>
        
    );
}
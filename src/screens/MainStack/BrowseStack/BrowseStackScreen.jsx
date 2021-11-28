import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BrowseDisplayScreen from "./BrowseDisplayScreen";
import BrowseSearchScreen from "./BrowseSearchScreen";

const BrowseStackNavigator = createNativeStackNavigator();

export default function BrowseStackScreen() {
    return (
        <NavigationContainer>
            <BrowseStackNavigator.Navigator
                initialRouteName="BrowseDisplay"
                screenOptions={{ presentation: "modal" }}
            >
                <BrowseStackNavigator.Screen
                    name="BrowseDisplay"
                    options={{"title": "Saturn"}}
                    component={BrowseDisplayScreen}
                />
                <BrowseStackNavigator.Screen
                    name="BrowseSearch"
                    options={{"title": "Search for Grants"}}
                    component={BrowseSearchScreen}
                />
                   
            </BrowseStackNavigator.Navigator>
        </NavigationContainer>
        
    );
}
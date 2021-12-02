import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BrowseDisplayScreen from "./BrowseDisplayScreen";
import BrowseSearchScreen from "./BrowseSearchScreen";
import BrowseDetailsScreen from "./BrowseDetailsScreen";

const BrowseStackNavigator = createNativeStackNavigator();

export default function BrowseStackScreen({ allGrants }) {
    console.log("===== BrowseStack =====")
    console.log(`${Object.keys(allGrants).length} total grants collected`)
    //console.log(allGrants[Object.keys(allGrants)[0]])
    return (
        <NavigationContainer>
            <BrowseStackNavigator.Navigator
                initialRouteName="BrowseDisplay"
            >
                <BrowseStackNavigator.Group
                >
                    <BrowseStackNavigator.Screen 
                        name="BrowseDetails"
                        options={{"title": "Grant Details"}}
                        component={BrowseDetailsScreen}
                    />
                </BrowseStackNavigator.Group>
                <BrowseStackNavigator.Group
                    screenOptions={{ presentation: "modal" }}
                >
                    <BrowseStackNavigator.Screen
                        name="BrowseDisplay"
                        options={{"title": "Saturn"}}
                    >
                        {(props) => {return (<BrowseDisplayScreen {...props} allGrants={allGrants} />);}}
                    </BrowseStackNavigator.Screen>
                    <BrowseStackNavigator.Screen
                        name="BrowseSearch"
                        options={{"title": "Search for Grants"}}
                        component={BrowseSearchScreen}
                    />
                </BrowseStackNavigator.Group>
                   
            </BrowseStackNavigator.Navigator>
        </NavigationContainer>
        
    );
}
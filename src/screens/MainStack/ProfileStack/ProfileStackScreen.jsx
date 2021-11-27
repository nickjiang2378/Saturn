import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileDisplayScreen from "./ProfileDisplayScreen";
import ProfileUpdateScreen from "./ProfileUpdateScreen";

const ProfileStackNavigator = createNativeStackNavigator();

export default function ProfileStackScreen({ userInfo }) {
    return (
        <NavigationContainer>
            <ProfileStackNavigator.Navigator
                initialRouteName="ProfileDisplay"
                screenOptions={{ presentation: "modal" }}
            >
                <ProfileStackNavigator.Screen
                    name="ProfileDisplay"
                    options={{"title": "Saturn"}}
                >
                    {(props) => (<ProfileDisplayScreen {...props} userInfo={userInfo}/>)}
                </ProfileStackNavigator.Screen>
                <ProfileStackNavigator.Screen
                    name="ProfileUpdate"
                    options={{"title": "Edit Profile"}}
                >
                    {(props) => (<ProfileUpdateScreen {...props} userObj={userInfo} />)}
                </ProfileStackNavigator.Screen>
            </ProfileStackNavigator.Navigator>
        </NavigationContainer>
        
    );
}
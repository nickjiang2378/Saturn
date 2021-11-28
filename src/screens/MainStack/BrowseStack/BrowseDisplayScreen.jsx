import React, { useState, useEffect } from "react";
import { View, SafeAreaView } from "react-native"
import { Title, Paragraph, Divider, Caption, Text, IconButton } from "react-native-paper";
import { Entypo } from '@expo/vector-icons'; 
import { styles } from "../AppStyles"
import { theme } from "../../../core/theme"
import Button from '../../../components/Button'

export default function BrowseDisplayScreen({ navigation }) {


    useEffect(() => {
        navigation.setOptions({
            "headerRight": () => (<IconButton 
                icon="magnify"
                onPress={() => {
                    console.log("Moving to Browse Search Screen"); 
                    navigation.navigate("BrowseSearch")
                }}
            />),
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{padding: 20}}>
                <Text>Filler Text</Text>
            </View>
        </SafeAreaView>
    );
}
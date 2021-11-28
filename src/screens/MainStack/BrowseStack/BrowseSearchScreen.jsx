import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";
import firebase from "firebase";
import { styles } from "../AppStyles"
import { theme } from "../../../core/theme"

export default function SearchScreen( { navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <View style = {{ margin: 20 }}>
                <Text>Search Screen</Text>
            </View>
        </SafeAreaView>
    )
}
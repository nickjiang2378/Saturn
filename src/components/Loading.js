import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import { theme } from "../core/theme";

export default function Loading({ text }) {
    return (
        <View style={styles.container}>

            <ActivityIndicator style={{ marginBottom: 10}} color={theme.colors.primary} />
            <Text>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
  });
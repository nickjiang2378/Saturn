import React from "react";
import { StyleSheet } from 'react-native';
import { theme } from "../../core/theme";

export const COLOR_BACKGROUND = "#ffffff";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLOR_BACKGROUND,
    },
    formInput: {
      backgroundColor: theme.colors.backgroundGrey,
      marginBottom: 20
    },
    dropdownIcon: {
      marginRight: 5
    },
    emptyListText: {
      color: theme.colors.grey, 
      textAlign: "center", 
      marginTop: 15
    }
})
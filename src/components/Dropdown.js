import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableRipple } from "react-native-paper";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from "../core/theme"

export default function DropdownComponent({ value, setValue, ...props }) {
  //const [value, setValue] = useState(null);

  const renderItem = (item) => {
    return (

      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
      renderItem={renderItem}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 20,
    height: 50,
    backgroundColor: theme.colors.backgroundGrey,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,

  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
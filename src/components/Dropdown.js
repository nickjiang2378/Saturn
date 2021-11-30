import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableRipple } from "react-native-paper";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from "../core/theme"
import { allCategories, categoryToCode, codeToCategory } from '../helpers/categories';

export default function DropdownComponent({ category, setCategory }) {
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
      data={allCategories}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={category && codeToCategory(category) ? codeToCategory(category) : "Select Category"}
      searchPlaceholder="Search categories..."
      value={category}
      onChange={item => {
        setCategory(item.value);
      }}
      renderLeftIcon={() => (
        <MaterialIcons style={styles.icon} name="category" size={20} color={theme.colors.primary} />
        //<AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 15,
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
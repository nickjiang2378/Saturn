import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";
import firebase from "firebase";
import { styles } from "../AppStyles"
import { theme } from "../../../core/theme"
import Dropdown from "../../../components/Dropdown"
import { allCategories, categoryToCode, codeToCategory } from '../../../helpers/categories';
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons'; 
import { max } from "react-native-reanimated";

export default function SearchScreen( { navigation, route }) {
    const [keywords, setKeywords] = useState("");
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [minGrantTarget, setMinGrantTarget] = useState("");
    const [maxGrantTarget, setMaxGrantTarget] = useState("");

    const renderCategoryIcon = () => (
        <MaterialIcons style={styles.dropdownIcon} name="category" size={20} color={theme.colors.primary} />
    );

    const renderSortIcon = () => (
        <MaterialIcons style={styles.dropdownIcon} name="sort" size={20} color={theme.colors.primary} />
    );

    const sortByOptions = [
        { label: "Posted Date", value: "PostDate" },
        { label: "Category", value: "CategoryOfFundingActivity" },
        { label: "Deadline", value: "CloseDate" },
    ]

    const startSearch = () => {
        const searchRequest = {
            keywords: keywords,
            category: category,
            sortBy: sortBy,
            minGrantTarget: minGrantTarget,
            maxGrantTarget: maxGrantTarget
        }
        navigation.navigate("BrowseDisplay", {searchRequest: searchRequest})
    }

    useEffect(() => {
        if (route.params?.searchRequest) {
            console.log("Search Screen received request")
            console.log(route.params?.searchRequest)
            const { keywords, category, sortBy, minGrantTarget, maxGrantTarget } = route.params?.searchRequest;
            setKeywords(keywords);
            setCategory(category);
            setSortBy(sortBy);
            setMinGrantTarget(minGrantTarget);
            setMaxGrantTarget(maxGrantTarget);
        }

    }, [route.params?.searchRequest])

    return (
        <SafeAreaView style={styles.container}>
            <View style = {{ margin: 20 }}>
                <TextInput 
                    label="Keywords"
                    style={styles.formInput}
                    value={keywords}
                    onChangeText={(text) => {setKeywords(text)}}
                />
                <View style={ {flexDirection: "row", alignItems: "center"} }>
                    <Text style={ {marginRight: 5} }>Grant Range: </Text>
                    <TextInput
                        label = "Min"
                        value = {minGrantTarget}
                        onChangeText = {(num) => setMinGrantTarget(num)}
                        left={<TextInput.Affix text="$" />}
                        style = {{ ...styles.formInput, flex: 1 }}
                    />
                    <Text style={{ marginLeft: 5, marginRight: 5 }}>-</Text>
                    <TextInput
                        label = "Max"
                        value = {maxGrantTarget}
                        onChangeText = {(num) => setMaxGrantTarget(num)}
                        left={<TextInput.Affix text="$" />}
                        style = {{ ...styles.formInput, flex: 1 }}
                    />
                </View>
                <Dropdown 
                    renderLeftIcon={renderCategoryIcon} 
                    value={category} 
                    data={allCategories}
                    setValue={setCategory}
                    placeholder={category && codeToCategory(category) ? codeToCategory(category) : "Filter by category"}
                    search={true}
                    searchPlaceholder="Search categories..."
                />
                <Dropdown 
                    renderLeftIcon={renderSortIcon} 
                    value={sortBy} 
                    data={sortByOptions}
                    setValue={setSortBy}
                    placeholder={sortBy ? sortBy : "Sort by"}
                    maxHeight={150}
                />
                <Button 
                    mode="contained"
                    onPress={startSearch}
                >Search</Button>
                
            </View>
        </SafeAreaView>
    )
}
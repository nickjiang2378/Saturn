import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { Title, Paragraph, Divider, Headline, Caption, Text, IconButton } from "react-native-paper";
import { Entypo } from '@expo/vector-icons'; 
import { styles } from "../AppStyles"
import { theme } from "../../../core/theme"
import GrantCell from "../../../components/GrantCell";
import { filter } from "../../../helpers/filter"

export default function BrowseDisplayScreen({ navigation, allGrants, route }) {
    // Filter Restrictions
    const [keywords, setKeywords] = useState("");
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [minGrantTarget, setMinGrantTarget] = useState("");
    const [maxGrantTarget, setMaxGrantTarget] = useState("");
    const [displayedGrants, setDisplayedGrants] = useState([]);

    useEffect(() => {
        console.log(`${Object.values(allGrants).length} total grants detected`)
    }, [])

    useEffect(() => {
        const searchRequest = {
            keywords: keywords,
            category: category,
            sortBy: sortBy,
            minGrantTarget: minGrantTarget,
            maxGrantTarget: maxGrantTarget,
        }
        setDisplayedGrants(filter(Object.values(allGrants), searchRequest));
        navigation.setOptions({
            "headerRight": () => (<IconButton 
                icon="magnify"
                onPress={() => {
                    console.log("Moving to Browse Search Screen"); 
                    console.log(searchRequest)
                    navigation.navigate("BrowseSearch", {searchRequest: searchRequest})
                }}
            />),
        });
    }, [keywords, category, sortBy, minGrantTarget, maxGrantTarget])

    useEffect(() => {
        if (route.params?.searchRequest) {
            console.log("Display Screen received request")
            console.log(route.params?.searchRequest)
            const { keywords, category, sortBy, minGrantTarget, maxGrantTarget } = route.params?.searchRequest;
            setKeywords(keywords);
            setCategory(category);
            setSortBy(sortBy);
            setMinGrantTarget(minGrantTarget);
            setMaxGrantTarget(maxGrantTarget);
        }

    }, [route.params?.searchRequest])

    function renderGrants({ item }) {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("BrowseDetails", item)
                }}
            >
                <GrantCell item={item} />
            </TouchableOpacity>
        );
    }

    const EmptyList = () => (
        <Text style={styles.emptyListText}>No grants fall under the search criteria!</Text>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{"margin": 20, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1}}>
                <Headline>Browse All Grants</Headline>
                <FlatList 
                    renderItem={renderGrants}
                    data={displayedGrants}
                    style={{height: "97%"}}
                    keyExtractor={(_, index) => "key-" + index}
                    ListEmptyComponent={EmptyList}
                />
            </View>
        </SafeAreaView>
    );
}
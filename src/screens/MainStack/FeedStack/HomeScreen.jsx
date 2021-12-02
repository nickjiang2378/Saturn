import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { IconButton, Colors, Headline, Card, Title } from "react-native-paper"; 
import { styles } from "../AppStyles"
import Button from '../../../components/Button'
import { Entypo } from '@expo/vector-icons';
import { theme } from "../../../core/theme";
import { getDifInDate, stringToDate } from "../../../helpers/utils";
import GrantCell from "../../../components/GrantCell";

export default function HomeScreen({ navigation, recommendedGrants }) {

    function renderGrants({ item }) {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("DetailsScreen", item)
                }}
            >
                <GrantCell item={item} />
            </TouchableOpacity>
        );
    }

    const emptyList = () => (
        <Text style={styles.emptyListText}
        >No recommended grants at this time. Check back again later!</Text>
    )
    
    return (
       <SafeAreaView style={styles.container}>
            <View style={{"margin": 20, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1}}>
                <Headline>Top Picks for You</Headline>
                <FlatList 
                    renderItem={renderGrants}
                    data={recommendedGrants}
                    style={{height: "97%"}}
                    keyExtractor={(_, index) => "key-" + index}
                    ListEmptyComponent={emptyList}
                />
            </View>
       </SafeAreaView>
    );
}
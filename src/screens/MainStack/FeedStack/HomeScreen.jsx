import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { IconButton, Colors, Headline, Card, Title } from "react-native-paper"; 
import { styles } from "../AppStyles"
import Button from '../../../components/Button'
import { Entypo } from '@expo/vector-icons';
import { theme } from "../../../core/theme";
import firebase from "firebase";
import { getDifInDate, stringToDate } from "../../../helpers/utils";

export default function HomeScreen({ navigation, recommendedGrants }) {
    // temporary
    const grants = [
        {
            name: "Food Bank Opportunity",
            provider: "MDB",
            amount: "1000 - 2000",
            deadline: "11/2"
        },
        {
            name: "Food Bank 2",
            provider: "MDB_AlterEgo",
            amount: "1000-2000",
            deadline: "11/2"
        }
    ]


    function renderGrants({ item }) {
        let { OpportunityTitle, AgencyName, AwardFloor, AwardCeiling, CloseDate } = item;
        let grantRange = null;
        AwardFloor = parseInt(AwardFloor), AwardCeiling = parseInt(AwardCeiling)
        if (AwardFloor && AwardCeiling) {
            grantRange = `\$${AwardFloor} - ${AwardCeiling}`
        } else if (AwardFloor) {
            grantRange = `\$${AwardFloor}+`
        } else if (AwardCeiling) {
            grantRange = `\$0 - ${AwardCeiling}`
        }
        return (
            <Card 
                style={{marginTop: 10, marginBottom: 10, borderRadius: 10}}
                onPress={() => {
                    navigation.navigate("DetailsScreen", item)
                }}
            >
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Card.Title 
                        title={OpportunityTitle}
                        style={{flex: 1}}
                    />
                    <View style={{flexDirection: "row", padding: 15, alignItems: "center", justifyContent: "flex-end"}}>
                            <Entypo name="stopwatch" size={18} color={theme.colors.primary} />
                            <Text style={{ marginLeft: 5 }}>{getDifInDate(stringToDate(CloseDate).DateObj)}</Text> 
                    </View>
                </View>
                
                <View style={{flexDirection: "row", paddingBottom: 10, alignItems: "center"}}>
                    <Card.Content style={{ flex: 1, padding: 15}}>
                        <Text>{AgencyName}</Text>
                    </Card.Content> 

                    <View style={{padding: 10, alignItems: "flex-end"}}>
                        <Text>{grantRange}</Text>
                    </View>
                </View>
                
            </Card>
        );
    }
    
    return (
       <SafeAreaView style={styles.container}>
            <View style={{"margin": 20, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1}}>
                <Headline>Top Picks for You</Headline>
                <FlatList 
                    renderItem={renderGrants}
                    data={recommendedGrants}
                    style={{height: "97%"}}
                    keyExtractor={(_, index) => "key-" + index}
                />
            </View>
       </SafeAreaView>
    );
}
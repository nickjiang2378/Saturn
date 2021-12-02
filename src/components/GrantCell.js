import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Card } from "react-native-paper"; 
import { styles } from "../screens/MainStack/AppStyles"
import { Entypo } from '@expo/vector-icons';
import { theme } from "../core/theme";
import { getDifInDate, stringToDate } from "../helpers/utils";
import { abbreviateNum } from "../helpers/utils";

export default function GrantCell({ item }) {
    if (!item) {
        return null;
    }
    
    let { OpportunityTitle, AgencyName, AwardFloor, AwardCeiling, CloseDate } = item;
    let grantRange = null;
    AwardFloor = abbreviateNum(parseInt(AwardFloor)), AwardCeiling = abbreviateNum(parseInt(AwardCeiling));
    if (AwardFloor && AwardCeiling) {
        grantRange = `\$${AwardFloor} - ${AwardCeiling}`
    } else if (AwardFloor) {
        grantRange = `\$${AwardFloor}+`
    } else if (AwardCeiling) {
        grantRange = `\$0 - ${AwardCeiling}`
    }
    let dateDif = getDifInDate(stringToDate(CloseDate).DateObj)
    return (
        <Card 
            style={{marginTop: 10, marginBottom: 10, borderRadius: 10}}

        >
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Card.Title 
                    title={OpportunityTitle}
                    style={{flex: 1}}
                />
                <View style={{flexDirection: "row", padding: 15, alignItems: "center", justifyContent: "flex-end"}}>
                        <Entypo name="stopwatch" size={18} color={(dateDif == "Past") ? "tomato" : theme.colors.primary} />
                        <Text style={{ marginLeft: 5 }}>{dateDif}</Text> 
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
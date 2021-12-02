import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import { styles } from "../screens/MainStack/AppStyles"
import { Divider, Title, Caption } from "react-native-paper"; 
import { codeToCategory } from "../helpers/categories";
import { stringToDate } from "../helpers/utils";
import { Linking } from 'react-native';
import { theme } from "../core/theme";
import { Entypo } from '@expo/vector-icons';

export default function GrantDisplay({ grantPackage }) {
    
    const [grantInfo, setGrantInfo] = useState(Object());
    const [deadline, setDeadline] = useState();

    useEffect(() => {
        if (grantPackage) {
            setGrantInfo(grantPackage)
        }
    }, [grantPackage])

    useEffect(() => {
        if (Object.keys(grantInfo).length != 0) {
            console.log("Received by GrantDisplay")
            console.log(grantInfo)
            let dateObj = stringToDate(grantInfo["CloseDate"]).DateObj;
            setDeadline(dateObj.toDateString())
        }
    }, [grantInfo])

    const grantCategory = codeToCategory(grantInfo["CategoryOfFundingActivity"]) 
                            ? codeToCategory(grantInfo["CategoryOfFundingActivity"]) 
                            : null;
    const grantPostDate = grantInfo["PostDate"] ? stringToDate(grantInfo["PostDate"]).DateObj.toDateString() : null;
    const grantQuestions = (grantInfo["GrantorContactEmail"] && grantInfo["GrantorContactText"]) 
                                ? `Questions should be directed to ${grantInfo["GrantorContactText"]} at ${grantInfo["GrantorContactEmail"]}`
                                : null;

    return (

       <SafeAreaView style={styles.container}>
       <ScrollView style={{padding: 20}}>
           <View style={{alignItems: "center", marginBottom: 30}}>
               <Title>{grantInfo["OpportunityTitle"]}</Title>
               <Caption>{grantInfo["AgencyName"]}</Caption>
               <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Entypo name="stopwatch" size={18} color={theme.colors.primary} />
                   <Text style={{ marginLeft: 5 }}>{deadline}</Text>
               </View>
               <View style={{flexDirection: "row", alignItems: "center"}}>
                   <Text>${grantInfo["AwardFloor"]} - {grantInfo["AwardCeiling"]}</Text>
               </View>
               <Text style={{color: 'blue'}}
                    onPress={() => Linking.openURL('https://www.grants.gov/web/grants/view-opportunity.html?oppId=' + grantInfo["OpportunityID"])}>
                See Source
                </Text>

           </View>
           <Text>{grantInfo["Description"]}</Text>
           <Divider style={{ marginTop: 10, marginBottom: 10 }}/>
           <Title>Specifics on Grant</Title>
           <Text style={stylesDetailsScreen.textDetail}>{(grantCategory) ? `Category: ${grantCategory}` : null}</Text>
           <Text style={stylesDetailsScreen.textDetail}>{(grantPostDate) ? `Posted Date: ${grantPostDate}` : null}</Text>
           <Text style={stylesDetailsScreen.textDetail}>{grantQuestions ? grantQuestions : null}</Text>

           <View style={{ marginBottom: 20 }}></View>


       </ScrollView>
   </SafeAreaView>

    );
}

const stylesDetailsScreen = StyleSheet.create({
    textDetail: {
        marginBottom: 5
    }
})
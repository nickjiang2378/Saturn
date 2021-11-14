import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { styles } from "../../AppStyles"
import { IconButton, Colors, Headline, Card, Title } from "react-native-paper"; 

export default function DetailScreen({ navigation, route}) {
    const [grantInfo, setGrantInfo] = useState();
    useEffect(() => {
        console.log(route.params)
        if (route.params) {
            setGrantInfo(route.params)
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{margin: 20}}>
                <Title>{grantInfo.name}</Title>
                <Text>Provider: {grantInfo.provider}</Text>
                <Text>Description: {grantInfo.description}</Text>
                <Text>Award Range: {grantInfo.amount}</Text>
                <Text>Deadline: {grantInfo.deadline}</Text>
            </View>
       </SafeAreaView>

    );
}

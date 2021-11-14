import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { IconButton, Colors, Headline, Card, Title } from "react-native-paper"; 
import { styles } from "../../AppStyles"

export default function HomeScreen({ navigation }) {
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

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (<IconButton 
                            icon="dots-horizontal"
                            onPress={() => {console.log("Moving to profile screen")}}
                        />),
            headerRight: () => (<IconButton 
                            icon="magnify"
                            onPress={() => {console.log("Moving to search screen")}}
                        />),
            title: "Saturn",
        })
    }, [])

    function renderGrants({ item }) {
        const { name, provider, amount, deadline } = item;
        return (
            <Card 
                style={{marginTop: 10, marginBottom: 10, borderRadius: 10}}
                onPress={() => {
                    navigation.navigate("DetailsScreen", item)
                }}
            >
                <View style={{flexDirection: "row", alignItems: "baseline"}}>
                    <Card.Title 
                                title={name}
                                style={{flex: 4}}
                            />
                    <View style={{flex: 1}}>
                        <Card.Content>
                            <Text>{deadline}</Text> 
                        </Card.Content>
                    </View>
                </View>
                
                <View style={{flexDirection: "row", paddingBottom: 10}}>
                    <View style={{flex: 1.5}}>

                        <Card.Content style={{padding: 10}}>
                            <Text>Provider: {provider}</Text>
                        </Card.Content> 
                    </View>
                    <View style={{flex: 1}}>
                        <Card.Content style={{padding: 10}}>
                            <Text style={{textAlign: "right"}}>${amount}</Text>
                        </Card.Content>
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
                    data={grants}
                    keyExtractor={(_, index) => "key-" + index}
                />
            </View>
       </SafeAreaView>
    );
}
import React, { useState, useEffect } from "react";
import { View, SafeAreaView } from "react-native"
import { Title, Paragraph, Divider, Caption, Text, IconButton } from "react-native-paper";
import { Entypo } from '@expo/vector-icons'; 
import { styles } from "../AppStyles"
import { theme } from "../../../core/theme"
import Button from '../../../components/Button'
import { logoutUser } from "../../../helpers/auth"
import { codeToCategory } from "../../../helpers/categories";
import { abbreviateNum } from "../../../helpers/utils";

export default function ProfileDisplayScreen({ navigation, userInfo }) {
    const [orgName, setOrgName] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [maxGrantTarget, setMaxGrantTarget] = useState(0);
    const [minGrantTarget, setMinGrantTarget] = useState(0);


    useEffect(() => {
        setOrgName(userInfo.orgName)
        setCategory(userInfo.category)
        setLocation(userInfo.location)
        setMinGrantTarget(userInfo.minGrantTarget)
        setMaxGrantTarget(userInfo.maxGrantTarget)
 
        navigation.setOptions({
            "headerRight": () => (<IconButton 
                icon="pencil"
                color={theme.colors.primary}
                onPress={() => {
                    console.log("Moving to Profile Update Screen"); 
                    navigation.navigate("ProfileUpdate", {"userInfo": userInfo})
                }}
            />),
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{padding: 20}}>
                <View style={{alignItems: "center", marginBottom: 30}}>
                    <Title>{orgName}</Title>
                    <Caption>{codeToCategory(category)}</Caption>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Entypo name="location-pin" size={24} color={theme.colors.primary} />
                        <Text>{location}</Text>
                    </View>
                </View>
                <Text>Target Grant Amount: ${abbreviateNum(minGrantTarget)} - {abbreviateNum(maxGrantTarget)}</Text>
                <Text>Current Plan: Free</Text>

                <View style={{ marginBottom: 20 }}></View>

                <Button
                    mode="outlined"
                    onPress={logoutUser}
                    
                    >
                    Logout
                </Button>
            </View>
        </SafeAreaView>
    );
}
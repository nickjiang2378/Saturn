import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import { styles } from "../AppStyles"
import { IconButton, Colors, Headline, Divider, Title, Caption } from "react-native-paper"; 
import { theme } from "../../../core/theme";
import GrantDisplay from "../../../components/GrantDisplay";

export default function BrowseDetailsScreen({ navigation, route}) {
    const [grantInfo, setGrantInfo] = useState(Object());
    useEffect(() => {
        console.log(route.params)
        if (route.params) {
            setGrantInfo(route.params)
        }
    }, [])

    return (
        <GrantDisplay grantPackage={grantInfo} />
    );


}


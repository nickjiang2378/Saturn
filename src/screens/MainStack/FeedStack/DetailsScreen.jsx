import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import { styles } from "../AppStyles"
import { IconButton, Colors, Headline, Divider, Title, Caption } from "react-native-paper"; 
import { codeToCategory } from "../../../helpers/categories";
import { stringToDate } from "../../../helpers/utils";
import { Linking } from 'react-native';
import { theme } from "../../../core/theme";
import { Entypo } from '@expo/vector-icons';
import GrantDisplay from "../../../components/GrantDisplay";

export default function DetailScreen({ navigation, route}) {
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


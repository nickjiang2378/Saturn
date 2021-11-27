import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";
import firebase from "firebase";
import { styles } from "../AppStyles"
import { theme } from "../../../core/theme"

export default function ProfileScreenCreate( { navigation, userObj }) {
    const [orgName, setOrgName] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState("");
    const [userInfo, setUserInfo] = useState();
    const [minGrantTarget, setMinGrantTarget] = useState("");
    const [maxGrantTarget, setMaxGrantTarget] = useState("");
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);

    const onDismissSnackBar = () => setVisible(false);
    const showError = (error) => {
      setMessage(error);
      setVisible(true);
    };

    useEffect(() => {
        setUserInfo(userObj)
        setOrgName(userObj?.orgName)
        setCategory(userObj?.category)
        setLocation(userObj?.location)
        setMinGrantTarget(userObj?.minGrantTarget)
        setMaxGrantTarget(userObj?.maxGrantTarget)

    }, [userObj])


    const saveProfile = async () => {
        console.log("Testing")
        if (!orgName) {
            showError("Please enter your organization's name.");
            return;
          } else if (!category) {
            showError("Please enter the category.");
            return;
          } else if (!minGrantTarget || !maxGrantTarget) {
            showError("Please enter a range for the grant amount.");
            return;
          } else if (isNaN(minGrantTarget) || isNaN(maxGrantTarget)) {
            // isNan() -> true = NOT a number, false = is a number
            showError("Only numbers are allowed for the grant range.");
            return;
          } else if (!location) {
            showError("Please enter the location that you are based in.");
            return;
          } else {
            console.log("Loading");
            setLoading(true);
          }
          try {
            console.log("Sending to Database to id: " + userInfo.uid);
            if (userInfo.uid) {
                const profileRef = firebase.firestore().collection("users").doc(userInfo.uid);
                const doc = {
                    orgName: orgName,
                    category: category,
                    location: location,
                    minGrantTarget: minGrantTarget,
                    maxGrantTarget: maxGrantTarget
                };
                let alreadyExists = true
                await profileRef.get()
                                .then((querySnapshot) => {
                                    if (!querySnapshot.exists) {
                                        alreadyExists = false
                                    }
                                })
                if (alreadyExists) {
                    await profileRef.update(doc);
                } else {
                    console.log("Document for user does not exist, so one was created")
                    await profileRef.set(doc);
                }
                console.log("Profile Saved!")
                if (navigation) {
                    navigation.navigate("ProfileDisplay")
                }
            }
          } catch (error) {
              console.log(error)
              setLoading(false);
              showError(error.toString());
          }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style = {{ margin: 20 }}>
            
                <TextInput
                    label = "Organization Name"
                    value = {orgName}
                    onChangeText = {(name) => setOrgName(name)}
                    style = {{ backgroundColor: theme.colors.backgroundGrey, marginBottom: 15 }}
                />
                <TextInput
                    label = "Category"
                    value = {category}
                    onChangeText = {(cat) => setCategory(cat)}
                    style = {{ backgroundColor: theme.colors.backgroundGrey, marginBottom: 15 }}
                />
                <TextInput
                    label = "Location"
                    value = {location}
                    onChangeText = {(loc) => setLocation(loc)}
                    style = {{ backgroundColor: theme.colors.backgroundGrey, marginBottom: 15 }}
                />
                <View style={ {flexDirection: "row", alignItems: "center"} }>
                    <Text style={ {marginRight: 5} }>Target Grant: </Text>
                    <TextInput
                        label = "Min"
                        value = {minGrantTarget}
                        onChangeText = {(num) => setMinGrantTarget(num)}
                        style = {{ flex: 1, backgroundColor: theme.colors.backgroundGrey, marginBottom: 15 }}
                    />
                    <Text style={{ marginLeft: 5, marginRight: 5 }}>-</Text>
                    <TextInput
                        label = "Max"
                        value = {maxGrantTarget}
                        onChangeText = {(num) => setMaxGrantTarget(num)}
                        style = {{ flex: 1, backgroundColor: theme.colors.backgroundGrey, marginBottom: 10 }}
                    />
                </View>
                <Button
                    mode = "contained"
                    onPress={saveProfile}
                    loading = {loading}
                >
                    Save
                </Button>
            </View>
            <Snackbar
                duration = {3000}
                visible = {visible}
                onDismiss = {onDismissSnackBar}
            >
                {message}
            </Snackbar>
        </SafeAreaView>
    )
}
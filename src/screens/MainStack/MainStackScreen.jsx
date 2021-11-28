import React, {useState, useEffect} from 'react';
import { View, SafeAreaView } from "react-native"
import { BottomNavigation, Text, Title } from 'react-native-paper';
import FeedStackScreen from "./FeedStack/FeedStackScreen"
import ProfileStackScreen from "./ProfileStack/ProfileStackScreen";
import BrowseStackScreen from './BrowseStack/BrowseStackScreen';
import firebase from "firebase";
import "firebase/firestore";

export default function MainStackScreen() {
    const [index, setIndex] = useState(0);
    const [routes, setRoutes] = useState([
        { key: 'feed', title: 'Top Grants', icon: 'fire' },
        { key: 'profile', title: "Profile", icon: "account"},
        { key: 'browse', title: 'Browse', icon: 'bookshelf'}
    ]);
    const [userInfo, setUserInfo] = useState();
    const [initializing, setInitializing] = useState(true);


    const renderScene = BottomNavigation.SceneMap({
            feed: () => (<FeedStackScreen userInfo={userInfo}/>),
            profile: () => (<ProfileStackScreen userInfo={userInfo} />),
            browse: () => (<BrowseStackScreen />)
        });

    useEffect(() => {
        const currentUser = firebase.auth().currentUser?.uid;
        console.log("Current User: " + currentUser)
        let userObj = {
            "uid": currentUser
        }

        const unsubscribe = firebase.firestore()
                                    .collection("users")
                                    .doc(currentUser)
                                    .onSnapshot((doc) => {
                                        const userData = doc.data()
                                        if (userData) {
                                            userObj = {
                                                ...userObj,
                                                ...userData
                                            }
                                        }
                                        setUserInfo(userObj);
                                        
                                    })
        return unsubscribe
    }, [])

    useEffect(() => {
        if (userInfo) {
            setInitializing(false)
        }
    }, [userInfo])

    if (initializing) {
        return null
    } else if (!userInfo?.orgName || !userInfo?.location || !userInfo?.category || !userInfo?.minGrantTarget || !userInfo?.maxGrantTarget) {
        console.log("Need to set up profile fully")
        return (
            <>
                <SafeAreaView style={{marginLeft: 20, alignItems: "center", marginRight: 20}}>
                    <Title>Set up your organization's profile.</Title>
                </SafeAreaView>
                <ProfileUpdateScreen userObj={userInfo} />
            </>

        );
    } else {
        return (
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        );
    }
}
import React, {useState, useEffect} from 'react';
import { View, SafeAreaView } from "react-native"
import { BottomNavigation, Text, Title } from 'react-native-paper';
import FeedStackScreen from "./FeedStack/FeedStackScreen"
import ProfileStackScreen from "./ProfileStack/ProfileStackScreen";
import ProfileUpdateScreen from "./ProfileStack/ProfileUpdateScreen";
import BrowseStackScreen from './BrowseStack/BrowseStackScreen';
import firebase from "firebase";
import "firebase/firestore";
import { filter } from "../../helpers/filter";
import Loading from '../../components/Loading';

export default function MainStackScreen() {
    const [index, setIndex] = useState(0);
    const [routes, setRoutes] = useState([
        { key: 'feed', title: 'Top Grants', icon: 'fire' },
        { key: 'profile', title: "Profile", icon: "account"},
        { key: 'browse', title: 'Browse', icon: 'bookshelf'}
    ]);
    const [userInfo, setUserInfo] = useState(Object());
    const [recommendedGrants, setRecommendedGrants] = useState([]);
    const [allGrants, setAllGrants] = useState(Object());
    const [initializing, setInitializing] = useState(true);


    const renderScene = BottomNavigation.SceneMap({
            feed: () => (<FeedStackScreen userInfo={userInfo} recommendedGrants={recommendedGrants} />),
            profile: () => (<ProfileStackScreen userInfo={userInfo} />),
            browse: () => (<BrowseStackScreen allGrants={allGrants} />)
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
                                        console.log("User Object created")
                                        console.log(userObj)
                                        setUserInfo(userObj);
                                        
                                    })
        return unsubscribe
    }, [])

    useEffect(() => {
        const unsubscribe = firebase.firestore()
                .collection("grants")
                .onSnapshot((querySnapshot) => {
                    let collectedGrants = Object();
                    querySnapshot.forEach((doc) => {
                        collectedGrants[doc.id] = doc.data()
                    })
                    console.log("Extracted all grants");
                    setAllGrants(collectedGrants)
                })
        return unsubscribe
    }, [])

    useEffect(() => {
        if (Object.keys(userInfo).length != 0 && Object.keys(allGrants).length != 0) {
            console.log("New user info")
            console.log(userInfo)
            const considerCloud = false;
            let recGrants = [];
            if (userInfo.recommendedGrants && considerCloud) {
                for (const grantID of userInfo.recommendedGrants) {
                    recGrants.push(allGrants[grantID])
                }
                console.log("Finished creating recommended list")
                console.log(userInfo.recommendedGrants)
                recGrants = filter(recGrants, {
                    sortBy: "CloseDate"
                })
            } else {
                console.log("Manually finding recommended grants")
                recGrants = filter(Object.values(allGrants), {
                    category: userInfo["category"],
                    maxGrantTarget: userInfo["maxGrantTarget"],
                    minGrantTarget: userInfo["minGrantTarget"],
                    sortBy: "CloseDate",
                    removePast: true
                }).slice(0, 10)
                console.log(`${recGrants.length} recommended grants collected`)
            }
            setRecommendedGrants(recGrants)
            setInitializing(false)
        }
    }, [userInfo, allGrants])

    if (initializing) {
        return <Loading text={"Fetching latest grants..."} />
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
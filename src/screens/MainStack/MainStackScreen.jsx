import React, {useState} from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import FeedStackScreen from "./FeedStack/FeedStackScreen"

export default function MainStackScreen() {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'feed', title: 'Feed', icon: 'album' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
            feed: FeedStackScreen,
        });
    
    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
}
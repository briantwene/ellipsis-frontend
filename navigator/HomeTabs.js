import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Conversations from "../screens/Conversations";
import Friends from "../screens/Friends";
import Profile from "../screens/Profile";
import Calls from "../screens/Calls";
import { useAuth } from "../context/authContext";
const Tabs = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Conversations">
        {(props) => <Conversations {...props} />}
      </Tabs.Screen>
      <Tabs.Screen name="Calls" component={Calls} />
      <Tabs.Screen name="Friends" component={Friends} />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
}

import { View, Text } from "react-native";
import Chat from "../screens/Chat";
import HomeTabs from "./HomeTabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import SplashScreen from "../screens/SplashScreen";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import { useAuth } from "../context/authContext";

const Stack = createNativeStackNavigator();

export default function BaseNavigator() {
  const { authData, loading } = useAuth();
  if (loading) return <SplashScreen />;
  return (
    <Stack.Navigator>
      {authData ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={({ route }) => ({ title: route.params.name })}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
}

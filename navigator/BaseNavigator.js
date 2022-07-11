import { View, Text } from "react-native";
import Chat from "../screens/Chat";
import HomeTabs from "./HomeTabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import SplashScreen from "../screens/SplashScreen";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import { useAuth } from "../context/authContext";
import { useSocket } from "../context/socketContext";

const Stack = createNativeStackNavigator();

export default function BaseNavigator() {
  const { authData, loading } = useAuth();
  const { socket } = useSocket();

  if (loading) return <SplashScreen />;

  useEffect(() => {
    socket.emit("login", authData.userId);
    console.log("user has logged in");

    return () => socket.disconnect();
  }, []);

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
            options={({ route }) => ({ title: route.params.name.username })}
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

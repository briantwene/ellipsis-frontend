import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AuthProvider } from "./context/authContext";
import BaseNavigator from "./navigator/BaseNavigator";
import { SocketProvider } from "./context/socketContext";
import Chat from "./screens/Chat";
import Conversations from "./screens/Conversations";
import Friends from "./screens/Friends";
import Profile from "./screens/Profile";

export default function App() {
  return (
    <>
      <AuthProvider>
        <SocketProvider>
          <NavigationContainer>
            <BaseNavigator />
          </NavigationContainer>
        </SocketProvider>
      </AuthProvider>
    </>
  );
}

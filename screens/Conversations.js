import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { BACKEND_URL } from "@env";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import ConversationItem from "../components/ConversationItem";
import Chat from "./Chat";
import { useAuth } from "../context/authContext";
import axiosInstance from "../utils/axiosClass";

const Stack = createNativeStackNavigator();

export default function Conversations({ navigation, sendMsg }) {
  const [conversationsList, setConversationsList] = useState([]);
  const { authData } = useAuth();

  const fetchConversations = async () => {
    const { data } = await axiosInstance(`conversations/getAll`, {
      userId: authData.userId
    });
    setConversationsList(data);
  };

  const onPressConversation = (info, name = "") => {
    console.log("info", info);
    navigation.navigate("Chat", { ...info, name });
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <>
      <View style={styles.conversations}>
        <FlatList
          data={conversationsList}
          renderItem={(item, index) => {
            return (
              <ConversationItem
                info={item.item}
                currentUser={authData.userId}
                enterChat={onPressConversation}
              />
            );
          }}
          keyExtractor={(item) => item.conversationId}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  conversations: {
    flex: 0,
    backgroundColor: "lightblue"
  }
});

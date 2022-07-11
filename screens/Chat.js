import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../utils/axiosClass";
import MessageItem from "../components/MessageItem";
import ChatLogContainer from "../components/ChatLogContainer";
import { useSocket } from "../context/socketContext";
import { useAuth } from "../context/authContext";

export default function Chat({ route }) {
  const [message, setMessage] = useState("");
  const {
    authData: { userId, username }
  } = useAuth();
  const [isDisabled, setIsDisabled] = useState(true);
  const [messageList, setMessageList] = useState([]);
  const { socket } = useSocket();
  const messagesRef = useRef();

  const { receiverId, otherUsername } = route.params.name;
  const { conversationId } = route.params;

  const updateMessages = (message) => {
    console.log("newMessage", message);
    setMessageList((currentMessages) => {
      return [...currentMessages, message];
    });
    //Make an api call here
    axiosInstance.post("messages/addMessage", {
      ...message
    });
  };

  const fetchMessages = async () => {
    try {
      const response = await axiosInstance(`messages/fetch`, {
        conversationId: conversationId
      });

      console.log("response.data", response.data);
      setMessageList(response.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    console.log("socket is listening for messages");
    socket.on("newMessage", (message) => {
      console.log("NEW MESSAGE");
      updateMessages(message);
    });
    return () => {
      console.log("socket has disconnected");
      socket.disconnect();
    };
  }, []);

  const onChange = (text) => {
    setMessage(text);

    // if (message === "") {
    //   setIsDisabled(true);
    // } else {
    //   setIsDisabled(false);
    // }
  };

  const onSend = () => {
    if (message.trim() === "") {
      return;
    }
    const cleanedMessage = message.trim();
    const messageObj = {
      message_text: cleanedMessage,
      userId: userId,
      username: username,
      conversationId: conversationId,
      datetime: new Date(Date.now())
    };
    updateMessages(messageObj);
    socket.emit("send", { ...messageObj, to: receiverId });
  };

  return (
    <View style={styles.chatContainer}>
      <View style={styles.chatLog}>
        <ChatLogContainer messages={messageList} />
      </View>
      <View style={styles.textbox}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChange(text)}
          placeholder="enter message here"
        />
        <View>
          <Button onPress={onSend} title="send" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1
  },
  chatLog: {
    flex: 1,
    backgroundColor: "lightblue"
  },
  input: {
    backgroundColor: "#fff",
    //fontSize: 16,
    width: "80%",
    padding: 10,
    borderRadius: 10
  },
  textbox: {
    height: 80,
    padding: 10,
    backgroundColor: "lightpink",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});

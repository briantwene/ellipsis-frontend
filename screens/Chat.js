import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React from "react";

export default function Chat() {
  return (
    <View style={styles.chatContainer}>
      <View style={styles.chatLog}>
        <Text>this is the chat log box</Text>
      </View>
      <View style={styles.textbox}>
        <TextInput style={styles.input} placeholder="enter message here" />
        <View>
          <Button title="send" />
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

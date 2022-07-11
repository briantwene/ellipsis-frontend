import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { localTime } from "../utils/localTime";

export default function ({ info }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.messageInfo}>
          <Text style={styles.username}>{info.username}</Text>
          <Text style={styles.time}>{localTime(info.datetime)}</Text>
        </View>
      </View>
      <Text>{info.message_text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "lightgreen"
  },
  messageInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },
  username: {
    marginRight: 5
  },
  time: {
    fontSize: 10
  }
});

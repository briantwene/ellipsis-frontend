import { View, Text, FlatList } from "react-native";
import React from "react";
import MessageItem from "./MessageItem";

export default function ChatLogContainer(props) {
  return (
    <FlatList
      data={props.messages}
      extraData={props}
      renderItem={({ item }, index) => {
        return <MessageItem info={item} />;
      }}
      keyExtractor={(item, index) => index}
    />
  );
}

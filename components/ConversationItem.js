import { View, Text, Pressable } from "react-native";
import { useState } from "react";

export default function ConversationItem({ info, currentUser, enterChat }) {
  console.log("currentUser", currentUser);
  console.log("info", info);

  const [name, setName] = useState(getUserName());
  //check if the conversation has a name - if it doesnt then get the user id and use that as the name
  function getUserName() {
    if (info.type === "single") {
      const [otherUser] = info.GroupMember.filter(
        (member) => member.userId != currentUser
      );
      return otherUser.username;
    }

    return info.conversationName;
  }
  return (
    <Pressable onPress={() => enterChat(info, name)}>
      <Text>{name}</Text>
    </Pressable>
  );
}

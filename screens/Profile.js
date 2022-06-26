import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "../context/authContext";

export default function Profile() {
  const auth = useAuth();
  return (
    <View>
      <Text>Profile</Text>
      <Button title="sign-out" onPress={auth.signOut} />
    </View>
  );
}

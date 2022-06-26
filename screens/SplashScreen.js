import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function SplashScreen() {
  return (
    <View style={styles.splash}>
      <Text style={styles.logo}>ELLIPSIS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    fontSize: 32,
    letterSpacing: 20
  }
});

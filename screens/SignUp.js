import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function SignUp() {
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>ELLIPSIS</Text>

          <Text style={styles.title}>SignUp</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Email</Text>
            <TextInput
              style={styles.formInput}
              onChangeText={(email) => onChange("email", email)}
              placeholder="example@gmail.com"
            />
          </View>

          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Password</Text>
            <TextInput
              style={styles.formInput}
              onChangeText={(password) => onChange("password", password)}
              placeholder="Password"
            />
          </View>

          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Username</Text>
            <TextInput
              style={styles.formInput}
              onChangeText={(password) => onChange("password", password)}
              placeholder="Password"
            />
          </View>

          <Pressable onPress={() => onSubmit()} style={styles.loginBtn}>
            <Text style={styles.btnText}>Login</Text>
          </Pressable>
        </View>

        <View style={styles.bottom}>
          <View style={styles.signUp}>
            <Text style={styles.cta}>Have an account already</Text>
            <Pressable style={styles.link}>
              <Text style={styles.linkText}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 3,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  logo: {
    fontSize: 24,
    letterSpacing: 20
  },

  title: {
    fontSize: 32,
    fontWeight: "bold"
  },
  form: {
    flex: 7,

    alignItems: "center",
    justifyContent: "center"
  },
  formItem: {
    width: "80%",
    marginBottom: 20
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },
  formInput: {
    paddingVertical: 10,
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "gray"
  },
  loginBtn: {
    backgroundColor: "#11aaff",
    marginTop: 50,
    height: 50,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  btnText: {
    fontWeight: "bold",
    color: "white"
  },
  bottom: {
    flex: 2,

    justifyContent: "center"
  },
  signUp: {
    marginLeft: 30,
    height: "50%",
    justifyContent: "space-evenly"
  },
  cta: {
    fontSize: 16,
    padding: 10
  },
  link: {
    padding: 10
  },
  linkText: {
    fontSize: 16,
    color: "blue"
  }
});

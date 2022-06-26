import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosClass";
import { useAuth } from "../context/authContext";

export default function SignIn({ navigation }) {
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const auth = useAuth();

  const onSubmit = () => {
    //check if any of the fields are empty
    console.log("is running");
    if (!form.email) {
      setError((prev) => {
        return { ...prev, email: "please add an email!" };
      });
    }

    if (!form.password) {
      setError((prev) => {
        return { ...prev, password: "please add an password!" };
      });
    }

    //then submit
    if (
      Object.values(form).length === 2 &&
      Object.values(form).every((item) => item.trim().length > 0) &&
      Object.values(error).every((item) => !item)
    ) {
      auth.signIn(form);
    }
  };

  const onChange = (name, value) => {
    setForm({ ...form, [name]: value });

    //can add more checks in the future and even make it a hook
    if (value !== "") {
      setError((prev) => {
        return { ...prev, [name]: null };
      });
    } else {
      setError((prev) => {
        return { ...prev, [name]: "This field is required" };
      });
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>ELLIPSIS</Text>

          <Text style={styles.title}>Login</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Email</Text>
            <TextInput
              style={styles.formInput}
              onChangeText={(email) => onChange("email", email)}
              placeholder="example@gmail.com"
            />
            <Text>{error.email}</Text>
          </View>

          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Password</Text>
            <TextInput
              style={styles.formInput}
              onChangeText={(password) => onChange("password", password)}
              placeholder="Password"
            />
            <Text>{error.password}</Text>
          </View>

          <Pressable onPress={() => onSubmit()} style={styles.loginBtn}>
            <Text style={styles.btnText}>Login</Text>
          </Pressable>
        </View>

        <View style={styles.bottom}>
          <View style={styles.signUp}>
            <Text style={styles.cta}>Don't have an account yet?</Text>
            <Pressable
              style={styles.link}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.linkText}>Sign Up</Text>
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
    flex: 4,
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
    flex: 6,

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

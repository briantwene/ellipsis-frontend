import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../utils/axiosClass";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      const storedAuthData = await AsyncStorage.getItem("@AuthData");
      if (storedAuthData) {
        const currentAuthData = JSON.parse(storedAuthData);
        setAuthData(currentAuthData);
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  //sign in function
  const signIn = async (userData) => {
    try {
      const response = await axiosInstance
        .post("users/sign-in", {
          ...userData
        })
        .catch((e) => {});

      const freshAuthData = response.data;

      const jsonValue = JSON.stringify(freshAuthData);
      await AsyncStorage.setItem("@AuthData", jsonValue);
      setAuthData(freshAuthData);
    } catch (e) {
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      } else {
        console.log("there was an error:", e);
      }
    }
  };

  //sign out function
  const signOut = async () => {
    await AsyncStorage.removeItem("@AuthData");
    setAuthData(undefined);
  };

  return (
    <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook for accessing the auth context....
const useAuth = () => {
  // get the context
  const context = useContext(AuthContext);

  //if there isnt then throw an error
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  //if there is, return the context
  return context;
};

export { AuthContext, AuthProvider, useAuth };

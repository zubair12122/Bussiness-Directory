import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();
const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
        <Image
          source={require("../assets/images/Login.png")}
          style={{
            width: 230,
            height: 380,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "#000",
          }}
        />
      </View>
      <View style={{ backgroundColor: "#fff", padding: 20 }}>
        <Text
          style={{ color: "black", fontSize: 25, fontFamily: "outfitBold" }}
        >
          Yout Ultimate{" "}
          <Text style={{ color: Colors.primarycolor }}>
            {" "}
            Community Bussiness Directory
          </Text>
          App
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfit",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.gray,
          }}
        >
          Find your favourit business near you and post your own post to your
          community
        </Text>
        <TouchableOpacity onPress={onPress} style={styles.btn}>
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "outfitBold",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    marginVertical: 88,
    fontSize: 24,
    display: "flex",
  },
  btn: {
    backgroundColor: Colors.primarycolor,
    borderRadius: 99,
    padding: 16,
  },
});

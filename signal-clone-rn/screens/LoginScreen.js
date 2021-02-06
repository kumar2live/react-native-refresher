import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Button, Input, Image } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("test");
  const [password, setPassword] = useState("abcabc");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      // console.log("authUser login: ", authUser);
      setLoading(true);
      if (authUser) {
        setLoading(false);
        navigation.replace("Home");
      } else {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        // console.log("authUser: ", authUser);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  const signUp = () => {
    navigation.navigate("Register");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar style="light" />
      <Image
        source={{
          uri:
            "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
        style={styles.imageStyle}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button
        loading={loading}
        title="Login"
        containerStyle={styles.button}
        onPress={signIn}
      />
      <Button
        title="Register"
        containerStyle={styles.button}
        type="outline"
        onPress={signUp}
      />
      <View style={{ height: 200 }}></View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  imageStyle: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});

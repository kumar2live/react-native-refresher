import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("Testing");
  const [email, setEmail] = useState("test");
  const [password, setPassword] = useState("abcabc");
  const [imageUrl, setImageUrl] = useState(
    "https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_1280.png"
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const register = () => {
    console.log('imageUrl: ', imageUrl);

    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log("authUser: ", authUser);
        setLoading(false);

        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={styles.titleStyle}>
        Create account here
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
          autoFocus
        />

        <Input
          placeholder="Email"
          type="text"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Input
          placeholder="Password"
          secureTextEntry
          type="text"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Input
          placeholder="Profile Picture Url(optional)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        loading={loading}
        raised
        onPress={register}
        title="Register"
        style={styles.buttonStyles}
      />
      <View style={{ height: 200 }}></View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  titleStyle: {
    padding: 8,
    marginBottom: 20,
  },
  inputContainer: {
    width: 320,
  },
  buttonStyles: {
    width: 100,
  },
});

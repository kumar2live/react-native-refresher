import React, { useLayoutEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { auth, db } from "../firebase";
import * as firebase from "firebase";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => {
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar
              rounded
              source={{
                uri:
                  messages[0]?.data.photoURL ||
                  "https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_1280.png",
              }}
            />
            <Text style={{ color: "#fff", marginLeft: 10, fontWeight: "700" }}>
              {route.params.chatName}
            </Text>
          </View>
        );
      },
      headerLeft: () => {
        return (
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={navigation.goBack}
          >
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
        );
      },
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 80,
              marginRight: 20,
            }}
          >
            <TouchableOpacity activeOpacity={0.5}>
              <FontAwesome name="video-camera" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
              <Ionicons name="call" size={24} color="white" />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection("signalchats")
      .doc(route.params.id)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      });

    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("signalchats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        )
      );

    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15, paddingHorizontal: 10 }}>
              {messages.map(({ id, data }) => {
                if (data.email === auth.currentUser.email) {
                  return (
                    <View key={id} style={styles.receiver}>
                      <Avatar
                        source={{ uri: data.photoURL }}
                        rounded
                        size={30}
                        position="absolute"
                        bottom={-15}
                        right={-5}
                        // web
                        containerStyle={{
                          position: "absolute",
                          bottom: -15,
                          right: -5,
                        }}
                      />
                      <Text style={styles.receivedText}>{data.message}</Text>
                    </View>
                  );
                } else {
                  return (
                    <View key={id} style={styles.sender}>
                      <Avatar
                        source={{ uri: data.photoURL }}
                        rounded
                        size={30}
                        position="absolute"
                        bottom={-15}
                        left={-5}
                        // web
                        containerStyle={{
                          position: "absolute",
                          bottom: -15,
                          left: -5,
                        }}
                      />
                      <Text style={styles.senderText}>{data.message}</Text>
                      <Text style={styles.senderName}>{data.displayName}</Text>
                    </View>
                  );
                }
              })}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                style={styles.textInput}
                placeholder="Signal Message"
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#2592e9" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    color: "grey",
    padding: 10,
    borderRadius: 30,
  },
  receivedText: {
    marginLeft: 10,
    fontWeight: "500",
    color: "#333",
  },
  senderText: {
    marginLeft: 10,
    marginBottom: 15,
    fontWeight: "500",
    color: "#fff",
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "#fff",
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
});

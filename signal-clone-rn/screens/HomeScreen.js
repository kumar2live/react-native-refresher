import React, { useEffect, useLayoutEffect, useState } from "react";

import { Button, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { auth, db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("signalchats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => {
          return { id: doc.id, data: doc.data() };
        })
      );
    });

    return unsubscribe;
  }, []);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "#333" },
      headerTintColor: "black",
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
              <AntDesign name="camerao" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("AddChat")}
            >
              <SimpleLineIcons name="pencil" size={24} color="black" />
            </TouchableOpacity>
          </View>
        );
      },
      headerLeft: () => {
        return (
          <View style={{ marginLeft: 20 }}>
            <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
              <Avatar
                rounded
                source={{
                  uri:
                    auth?.currentUser?.photoURL ||
                    "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                }}
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation]);

  const goToChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
    });
  };

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView>
        {chats.map(({ id, data: { chatName } }) => {
          return (
            <CustomListItem
              id={id}
              chatName={chatName}
              key={id}
              enterChat={goToChat}
            />
          );
        })}

        <Button onPress={signOutUser} title="Sign Out" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

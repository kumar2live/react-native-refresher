import React from "react";
import { useLayoutEffect } from "react";
import { Button, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";

import { auth } from "../firebase";

const HomeScreen = ({ navigation }) => {
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
      headerLeft: () => {
        console.log("auth", auth);

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
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />

        <Button onPress={() => auth.signOut()} title="Sign Out" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

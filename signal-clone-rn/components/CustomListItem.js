import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ListItem, Avatar } from "react-native-elements";

const CustomListItem = ({id, chatName, enterChat}) => {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri:
            "https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_1280.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title>Late night coding</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>This is a test subtitle</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});

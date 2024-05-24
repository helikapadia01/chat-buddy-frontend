import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthProvider";
import { useChat } from "../context/ChatProvider";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

const ChatHistoryDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const { logout } = useAuth();
  const { messages } = useChat();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Chat History</Text>
      </View>
      {messages.map((message) => (
        <DrawerItem
          key={message._id}
          label={message.text}
          onPress={() => console.log(`Navigating to message ${message._id}`)}
        />
      ))}
      <DrawerItem
        label="Logout"
        onPress={logout}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ChatHistoryDrawer;

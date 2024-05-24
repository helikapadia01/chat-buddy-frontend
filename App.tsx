import { NavigationContainer } from "@react-navigation/native";
import RootLayout from "./src/navigation/RootLayout";
import { ChatProvider } from "./src/context/ChatProvider";
import React from "react";
import { AuthProvider } from "./src/context/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <RootLayout />
      </ChatProvider>
    </AuthProvider>
  );
}

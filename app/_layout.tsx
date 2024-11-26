import { Slot, Stack } from "expo-router";
import { StyleSheet, Text, View, StatusBar } from "react-native";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}}></Stack.Screen>
    </Stack>
  );
};

export default RootLayout


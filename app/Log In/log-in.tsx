import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP, PORT } from "@env";

const LogIn = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handlePass = () => {
    router.push("/Main Tabs/Tabs/home");
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${IP}:${PORT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // Suppose you call it `emailOrUsername`
          password: password, // from the TextInput
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        // Error from backend
        Alert.alert("Login Error", data.detail || "Unknown error");
        return;
      }

      // If successful
      Alert.alert("Success", data.message);
      await AsyncStorage.setItem("userEmail", email);
      // Move to next screen
      router.push("/Main Tabs/Tabs/home");
    } catch (error) {
      console.error(error);
      Alert.alert("Network Error", "Unable to connect to server");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full h-full bg-white flex-1 px-7">
            <Text className="font-bold text-center mt-12 text-3xl">
              Welcome
            </Text>
            <Text className="text-center mt-6 text-blue-500 text-lg font-semibold">
              Start your journey towards a more active lifestyle
            </Text>

            <View className="mt-14">
              <Text className="mb-2 font-semibold">Email</Text>
              <TextInput
                className="bg-white py-5 px-3 rounded-lg border"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
              />

              <Text className="mb-2 mt-5 font-semibold">Password</Text>
              <View className="relative bg-white rounded-lg border">
                <TextInput
                  placeholder="Enter your password"
                  className="py-5 px-3"
                  secureTextEntry={secureTextEntry}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable
                  onPress={toggleSecureTextEntry}
                  className="absolute right-3 top-1/3"
                >
                  <Icon
                    name={secureTextEntry ? "eye-off" : "eye"}
                    size={20}
                    color="gray"
                  />
                </Pressable>
              </View>

              <View className="flex-row justify-between mt-3">
                <Pressable
                  onPress={toggleCheckbox}
                  className="flex-row items-center"
                >
                  <View
                    className="h-5 w-5 mr-2 rounded-sm justify-center items-center"
                    style={{
                      backgroundColor: isChecked ? "#3B82F6" : "white",
                      borderWidth: isChecked ? 0 : 1,
                    }}
                  >
                    {isChecked && (
                      <Icon name="checkmark-outline" size={17} color="white" />
                    )}
                  </View>
                  <Text>Remember me</Text>
                </Pressable>

                <TouchableOpacity
                  onPress={() =>
                    router.push("/Log In/Forgot Password/forgot-password")
                  }
                  activeOpacity={0.7}
                >
                  <Text className="text-blue-500">Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handlePass}
                className="bg-blue-500 py-3 rounded-lg mt-5"
                activeOpacity={0.7}
              >
                <Text className="text-white font-bold text-xl text-center">
                  Log In
                </Text>
              </TouchableOpacity>

              <Text className="mt-5 text-center">or continue with</Text>

              <View className="mt-5 flex-row justify-around">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="bg-gray-100 flex-row justify-center items-center h-12 w-5/12 rounded-lg"
                >
                  <Icon
                    name="logo-facebook"
                    size={20}
                    color="#2563eb"
                    className="mr-3"
                  />
                  <Text className="text-black font-semibold text-lg">
                    Facebook
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="bg-gray-100 flex-row justify-center items-center w-5/12 rounded-lg"
                >
                  <Icon
                    name="logo-google"
                    size={20}
                    color="#2563eb"
                    className="mr-3"
                  />
                  <Text className="text-black font-semibold text-lg">
                    Google
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row mt-5 justify-center items-center">
                <Text>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => router.push("/Log In/sign-up")}
                  activeOpacity={0.7}
                >
                  <Text className="text-blue-500">Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LogIn;

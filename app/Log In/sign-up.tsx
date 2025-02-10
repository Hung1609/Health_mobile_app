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
import { useUser, UserProvider } from "./UserContext";
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
  const router = useRouter();
  const { setUserData } = useUser();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleContinue = async () => {
    router.push("/Log In/Set Up/gender");
    try {
      const response = await fetch("http://192.168.1.148:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          password: password,
          // Make sure you capture `password` from your TextInput
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        // Error from backend
        Alert.alert("Sign Up Error", data.detail || "Unknown error");
        return;
      }

      await AsyncStorage.setItem("userEmail", email);

      // If successful
      Alert.alert("Success", data.message);
      // Move to next screen, e.g. set up profile
      router.push("/Log In/Set Up/gender");
    } catch (error) {
      console.error(error);
      Alert.alert("Network Error", "Unable to connect to server");
    }
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleConfirmPassword = () => {
    setConfirmPassword(!confirmPassword);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full h-full bg-white flex-1 px-7">
            <Text className="font-bold text-center mt-12 text-3xl">
              Let's Start!
            </Text>

            <View className="mt-14">
              <Text className="mb-2 font-semibold">Full name</Text>
              <TextInput
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
                className="bg-white py-5 px-3 rounded-lg border"
                keyboardType="default"
                autoCapitalize="words"
                autoCorrect={false}
              />

              <Text className="mb-2 font-semibold mt-5">Email</Text>
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                className="bg-white py-5 px-3 rounded-lg border"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
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

              <Text className="mb-2 mt-5 font-semibold">Confirm Password</Text>
              <View className="relative bg-white rounded-lg border">
                <TextInput
                  placeholder="Confirm your password"
                  className="py-5 px-3"
                  secureTextEntry={confirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Pressable
                  onPress={toggleConfirmPassword}
                  className="absolute right-3 top-1/3"
                >
                  <Icon
                    name={confirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color="gray"
                  />
                </Pressable>
              </View>

              <TouchableOpacity
                onPress={handleContinue}
                className="bg-blue-500 py-3 rounded-lg mt-7"
                activeOpacity={0.7}
              >
                <Text className="text-white font-bold text-xl text-center">
                  Continue
                </Text>
              </TouchableOpacity>

              <Text className="mt-5 text-center">or sign up with</Text>

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
                  className="bg-gray-100 flex-row justify-center items-center h-12 w-5/12 rounded-lg"
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

              <View className="flex-row mt-5 justify-center items-center mb-5">
                <Text>Already have an account? </Text>
                <TouchableOpacity
                  onPress={() => router.push("/Log In/log-in")}
                  activeOpacity={0.7}
                >
                  <Text className="text-blue-500">Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SignUp;

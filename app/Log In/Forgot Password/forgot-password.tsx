import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // <-- Install & import

const ForgotPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");

    const handleContinue = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter your email.");
            return;
        }

        // Store email in AsyncStorage
        await AsyncStorage.setItem("forgotPasswordEmail", email);

        // Then navigate to the set-password screen
        router.push({
            pathname: "/Log In/Forgot Password/set-password",
            params: { email },
        });
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <View className="w-full h-full bg-white flex-1 px-7 items-center">
                    <Text className="font-bold text-center mt-12 text-3xl">
                        Forgot Password?
                    </Text>
                    <Text className="text-center mt-6 text-blue-500 text-lg font-semibold">
                        Please enter the address associated with your account
                    </Text>

                    <View className="mt-14 w-full">
                        <Text className="mb-2 font-semibold">
                            Enter your email address
                        </Text>
                        <TextInput
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            className="bg-white py-5 px-3 rounded-lg border"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleContinue}
                        className="bg-blue-500 py-3 rounded-lg absolute bottom-5 w-full"
                        activeOpacity={0.7}
                    >
                        <Text className="text-white font-bold text-xl text-center">
                            Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default ForgotPassword;

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable,
    Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgotPassword = () => {
    const router = useRouter();
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState(true);

    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Retrieve the email from AsyncStorage
        const getEmail = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem(
                    "forgotPasswordEmail"
                );
                if (storedEmail) {
                    setEmail(storedEmail);
                } else {
                    Alert.alert(
                        "Error",
                        "No email found. Please go back and enter your email."
                    );
                    // Optionally navigate the user back
                    router.push("/Log In/Forgot Password/forgot-password");
                }
            } catch (error) {
                console.error(error);
            }
        };
        getEmail();
    }, []);

    const toggleSecureTextEntry = () => setSecureTextEntry(!secureTextEntry);
    const toggleConfirmPassword = () => setConfirmPassword(!confirmPassword);

    const handleContinue = async () => {
        // Basic checks
        if (!newPassword || !confirmNewPassword) {
            Alert.alert("Error", "Please fill both password fields.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        try {
            // Call the /reset_password endpoint
            const response = await fetch(
                "http://127.0.0.1:8000/reset_password",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, new_password: newPassword }),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                Alert.alert(
                    "Error",
                    data.detail || "Failed to reset password."
                );
                return;
            }

            Alert.alert("Success", data.message);
            // Optional: Clear forgot password email from AsyncStorage
            await AsyncStorage.removeItem("forgotPasswordEmail");

            // Navigate to success screen or login screen
            router.push("/Log In/log-in");
        } catch (error) {
            console.error(error);
            Alert.alert("Network Error", "Could not connect to server.");
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <View className="w-full h-full bg-white flex-1 px-7 items-center">
                    <Text className="font-bold text-center mt-12 text-3xl">
                        Reset Password
                    </Text>
                    <Text className="text-center mt-6 text-blue-500 text-lg font-semibold">
                        Please enter a new password for your account
                    </Text>

                    <View className="mt-14">
                        <Text className="mb-2 font-semibold">Password</Text>
                        <View className="relative bg-white rounded-lg border">
                            <TextInput
                                placeholder="Enter your password"
                                className="py-5 px-3"
                                secureTextEntry={secureTextEntry}
                                autoCapitalize="none"
                                autoCorrect={false}
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

                        <Text className="mb-2 mt-5 font-semibold">
                            Confirm Password
                        </Text>
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

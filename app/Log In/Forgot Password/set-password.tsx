import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

const SetPassword = () => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPasswordInput] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchEmail = async () => {
            const storedEmail = await AsyncStorage.getItem("resetEmail");
            if (storedEmail) {
                setEmail(storedEmail);
            }
        };
        fetchEmail();
    }, []);

    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const toggleConfirmPasswordSecure = () => {
        setConfirmPasswordSecure(!confirmPasswordSecure);
    };

    const handleResetPassword = async () => {
        if (!password || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            if (!email) {
                Alert.alert(
                    "Error",
                    "Email not found. Please restart the process."
                );
                return;
            }

            const response = await fetch("http://127.0.0.1/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, new_password: password }),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert("Success", "Password reset successfully", [
                    {
                        text: "OK",
                        onPress: () => router.push("/Log In/log-in"),
                    },
                ]);
            } else {
                Alert.alert(
                    "Error",
                    result.detail || "Failed to reset password"
                );
            }
        } catch (error) {
            Alert.alert("Error", "An unexpected error occurred");
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
                                value={password}
                                onChangeText={setPassword}
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
                                secureTextEntry={confirmPasswordSecure}
                                value={confirmPassword}
                                onChangeText={setConfirmPasswordInput}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <Pressable
                                onPress={toggleConfirmPasswordSecure}
                                className="absolute right-3 top-1/3"
                            >
                                <Icon
                                    name={
                                        confirmPasswordSecure
                                            ? "eye-off"
                                            : "eye"
                                    }
                                    size={20}
                                    color="gray"
                                />
                            </Pressable>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={handleResetPassword}
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

export default SetPassword;

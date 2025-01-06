import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import tw from "tailwind-react-native-classnames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const Level = () => {
    const router = useRouter();
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    const levels = ["Beginner", "Intermediate", "Advance"];

    const handleLevelSelection = (level: string) => {
        setSelectedLevel(level);
    };

    const handleContinue = async () => {
        if (!selectedLevel) {
            Alert.alert("Error", "Please select a level.");
            return;
        }

        try {
            const email = await AsyncStorage.getItem("userEmail");
            if (!email) {
                Alert.alert(
                    "Error",
                    "No email found in storage. Please sign up again."
                );
                return;
            }

            const response = await fetch("http://127.0.0.1:8000/level", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    level: selectedLevel,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                Alert.alert("Error", data.detail || "Failed to set level");
                return;
            }

            Alert.alert("Success", data.message);
            router.push("/Log In/log-in");
        } catch (error) {
            console.error(error);
            Alert.alert("Network Error", "Unable to reach the server.");
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <View className="w-full h-full bg-white flex-1 px-7 items-center">
                    <Text className="font-bold text-center mt-12 text-3xl">
                        Physical Activity Level
                    </Text>

                    <View className="w-full justify-center mb-20 flex-1">
                        {levels.map((level) => (
                            <TouchableOpacity
                                key={level}
                                activeOpacity={0.7}
                                className={`rounded-3xl items-center p-4 ${
                                    level !== "Beginner" ? "mt-10" : ""
                                }`}
                                onPress={() => handleLevelSelection(level)}
                                style={tw`${
                                    selectedLevel === level
                                        ? "bg-blue-500 border-2 border-black"
                                        : "bg-white border-2 border-black"
                                }`}
                            >
                                <Text
                                    className={`font-bold text-xl ${
                                        selectedLevel === level
                                            ? "text-white"
                                            : "text-yellow-500"
                                    }`}
                                >
                                    {level}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity
                        className="bg-blue-500 py-3 rounded-lg absolute bottom-5 w-full"
                        activeOpacity={0.7}
                        onPress={handleContinue}
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

export default Level;

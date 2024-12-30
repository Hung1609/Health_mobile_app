import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import tw from "tailwind-react-native-classnames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const Goal = () => {
    const router = useRouter();
    const [selectedGoals, setSelectedGoal] = useState<string[]>([]);

    const goals = [
        "Lose Weight",
        "Gain Weight",
        "Muscle Mass Gain",
        "Shape Body",
        "Others",
    ];

    const handleGoalSelection = (goal: string) => {
        setSelectedGoal((preSelectedGoals) => {
            if (preSelectedGoals.includes(goal)) {
                return preSelectedGoals.filter((item) => item !== goal);
            } else {
                return [...preSelectedGoals, goal];
            }
        });
    };

    const handleContinue = async () => {
        if (selectedGoals.length === 0) {
            Alert.alert("Error", "Please select at least one goal.");
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

            // POST request to /set_goal
            const response = await fetch("http://127.0.0.1:8000/goal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    goals: selectedGoals,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                Alert.alert("Error", data.detail || "Failed to set goals");
                return;
            }

            Alert.alert("Success", data.message);
            // Move to the next screen
            router.push("/Log In/Set Up/level");
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
                        What Is Your Goal?
                    </Text>

                    <View className="mt-14 w-full flex-1">
                        {goals.map((goal) => (
                            <TouchableOpacity
                                key={goal}
                                className="mt-5 flex-row border-2 justify-between items-center p-2 rounded-3xl"
                                onPress={() => handleGoalSelection(goal)}
                                activeOpacity={0.7}
                                style={tw`${
                                    selectedGoals.includes(goal)
                                        ? "bg-blue-500"
                                        : "bg-white"
                                }`}
                            >
                                <Text
                                    className={`ml-3 font-bold ${
                                        selectedGoals.includes(goal)
                                            ? "text-white"
                                            : "text-yellow-500"
                                    }`}
                                >
                                    {goal}
                                </Text>
                                <View className="border-2 w-10 h-10 rounded-full bg-white">
                                    {selectedGoals.includes(goal) && (
                                        <Icon
                                            name="check"
                                            size={30}
                                            color="green"
                                        />
                                    )}
                                </View>
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

export default Goal;

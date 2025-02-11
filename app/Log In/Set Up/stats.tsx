
import { View, Text, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Weight = () => {
    const router = useRouter();
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const handleContinue = async () => {
        // Basic validation
        if (!height || !weight) {
            Alert.alert("Error", "Please enter both height and weight");
            return;
        }

        try {
            // Retrieve email from AsyncStorage (stored during sign-up)
            const email = await AsyncStorage.getItem("userEmail");
            if (!email) {
                Alert.alert(
                    "Error",
                    "No email found in storage. Please sign up again."
                );
                // Optionally navigate back to sign up
                return;
            }

            // Call your /set_stats endpoint
            const response = await fetch("http://192.168.1.148:8000/stats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    height: parseFloat(height), // Convert string to float
                    weight: parseFloat(weight),
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                // If the server returned an error status
                Alert.alert("Error", data.detail || "Failed to set stats");
                return;
            }

            // Success
            Alert.alert("Success", data.message);
            router.push("/Log In/Set Up/goal");
        } catch (error) {
            console.error(error);
            Alert.alert("Network Error", "Unable to connect to the server.");
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <View className="w-full h-full bg-white flex-1 px-7 items-center">
                    <Text className="font-bold text-center mt-12 text-3xl">
                        What's Your Body Stats?
                    </Text>

                    <View className="mt-14 w-full">
                        <Text className="mb-2 font-semibold">Height</Text>

                        <View className="flex-row items-center">
                            <TextInput
                                placeholder="Enter your height"
                                className="bg-white py-5 px-3 rounded-lg border flex-1"
                                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'}
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={height}
                                onChangeText={setHeight}
                            />
                            <View className="ml-3 bg-blue-500 w-16 h-16 rounded-lg flex justify-center items-center">
                                <Text className="text-white font-semibold">
                                    CM
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className="mt-5 w-full">
                        <Text className="mb-2 font-semibold">Weight</Text>

                        <View className="flex-row items-center">
                            <TextInput
                                placeholder="Enter your weight"
                                className="bg-white py-5 px-3 rounded-lg border flex-1"
                                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'}
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={weight}
                                onChangeText={setWeight}
                            />
                            <View className="ml-3 bg-blue-500 w-16 h-16 rounded-lg flex justify-center items-center">
                                <Text className="text-white font-semibold">
                                    KG
                                </Text>
                            </View>
                        </View>
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

export default Weight;

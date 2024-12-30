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
import tw from "tailwind-react-native-classnames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const Old = () => {
    const router = useRouter();
    const [selectedAge, setSelectedAge] = useState(13);
    const ages = [];
    for (let i = 13; i <= 100; i++) {
        ages.push(i);
    }

    const handleAgeSelect = (age: number) => {
        setSelectedAge(age);
    };

    const handleContinue = async () => {
        try {
            // Retrieve the user's email from AsyncStorage (assuming it was saved at sign-up)
            const email = await AsyncStorage.getItem("userEmail");
            if (!email) {
                Alert.alert(
                    "Error",
                    "No email found in storage. Please sign up again."
                );
                // Optionally navigate user back to sign-up
                return;
            }

            // 2. Make POST request to /set_age
            const response = await fetch("http://127.0.0.1:8000/age", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email, // from AsyncStorage
                    age: selectedAge,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                Alert.alert("Error", data.detail || "Failed to set age");
                return;
            }

            // 3. Success, navigate forward
            Alert.alert("Success", data.message);
            router.push("/Log In/Set Up/stats");
        } catch (error) {
            console.error(error);
            Alert.alert("Network Error", "Unable to connect to the server.");
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="w-full h-full bg-white px-7 items-center">
                        <Text className="font-bold text-center mt-12 text-3xl">
                            How Old Are You?
                        </Text>

                        <View className="flex-1 items-center justify-center mb-20">
                            <Text className="text-blue-500 font-bold text-8xl">
                                {selectedAge}
                            </Text>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                className="max-h-32 mt-20"
                            >
                                <View className="flex-row justify-center items-center">
                                    {ages.map((age) => (
                                        <Pressable
                                            key={age}
                                            onPress={() => handleAgeSelect(age)}
                                            className="rounded-full w-20 h-20 justify-center items-center mx-2"
                                            style={tw`${
                                                selectedAge === age
                                                    ? "bg-blue-500 border-white"
                                                    : "bg-white border-gray-400 border-2"
                                            }`}
                                        >
                                            <Text
                                                className="text-2xl font-semibold"
                                                style={[
                                                    selectedAge === age
                                                        ? tw`text-white`
                                                        : tw`text-black`,
                                                ]}
                                            >
                                                {age}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>

                        <TouchableOpacity
                            onPress={handleContinue}
                            className="bg-blue-500 py-3 rounded-lg absolute bottom-5"
                            activeOpacity={0.7}
                        >
                            <Text className="text-white font-bold text-xl text-center">
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Old;

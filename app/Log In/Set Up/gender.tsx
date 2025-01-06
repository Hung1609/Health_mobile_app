import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import tw from "tailwind-react-native-classnames";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Gender = () => {
    const router = useRouter();
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const getEmailFromStorage = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem("userEmail");
                if (storedEmail) {
                    setUserEmail(storedEmail);
                } else {
                    // If there's no stored email, maybe the user didn't go through signup
                    Alert.alert(
                        "Error",
                        "No email found in storage. Please sign up again."
                    );
                    // Potentially navigate the user back to sign-up
                    router.push("/Log In/sign-up");
                }
            } catch (error) {
                console.error(
                    "Error reading userEmail from AsyncStorage:",
                    error
                );
            }
        };

        getEmailFromStorage();
    }, []);

    const handleGenderSelect = (gender: string) => {
        setSelectedGender(gender);
    };

    const handleContinue = async () => {
        if (!selectedGender) {
            Alert.alert(
                "Missing Gender",
                "Please select a gender before continuing."
            );
            return;
        }

        if (!userEmail) {
            Alert.alert("Error", "No email available for this user.");
            return;
        }

        try {
            // Make the backend call to /set_gender
            const response = await fetch("http://127.0.0.1:8000/gender", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userEmail,
                    gender: selectedGender,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                Alert.alert("Error", data.detail || "Failed to set gender");
                return;
            }

            Alert.alert("Success", data.message);
            // Navigate to the next screen
            router.push("/Log In/Set Up/age");
        } catch (error) {
            console.error(error);
            Alert.alert("Network Error", "Unable to reach the server.");
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="w-full h-full bg-white px-7 items-center">
                        <Text className="font-bold text-center mt-12 text-3xl">
                            What's Your Gender?
                        </Text>

                        <View className="items-center justify-center flex-1 mb-20">
                            <TouchableOpacity
                                activeOpacity={0.7}
                                className="bg-white rounded-full items-center justify-center p-8"
                                style={[
                                    selectedGender === "male"
                                        ? tw`bg-blue-500 border-white border-2`
                                        : tw`bg-white border-2 border-gray-400`,
                                ]}
                                onPress={() => handleGenderSelect("male")}
                            >
                                <Icon
                                    name="male"
                                    size={100}
                                    color={
                                        selectedGender === "male"
                                            ? "white"
                                            : "dodgerblue"
                                    }
                                />
                            </TouchableOpacity>
                            <Text className="text-black font-semibold text-3xl mt-3">
                                Male
                            </Text>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                className="bg-white rounded-full items-center justify-center p-8 mt-14"
                                style={[
                                    selectedGender === "female"
                                        ? tw`bg-blue-500 border-white border-2`
                                        : tw`bg-white border-2 border-gray-400`,
                                ]}
                                onPress={() => handleGenderSelect("female")}
                            >
                                <Icon
                                    name="female"
                                    size={100}
                                    color={
                                        selectedGender === "female"
                                            ? "white"
                                            : "hotpink"
                                    }
                                />
                            </TouchableOpacity>
                            <Text className="text-black font-semibold text-3xl mt-3">
                                Female
                            </Text>
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
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Gender;

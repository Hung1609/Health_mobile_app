import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Pressable,
    Alert,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
    full_name?: string;
    email?: string;
    gender?: string;
    age?: number;
    height?: number;
    weight?: number;
    birthday?: string;
    goals?: string[];
    level?: string;
}

// Calculate BMI
const BMIBar = ({ weight, height }: any) => {
    const heightInMeters = height ? height / 100 : 0;
    const bmi = weight && heightInMeters ? weight / (heightInMeters * heightInMeters) : 0;

    // Define the BMI categories and their positions
    const bmiRanges = {
        underweight: { min: 15, max: 18.5, color: "bg-yellow-400" },
        normal: { min: 18.5, max: 24.9, color: "bg-green-500" },
        overweight: { min: 25, max: 29.9, color: "bg-orange-500" },
        obese: { min: 30, max: 40, color: "bg-red-500" },
    };

   // Position the marker based on BMI (0 to 40 scale)
   const markerPosition = Math.min(Math.max((bmi - 15) / (40 - 15), 0), 1);

   return (
        <View className="px-4">
            {/* BMI Label */}
            <Text className="text-gray-700 text-center font-bold">
                Your BMI: <Text className="text-blue-500">{bmi ? bmi.toFixed(1) : "N/A"}</Text>
            </Text>

            {/* BMI Bar */}
            <View className="relative w-full h-6 flex-row mt-10">
                <View className={`flex-1 ${bmiRanges.underweight.color} rounded-l-full`} />
                <View className={`flex-1 ${bmiRanges.normal.color}`} />
                <View className={`flex-1 ${bmiRanges.overweight.color}`} />
                <View className={`flex-1 ${bmiRanges.obese.color} rounded-r-full`} />

                {/* BMI Marker with Tooltip */}
                {bmi > 0 && (
                    <View
                        className="absolute top-[-27px] px-2 py-1 bg-blue-500 rounded-md"
                        style={{
                            left: `${markerPosition * 100}%`,
                        }}
                    >
                        <Text className="text-white text-xs font-bold">{bmi.toFixed(1)}</Text>
                    </View>
                )}

                {/* Marker Triangle */}
                {bmi > 0 && (
                    <View
                        className="absolute top-[-12px]"
                        style={{
                            left: `${markerPosition * 100}%`,
                        }}
                    >
                        <Icon name="caret-down-sharp" color="#3b82f6" size={15} />
                    </View>
                )}
            </View>

            {/* BMI Labels */}
            <View className="flex-row justify-between mt-2">
                <Text className="text-xs text-gray-600">15</Text>
                <Text className="text-xs text-gray-600">18.5</Text>
                <Text className="text-xs text-gray-600">25</Text>
                <Text className="text-xs text-gray-600">30</Text>
                <Text className="text-xs text-gray-600">40</Text>
            </View>
        </View>
    );
};

const Profile = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState<UserData>({});

    // 1. Fetch user data on mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Retrieve email from AsyncStorage
                const userEmail = await AsyncStorage.getItem("userEmail");
                if (!userEmail) {
                    Alert.alert(
                        "Error",
                        "No userEmail found. Please login again."
                    );
                    return;
                }

                // 2. Call /get_user_info
                const response = await fetch(
                    "http://192.168.1.148:8000/get_user_info",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: userEmail }),
                    }
                );

                const data = await response.json();
                if (!response.ok) {
                    Alert.alert(
                        "Error",
                        data.detail || "Failed to retrieve user info."
                    );
                    return;
                }

                // 3. If successful, store data in state
                setUserData(data);
            } catch (err) {
                console.error(err);
                Alert.alert("Network Error", "Unable to fetch user data.");
            }
        };

        fetchUserData();
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-white">
                {/* Header Section */}
                <View className="bg-blue-500 p-4 items-center m-2 border-2 border-white rounded-3xl">
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="absolute flex-row items-center left-0 m-3"
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="caret-back" size={20} color="white" />
                        <Text className="font-bold text-xl text-white">
                            Home
                        </Text>
                    </TouchableOpacity>
                    
                    <View className="bg-white p-4 rounded-full mt-14">
                        <Icon name="person" size={40} />
                    </View>

                    {/* User Info */}
                    <Text className="text-white text-xl font-bold mt-2">
                        {userData.full_name || "Name not set"}
                    </Text>
                    <Text className="text-white text-sm">
                        {userData.email || ""}
                    </Text>

                    {/* Stats Section */}
                    <View className="flex-row justify-around w-full border-2 border-white rounded-xl py-3 mt-4">
                        <View className="items-center">
                            <Text className="text-white text-lg font-bold">
                                {userData.weight
                                    ? `${userData.weight} kg`
                                    : "N/A"}
                            </Text>
                            <Text className="text-white text-xs">Weight</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-white text-lg font-bold">
                                {userData.age || "N/A"}
                            </Text>
                            <Text className="text-white text-xs">
                                Years Old
                            </Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-white text-lg font-bold">
                                {userData.height
                                    ? `${userData.height} cm`
                                    : "N/A"}
                            </Text>
                            <Text className="text-white text-xs">Height</Text>
                        </View>
                    </View>
                </View>

                {/* Menu Section */}
                <View className="p-3">
                    <BMIBar weight={userData.weight} height={userData.height} />
                    
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="flex-row items-center h-14"
                        onPress={() => router.push("/Other Tabs/edit-profile")}
                    >
                        <Icon
                            name="pencil"
                            size={20}
                            color="black"
                            className="mr-2"
                        />
                        <Text>Edit Profile</Text>
                        <Icon
                            name="caret-forward"
                            size={20}
                            color="black"
                            className="absolute right-0"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="flex-row items-center mt-3 h-14"
                        onPress={() => router.push("/Main Tabs/Tabs/favourite")}
                    >
                        <Icon
                            name="star"
                            size={20}
                            color="black"
                            className="mr-2"
                        />
                        <Text>Favorite</Text>
                        <Icon
                            name="caret-forward"
                            size={20}
                            color="black"
                            className="absolute right-0"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="flex-row items-center mt-3 h-14"
                        onPress={() => router.push("/Other Tabs/setting")}
                    >
                        <Icon
                            name="settings"
                            size={20}
                            color="black"
                            className="mr-2"
                        />
                        <Text>Settings</Text>
                        <Icon
                            name="caret-forward"
                            size={20}
                            color="black"
                            className="absolute right-0"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="flex-row items-center mt-3 h-14"
                        onPress={() => router.push("/Log In/log-in")}
                    >
                        <Icon
                            name="exit"
                            size={20}
                            color="black"
                            className="mr-2"
                        />
                        <Text>Logout</Text>
                        <Icon
                            name="caret-forward"
                            size={20}
                            color="black"
                            className="absolute right-0"
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Profile;

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

const Notification = () => {
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
                    "http://127.0.0.1:8000/get_user_info",
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
            <SafeAreaView className="flex-1">
                {/* Header Section */}
                <View className="bg-blue-600 p-4 items-center m-2 border-2 border-white rounded-3xl">
                    <Pressable
                        className="absolute flex-row items-center left-0 m-3"
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="caret-back" size={20} color="white" />
                        <Text className="font-bold text-xl text-white">
                            Home
                        </Text>
                    </Pressable>
                    <Image
                        source={{ uri: "https://via.placeholder.com/100" }}
                        className="w-24 h-24 rounded-full border-4 border-white mt-10"
                    />

                    {/* User Info */}
                    <Text className="text-white text-xl font-bold mt-2">
                        {userData.full_name || "Name not set"}
                    </Text>
                    <Text className="text-white text-sm">
                        {userData.email || ""}
                    </Text>

                    <Text className="text-white text-base font-semibold mt-1">
                        Birthday:{" "}
                        <Text className="text-white">
                            {userData.birthday || "N/A"}
                        </Text>
                    </Text>

                    {/* Stats Section */}
                    <View className="flex-row justify-around w-full border-2 border-white rounded-xl py-3 mt-4">
                        <View className="items-center">
                            <Text className="text-white text-lg font-bold">
                                {userData.weight
                                    ? `${userData.weight} Kg`
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
                                    ? `${userData.height} CM`
                                    : "N/A"}
                            </Text>
                            <Text className="text-white text-xs">Height</Text>
                        </View>
                    </View>
                </View>

                {/* Menu Section */}
                <View className="p-3">
                    <Pressable
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
                    </Pressable>

                    <Pressable
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
                    </Pressable>

                    <Pressable
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
                    </Pressable>

                    <Pressable
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
                    </Pressable>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Notification;

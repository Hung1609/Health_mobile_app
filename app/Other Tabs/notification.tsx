import React, { useState } from "react";
import { Text, View, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

const Notification = () => {
    const navigation = useNavigation();
    const [tab, setTab] = useState("reminders"); // 'reminders' or 'system'

    // Dummy data for reminders and system notifications
    const reminders = [
        {
            id: 1,
            title: "New Workout Is Available",
            time: "June 10 - 10:00 AM",
            icon: "star",
            day: "Today",
        },
        {
            id: 2,
            title: "Don't Forget To Drink Water",
            time: "June 10 - 8:00 AM",
            icon: "bulb",
            day: "Today",
        },
        {
            id: 3,
            title: "Upper Body Workout Completed!",
            time: "June 09 - 6:00 PM",
            icon: "trophy",
            day: "Yesterday",
        },
        {
            id: 4,
            title: "Remember Your Exercise Session",
            time: "June 09 - 3:00 PM",
            icon: "alarm",
            day: "Yesterday",
        },
        {
            id: 5,
            title: "New Article & Tip Posted!",
            time: "June 09 - 11:00 AM",
            icon: "book",
            day: "Yesterday",
        },
        {
            id: 6,
            title: "You Started A New Challenge!",
            time: "May 29 - 9:00 AM",
            icon: "star",
            day: "May 29 - 20XX",
        },
        {
            id: 7,
            title: "New House Training Ideas!",
            time: "May 29 - 8:20 AM",
            icon: "home",
            day: "May 29 - 20XX",
        },
    ];

    const system = [
        {
            id: 1,
            title: "System Maintenance Scheduled",
            time: "June 10 - 12:00 PM",
            icon: "settings",
            day: "Today",
        },
    ];

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 px-4 bg-white">
                <View className="flex-row mt-5">
                    <TouchableOpacity
                        className="flex-row items-center"
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.7}
                    >
                        <Icon name="caret-back" size={20} color="black" />
                        <Text className="font-bold text-xl mx-2">Notifications</Text>
                    </TouchableOpacity>
                </View>

                {/* Tab Navigation */}
                <View className="flex-row justify-between items-center mt-5 p-1">
                    <Pressable
                        onPress={() => setTab("reminders")}
                        className={`flex-1 items-center py-2 rounded-full ${tab === "reminders" ? 'bg-blue-500' : 'bg-white'} items-center border border-blue-500 py-3 rounded-full mx-2`}
                    >
                        <Text className={`${tab === "reminders" ? "text-white" : "text-black"} font-bold`}>
                            Reminders
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setTab("system")}
                        className={`flex-1 items-center py-2 rounded-full ${tab === "system" ? 'bg-blue-500' : 'bg-white'} items-center border border-blue-500 py-3 rounded-full mx-2`}
                    >
                        <Text className={`${tab === "system" ? "text-white" : "text-black"} font-bold`}>
                            System
                        </Text>
                    </Pressable>
                </View>

                <ScrollView className="mt-5">
                    {/* Render Notifications */}
                    {(tab === "reminders" ? reminders : system).map((item, index, array) => {
                        // Display the day only once for each group
                        const showDay = index === 0 || array[index - 1].day !== item.day;

                        return (
                            <View key={item.id}>
                                {showDay && (
                                    <Text className="text-gray-600 font-bold mt-5">
                                        {item.day}
                                    </Text>
                                )}
                                <View className="flex-row items-center border-blue-500 border-2 bg-white my-2 rounded-lg p-3">
                                    <View className="bg-blue-500 rounded-full h-10 w-10 justify-center items-center">
                                        <Icon name={item.icon} size={20} color="white" />
                                    </View>
                                    <View className="ml-3 flex-1">
                                        <Text className="text-black font-bold">{item.title}</Text>
                                        <Text className="text-gray-500 text-sm">{item.time}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Notification;

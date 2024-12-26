import React from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLocalSearchParams } from "expo-router";

const Exercises = () => {
    const route = useRoute();
    const params = useLocalSearchParams();

    const navigation = useNavigation();
    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1'>
                <Pressable
                    className="flex-row items-center m-3"
                    onPress={() => navigation.goBack()}>
                    <Icon name="caret-back" size={20} color="black" />
                    <Text className='font-bold text-2xl'>Exercises</Text>
                </Pressable>
                <ScrollView className="flex-1 bg-white">
                    <View className="relative py-4 px-2">
                        <Image
                            source={{
                                uri: "https://via.placeholder.com/300x150",
                            }}
                            className="w-full h-60 rounded-2xl"
                        />
                        <View className="absolute bottom-5 left-4 right-4">
                            <Text className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-bold self-start">
                                {params.title}
                            </Text>
                            <View className="flex-row justify-between mt-2">
                                <View className="flex-row items-center">
                                    <Icon className="mx-1" name="time-outline" size={12} color={"white"} />
                                    <Text className="text-white text-xs font-bold ">{params.duration}</Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Icon className="mx-1" name="flame-outline" size={12} color={"white"} />
                                    <Text className="text-white text-xs font-bold ">{params.calories} Kcal</Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Icon className="mx-1" name="barbell" size={12} color={"white"} />
                                    <Text className="text-white text-xs font-bold ">{params.exercises}</Text>
                                </View>
                            </View>
                            <Pressable className="absolute right-4">
                                <Icon name="star-outline" size={24} color="#FFC107" />
                            </Pressable>
                        </View>
                    </View>

                    {/* Workout Rounds */}
                    <View className="mt-5 px-5">
                        <Text className="text-blue-500 text-lg font-bold mb-3">Round 1</Text>
                        {renderWorkout("Dumbbell Rows", "00:30", "Repetition 3x")}
                        {renderWorkout("Russian Twists", "00:15", "Repetition 2x")}
                        {renderWorkout("Squats", "00:30", "Repetition 3x")}
                    </View>

                    <View className="mt-5 px-5">
                        <Text className="text-blue-500 text-lg font-bold mb-3">Round 2</Text>
                        {renderWorkout("Tabata Intervals", "00:10", "Repetition 2x")}
                        {renderWorkout("Bicycle Crunches", "00:20", "Repetition 3x")}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const renderWorkout = (title: string, time: string, repetitions: string) => (
    <View
        className="flex-row items-center bg-blue-50 rounded-lg p-4 mb-3"
        key={title}
    >
        <View className="mr-3">
            <Icon name="play-circle-outline" size={24} color="#3b82f6" />
        </View>
        <View className="flex-1">
            <Text className="text-lg font-bold text-gray-800">{title}</Text>
            <Text className="text-sm text-gray-600 mt-1">
                <Icon name="time-outline" size={14} /> {time}
            </Text>
        </View>
        <Text className="text-sm font-bold text-blue-500">{repetitions}</Text>
    </View>
);

export default Exercises;

import React from "react";
import { View, Text, Image, Pressable, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { router, useLocalSearchParams } from "expo-router";

const createroutine = () => {
    const navigation = useNavigation();
    const params = useLocalSearchParams();

    // Mock data for exercises
    const exerciseList = [
        { id: 1, title: "Bench Press" },
        { id: 2, title: "Overhead Press" },
        { id: 3, title: "Incline Dumbbell Press" },
        { id: 4, title: "Dumbbell Lateral Raise" },
        { id: 5, title: "Dumbbell Chest Flyes" },
        { id: 5, title: "Barbell Lying Triceps Extension" },
    ];

    // Find the current exercise index
    const currentIndex = exerciseList.findIndex((exercise) => exercise.title === params.title);

    // Function to handle "Next" button
    const handleNext = () => {
        const nextIndex = currentIndex + 1;

        if (nextIndex < exerciseList.length) {
            // If there are more exercises, navigate to the next one
            const nextExercise = exerciseList[nextIndex];
            router.push({
                pathname: "/Main Tabs/Home/WorkoutLibrary/create-routine",
                params: {
                    title: nextExercise.title,
                },
            });
        } else {
            // If it's the last exercise, navigate back
            navigation.goBack(); // Or use `router.back()` if using expo-router
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1'>
                <Pressable
                    className="flex-row items-center m-3 bg-white"
                    onPress={() => navigation.goBack()}>
                    <Icon name="caret-back" size={20} color="black" />
                    <Text className='font-bold text-2xl'>Exercises</Text>
                </Pressable>
                <ScrollView>
                    <View className="h-full m-2 justify-center">
                        <View className="relative py-4 px-2">
                            <Image
                                source={{
                                    uri: "https://via.placeholder.com/300x150",
                                }}
                                className="w-full h-60 rounded-2xl"
                            />
                            <View className="bg-blue-500 rounded-2xl p-4 my-10 shadow-lg">
                                {/* Title */}
                                <Text className="text-center text-2xl font-bold text-black">
                                    {params.title}
                                </Text>

                                {/* Description */}
                                <Text className="text-center text-gray text-sm mt-2">
                                    Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit. Sed Cursus Libero Eget.
                                </Text>

                                {/* Info Row */}
                                <View className="flex-row justify-between items-center mt-4 bg-white px-4 py-2 rounded-lg">
                                    {/* Duration */}
                                    <View className="flex-row items-center">
                                        <Icon name="time-outline" size={16} color="black" />
                                        <Text className="ml-2 text-gray-700 font-medium">{params.time} Minutes</Text>
                                    </View>

                                    {/* Repetitions */}
                                    <View className="flex-row items-center">
                                        <Icon name="repeat-outline" size={16} color="black" />
                                        <Text className="ml-2 text-gray-700 font-medium">{params.repetitions}</Text>
                                    </View>

                                    {/* Difficulty */}
                                    <View className="flex-row items-center">
                                        <Icon name="fitness-outline" size={16} color="black" />
                                        <Text className="ml-2 text-gray-700 font-medium">Beginner</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    className="absolute h-20 w-20 bg-blue-500 bottom-0 right-0 rounded-full items-center justify-center m-5"
                    onPress={handleNext}
                >
                    <Text className="text-white text-l text-center">Next</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default createroutine;

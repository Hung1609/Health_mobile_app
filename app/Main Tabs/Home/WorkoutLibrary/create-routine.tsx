import React, { useState } from "react";
import { View, Text, Image, Pressable, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { router, useLocalSearchParams } from "expo-router";

const createroutine = () => {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const workout = params.workout ? JSON.parse(params.workout as string) : null;
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const { details } = workout;
    const currentExercise = details[currentIndex];

    const handleNext = () => {
        if (currentIndex < details.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            router.push({
                pathname: "/Main Tabs/Home/WorkoutLibrary/finish",
                params: {
                    workout: JSON.stringify(workout),
                },
            });
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1 bg-white px-4'>
                <ScrollView>
                    <View className="my-4">
                            <Image
                                source={{
                                    uri: "https://via.placeholder.com/300x150",
                                }}
                                className="w-full h-60 rounded-3xl"
                            />
                            <View className="bg-blue-500 rounded-3xl p-4 my-10">
                                {/* Title */}
                                <Text className="text-center text-2xl font-bold text-white">
                                    {currentExercise.name}
                                </Text>

                                {/* Description */}
                                <Text className="text-center text-gray mt-2 text-white">
                                    {currentExercise.description}
                                </Text>

                                {/* Info Row */}
                                <View className="flex-row justify-around items-center mt-4 bg-white py-2 rounded-3xl">
                                    {/* Duration */}
                                    <View className="flex-row items-center">
                                        <Text className="text-gray-700 font-medium">x{currentExercise.reps}</Text>
                                    </View>

                                    {/* Repetitions */}
                                    <View className="flex-row items-center">
                                        <Icon name="repeat-outline" size={16} color="black" />
                                        <Text className="ml-1 text-gray-700 font-medium">{currentExercise.sets}</Text>
                                    </View>

                                    {/* Difficulty */}
                                    <View className="flex-row items-center">
                                        <Icon name="fitness-outline" size={16} color="black" />
                                        <Text className="ml-1 text-gray-700 font-medium">{workout.level}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    
                </ScrollView>
                <TouchableOpacity  
                    activeOpacity={0.7}
                    className="border items-center bg-blue-500 p-3 border-blue-500 rounded-3xl mb-2"
                    onPress={handleNext}
                >
                    <Text className="text-white font-bold text-xl">Next</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default createroutine;

import React from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

const createroutine = () => {
    const navigation = useNavigation();

    const exercise = [
        {
            id: 1,
            title: "Squat Exercise",
            duration: "12 Minutes",
            calories: "120 Kcal",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            title: "Upper Body Workout",
            duration: "15 Minutes",
            calories: "150 Kcal",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            title: "pper Body Workout",
            duration: "15 Minutes",
            calories: "150 Kcal",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 4,
            title: "per Body Workout",
            duration: "15 Minutes",
            calories: "150 Kcal",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 5,
            title: "Uper Body Workout",
            duration: "15 Minutes",
            calories: "150 Kcal",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 6,
            title: "Uer Body Workout",
            duration: "15 Minutes",
            calories: "150 Kcal",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 7,
            title: "Upper Bdy Workout",
            duration: "15 Minutes",
            calories: "150 Kcal",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 8,
            title: "Upper Body Wrkout",
            duration: "15 Minutes",
            calories: "150 Kcal",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 9,
            title: "Upper Bdy Workout",
            duration: "15 Minutes",
            calories: "150 Kcal",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 10,
            title: "Upper Body Wrkout",
            duration: "15 Minutes",
            calories: "150 Kcal",
            image: "https://via.placeholder.com/150",
        },
    ];

    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1'>
                <Pressable
                    className="flex-row items-center m-3"
                    onPress={() => navigation.goBack()}>
                    <Icon name="caret-back" size={20} color="black" />
                    <Text className='font-bold text-2xl'>Exercises</Text>
                </Pressable>
                <ScrollView>
                    <View className="h-full m-2 justify-center">
                        <View className="flex-row justify-between flex-wrap p-2 gap-y-4">
                            {exercise.map((exercise) => (
                                <View key={exercise.id} className="w-[46%] bg-gray-100 border-blue-500 border-2 rounded-lg mr-4">
                                    <Image
                                        source={{ uri: exercise.image }}
                                        className="h-32 w-full rounded-lg"
                                    />
                                    <Text className="text-black font-bold mt-2">{exercise.title}</Text>
                                    <View className="flex-row items-center justify-between mt-1">
                                        <Text className="text-gray-600 text-sm">{exercise.duration}</Text>
                                        <Text className="text-gray-600 text-sm">{exercise.calories}</Text>
                                    </View>
                                    <Pressable className="absolute bottom-12 right-3">
                                        <Icon name="play-circle" size={24} color="black" />
                                    </Pressable>
                                    <Pressable className="absolute top-3 right-3">
                                        <Icon name="star" size={24} color="#FFC107" />
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
                <Pressable
                    className="fixed bottom-0 items-center justify-center w-full h-14 bg-blue-500 rounded-3xl mb-2"
                    onPress={() => navigation.goBack()}>
                    <Text className='font-bold text-white text-xl'>Create Routine</Text>
                </Pressable>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default createroutine
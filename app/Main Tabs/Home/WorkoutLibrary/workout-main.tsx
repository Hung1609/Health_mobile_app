import React, { useState } from "react";
import { Text, View, Pressable, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const WorkoutMain = () => {
    const navigation = useNavigation();
    const [filter, setFilter] = useState("beginner");

    // Combined workouts array with level property
    const workouts = [
        {
            id: 1,
            title: "Squat Exercise",
            duration: "12 Minutes",
            calories: "120",
            exercises: 5,
            image: "https://via.placeholder.com/150",
            level: "beginner",
        },
        {
            id: 2,
            title: "Upper Body Workout",
            duration: "15 Minutes",
            calories: "150",
            exercises: 5,
            image: "https://via.placeholder.com/150",
            level: "beginner",
        },
        {
            id: 3,
            title: "Intermediate Squat Exercise",
            duration: "15 Minutes",
            calories: "150",
            exercises: 6,
            image: "https://via.placeholder.com/150",
            level: "intermediate",
        },
        {
            id: 4,
            title: "Intermediate Upper Body Workout",
            duration: "20 Minutes",
            calories: "180",
            exercises: 7,
            image: "https://via.placeholder.com/150",
            level: "intermediate",
        },
        {
            id: 5,
            title: "Advanced Squat Exercise",
            duration: "20 Minutes",
            calories: "200",
            exercises: 8,
            image: "https://via.placeholder.com/150",
            level: "advanced",
        },
        {
            id: 6,
            title: "Advanced Upper Body Workout",
            duration: "25 Minutes",
            calories: "250",
            exercises: 10,
            image: "https://via.placeholder.com/150",
            level: "advanced",
        },
    ];

    // Filter workouts based on the selected level
    const filteredWorkouts = workouts.filter((workout) => workout.level === filter);

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <View className="flex-row items-center justify-between m-3">
                    <Pressable
                        className="flex-row items-center"
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="caret-back" size={20} color="black" />
                        <Text className="font-bold text-2xl">Home</Text>
                    </Pressable>

                    <View className="flex-row space-x-1">
                        <Pressable onPress={() => router.push("/Main Tabs/Home/WorkoutLibrary/create-routine")}>
                            <Icon className="px-2" name={"add-circle-outline"} size={25} color="black" />
                        </Pressable>

                        <Pressable onPress={() => router.push("/Other Tabs/notification")}>
                            <Icon className="px-2" name={"notifications"} size={25} color="black" />
                        </Pressable>

                        <Pressable onPress={() => router.push("/Other Tabs/profile")}>
                            <Icon className="px-2" name={"person"} size={25} color="black" />
                        </Pressable>
                    </View>
                </View>
                <ScrollView>
                    <View className="w-full flex-1 px-5">
                        {/* Filter Buttons */}
                        <View className="flex-row justify-between items-center mt-10 w-full">
                            {["beginner", "intermediate", "advanced"].map((level) => (
                                <Pressable
                                    key={level}
                                    onPress={() => setFilter(level)}
                                    className={`items-center w-[30%] ${filter === level ? "bg-blue-500" : "bg-white"
                                        } border border-blue-500 p-3 rounded-full mx-2`}
                                >
                                    <Text
                                        className={`text-center ${filter === level ? "text-white" : "text-black"
                                            }`}
                                    >
                                        {level.charAt(0).toUpperCase() + level.slice(1)}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    {/* Content Section */}
                    <View className="mt-6">
                        <View className="p-2">
                            {filteredWorkouts.map((workout) => (
                                <View
                                    key={workout.id}
                                    className="flex-row border-2 border-blue-600 bg-white rounded-lg p-1 m-2"
                                >
                                    <View className="flex-1 justify-center mx-3">
                                        <Text className="text-black font-bold text-lg">{workout.title}</Text>

                                        <View className="flex-row items-center mt-2 space-x-2">
                                            <View className="flex-row items-center mx-1">
                                                <Icon className="mx-1" name={"time"} size={12} color="black" />
                                                <Text className="text-black text-sm">{workout.duration}</Text>
                                            </View>
                                            <View className="flex-row items-center mx-1">
                                                <Icon2 className="mx-1" name={"fire"} size={12} color="black" />
                                                <Text className="text-black text-sm">{workout.calories} Kcal</Text>
                                            </View>
                                        </View>
                                        <View className="flex-row items-center mx-1">
                                            <Icon className="mx-1" name={"barbell"} size={12} color="black" />
                                            <Text className="text-black text-sm">{workout.exercises} Exercises</Text>
                                        </View>
                                    </View>
                                    <Pressable
                                        className="w-[48%] rounded-lg"
                                        onPress={() =>
                                            router.push({
                                                pathname: "/Main Tabs/Home/WorkoutLibrary/exercise",
                                                params: {
                                                    title: workout.title,
                                                    duration: workout.duration,
                                                    calories: workout.calories,
                                                    exercises: workout.exercises,
                                                    image: workout.image,
                                                },
                                            })
                                        }
                                    >
                                        <View className="flex-row bg-mau_sac2 rounded-lg h-32">
                                            <Pressable className="absolute top-1 right-1">
                                                <Icon name="star" size={24} color="#FFC107" />
                                            </Pressable>
                                        </View>
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default WorkoutMain;

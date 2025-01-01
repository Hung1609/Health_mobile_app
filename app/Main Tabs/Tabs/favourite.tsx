import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Alert, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native";
import { router } from "expo-router";

const Favourite = () => {
    const [filter, setFilter] = useState("all"); // 'all', 'video', 'articles'

    // Data for videos and articles
    const videoData = [
        {
            id: 1,
            title: "Upper Body",
            duration: "60 Minutes",
            calories: "1320 Kcal",
            exercises: 5,
            type: "video",
            time: "10"
        },

        {
            id: 2,
            title: "Lower Body",
            duration: "60 Minutes",
            calories: "1120 Kcal",
            exercises: 5,
            type: "video",
            time: "15"
        },
    ];

    const articleData = [
        {
            id: 1,
            title: "Boost energy and vitality",
            description:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum voluptatibus nisi porro commodi assumenda.",
            type: "article",
        },
    ];

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <View className="w-full flex-1 px-4 bg-white">
                    <View className="flex-row items-center justify-between mt-10">
                        <View>
                            <Text className="font-bold text-3xl">Favourites</Text>
                        </View>

                        <View className="flex-row space-x-1">
                            <Pressable>
                                <Icon className="px-2" name={"search"} size={25} color="black" />
                            </Pressable>

                            <Pressable onPress={() => router.push('/Other Tabs/notification')}>
                                <Icon className="px-2" name={"notifications"} size={25} color="black" />
                            </Pressable>

                            <Pressable onPress={() => router.push('/Other Tabs/profile')}>
                                <Icon className="px-2" name={"person"} size={25} color="black" />
                            </Pressable>
                        </View>
                    </View>

                    <View className="flex-row justify-center items-center mt-10 w-full">
                        <Text className="mr-5 font-bold">Sort by: </Text>

                        {/* Filter */}
                        <Pressable
                            onPress={() => setFilter('all')}
                            className={`items-center w-1/5 border border-blue-500 py-2 rounded-full mx-2 ${filter === 'all' ? 'bg-blue-500' : 'bg-white'}`}
                        >
                            <Text className={`text-center ${filter === "all" ? "text-white" : "text-black"}`}>All</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => setFilter('video')}
                            className={`items-center w-1/5 border border-blue-500 py-2 rounded-full mx-2 ${filter === 'video' ? 'bg-blue-500' : 'bg-white'}`}
                        >
                            <Text className={`text-center ${filter === "video" ? "text-white" : "text-black"}`}>Video</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => setFilter('articles')}
                            className={`items-center w-1/5 border border-blue-500 py-2 rounded-full mx-2 ${filter === 'articles' ? 'bg-blue-500' : 'bg-white'}`}
                        >
                            <Text className={`text-center ${filter === "articles" ? "text-white" : "text-black"}`}>Articles</Text>
                        </Pressable>

                    </View>

                    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "stretch" }}>
                        {/* Filtered Content */}
                        <View className="mt-6 flex-1 items-start">
                            {/* Display videos if filter is "all" or "video" */}
                            {(filter === "all" || filter === "video") &&
                                videoData.map((video) => (
                                    <Pressable
                                        key={video.id}
                                        className="flex-row border-2 border-blue-600 bg-white rounded-lg p-1 m-2"
                                        onPress={() =>
                                            router.push({
                                                pathname: "/Main Tabs/Home/WorkoutLibrary/exercise",
                                                params: {
                                                    title: video.title,
                                                    duration: video.time,
                                                    calories: video.calories,
                                                    exercises: video.exercises,

                                                },
                                            })
                                        }>
                                        <View className="flex-1 justify-center mx-3">
                                            <Text className="text-black font-bold text-lg">{video.title}</Text>

                                            <View className="flex-row items-center mt-2 space-x-2">
                                                <View className="flex-row items-center mx-1">
                                                    <Icon className="mx-1" name={"watch"} size={12} color="black" />
                                                    <Text className="text-black text-sm">{video.duration}</Text>
                                                </View>
                                                <View className="flex-row items-center mx-1">
                                                    <Icon2 className="mx-1" name={"fire"} size={12} color="black" />
                                                    <Text className="text-black text-sm">{video.calories}</Text>
                                                </View>
                                            </View>
                                            <View className="flex-row items-center mx-1">
                                                <Icon className="mx-1" name={"barbell"} size={12} color="black" />
                                                <Text className="text-black text-sm">{video.exercises} Exercises</Text>
                                            </View>
                                        </View>
                                        <View className="w-[48%] bg-gray-100 rounded-lg">
                                            <View className="flex-row bg-mau_sac2 rounded-lg h-32">
                                                <Pressable className="flex-1 justify-center items-center">
                                                    <Icon name="play-circle" size={24} color="black" />
                                                </Pressable>
                                                <Pressable className="absolute top-1 right-1">
                                                    <Icon name="star" size={24} color="#FFC107" />
                                                </Pressable>
                                            </View>
                                        </View>
                                    </Pressable>
                                ))}

                            {/* Display articles if filter is "all" or "articles" */}
                            {(filter === "all" || filter === "articles") &&
                                articleData.map((article) => (
                                    <Pressable
                                        key={article.id}
                                        className="flex-row border-2 border-blue-600 bg-white rounded-lg p-1 m-2"
                                        onPress={() => router.push("/Other Tabs/articles")}>
                                        <View className="flex-1 justify-center mx-3">
                                            <Text className="text-black font-bold text-lg">{article.title}</Text>

                                            <View className="flex-row items-center mt-2 space-x-2">
                                                <Text numberOfLines={3}>{article.description}</Text>
                                            </View>
                                        </View>
                                        <View className="w-[48%] bg-gray-100 rounded-lg">
                                            <View className="flex-row bg-mau_sac2 rounded-lg h-32">
                                                <Pressable className="absolute top-1 right-1">
                                                    <Icon name="star" size={24} color="#FFC107" />
                                                </Pressable>
                                            </View>
                                        </View>
                                    </Pressable>
                                ))}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Favourite;

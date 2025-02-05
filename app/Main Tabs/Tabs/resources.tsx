import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Octicons";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import { useFavorites, FavoriteItem } from "../Home/FavoritesContext";
import Toast from "react-native-toast-message";

const handlePress = () => {
  Alert.alert("Button Pressed", "You just clicked the button!");
};

const Resource = () => {
  const [filter, setFilter] = useState("videos"); // 'videos' or 'articles'

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const handleFavorite = (item: FavoriteItem) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    if (isFavorite) {
      removeFavorite(item.id);
      Toast.show({
        type: "error",
        text1: "Removed from Favorites",
        text2: `${item.title} has been removed.`,
        position: "top",
        visibilityTime: 2000,
      });
    } else {
      addFavorite(item);
      Toast.show({
        type: "success",
        text1: "Added to Favorites",
        text2: `${item.title} has been added.`,
        position: "top",
        visibilityTime: 2000,
      });
    }
  };

  const isFavorite = (id: number) => {
    return favorites.some((fav) => fav.id === id);
  };

  // Dummy data for videos and articles
  const videos = [
    {
      id: 1,
      title: "Upper Body",
      image: "https://via.placeholder.com/200x120",
      time: "12 Minutes",
      calories: "120",
      exercises: "3",
      details: [
        {
          name: "Bench Press",
          description: "Perform with dumbbells",
          reps: "6",
          sets: "3",
          video: "https://via.placeholder.com/200x120",
        },
        {
          name: "Push-Ups",
          description: "Standard push-ups for chest",
          reps: "10",
          sets: "3",
          video: "https://via.placeholder.com/200x120",
        },
        {
          name: "Bicep Curls",
          description: "Use dumbbells for this exercise",
          reps: "8",
          sets: "3",
          video: "https://via.placeholder.com/200x120",
        },
      ],
      level: "Beginner",
      type: "workout",
    },
    {
      id: 2,
      title: "Lower Body",
      image: "https://via.placeholder.com/200x120",
      time: "12 Minutes",
      calories: "120",
      exercises: "3",
      details: [
        {
          name: "Bench Press",
          description: "Perform with dumbbells",
          reps: "6",
          sets: "3",
          video: "https://via.placeholder.com/200x120",
        },
        {
          name: "Push-Ups",
          description: "Standard push-ups for chest",
          reps: "10",
          sets: "3",
          video: "https://via.placeholder.com/200x120",
        },
        {
          name: "Bicep Curls",
          description: "Use dumbbells for this exercise",
          reps: "8",
          sets: "3",
          video: "https://via.placeholder.com/200x120",
        },
      ],
      level: "Beginner",
      type: "workout",
    },
  ];

  const articles = [
    {
      id: 1,
      title: "5 Tips for Better Posture",
      image: "https://via.placeholder.com/200x120",
      description: "Learn how to improve your posture with these simple tips.",
    },
    {
      id: 2,
      title: "Healthy Eating Habits",
      image: "https://via.placeholder.com/200x120",
      description: "Discover the secrets to maintaining a balanced diet.",
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <View className="w-full h-full flex-1 px-4 bg-white">
          <View className="flex-row items-center justify-between mt-10">
            <View>
              <Text className="font-bold text-3xl">Resources</Text>
            </View>

            <View className="flex-row space-x-1">
              <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
                <Icon
                  className="px-2"
                  name={"search"}
                  size={25}
                  color="black"
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/Other Tabs/notification")}
              >
                <Icon
                  className="px-2"
                  name={"notifications"}
                  size={25}
                  color="black"
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/Other Tabs/profile")}
              >
                <Icon
                  className="px-2"
                  name={"person"}
                  size={25}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Filter Buttons */}
          <View className="flex-row justify-between items-center mt-10 w-full">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setFilter("videos")}
              className={`items-center w-[48%] ${
                filter === "videos" ? "bg-blue-500" : "bg-white"
              } items-center w-1/5 border border-blue-500 p-3 rounded-full`}
            >
              <Text
                className={`text-center ${
                  filter === "videos" ? "text-white" : "text-black"
                }`}
              >
                Workout Videos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setFilter("articles")}
              className={`items-center w-[48%] ${
                filter === "articles" ? "bg-blue-500" : "bg-white"
              } items-center w-1/5 border border-blue-500 p-3 rounded-full`}
            >
              <Text
                className={`text-center ${
                  filter === "articles" ? "text-white" : "text-black"
                }`}
              >
                Articles & Tips
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            {/* Content Section */}
            <View className="mt-6">
              {filter === "videos" && (
                <View className="flex-row gap-4">
                  {videos.map((video) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={video.id}
                      className="w-[48%] bg-white border-blue-500 border-2 rounded-3xl overflow-hidden"
                      onPress={() =>
                        router.push({
                          pathname: "/Main Tabs/Home/WorkoutLibrary/exercise",
                          params: {
                            workout: JSON.stringify(video),
                          },
                        })
                      }
                    >
                      <Image
                        source={{ uri: video.image }}
                        className="h-32 w-full rounded-b-3xl"
                      />
                      <View className="p-2 gap-1">
                        <Text className="text-black font-bold">
                          {video.title}
                        </Text>
                        <View className="flex-row items-center justify-between">
                          <View className="flex-row gap-1 items-center">
                            <Icon name="time-outline" />
                            <Text className="text-gray-500 text-sm">
                              {video.time}
                            </Text>
                          </View>
                          <View className="flex-row gap-1 items-center">
                            <Icon2 name="flame" color="gray" />
                            <Text className="text-gray-500 text-sm">
                              {video.calories} Cal
                            </Text>
                          </View>
                        </View>
                        <View className="flex-row items-center gap-1">
                          <Icon name="barbell-sharp" color="gray" />
                          <Text className="text-gray-500 text-sm">
                            {video.exercises} Exercises
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        className="absolute top-2 right-2"
                        onPress={() => handleFavorite(video)}
                      >
                        <Icon
                          name="star"
                          size={20}
                          color={isFavorite(video.id) ? "#FFC107" : "white"}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {filter === "articles" && (
                <View>
                  {articles.map((article) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={article.id}
                      className="flex-row border-2 border-blue-500 bg-white rounded-lg mb-3"
                      onPress={() => router.push("/Other Tabs/articles")}
                    >
                      <View className="flex-1 justify-center mx-3 p-2">
                        <Text className="text-black font-bold text-lg">
                          {article.title}
                        </Text>

                        <View className="flex-row items-center mt-2 space-x-2">
                          <Text numberOfLines={3}>{article.description}</Text>
                        </View>
                      </View>
                      <View className="relative h-32 w-2/5">
                        <Image
                          source={{ uri: article.image }}
                          className="w-full h-full rounded-l-3xl"
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Resource;

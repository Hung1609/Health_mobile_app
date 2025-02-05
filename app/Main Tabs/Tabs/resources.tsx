import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
  FlatList,
  Linking,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";

const handlePress = () => {
  Alert.alert("Button Pressed", "You just clicked the button!");
};

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

const Resource = () => {
  const [filter, setFilter] = useState<"videos" | "articles">("videos"); // 'videos' or 'articles'
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Dummy data for videos
  const videos = [
    {
      id: 1,
      title: "Squat Exercise",
      duration: "12 Minutes",
      calories: "120 Kcal",
      image: "https://via.placeholder.com/150",
      time: "20",
      exercises: "3",
    },
    {
      id: 2,
      title: "Upper Body Workout",
      duration: "15 Minutes",
      calories: "150 Kcal",
      image: "https://via.placeholder.com/150",
      time: "20",
      exercises: "3",
    },
  ];

  // Fetch articles from the NewsAPI
  const fetchArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=77b57acb7f5b45449eb51051a70bd891"
      );
      const data = await response.json();
      if (data.status === "ok") {
        setArticles(data.articles);
      } else {
        setError("Failed to fetch articles");
      }
    } catch (err) {
      setError("An error occurred while fetching articles");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (filter === "articles") {
      fetchArticles();
    }
  }, [filter]);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <View className="w-full h-full flex-1 px-4 bg-white">
          <View className="flex-row items-center justify-between mt-10">
            <View>
              <Text className="font-bold text-3xl">Resources</Text>
            </View>

            <View className="flex-row space-x-1">
              <Pressable onPress={handlePress}>
                <Icon
                  className="px-2"
                  name={"search"}
                  size={25}
                  color="black"
                />
              </Pressable>

              <Pressable
                onPress={() => router.push("/Other Tabs/notification")}
              >
                <Icon
                  className="px-2"
                  name={"notifications"}
                  size={25}
                  color="black"
                />
              </Pressable>

              <Pressable onPress={() => router.push("/Other Tabs/profile")}>
                <Icon
                  className="px-2"
                  name={"person"}
                  size={25}
                  color="black"
                />
              </Pressable>
            </View>
          </View>

          {/* Filter Buttons */}
          <View className="flex-row justify-between items-center mt-10 w-full">
            <Pressable
              onPress={() => setFilter("videos")}
              className={`items-center w-[48%] ${
                filter === "videos" ? "bg-blue-500" : "bg-white"
              } items-center w-1/5 border border-blue-500 p-3 rounded-full mx-2`}
            >
              <Text
                className={`text-center ${
                  filter === "videos" ? "text-white" : "text-black"
                }`}
              >
                Workout Videos
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setFilter("articles")}
              className={`items-center w-[48%] ${
                filter === "articles" ? "bg-blue-500" : "bg-white"
              } items-center w-1/5 border border-blue-500 p-3 rounded-full mx-2`}
            >
              <Text
                className={`text-center ${
                  filter === "articles" ? "text-white" : "text-black"
                }`}
              >
                Articles & Tips
              </Text>
            </Pressable>
          </View>

          <View className="mt-6 flex-1">
            {filter === "videos" && (
              <View className="flex-row">
                {videos.map((video) => (
                  <Pressable
                    key={video.id}
                    className="w-[48%] bg-gray-100 border-blue-500 border-2 rounded-lg overflow-hidden mr-4"
                    onPress={() =>
                      router.push({
                        pathname: "/Main Tabs/Home/WorkoutLibrary/exercise",
                        params: {
                          title: video.title,
                          duration: video.time,
                          calories: video.calories,
                          exercises: video.exercises,
                          image: video.image,
                        },
                      })
                    }
                  >
                    <Image
                      source={{ uri: video.image }}
                      className="h-32 w-full rounded-b-lg"
                    />
                    <Text className="text-black font-bold mt-2">
                      {video.title}
                    </Text>
                    <View className="flex-row items-center justify-between mt-1">
                      <Text className="text-gray-600 text-sm">
                        {video.duration}
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        {video.calories}
                      </Text>
                    </View>
                    <Pressable className="absolute top-3 right-3">
                      <Icon name="star" size={24} color="#FFC107" />
                    </Pressable>
                  </Pressable>
                ))}
              </View>
            )}

            {filter === "articles" && (
              <>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : error ? (
                  <Text className="text-red-500 text-center">{error}</Text>
                ) : (
                  <FlatList
                    data={articles}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => (
                      <Pressable
                        className="flex-row border-2 border-blue-600 bg-white rounded-lg p-1 m-2"
                        onPress={() => {
                          if (item.url) {
                            Linking.openURL(item.url).catch((err: any) =>
                              console.error("Failed to open URL:", err)
                            );
                          }
                        }}
                      >
                        <Image
                          source={{
                            uri:
                              item.urlToImage ||
                              "https://via.placeholder.com/150",
                          }}
                          className="h-32 w-32 rounded-lg"
                        />
                        <View className="flex-1 justify-center mx-3">
                          <Text className="text-black font-bold text-lg">
                            {item.title}
                          </Text>
                          <Text numberOfLines={3} className="text-gray-600">
                            {item.description}
                          </Text>
                        </View>
                      </Pressable>
                    )}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Resource;

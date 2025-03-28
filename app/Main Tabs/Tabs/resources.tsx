import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  Alert,
  ActivityIndicator,
  FlatList,
  Linking,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import { WebView } from "react-native-webview";
import { IP, PORT } from "@env";

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

interface WorkoutVideo {
  title: string;
  duration: string;
  calories: string;
  videoId: string; // YouTube Video ID
}

const Resource = () => {
  const [filter, setFilter] = useState<"videos" | "articles">("videos");
  const [articles, setArticles] = useState<Article[]>([]);
  const [videos, setVideos] = useState<WorkoutVideo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Fetch workout videos from FastAPI
  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${IP}:${PORT}/videos`); // Change this to your actual server URL
      const data = await response.json();
      setVideos(data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setIsLoading(false);
    }
  };

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
    if (filter === "videos") {
      fetchVideos();
    } else {
      fetchArticles();
    }
  }, [filter]);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <View className="w-full h-full flex-1 px-4 bg-white">
          <View className="flex-row items-center justify-between mt-10">
            <Text className="font-bold text-3xl">Resources</Text>

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
              } border border-blue-500 p-3 rounded-full mx-2`}
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
              } border border-blue-500 p-3 rounded-full mx-2`}
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

          {/* Content Section */}
          <View className="mt-6 flex-1">
            {filter === "videos" && (
              <>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <FlatList
                    data={videos}
                    keyExtractor={(video) => video.videoId}
                    numColumns={2} // Keep the grid layout (2 columns)
                    columnWrapperStyle={{ justifyContent: "space-between" }} // Space between items
                    showsVerticalScrollIndicator={false} // Hide scrollbar
                    contentContainerStyle={{ paddingBottom: 100 }} // Prevent content from cutting off at the bottom
                    renderItem={({ item: video }) => (
                      <View className="w-[48%] bg-gray-100 border-blue-500 border-2 rounded-lg overflow-hidden mb-4">
                        {playingVideoId === video.videoId ? (
                          <View style={{ height: 200, width: "100%" }}>
                            <WebView
                              source={{
                                uri: `https://www.youtube.com/embed/${video.videoId}?autoplay=1`,
                              }}
                              style={{ flex: 1 }}
                            />
                            <TouchableOpacity
                              style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                backgroundColor: "rgba(0,0,0,0.6)",
                                borderRadius: 15,
                                padding: 5,
                              }}
                              onPress={() => setPlayingVideoId(null)}
                            >
                              <Icon
                                name="close-circle"
                                size={24}
                                color="white"
                              />
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={() => setPlayingVideoId(video.videoId)}
                          >
                            <Image
                              source={{
                                uri: `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`,
                              }}
                              style={{ height: 200, width: "100%" }}
                            />
                          </TouchableOpacity>
                        )}
                        <View className="p-2">
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
                        </View>
                      </View>
                    )}
                  />
                )}
              </>
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
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        className="flex-row border-2 border-blue-500 bg-gray-100 rounded-lg m-2 items-center h-40 overflow-hidden"
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
                          className="h-full w-1/3 rounded-r-lg"
                        />
                        <View className="flex-1 justify-center ml-3">
                          <Text className="text-black font-bold text-lg">
                            {item.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
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

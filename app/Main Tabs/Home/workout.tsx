import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Octicons";
import { router } from "expo-router";
import { useFavorites, FavoriteItem } from "./FavoritesContext";
import Toast from "react-native-toast-message";
import { IP, PORT } from "@env";

type ExerciseDetail = {
  name: string;
  description: string;
  reps: string;
  sets: string;
  video: string;
};

type WorkoutData = {
  id: number;
  title: string;
  image: string;
  time: string;
  calories: string;
  exercises: string;
  details: ExerciseDetail[];
  level: string;
  type: string;
  ftype: string;
};

type Exercise = "Beginner" | "Intermediate" | "Advanced";

const Workout = () => {
  const [selectedExercise, setSelectedExercise] =
    useState<Exercise>("Beginner");
  const [recommendedData, setRecommendedData] = useState<WorkoutData[]>([]);
  const [exercisesData, setExercisesData] = useState<WorkoutData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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

  const isFavorite = (id: number) => favorites.some((fav) => fav.id === id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${IP}:${PORT}/workouts/${selectedExercise}`
        );
        const data: WorkoutData[] = await response.json();
        const recommended = data.filter((item) => item.type === "r");
        const exercises = data.filter((item) => item.type !== "r");

        setRecommendedData(recommended);
        setExercisesData(exercises);
      } catch (error) {
        console.error("Error fetching data:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to fetch data from the server.",
          position: "top",
          visibilityTime: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedExercise]);

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color="#0000ff" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full h-full bg-white">
            {/* Exercise Selector */}
            <View className="flex-row justify-center gap-3 mt-2">
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <TouchableOpacity
                  key={level}
                  onPress={() => setSelectedExercise(level as Exercise)}
                  activeOpacity={0.7}
                  className={`justify-center items-center py-2 w-28 border rounded-3xl ${
                    selectedExercise === level
                      ? "border-blue-500 bg-blue-500"
                      : "border-blue-500"
                  }`}
                >
                  <Text
                    className={
                      selectedExercise === level
                        ? "text-white font-semibold"
                        : "text-black"
                    }
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Recommended Section */}
            <View className="mt-6">
              <Text className="font-bold text-xl text-yellow-500 mx-4">
                Recommended
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-4"
              >
                <View className="gap-3 flex-row mx-4">
                  {recommendedData.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.7}
                      onPress={() =>
                        router.push({
                          pathname: "/Main Tabs/Home/WorkoutLibrary/exercise",
                          params: {
                            workout: JSON.stringify(item),
                          },
                        })
                      }
                      className="rounded-3xl overflow-hidden w-48 border-2 border-blue-500 bg-gray-100"
                    >
                      <View className="relative">
                        <Image
                          source={{ uri: item.image }}
                          className="w-full h-32 rounded-b-3xl"
                        />
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => handleFavorite(item)}
                          className="absolute top-2 right-2"
                        >
                          <Icon
                            name="star"
                            size={20}
                            color={isFavorite(item.id) ? "#FFC107" : "white"}
                          />
                        </TouchableOpacity>
                      </View>
                      <View className="p-2">
                        <Text className="text-black font-bold">
                          {item.title}
                        </Text>
                        <View className="flex-row justify-between mt-2">
                          <View className="flex-row items-center gap-1">
                            <Icon name="time-outline" />
                            <Text className="text-gray-500 text-sm">
                              {item.time}
                            </Text>
                          </View>
                          <View className="flex-row items-center gap-1">
                            <Icon2 name="flame" color="gray" />
                            <Text className="text-gray-500 text-sm">
                              {item.calories}
                            </Text>
                          </View>
                        </View>

                        <View className="flex-row items-center gap-1">
                          <Icon name="barbell-sharp" color="gray" />
                          <Text className="text-gray-500 text-sm">
                            {item.exercises}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Exercises Section */}
            <View className="px-4 mt-6 mb-4">
              <Text className="text-yellow-500 text-lg font-bold mb-4">
                Explore Exercises
              </Text>
              <View className="gap-3">
                {exercisesData.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.7}
                    onPress={() =>
                      router.push({
                        pathname: "/Main Tabs/Home/WorkoutLibrary/exercise",
                        params: {
                          workout: JSON.stringify(item),
                        },
                      })
                    }
                    className="bg-gray-100 rounded-3xl flex-row overflow-hidden border-blue-500 border-2"
                  >
                    <View className="relative h-32 w-2/5">
                      <Image
                        source={{ uri: item.image }}
                        className="w-full h-full rounded-r-3xl"
                      />
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => handleFavorite(item)}
                        className="absolute top-2 right-2"
                      >
                        <Icon
                          name="star"
                          size={20}
                          color={isFavorite(item.id) ? "#FFC107" : "white"}
                        />
                      </TouchableOpacity>
                    </View>
                    <View className="flex-1 p-6 justify-center">
                      <Text className="text-black font-bold">{item.title}</Text>
                      <View className="flex-row justify-between mt-2">
                        <View className="flex-row items-center gap-1">
                          <Icon name="time-outline" />
                          <Text className="text-gray-500 text-sm">
                            {item.time}
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                          <Icon2 name="flame" color="gray" />
                          <Text className="text-gray-500 text-sm">
                            {item.calories}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row items-center gap-1">
                        <Icon name="barbell-sharp" color="gray" />
                        <Text className="text-gray-500 text-sm">
                          {item.exercises}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Workout;

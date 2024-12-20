import React from "react";
import { StyleSheet, Text, View, Pressable, Alert, Image, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";



const recommendations = [
  {
    id: "1",
    title: "Squat Exercise",
    duration: "12 Minutes",
    calories: "120 Kcal",
    imageUri: "https://via.placeholder.com/150",
    isFavorite: true,
  },
  {
    id: "2",
    title: "Full Body Stretching",
    duration: "10 Minutes",
    calories: "100 Kcal",
    imageUri: "https://via.placeholder.com/150",
    isFavorite: false,
  },
  {
    id: "3",
    title: "Lateral Raise",
    duration: "8 Minutes",
    calories: "80 Kcal",
    imageUri: "https://via.placeholder.com/150",
    isFavorite: false,
  },
];

const articles = [
  {
    id: "1",
    title: "Supplement Guide",
    imageUri: "https://via.placeholder.com/150",
    isFavorite: true,
  },
  {
    id: "2",
    title: "15 Quick & Effective Daily Routines...",
    imageUri: "https://via.placeholder.com/150",
    isFavorite: false,
  },
];

const Workout = () => {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <ScrollView>
          <View className="mt-6">
            <View className="flex-row justify-between items-center">
              <Text className="text-black text-lg font-bold mx-3">Recommendations</Text>
              <Pressable
                className="flex-row justify-center items-center mx-3"
                onPress={() => router.push("/Main Tabs/Tabs/resources")}
              >
                <Text className="text-blue-500 text-sm font-semibold mx-1">See All</Text>
                <Icon name="play" size={15} color="#3B82F6" />
              </Pressable>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
              {recommendations.map((item) => (
                <View key={item.id} className="w-60 bg-gray-100 border-blue-500 border-2 rounded-lg mr-4">
                  <Image source={{ uri: item.imageUri }} className="h-36 w-full rounded-lg" />
                  <Text className="text-black font-bold mx-2">{item.title}</Text>
                  <View className="flex-row items-center justify-between mt-1">
                    <Text className="text-gray-600 text-sm mx-2">{item.duration}</Text>
                    <Text className="text-gray-600 text-sm mx-2">{item.calories}</Text>
                  </View>
                  <Pressable className="absolute bottom-12 right-3">
                    <Icon name="play-circle" size={24} color="#000" />
                  </Pressable>
                  <Pressable className="absolute top-3 right-3">
                    <Icon
                      name={item.isFavorite ? "star" : "star-outline"}
                      size={24}
                      color="#FFC107"
                    />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Articles Section */}
          <View className="mt-6">
            <Text className="text-black text-lg font-bold mx-3">Articles & Tips</Text>
            <View className="flex-row mt-4">
              {articles.map((item) => (
                <View key={item.id} className="w-1/2 bg-gray-100 border-blue-500 border-2 rounded-lg mr-4">
                  <Image source={{ uri: item.imageUri }} className="h-32 w-full rounded-lg" />
                  <Text className="text-black font-bold mt-2">{item.title}</Text>
                  <Pressable className="absolute top-3 right-3">
                    <Icon
                      name={item.isFavorite ? "star" : "star-outline"}
                      size={24}
                      color="#FFC107"
                    />
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Workout;
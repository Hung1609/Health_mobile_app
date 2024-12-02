import React from "react";
import { StyleSheet, Text, View, Pressable, Alert, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native";


const handlePress = () => {
  Alert.alert('Button Pressed', 'You just clicked the button!');
};

const Home = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <ScrollView>
          <View className='w-full h-full bg-white flex-1 px-5'>
            <View className='flex-row items-center justify-between mt-10'>
              <View>
                <Text className='font-bold text-2xl'>Welcome, username</Text>
                <Text className='text-blue-500 text-lg font-semibold'>It's time to change your lifestyle</Text>
              </View>
              <View className='flex-row space-x-1'>
                <Pressable onPress={handlePress}>
                  <Icon className="px-2" name={"search"} size={25} color="black" />
                </Pressable>
                <Pressable>
                  <Icon className="px-2" name={"notifications"} size={25} color="black" />
                </Pressable>
                <Pressable>
                  <Icon className="px-2" name={"person"} size={25} color="black" />
                </Pressable>
              </View>
            </View>
            <View className="flex-row justify-between items-center mt-10 w-full">
              <Pressable onPress={handlePress} className="items-center w-1/4">
                <Icon2 name={"dumbbell"} size={25} color="black" />
                <Text className="text-center">Workout</Text>
              </Pressable>
              <Pressable className="items-center w-1/4">
                <Icon2 name={"clipboard-list"} size={25} color="black" />
                <Text className="text-center">Progress Tracking</Text>
              </Pressable>
              <Pressable className="items-center w-1/4">
                <Icon2 name={"apple-alt"} size={25} color="black" />
                <Text className="text-center">Nutrition</Text>
              </Pressable>
              <Pressable className="items-center w-1/4">
                <Icon name={"people"} size={25} color="black" />
                <Text className="text-center">Community</Text>
              </Pressable>
            </View>
          </View>
          <View className="mt-6">
            <View className="flex-row justify-between items-center">
              <Text className="text-white text-lg font-bold">Recommendations</Text>
              <Text className="text-yellow-500 text-sm font-semibold">See All</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
              {/* Card 1 */}
              <View className="w-60 bg-gray-800 rounded-lg p-3 mr-4">
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  className="h-32 w-full rounded-lg"
                />
                <Text className="text-white font-bold mt-2">Squat Exercise</Text>
                <View className="flex-row items-center justify-between mt-1">
                  <Text className="text-gray-400 text-sm">12 Minutes</Text>
                  <Text className="text-gray-400 text-sm">120 Kcal</Text>
                </View>
                <Pressable className="absolute top-3 right-3">
                  <Icon name="play-circle-fill" size={24} color="#FFC107" />
                </Pressable>
              </View>
              {/* Card 2 */}
              <View className="w-60 bg-gray-800 rounded-lg p-3">
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  className="h-32 w-full rounded-lg"
                />
                <Text className="text-white font-bold mt-2">Full Body Stretching</Text>
                <View className="flex-row items-center justify-between mt-1">
                  <Text className="text-gray-400 text-sm">12 Minutes</Text>
                  <Text className="text-gray-400 text-sm">120 Kcal</Text>
                </View>
                <Pressable className="absolute top-3 right-3">
                  <Icon name="play-circle-fill" size={24} color="#FFC107" />
                </Pressable>
              </View>
            </ScrollView>
          </View>

          {/* Weekly Challenge Section */}
          <View className="mt-6">
            <View className="bg-purple-500 rounded-lg p-5 flex-row items-center">
              <View className="flex-1">
                <Text className="text-yellow-400 font-bold text-lg">Weekly Challenge</Text>
                <Text className="text-white text-sm mt-1">Plank With Hip Twist</Text>
              </View>
              <Image
                source={{ uri: 'https://via.placeholder.com/100' }}
                className="h-20 w-20 rounded-lg"
              />
            </View>
          </View>

          {/* Articles & Tips Section */}
          <View className="mt-6">
            <Text className="text-white text-lg font-bold">Articles & Tips</Text>
            <View className="flex-row mt-4">
              {/* Article 1 */}
              <View className="w-1/2 bg-gray-800 rounded-lg p-3 mr-2">
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  className="h-32 w-full rounded-lg"
                />
                <Text className="text-white font-bold mt-2">Supplement Guide</Text>
              </View>
              {/* Article 2 */}
              <View className="w-1/2 bg-gray-800 rounded-lg p-3">
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  className="h-32 w-full rounded-lg"
                />
                <Text className="text-white font-bold mt-2">15 Quick & Effective...</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Home;
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
                <Icon2 name={"dumbbell"} size={25} color="#FFC107" />
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
              <Text className="text-black text-lg font-bold mx-3">Recommendations</Text>
              <Pressable className="flex-row justify-center items-center mx-3">
                <Text className="text-yellow-500 text-sm font-semibold mx-1">See All</Text>
                <Icon name="play" size={15} color="#FFC107" />
              </Pressable>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">

              <View className="w-60 bg-gray-100 rounded-lg p-3 mr-4">
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  className="h-32 w-full rounded-lg"
                />
                <Text className="text-black font-bold mt-2">Squat Exercise</Text>
                <View className="flex-row items-center justify-between mt-1">
                  <Text className="text-gray-600 text-sm">12 Minutes</Text>
                  <Text className="text-gray-600 text-sm">120 Kcal</Text>
                </View>
                <Pressable className="absolute bottom-12 right-3">
                  <Icon name="play-circle" size={24} color="mau-sac2" />
                </Pressable>
                <Pressable className="absolute top-3 right-3">
                  <Icon name="star" size={24} color="#FFC107" />
                </Pressable>
              </View>

              <View className="w-60 bg-gray-100 rounded-lg p-3">
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  className="h-32 w-full rounded-lg"
                />
                <Text className="text-black font-bold mt-2">Full Body Stretching</Text>
                <View className="flex-row items-center justify-between mt-1">
                  <Text className="text-gray-600 text-sm">12 Minutes</Text>
                  <Text className="text-gray-600 text-sm">120 Kcal</Text>
                </View>
                <Pressable className="absolute bottom-12 right-3">
                  <Icon name="play-circle" size={24} color="mau-sac2" />
                </Pressable>
                <Pressable className="absolute top-3 right-3">
                  <Icon name="star-outline" size={24} color="#FFC107" />
                </Pressable>
              </View>

              <View className="w-60 bg-gray-100 rounded-lg p-3">
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  className="h-32 w-full rounded-lg"
                />
                <Text className="text-black font-bold mt-2">Lateral raise</Text>
                <View className="flex-row items-center justify-between mt-1">
                  <Text className="text-gray-600 text-sm">12 Minutes</Text>
                  <Text className="text-gray-600 text-sm">120 Kcal</Text>
                </View>
                <Pressable className="absolute bottom-12 right-3">
                  <Icon name="play-circle" size={24} color="mau-sac2" />
                </Pressable>
                <Pressable className="absolute top-3 right-3">
                  <Icon name="star-outline" size={24} color="#FFC107" />
                </Pressable>
              </View>
            </ScrollView>
          </View>

          <View className="mt-6">
            <Text className="text-black text-lg font-bold mx-3">Articles & Tips</Text>
            <View className="flex-row mt-4">

              <View className="w-1/2 bg-gray-100 rounded-lg p-3 mr-2">
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  className="h-32 w-full rounded-lg"
                />
                <Text className="text-black font-bold mt-2">Supplement Guide</Text>
                <Pressable className="absolute top-3 right-3">
                  <Icon name="star" size={24} color="#FFC107" />
                </Pressable>
              </View>

              <View className="w-1/2 bg-gray-100 rounded-lg p-3">
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  className="h-32 w-full rounded-lg"
                />
                <Text className="text-black font-bold mt-2">15 Quick & Effective Daily Routines...</Text>
                <Pressable className="absolute top-3 right-3">
                  <Icon name="star-outline" size={24} color="#FFC107" />
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Home;
import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Octicons';

const NutritionDetails = () => {
  const { item } = useLocalSearchParams(); // Retrieve the query parameter
  const mealItem = item ? JSON.parse(item as string) : {}; // Parse the serialized object

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white p-4">
      <Text className="text-yellow-500 text-2xl font-bold mb-4">{mealItem.title}</Text>
      <Image
        source={{ uri: mealItem.image }}
        className="w-full h-52 rounded-lg mb-4"
      />
      <View className='flex-row gap-5'>
        <View className="flex-row items-center gap-1">
            <Icon name="time-outline" />
            <Text className="text-gray-500 text-sm">{mealItem.time}</Text>
        </View>
        <View className="flex-row items-center gap-1">
            <Icon2 name="flame" color="gray" />
            <Text className="text-gray-500 text-sm">{mealItem.calories}</Text>
        </View>  
      </View>
      <Text className="text-yellow-500 text-xl font-bold mt-6">Ingredients</Text>
      <Text className="text-black text-base mt-2">
        - Example ingredient 1{'\n'}
        - Example ingredient 2
      </Text>
      <Text className="text-yellow-500 text-xl font-bold mt-6">Preparation</Text>
      <Text className="text-black text-base mt-2">
        1. Example preparation step 1{'\n'}
        2. Example preparation step 2
      </Text>
    </ScrollView>
  );
};

export default NutritionDetails;

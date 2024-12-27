import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Octicons';
import { router } from 'expo-router';

type MealType = 'Breakfast' | 'Lunch' | 'Dinner'; // Define valid meal types

const Nutrition = () => {
  const [selectedMeal, setSelectedMeal] = useState<MealType>('Breakfast'); // Type the state

  // Define the structure of data
  const recommendedData: Record<MealType, { id: number; title: string; image: string; time: string; calories: string }[]> = {
    Breakfast: [
      {
        id: 1,
        title: 'Fruit Smoothie',
        image: 'https://via.placeholder.com/200x120',
        time: '12 Minutes',
        calories: '120 Cal',
      },
      {
        id: 2,
        title: 'Green Celery Juice',
        image: 'https://via.placeholder.com/200x120',
        time: '12 Minutes',
        calories: '120 Cal',
      },
      {
        id: 3,
        title: 'Bread',
        image: 'https://via.placeholder.com/200x120',
        time: '12 Minutes',
        calories: '120 Cal',
      },
    ],
    Lunch: [
      {
        id: 1,
        title: 'Chicken Salad',
        image: 'https://via.placeholder.com/200x120',
        time: '20 Minutes',
        calories: '250 Cal',
      },
      {
        id: 2,
        title: 'Quinoa Bowl',
        image: 'https://via.placeholder.com/200x120',
        time: '25 Minutes',
        calories: '300 Cal',
      },
    ],
    Dinner: [
      {
        id: 1,
        title: 'Steak and Vegetables',
        image: 'https://via.placeholder.com/200x120',
        time: '30 Minutes',
        calories: '400 Cal',
      },
      {
        id: 2,
        title: 'Salmon with Rice',
        image: 'https://via.placeholder.com/200x120',
        time: '35 Minutes',
        calories: '350 Cal',
      },
    ],
  };

  const recipesData: Record<MealType, { id: number; title: string; image: string; time: string; calories: string }[]> = {
    Breakfast: [
      {
        id: 1,
        title: 'Greek Yogurt',
        image: 'https://via.placeholder.com/100x100',
        time: '6 Minutes',
        calories: '200 Cal',
      },
      {
        id: 2,
        title: 'Avocado And Egg Toast',
        image: 'https://via.placeholder.com/100x100',
        time: '15 Minutes',
        calories: '150 Cal',
      },
      {
        id: 3,
        title: 'Avocado And Egg Toast',
        image: 'https://via.placeholder.com/100x100',
        time: '15 Minutes',
        calories: '150 Cal',
      },
    ],
    Lunch: [
      {
        id: 1,
        title: 'Turkey Wrap',
        image: 'https://via.placeholder.com/100x100',
        time: '10 Minutes',
        calories: '220 Cal',
      },
      {
        id: 2,
        title: 'Pasta Primavera',
        image: 'https://via.placeholder.com/100x100',
        time: '25 Minutes',
        calories: '350 Cal',
      },
    ],
    Dinner: [
      {
        id: 1,
        title: 'Chicken Stir Fry',
        image: 'https://via.placeholder.com/100x100',
        time: '20 Minutes',
        calories: '300 Cal',
      },
      {
        id: 2,
        title: 'Vegetarian Curry',
        image: 'https://via.placeholder.com/100x100',
        time: '40 Minutes',
        calories: '250 Cal',
      },
    ],
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full h-full bg-white">
            {/* Meal Selector Buttons */}
            <View className="flex-row justify-center gap-3 mt-4">
              {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
                <TouchableOpacity
                  key={meal}
                  onPress={() => setSelectedMeal(meal as MealType)}
                  activeOpacity={0.7}
                  className={`justify-center items-center py-2 w-28 border rounded-3xl ${
                    selectedMeal === meal ? 'border-blue-500 bg-blue-500' : 'border-blue-500'
                  }`}
                >
                  <Text className={selectedMeal === meal ? 'text-white font-semibold' : 'text-black'}>
                    {meal}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Recommended Section */}
            <View className="mt-6">
              <Text className="font-bold text-xl text-yellow-500 mx-4">Recommended</Text>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
                <View className="gap-3 flex-row mx-4">
                  {recommendedData[selectedMeal].map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.7}
                      onPress={() => router.push({ pathname: '/Main Tabs/Home/nutrition-details', params: { item: JSON.stringify(item) } })}
                      className="rounded-xl overflow-hidden w-48 border-2 border-blue-500"
                    >
                      <Image source={{ uri: item.image }} className="w-full h-32" />
                      <View className="p-2">
                        <Text className="text-yellow-500 font-bold">{item.title}</Text>
                        <View className="flex-row justify-between mt-2">
                          <View className="flex-row items-center gap-1">
                            <Icon name="time-outline" />
                            <Text className="text-gray-500 text-sm">{item.time}</Text>
                          </View>
                          <View className='flex-row items-center gap-1'>
                            <Icon2 name="flame" />
                            <Text className="text-gray-500 text-sm">{item.calories}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Recipes Section */}
            <View className="px-4 my-6">
              <Text className="text-yellow-500 text-lg font-bold mb-4">Recipes For You</Text>
              <View className="gap-3">
                {recipesData[selectedMeal].map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.8}
                    onPress={() => router.push({ pathname: '/Main Tabs/Home/nutrition-details', params: { item: JSON.stringify(item) } })}
                    className="bg-white rounded-xl flex-row overflow-hidden border-blue-500 border-2"
                  >
                    <Image source={{ uri: item.image }} className="w-2/5 h-full" />
                    <View className="flex-1 p-4 justify-center">
                      <Text className="text-yellow-500 font-bold">{item.title}</Text>
                      <View className="flex-row justify-between mt-2">
                        <View className="flex-row items-center gap-1">
                          <Icon name="time-outline" />
                          <Text className="text-gray-500 text-sm">{item.time}</Text>
                        </View>
                        <View className='flex-row items-center gap-1'>
                          <Icon2 name="flame" />
                          <Text className="text-gray-500 text-sm">{item.calories}</Text>
                        </View>
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

export default Nutrition;

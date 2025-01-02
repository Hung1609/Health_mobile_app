import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Octicons';
import { router } from 'expo-router';
import { useFavorites, FavoriteItem } from './FavoritesContext';
import Toast from 'react-native-toast-message';

type MealType = 'Breakfast' | 'Lunch' | 'Dinner'; // Define valid meal types

const Nutrition = () => {
  const [selectedMeal, setSelectedMeal] = useState<MealType>('Breakfast'); // Type the state
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  
  const handleFavorite = (item: FavoriteItem) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);
    
    if (isFavorite) {
      removeFavorite(item.id);
      Toast.show({
        type: 'success',
        text1: 'Removed from Favorites',
        text2: `${item.title} has been removed.`,
        position: 'top',
        visibilityTime: 2000,
      });
    } else {
      addFavorite(item);
      Toast.show({
        type: 'success',
        text1: 'Added to Favorites',
        text2: `${item.title} has been added.`,
        position: 'top',
        visibilityTime: 2000,
      });
    }
  };

  const isFavorite = (id: number) => {
    return favorites.some((fav) => fav.id === id);
  };

  // Define the structure of data
  const recommendedData: Record<MealType, { id: number; title: string; image: string; time: string; calories: string, type: string }[]> = {
    Breakfast: [
      {
        id: 15,
        title: 'Green Celery Juice',
        image: 'https://via.placeholder.com/200x120',
        time: '12 Minutes',
        calories: '120 Cal',
        type: 'nutrition',
      },
      {
        id: 16,
        title: 'Bread',
        image: 'https://via.placeholder.com/200x120',
        time: '12 Minutes',
        calories: '120 Cal',
        type: 'nutrition',
      },
    ],
    Lunch: [
      {
        id: 17,
        title: 'Chicken Salad',
        image: 'https://via.placeholder.com/200x120',
        time: '20 Minutes',
        calories: '250 Cal',
        type: 'nutrition',
      },
      {
        id: 18,
        title: 'Quinoa Bowl',
        image: 'https://via.placeholder.com/200x120',
        time: '25 Minutes',
        calories: '300 Cal',
        type: 'nutrition',
      },
    ],
    Dinner: [
      {
        id: 19,
        title: 'Steak and Vegetables',
        image: 'https://via.placeholder.com/200x120',
        time: '30 Minutes',
        calories: '400 Cal',
        type: 'nutrition',
      },
      {
        id: 20,
        title: 'Salmon with Rice',
        image: 'https://via.placeholder.com/200x120',
        time: '35 Minutes',
        calories: '350 Cal',
        type: 'nutrition',
      },
    ],
  };

  const recipesData: Record<MealType, { id: number; title: string; image: string; time: string; calories: string, type: string }[]> = {
    Breakfast: [
      {
        id: 21,
        title: 'Greek Yogurt',
        image: 'https://via.placeholder.com/100x100',
        time: '6 Minutes',
        calories: '200 Cal',
        type: 'nutrition',
      },
      {
        id: 22,
        title: 'Avocado And Egg Toast',
        image: 'https://via.placeholder.com/100x100',
        time: '15 Minutes',
        calories: '150 Cal',
        type: 'nutrition',
      },
      {
        id: 23,
        title: 'Avocado And Egg Toast',
        image: 'https://via.placeholder.com/100x100',
        time: '15 Minutes',
        calories: '150 Cal',
        type: 'nutrition',
      },
    ],
    Lunch: [
      {
        id: 24,
        title: 'Turkey Wrap',
        image: 'https://via.placeholder.com/100x100',
        time: '10 Minutes',
        calories: '220 Cal',
        type: 'nutrition',
      },
      {
        id: 25,
        title: 'Pasta Primavera',
        image: 'https://via.placeholder.com/100x100',
        time: '25 Minutes',
        calories: '350 Cal',
        type: 'nutrition',
      },
    ],
    Dinner: [
      {
        id: 26,
        title: 'Chicken Stir Fry',
        image: 'https://via.placeholder.com/100x100',
        time: '20 Minutes',
        calories: '300 Cal',
        type: 'nutrition',
      },
      {
        id: 27,
        title: 'Vegetarian Curry',
        image: 'https://via.placeholder.com/100x100',
        time: '40 Minutes',
        calories: '250 Cal',
        type: 'nutrition',
      },
    ],
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full h-full bg-white">
            {/* Meal Selector Buttons */}
            <View className="flex-row justify-center gap-3 mt-2">
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
                      className="rounded-3xl overflow-hidden w-48 border-2 border-blue-500"
                    >
                      <View className="relative">
                        <Image source={{ uri: item.image }} className="w-full h-32 rounded-b-3xl" />
                        <TouchableOpacity 
                          activeOpacity={0.7}
                          onPress={() => handleFavorite(item)}
                          className="absolute top-2 right-2"
                        >
                          <Icon
                            name="star"
                            size={20}
                            color={isFavorite(item.id) ? '#FFC107' : 'white'} // Gold if item is in favorites
                          />
                        </TouchableOpacity>
                      </View>
                      
                      <View className="p-2">
                        <Text className="text-black font-bold">{item.title}</Text>
                        <View className="flex-row justify-between mt-2">
                          <View className="flex-row items-center gap-1">
                            <Icon name="time-outline" />
                            <Text className="text-gray-500 text-sm">{item.time}</Text>
                          </View>
                          <View className="flex-row items-center gap-1">
                            <Icon2 name="flame" color="gray" />
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
            <View className="px-4 mt-6 mb-4">
              <Text className="text-yellow-500 text-lg font-bold mb-4">Recipes For You</Text>
              <View className="gap-3">
                {recipesData[selectedMeal].map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.7}
                    onPress={() => router.push({ pathname: '/Main Tabs/Home/nutrition-details', params: { item: JSON.stringify(item) } })}
                    className="bg-white rounded-3xl flex-row overflow-hidden border-blue-500 border-2"
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
                            color={isFavorite(item.id) ? '#FFC107' : 'white'} // Gold if item is in favorites
                          />
                      </TouchableOpacity>
                    </View>
                    
                    <View className="flex-1 p-6 justify-center">
                      <Text className="text-black font-bold">{item.title}</Text>
                      <View className="flex-row justify-between mt-2">
                        <View className="flex-row items-center gap-1">
                          <Icon name="time-outline" />
                          <Text className="text-gray-500 text-sm">{item.time}</Text>
                        </View>
                        <View className='flex-row items-center gap-1'>
                          <Icon2 name="flame" color="gray" />
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

import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from 'react-native-vector-icons/Octicons';
import { router } from "expo-router";
import { useFavorites, FavoriteItem } from '../Home/FavoritesContext';
import Toast from 'react-native-toast-message';

type FavouriteItems = 'All' | 'Workout' | 'Nutrition';

const Favourite = () => {
  const [selectedFavorite, setSelectedFavorite] = useState<FavouriteItems>('All');

  // Access query parameters using useLocalSearchParams
  const { favorites, removeFavorite } = useFavorites();

  const filteredFavorites = selectedFavorite === 'All'
    ? favorites
    : favorites.filter((item: { type: string }) => item.type.toLowerCase() === selectedFavorite.toLowerCase());

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
    }
  };
  
  const isFavorite = (id: number) => {
    return favorites.some((fav) => fav.id === id);
  };

  const checkFavorite = (item: FavoriteItem) => {
    if (item.type.toLowerCase() === 'nutrition') {
      router.push({
          pathname: '/Main Tabs/Home/nutrition-details', 
          params: { item: JSON.stringify(item) } 
      });
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
          <View className="w-full h-full flex-1 px-4">
            <View className="flex-row items-center justify-between mt-10">
              <View>
                  <Text className="font-bold text-3xl">Favorites</Text>
              </View>

              <View className="flex-row space-x-1">
                  <TouchableOpacity
                    activeOpacity={0.7}
                  >
                      <Icon className="px-2" name={"search"} size={25} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => router.push('/Other Tabs/notification')}
                    activeOpacity={0.7}
                  >
                      <Icon className="px-2" name={"notifications"} size={25} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => router.push('/Other Tabs/profile')}
                    activeOpacity={0.7}  
                  >
                      <Icon className="px-2" name={"person"} size={25} color="black" />
                  </TouchableOpacity>
              </View>
            </View>

            <View className="mt-10 flex-row items-center gap-3 justify-center">
              {[ 'All', 'Workout', 'Nutrition' ].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setSelectedFavorite(item as FavouriteItems)}
                  activeOpacity={0.7}
                  className={`justify-center items-center p-2 rounded-3xl w-28 border ${selectedFavorite === item ? 'bg-blue-500 border-blue-500' : 'border-blue-500'}`}
                >
                  <Text className={`${selectedFavorite === item ? 'text-white font-semibold' : 'text-black'}`}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <ScrollView className="mt-8" contentContainerStyle={{ flexGrow: 1 }}>
              {filteredFavorites.length === 0 ? (
              <View className="flex-1 justify-center items-center h-full">
                <Text className="text-xl text-gray-500">No favorites yet!</Text>
              </View>
              ) : (
                filteredFavorites.map((item: {
                  id: number;
                  title: string;
                  image: string;
                  time: string;
                  calories: string;
                  exercises?: string;
                  type: string;
                }) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => checkFavorite(item)}
                    activeOpacity={0.7}
                    className="bg-white rounded-3xl mb-3 flex-row overflow-hidden border-blue-500 border-2"
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
                      {item.type.toLowerCase() === 'workout' && (
                        <View className="flex-row items-center gap-1 mt-1">
                          <Icon name="barbell-sharp" color="gray" />
                          <Text className="text-gray-500 text-sm">{item.exercises}</Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Favourite;

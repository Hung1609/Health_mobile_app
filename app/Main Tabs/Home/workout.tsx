import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Octicons';
import { router } from 'expo-router';
import { useFavorites, FavoriteItem } from './FavoritesContext';
import Toast from 'react-native-toast-message';

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
  details: ExerciseDetail[]; // Array of exercise details
  level: string; // Difficulty level
  type: string; // Type of workout
};

type Exercise = 'Beginner' | 'Intermediate' | 'Advanced'; // Define valid meal types

const Workout = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>('Beginner'); // Type the state
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
  const recommendedData: Record<Exercise, WorkoutData[]> = {
    Beginner: [
      {
        id: 1,
        title: 'Upper Body',
        image: 'https://via.placeholder.com/200x120',
        time: '12 Minutes',
        calories: '120',
        exercises: '3 Exercises',
        details: [
          {
            name: 'Bench Press',
            description: 'Perform with dumbbells',
            reps: '6',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Push-Ups',
            description: 'Standard push-ups for chest',
            reps: '10',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Bicep Curls',
            description: 'Use dumbbells for this exercise',
            reps: '8',
            sets: '3',
            video: 'https://via.placeholder.com/200x120'
          },
        ],
        level: 'Beginner',
        type: 'workout',
      },
      {
        id: 2,
        title: 'Lower Body',
        image: 'https://via.placeholder.com/200x120',
        time: '12 Minutes',
        calories: '120',
        exercises: '3 Exercises',
        details: [
          {
            name: 'Bench Press',
            description: 'Perform with dumbbells',
            reps: '6',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Push-Ups',
            description: 'Standard push-ups for chest',
            reps: '10',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Bicep Curls',
            description: 'Use dumbbells for this exercise',
            reps: '8',
            sets: '3',
            video: 'https://via.placeholder.com/200x120'
          },
        ],
        level: 'Beginner',
        type: 'workout',
      },
      {
        id: 3,
        title: 'Core',
        image: 'https://via.placeholder.com/200x120',
        time: '12 Minutes',
        calories: '120',
        exercises: '3 Exercises',
        details: [
          {
            name: 'Bench Press',
            description: 'Perform with dumbbells',
            reps: '6',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Push-Ups',
            description: 'Standard push-ups for chest',
            reps: '10',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Bicep Curls',
            description: 'Use dumbbells for this exercise',
            reps: '8',
            sets: '3',
            video: 'https://via.placeholder.com/200x120'
          },
        ],
        level: 'Beginner',
        type: 'workout',
      },
    ],
    Intermediate: [
      {
        id: 100,
        title: 'Upper Body',
        image: 'https://via.placeholder.com/200x120',
        time: '20 Minutes',
        calories: '250',
        exercises: '3 Exercises',
        details: [
          {
            name: 'Bench Press',
            description: 'Perform with dumbbells',
            reps: '6',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Push-Ups',
            description: 'Standard push-ups for chest',
            reps: '10',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Bicep Curls',
            description: 'Use dumbbells for this exercise',
            reps: '8',
            sets: '3',
            video: 'https://via.placeholder.com/200x120'
          },
        ],
        level: 'Intermediate',
        type: 'workout',
      },
      {
        id: 2,
        title: 'Lower Body',
        image: 'https://via.placeholder.com/200x120',
        time: '25 Minutes',
        calories: '300',
        exercises: '3 Exercises',
        details: [
          {
            name: 'Bench Press',
            description: 'Perform with dumbbells',
            reps: '6',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Push-Ups',
            description: 'Standard push-ups for chest',
            reps: '10',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Bicep Curls',
            description: 'Use dumbbells for this exercise',
            reps: '8',
            sets: '3',
            video: 'https://via.placeholder.com/200x120'
          },
        ],
        level: 'Intermediate',
        type: 'workout',
      },
    ],
    Advanced: [
      {
        id: 200,
        title: 'Upper Body',
        image: 'https://via.placeholder.com/200x120',
        time: '30 Minutes',
        calories: '400',
        exercises: '3 Exercises',
        details: [
          {
            name: 'Bench Press',
            description: 'Perform with dumbbells',
            reps: '6',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Push-Ups',
            description: 'Standard push-ups for chest',
            reps: '10',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Bicep Curls',
            description: 'Use dumbbells for this exercise',
            reps: '8',
            sets: '3',
            video: 'https://via.placeholder.com/200x120'
          },
        ],
        level: 'Advanced',
        type: 'workout',
      },
      {
        id: 2,
        title: 'Lower Body',
        image: 'https://via.placeholder.com/200x120',
        time: '35 Minutes',
        calories: '350',
        exercises: '3 Exercises',
        details: [
          {
            name: 'Bench Press',
            description: 'Perform with dumbbells',
            reps: '6',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Push-Ups',
            description: 'Standard push-ups for chest',
            reps: '10',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Bicep Curls',
            description: 'Use dumbbells for this exercise',
            reps: '8',
            sets: '3',
            video: 'https://via.placeholder.com/200x120'
          },
        ],
        level: 'Advanced',
        type: 'workout',
      },
    ],
  };

  const exercisesData: Record<Exercise, WorkoutData[]> = {
    Beginner: [
      {
        id: 8,
        title: 'Greek Yogurt',
        image: 'https://via.placeholder.com/100x100',
        time: '6 Minutes',
        calories: '200',
        exercises: '3 Exercises',
        details: [
          {
            name: 'Bench Press',
            description: 'Perform with dumbbells',
            reps: '6',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Push-Ups',
            description: 'Standard push-ups for chest',
            reps: '10',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Bicep Curls',
            description: 'Use dumbbells for this exercise',
            reps: '8',
            sets: '3',
            video: 'https://via.placeholder.com/200x120'
          },
        ],
        level: 'Beginner',
        type: 'workout',
      },
      {
        id: 9,
        title: 'Avocado And Egg Toast',
        image: 'https://via.placeholder.com/100x100',
        time: '15 Minutes',
        calories: '150',
        exercises: '3 Exercises',
        details: [
          {
            name: 'Bench Press',
            description: 'Perform with dumbbells',
            reps: '6',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Push-Ups',
            description: 'Standard push-ups for chest',
            reps: '10',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Bicep Curls',
            description: 'Use dumbbells for this exercise',
            reps: '8',
            sets: '3',
            video: 'https://via.placeholder.com/200x120'
          },
        ],
        level: 'Beginner',
        type: 'workout',
      },
      {
        id: 10, 
        title: 'Avocado And Egg Toast',
        image: 'https://via.placeholder.com/100x100',
        time: '15 Minutes',
        calories: '150',
        exercises: '3 Exercises',
        details: [
          {
            name: 'Bench Press',
            description: 'Perform with dumbbells',
            reps: '6',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Push-Ups',
            description: 'Standard push-ups for chest',
            reps: '10',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Bicep Curls',
            description: 'Use dumbbells for this exercise',
            reps: '8',
            sets: '3',
            video: 'https://via.placeholder.com/200x120'
          },
        ],
        level: 'Beginner',
        type: 'workout',
      },
    ],
    Intermediate: [
      {
        id: 11,
        title: 'Turkey Wrap',
        image: 'https://via.placeholder.com/100x100',
        time: '10 Minutes',
        calories: '220',
        exercises: '3 Exercises',
        details: [
          {
            name: 'Bench Press',
            description: 'Perform with dumbbells',
            reps: '6',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Push-Ups',
            description: 'Standard push-ups for chest',
            reps: '10',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Bicep Curls',
            description: 'Use dumbbells for this exercise',
            reps: '8',
            sets: '3',
            video: 'https://via.placeholder.com/200x120'
          },
        ],
        level: 'Intermediate',
        type: 'workout',
      },
      {
        id: 12,
        title: 'Pasta Primavera',
        image: 'https://via.placeholder.com/100x100',
        time: '25 Minutes',
        calories: '350',
        exercises: '3 Exercises',
        details: [
          {
            name: 'Bench Press',
            description: 'Perform with dumbbells',
            reps: '6',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Push-Ups',
            description: 'Standard push-ups for chest',
            reps: '10',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Bicep Curls',
            description: 'Use dumbbells for this exercise',
            reps: '8',
            sets: '3',
            video: 'https://via.placeholder.com/200x120'
          },
        ],
        level: 'Intermediate',
        type: 'workout',
      },
    ],
    Advanced: [
      {
        id: 13,
        title: 'Chicken Stir Fry',
        image: 'https://via.placeholder.com/100x100',
        time: '20 Minutes',
        calories: '300',
        exercises: '3 Exercises',
        details: [
          {
            name: 'Bench Press',
            description: 'Perform with dumbbells',
            reps: '6',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Push-Ups',
            description: 'Standard push-ups for chest',
            reps: '10',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Bicep Curls',
            description: 'Use dumbbells for this exercise',
            reps: '8',
            sets: '3',
            video: 'https://via.placeholder.com/200x120'
          },
        ],
        level: 'Advanced',
        type: 'workout',
      },
      {
        id: 14,
        title: 'Vegetarian Curry',
        image: 'https://via.placeholder.com/100x100',
        time: '40 Minutes',
        calories: '250',
        exercises: '3 Exercises',
        details: [
          {
            name: 'Bench Press',
            description: 'Perform with dumbbells',
            reps: '6',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Push-Ups',
            description: 'Standard push-ups for chest',
            reps: '10',
            sets: '3',
            video: 'https://via.placeholder.com/200x120',
          },
          {
            name: 'Bicep Curls',
            description: 'Use dumbbells for this exercise',
            reps: '8',
            sets: '3',
            video: 'https://via.placeholder.com/200x120'
          },
        ],
        level: 'Advanced',
        type: 'workout',
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
              {['Beginner', 'Intermediate', 'Advanced'].map((meal) => (
                <TouchableOpacity
                  key={meal}
                  onPress={() => setSelectedExercise(meal as Exercise)}
                  activeOpacity={0.7}
                  className={`justify-center items-center py-2 w-28 border rounded-3xl ${selectedExercise === meal ? 'border-blue-500 bg-blue-500' : 'border-blue-500'
                    }`}
                >
                  <Text className={selectedExercise === meal ? 'text-white font-semibold' : 'text-black'}>
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
                  {recommendedData[selectedExercise].map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.7}
                      className="rounded-3xl overflow-hidden w-48 border-2 border-blue-500"
                      onPress={() =>
                        router.push({
                          pathname: "/Main Tabs/Home/WorkoutLibrary/exercise",
                          params: {
                            workout: JSON.stringify(item),
                          },
                        })
                      }
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
                          <View className='flex-row items-center gap-1'>
                            <Icon2 name="flame" color="gray" />
                            <Text className="text-gray-500 text-sm">{item.calories} Cal</Text>
                          </View>
                        </View>
                        <View className="flex-row items-center gap-1 mt-1">
                          <Icon name="barbell-sharp" color="gray" />
                          <Text className="text-gray-500 text-sm">{item.exercises}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Exercises Section */}
            <View className="px-4 mt-6 mb-4">
              <View>
                <Text className="text-yellow-500 text-xl font-bold">
                  {selectedExercise === "Beginner" && "Let's Go Beginner"}
                  {selectedExercise === "Intermediate" && "Keep Raising Your Level"}
                  {selectedExercise === "Advanced" && "Unlock Your Potential"}
                </Text>
                <Text className="mb-4 text-gray-500">
                  {selectedExercise === "Beginner" && "Explore Different Workout Styles"}
                  {selectedExercise === "Intermediate" && "Explore Intermediate Workouts"}
                  {selectedExercise === "Advanced" && "Explore Advanced Fitness Routines"}
                </Text>
              </View>
              <View className="gap-3">
                {exercisesData[selectedExercise].map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.7}
                    className="bg-white rounded-3xl flex-row overflow-hidden border-blue-500 border-2"
                    onPress={() =>
                      router.push({
                        pathname: "/Main Tabs/Home/WorkoutLibrary/exercise",
                        params: {
                          workout: JSON.stringify(item),
                        },
                      })
                    }
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
                          <Text className="text-gray-500 text-sm">{item.calories} Cal</Text>
                        </View>
                      </View>
                      <View className="flex-row items-center gap-1 mt-1">
                          <Icon name="barbell-sharp" color="gray" />
                          <Text className="text-gray-500 text-sm">{item.exercises}</Text>
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

import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Octicons';

type Exercise = 'Beginner' | 'Intermediate' | 'Advanced'; // Define valid meal types

const Workout = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>('Beginner'); // Type the state

  // Define the structure of data
  const recommendedData: Record<Exercise, { id: number; title: string; image: string; time: string; calories: string, exercises: string }[]> = {
    Beginner: [
      {
        id: 1,
        title: 'Fruit Smoothie',
        image: 'https://via.placeholder.com/200x120',
        time: '12 Minutes',
        calories: '120 Cal',
        exercises: '3 Exercises',
      },
      {
        id: 2,
        title: 'Green Celery Juice',
        image: 'https://via.placeholder.com/200x120',
        time: '12 Minutes',
        calories: '120 Cal',
        exercises: '3 Exercises',
      },
      {
        id: 3,
        title: 'Bread',
        image: 'https://via.placeholder.com/200x120',
        time: '12 Minutes',
        calories: '120 Cal',
        exercises: '3 Exercises',
      },
    ],
    Intermediate: [
      {
        id: 1,
        title: 'Chicken Salad',
        image: 'https://via.placeholder.com/200x120',
        time: '20 Minutes',
        calories: '250 Cal',
        exercises: '3 Exercises',
      },
      {
        id: 2,
        title: 'Quinoa Bowl',
        image: 'https://via.placeholder.com/200x120',
        time: '25 Minutes',
        calories: '300 Cal',
        exercises: '3 Exercises',
      },
    ],
    Advanced: [
      {
        id: 1,
        title: 'Steak and Vegetables',
        image: 'https://via.placeholder.com/200x120',
        time: '30 Minutes',
        calories: '400 Cal',
        exercises: '3 Exercises',
      },
      {
        id: 2,
        title: 'Salmon with Rice',
        image: 'https://via.placeholder.com/200x120',
        time: '35 Minutes',
        calories: '350 Cal',
        exercises: '3 Exercises',
      },
    ],
  };

  const exercisesData: Record<Exercise, { id: number; title: string; image: string; time: string; calories: string, exercises: string }[]> = {
    Beginner: [
      {
        id: 1,
        title: 'Greek Yogurt',
        image: 'https://via.placeholder.com/100x100',
        time: '6 Minutes',
        calories: '200 Cal',
        exercises: '3 Exercises',
      },
      {
        id: 2,
        title: 'Avocado And Egg Toast',
        image: 'https://via.placeholder.com/100x100',
        time: '15 Minutes',
        calories: '150 Cal',
        exercises: '3 Exercises',
      },
      {
        id: 3,
        title: 'Avocado And Egg Toast',
        image: 'https://via.placeholder.com/100x100',
        time: '15 Minutes',
        calories: '150 Cal',
        exercises: '3 Exercises',
      },
    ],
    Intermediate: [
      {
        id: 1,
        title: 'Turkey Wrap',
        image: 'https://via.placeholder.com/100x100',
        time: '10 Minutes',
        calories: '220 Cal',
        exercises: '3 Exercises',
      },
      {
        id: 2,
        title: 'Pasta Primavera',
        image: 'https://via.placeholder.com/100x100',
        time: '25 Minutes',
        calories: '350 Cal',
        exercises: '3 Exercises',
      },
    ],
    Advanced: [
      {
        id: 1,
        title: 'Chicken Stir Fry',
        image: 'https://via.placeholder.com/100x100',
        time: '20 Minutes',
        calories: '300 Cal',
        exercises: '3 Exercises',
      },
      {
        id: 2,
        title: 'Vegetarian Curry',
        image: 'https://via.placeholder.com/100x100',
        time: '40 Minutes',
        calories: '250 Cal',
        exercises: '3 Exercises',
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
              {['Beginner', 'Intermediate', 'Advanced'].map((meal) => (
                <TouchableOpacity
                  key={meal}
                  onPress={() => setSelectedExercise(meal as Exercise)}
                  activeOpacity={0.7}
                  className={`justify-center items-center py-2 w-28 border rounded-3xl ${
                    selectedExercise === meal ? 'border-blue-500 bg-blue-500' : 'border-blue-500'
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
                        <View className="flex-row items-center gap-1 mt-1">
                          <Icon name="barbell-sharp" />
                          <Text className="text-gray-500 text-sm">{item.exercises}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Exercises Section */}
            <View className="px-4 my-6">
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
                    activeOpacity={0.8}
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
                      <View className="flex-row items-center gap-1 mt-1">
                          <Icon name="barbell-sharp" />
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

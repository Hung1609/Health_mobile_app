import React from "react";
import { View, Text, Image, Pressable, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from 'react-native-vector-icons/Octicons';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation, useRoute } from '@react-navigation/native';
import { router, useLocalSearchParams } from "expo-router";
import { useFavorites } from "../FavoritesContext";
import Toast from 'react-native-toast-message';

const Exercises = () => {
    const route = useRoute();
    const params = useLocalSearchParams();
    const workout = params.workout ? JSON.parse(params.workout as string) : null;
    
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const isFavorite = favorites.some(fav => fav.id === Number(workout.id)); 

    const handleFavorite = () => {
        const isFav = favorites.some(fav => fav.id === Number(workout.id));
        if (isFav) {
            removeFavorite(Number(workout.id));
            Toast.show({
                type: 'error',
                text1: 'Removed from Favorites',
                text2: `${workout.title} has been removed.`,
                position: 'top',
                visibilityTime: 2000,
            }); 
        } else {
            const item = {
                id: Number(workout.id),
                title: Array.isArray(workout.title) ? workout.title[0] : workout.title, 
                image: Array.isArray(workout.image) ? workout.image[0] : workout.image, 
                time: Array.isArray(workout.duration) ? workout.duration[0] : workout.duration, 
                calories: Array.isArray(workout.calories) ? workout.calories[0] : workout.calories, 
                exercises: Array.isArray(workout.exercises) ? workout.exercises[0] : workout.exercises,
                type: Array.isArray(workout.type) ? workout.type[0] : workout.type,
                ftype: 'workout', 
            };
            
            addFavorite(item);
          
            Toast.show({
                type: 'success',
                text1: 'Added to Favorites',
                text2: `${workout.title} has been added.`,
                position: 'top',
                visibilityTime: 2000,
            });
        };
    };
    
    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1 bg-white px-4'>
                <ScrollView>
                    <View className="my-4">
                        <Image
                            source={{
                                uri: workout.image,
                            }}
                            className="w-full h-60 rounded-3xl"
                        />

                        <View className="absolute top-0 right-0">
                            <Text className="bg-blue-500 text-white px-4 py-1 rounded-l-3xl rounded-t-3xl font-semibold">
                                {workout.title}
                            </Text>
                        </View>    

                        <View 
                            className="absolute bottom-0 w-full py-4 px-5 rounded-b-3xl justify-center"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        >
                            <View className="flex-row justify-between items-center">
                                <View className="flex-row items-center gap-1">
                                    <Icon name="time-outline" color={"white"} size={15} />
                                    <Text className="text-white text-sm">{workout.time}</Text>
                                </View>
                                <View className="flex-row items-center gap-1">
                                    <Icon2 name="flame" color={"white"} size={13} />
                                    <Text className="text-white text-sm">{workout.calories} Cal</Text>
                                </View>
                                <View className="flex-row items-center gap-1">
                                    <Icon name="fitness-outline" color={"white"} size={15} />
                                    <Text className="text-white text-sm">{workout.level}</Text>
                                </View>
                                <TouchableOpacity 
                                    activeOpacity={0.7}
                                    onPress={handleFavorite}
                                >
                                    <Icon 
                                        name="star" 
                                        size={20} 
                                        color={isFavorite ? '#FFC107' : 'white'} 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Workout Rounds */}
                    <View className="mt-5">
                        {workout.details.map((detail: any, index: number) => (
                            <TouchableOpacity 
                                className="border mb-3 flex-row items-center p-3 rounded-3xl bg-blue-50 border-blue-500"
                                key={index}
                                activeOpacity={0.7}
                            >
                                <Icon 
                                    name="play-circle-outline" 
                                    size={40} 
                                    color="#3b82f6" 
                                    className="mr-3"
                                />
                                <View>
                                    <Text className="font-semibold">{detail.name}</Text>
                                    <Text className="text-yellow-500">x{detail.reps}</Text>
                                </View>
                                <Text className="absolute right-3 text-yellow-500">Repetition {detail.sets}x</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                </ScrollView>
                <TouchableOpacity  
                    activeOpacity={0.7}
                    className="border items-center bg-blue-500 p-3 border-blue-500 rounded-3xl mb-2"
                    onPress={() => router.push({
                        pathname: "/Main Tabs/Home/WorkoutLibrary/create-routine",
                        params: {
                            workout: JSON.stringify(workout),
                        },
                    })}
                >
                    <Text className="text-white font-bold text-xl">Start</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Exercises;

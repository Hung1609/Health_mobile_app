import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from 'react-native-vector-icons/Octicons';
import { router, useLocalSearchParams } from "expo-router";
import { useWorkout } from './WorkoutContext';

const Finish = () => {
    const params = useLocalSearchParams();
    const workout = params.workout ? JSON.parse(params.workout as string) : null;
    
    const { addWorkout } = useWorkout();
    
    const today = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

    const handleFinish = () => {
        addWorkout(workout, today());
        router.push("/Main Tabs/Tabs/home");
      };

    return (
    <SafeAreaProvider>
        <SafeAreaView className='flex-1 bg-white'>
            <ImageBackground
                source={require("../../../../assets/images/boarding-bg.jpg")}
                className="flex-1 justify-center items-center px-4"
            >
                <View className='items-center flex-1 justify-center mb-48'>
                    <Image 
                        source={require("../../../../assets/images/trophy.png")}
                        className='size-96'
                    />
                    <View className='items-center'>
                        <Text className='text-3xl font-bold text-yellow-500'>Congratulations!</Text>
                        <View className='flex-row mt-4 justify-between rounded-3xl bg-blue-500 w-[80%] px-4 py-3'>
                            <View className='items-center gap-2'>
                                <Text className='text-white'>{workout.time}</Text>
                                <Icon name='time-outline' color="white" size={15} />
                            </View>
                            <View className='items-center gap-2'>
                                <Text className='text-white'>{workout.calories} Cal</Text>
                                <Icon2 name='flame' color='white' size={15} />
                            </View>
                            <View className='items-center gap-2'>
                                <Text className='text-white'>{workout.title}</Text>
                                <Icon name='barbell-sharp' color='white' size={15} />
                            </View>
                        </View>
                    </View>
                </View>
                
                <TouchableOpacity
                    activeOpacity={0.7}
                    className='border items-center bg-blue-500 p-3 border-blue-500 rounded-3xl mb-2 bottom-0 absolute w-full'
                    onPress={handleFinish}
                >
                    <Text className='text-white font-bold text-xl'>Home</Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Finish
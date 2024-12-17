import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Weight = () => {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <View className='w-full h-full bg-white flex-1 px-7 items-center'>
          <Text className='font-bold text-center mt-12 text-3xl'>What's Your Body Stats?</Text>
          
          <View className='mt-14 w-full'>
            <Text className='mb-2 font-semibold'>Height</Text>
            
            <View className='flex-row items-center'>
                <TextInput
                placeholder='Enter your height'
                className='bg-white py-5 px-3 rounded-lg border flex-1'
                keyboardType='numeric'
                autoCapitalize='none'
                autoCorrect={false}
                />
                <View className='ml-3 bg-blue-500 w-16 h-16 rounded-lg flex justify-center items-center'>
                    <Text className='text-white font-semibold'>CM</Text>
                </View>
            </View>
          </View>

          <View className='mt-5 w-full'>
            <Text className='mb-2 font-semibold'>Weight</Text>
            
            <View className='flex-row items-center'>
                <TextInput
                placeholder='Enter your weight'
                className='bg-white py-5 px-3 rounded-lg border flex-1'
                keyboardType='numeric'
                autoCapitalize='none'
                autoCorrect={false}
                />
                <View className='ml-3 bg-blue-500 w-16 h-16 rounded-lg flex justify-center items-center'>
                    <Text className='text-white font-semibold'>KG</Text>
                </View>
            </View>
          </View>

          <TouchableOpacity 
            className="bg-blue-500 py-3 rounded-lg absolute bottom-5 w-full"
            activeOpacity={0.7} 
            onPress={() => router.push('/Log In/Set Up/goal')}
          >
            <Text className="text-white font-bold text-xl text-center">Continue</Text>
          </TouchableOpacity>
          
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Weight;

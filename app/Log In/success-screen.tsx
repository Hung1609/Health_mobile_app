import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router"

const SuccessScreen = () => {
    const router = useRouter()
  
    return (
    <SafeAreaProvider>
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/boarding-bg.jpg")}
        className="flex-1 justify-center items-center px-7"
      >
        <View className="w-full h-full flex-1 justify-center items-center">
          <Image 
            source={require("../../assets/images/heart-beat.png")}
            className="size-60"
          />
          <Text className='font-bold text-4xl'>Congratulations!</Text>
          <Text>Your account is ready to use</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.push('/Log In/success-screen')} 
          className="bg-blue-500 mb-5 py-3 rounded-lg w-full"
          activeOpacity={0.7} 
        >
          <Text className="text-white font-bold text-xl text-center">Go to Homepage</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  </SafeAreaProvider>
  )
}

export default SuccessScreen
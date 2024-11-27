import { Text, View, Image, ImageBackground, TouchableOpacity, StatusBar } from "react-native"
import React from "react"
import { useRouter } from "expo-router"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"

const OnBoarding = () => {
  const router = useRouter()

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ImageBackground
          source={require("../assets/images/boarding-bg.jpg")}
          className="flex-1 justify-center items-center"
        >
          <StatusBar barStyle="dark-content" />
          <View className="w-full h-full flex-1 justify-center items-center">
            <Text className="text-center text-3xl font-bold">Welcome to</Text>
            <Image 
              source={require("../assets/images/health-care-logo.png")}
              className="size-96"
            />
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/sign-in')} 
            className="bg-blue-500 mb-32 px-5 py-3 rounded-lg"
            activeOpacity={0.7} 
          >
            <Text className="text-white font-bold">Get Started</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default OnBoarding

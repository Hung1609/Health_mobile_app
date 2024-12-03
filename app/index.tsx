import { Text, View, Image, ImageBackground, TouchableOpacity } from "react-native"
import React from "react"
import { StatusBar } from "expo-status-bar"
import { useRouter } from "expo-router"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import * as NavigationBar from "expo-navigation-bar"

const OnBoarding = () => {
  const router = useRouter()

  React.useEffect(() => {
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("#00000000");
    NavigationBar.setButtonStyleAsync("dark");
    
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ImageBackground
          source={require("../assets/images/boarding-bg.jpg")}
          className="flex-1 justify-center items-center px-7"
        >
          <StatusBar 
            style="dark" 
            backgroundColor="#ffffff"
          />
          <View className="w-full h-full flex-1 justify-center items-center">
            <Text className="text-center text-3xl font-bold">Welcome to</Text>
            <Image 
              source={require("../assets/images/health-care-logo.png")}
              className="size-96"
            />
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/Log In/log-in')} 
            className="bg-blue-500 mb-5 px-5 py-3 rounded-lg w-full"
            activeOpacity={0.7} 
          >
            <Text className="text-white font-bold text-xl text-center">Get Started</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default OnBoarding

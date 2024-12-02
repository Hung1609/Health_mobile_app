import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

const Chat = () => {

    return (
        <SafeAreaProvider>
        <SafeAreaView className='flex-1'>
          <View className='w-full h-full bg-white flex-1 px-5'>
            <View className='flex-row items-center justify-between mt-10'>
              <View>
                <Text className='font-bold text-2xl'>Welcome, username</Text>
                <Text className='text-blue-500 text-lg font-semibold'>It's time to change your lifestyle</Text>
              </View>
              <View className='flex-row space-x-1'>
                <Pressable>
                  <Icon className="px-2" name={"search"} size={25} color="black" />
                </Pressable>
                <Pressable>
                  <Icon className="px-2" name={"notifications"} size={25} color="black" />
                </Pressable>
                <Pressable>
                  <Icon className="px-2" name={"person"} size={25} color="black" />
                </Pressable>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      );
}

export default Chat;
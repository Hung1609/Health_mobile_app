import { View, Text, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import tw from "tailwind-react-native-classnames"

const Gender = () => {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className='w-full h-full bg-white px-7 items-center'>
            <Text className='font-bold text-center mt-12 text-3xl'>What's Your Gender?</Text>

            <View className='items-center justify-center flex-1 mb-20'>
                <TouchableOpacity  
                  activeOpacity={0.7} 
                  className='bg-white rounded-full items-center justify-center p-8'
                  style={[
                    selectedGender === 'male' ? tw`bg-blue-500 border-white border-2` : tw`bg-white border-2 border-gray-400`
                  ]}
                  onPress={() => handleGenderSelect('male')}
                >
                  <Icon name="male" size={100} color={selectedGender === 'male' ? 'white' : 'dodgerblue'} />
                </TouchableOpacity>
                <Text className='text-black font-semibold text-3xl mt-3'>Male</Text>
              
                <TouchableOpacity  
                  activeOpacity={0.7} 
                  className='bg-white rounded-full items-center justify-center p-8 mt-14'
                  style={[
                    selectedGender === 'female' ? tw`bg-blue-500 border-white border-2` : tw`bg-white border-2 border-gray-400`
                  ]}
                  onPress={() => handleGenderSelect('female')}
                >
                  <Icon name="female" size={100} color={selectedGender === 'female' ? 'white' : 'hotpink'} />
                </TouchableOpacity>
                <Text className='text-black font-semibold text-3xl mt-3'>Female</Text>
            </View>

            <TouchableOpacity 
              onPress={() => router.push('/Log In/Set Up/age')} 
              className="bg-blue-500 py-3 rounded-lg absolute bottom-5 w-full"
              activeOpacity={0.7} 
            >
              <Text className="text-white font-bold text-xl text-center">Continue</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Gender;

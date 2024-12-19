import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useUser } from '../UserContext';

const FillProfile = () => {
  const router = useRouter();
  const { userData } = useUser();

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <View className='w-full h-full bg-white flex-1 px-7 items-center'>
          <Text className='font-bold text-center mt-12 text-3xl'>Fill Your Profile</Text>
          
          <TouchableOpacity 
            className='mt-14'
            activeOpacity={0.7}
          >
            <View className='w-28 h-28 bg-gray-200 rounded-full justify-center items-center'>
              <Icon name="camera" size={45} color="gray" />
            </View>
            <Text className='text-center text-gray-500 mt-2'>Add Photo</Text>
          </TouchableOpacity>

          <View className='mt-14'>
            <Text className='mb-2 font-semibold'>Full name</Text>
            <TextInput
              placeholder='Enter your full name'
              defaultValue={userData.fullName}
              className='bg-white py-5 px-3 rounded-lg border'
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect={false}
            />
        
            <Text className='mb-2 font-semibold mt-5'>Nickname</Text>
            <TextInput
              placeholder='Enter your nickname'
              className='bg-white py-5 px-3 rounded-lg border'
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect={false}
            />

            <Text className='mb-2 font-semibold mt-5'>Email</Text>
            <TextInput
              placeholder='Enter your email'
              defaultValue={userData.email}
              className='bg-white py-5 px-3 rounded-lg border'
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
            />
          </View>
            
          <TouchableOpacity 
            className="bg-blue-500 py-3 rounded-lg absolute bottom-5 w-full"
            activeOpacity={0.7} 
            onPress={() => router.push('/Log In/success-screen')}
          >
            <Text className="text-white font-bold text-xl text-center">Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default FillProfile;

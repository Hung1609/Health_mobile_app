import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

const ForgotPassword = () => {
  const router = useRouter();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  }

  const toggleConfirmPassword = () => {
    setConfirmPassword(!confirmPassword);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <View className='w-full h-full bg-white flex-1 px-7 items-center'>
            <Text className='font-bold text-center mt-12 text-3xl'>Reset Password</Text>
            <Text className='text-center mt-6 text-blue-500 text-lg font-semibold'>Please enter a new password for your account</Text>
            
            <View className='mt-14'>
                <Text className='mb-2 font-semibold'>Password</Text>
                <View className='relative bg-white rounded-lg border'>
                    <TextInput
                        placeholder='Enter your password'
                        className='py-5 px-3'
                        secureTextEntry={secureTextEntry}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Pressable onPress={toggleSecureTextEntry} className='absolute right-3 top-1/3'>
                        <Icon name={secureTextEntry ? "eye-off" : "eye"} size={20} color="gray" />
                    </Pressable>
                </View>

                <Text className='mb-2 mt-5 font-semibold'>Confirm Password</Text>
                <View className='relative bg-white rounded-lg border'>
                    <TextInput
                        placeholder='Confirm your password'
                        className='py-5 px-3'
                        secureTextEntry={confirmPassword}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Pressable onPress={toggleConfirmPassword} className='absolute right-3 top-1/3'>
                        <Icon name={confirmPassword ? "eye-off" : "eye"} size={20} color="gray" />
                    </Pressable>
                </View>
            </View>
          
          <TouchableOpacity 
            onPress={() => router.push('/Log In/success-screen')} 
            className="bg-blue-500 py-3 rounded-lg absolute bottom-5 w-full"
            activeOpacity={0.7} 
          >
            <Text className="text-white font-bold text-xl text-center">Continue</Text>
          </TouchableOpacity>
          
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default ForgotPassword;

import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

const OtpVerify = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState(['', '', '', '']);

  const inputRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <View className='w-full h-full bg-white flex-1 px-7 items-center'>
          <Text className='font-bold text-center mt-12 text-3xl'>OTP Verification</Text>
          <Text className='text-center mt-6 text-blue-500 text-lg font-semibold'>Enter the OTP sent to {"\n"}
            <Text className='text-center mt-6 text-yellow-500 text-lg font-semibold'>{email}</Text>
          </Text>

          <View className='flex-row justify-around mt-14 w-full px-7'>
            {otp.map((value, index) => (
              <TextInput 
                key={index}
                ref={inputRefs[index]}
                value={value}
                onChangeText={(text) => handleChangeText(text, index)}
                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'}
                maxLength={1}
                className='border rounded-lg text-center text-3xl w-1/5 h-16 font-bold'
              />
            ))}
          </View>
        
          <TouchableOpacity 
            onPress={() => router.push('/Log In/Forgot Password/set-password')} 
            className="bg-blue-500 py-3 rounded-lg absolute bottom-5"
            activeOpacity={0.7} 
          >
            <Text className="text-white font-bold text-xl text-center">Continue</Text>
          </TouchableOpacity>
          
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default OtpVerify;

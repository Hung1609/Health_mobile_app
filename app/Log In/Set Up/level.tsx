import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import tw from "tailwind-react-native-classnames"

const Level = () => {
    const router = useRouter();
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    const levels = [
      'Beginner',
      'Intermediate',
      'Advance'
    ];

    const handleLevelSelection = (level: string) => {
      setSelectedLevel(level);
    };
    
    return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <View className='w-full h-full bg-white flex-1 px-7 items-center'>
          <Text className='font-bold text-center mt-12 text-3xl'>Physical Activity Level</Text>

          <View className='w-full justify-center mb-20 flex-1'>
            {levels.map((level) => (
              <TouchableOpacity
                key={level}
                activeOpacity={0.7}
                className={`rounded-3xl items-center p-4 ${level !== 'Beginner' ? 'mt-10' : ''}`}
                onPress={() => handleLevelSelection(level)}
                style={tw`${selectedLevel === level ? 'bg-blue-500 border-2 border-black' : 'bg-white border-2 border-black'}`}
              >
                <Text 
                  className={`font-bold text-xl ${selectedLevel === level ? 'text-white' : 'text-orange-500'}`}
                >
                  {level}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            className="bg-blue-500 py-3 rounded-lg absolute bottom-5 w-full"
            activeOpacity={0.7} 
            onPress={() => router.push('/Log In/Set Up/fill-profile')}
          >
            <Text className="text-white font-bold text-xl text-center">Continue</Text>
          </TouchableOpacity>  
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Level;

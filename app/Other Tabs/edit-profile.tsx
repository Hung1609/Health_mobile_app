import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from "../Log In/UserContext";

const Editprofile = () => {
    const navigation = useNavigation();
    const { userData, updateUserData } = useUser();
    const [fullName, setFullName] = useState(userData?.full_name || "");
    const [age, setAge] = useState(userData?.age || "");
    const [height, setHeight] = useState(userData?.height || "");
    const [weight, setWeight] = useState(userData?.weight || "");
    const [email, setEmail] = useState(userData?.email || ""); 
    
    const handleSave = () => {
        updateUserData({
            full_name: fullName,
            age: Number(age),
            height: Number(height),
            weight: Number(weight),
            email: email,
        });
        navigation.goBack();
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1 bg-white px-4'>
                <View className="flex-1 ">
                    {/* Header Section */}
                    <View className="py-2">
                        <View>
                            <Text className='font-semibold mt-4 mb-2'>Full Name</Text>
                            <TextInput
                                placeholder='Change your full name'
                                className='bg-white py-5 px-3 rounded-lg border'
                                autoCapitalize='none'
                                autoCorrect={false}
                                value={fullName}
                                onChangeText={setFullName}
                                keyboardType='default'
                            />

                            <Text className='font-semibold mt-5 mb-2'>Email</Text>
                            <TextInput
                                placeholder='Change your Email'
                                className='bg-white py-5 px-3 rounded-lg border'
                                autoCapitalize='none'
                                autoCorrect={false}
                                value={email}
                                onChangeText={setEmail}
                            />

                            <Text className='font-semibold mt-5 mb-2'>Weight (kg)</Text>
                            <TextInput
                                placeholder='Change your weight'
                                className='bg-white py-5 px-3 rounded-lg border'
                                autoCapitalize='none'
                                autoCorrect={false}
                                value={weight.toString()}
                                onChangeText={setWeight}
                            />

                            <Text className='font-semibold mt-5 mb-2'>Height (cm)</Text>
                            <TextInput
                                placeholder='Change your height'
                                className='bg-white py-5 px-3 rounded-lg border'
                                autoCapitalize='none'
                                autoCorrect={false}
                                value={height.toString()}
                                onChangeText={setHeight}
                            />

                            <Text className='font-semibold mt-5 mb-2'>Age</Text>
                            <TextInput
                                placeholder='Change your age'
                                className='bg-white py-5 px-3 rounded-lg border'
                                autoCapitalize='none'
                                autoCorrect={false}
                                value={age.toString()}
                                onChangeText={setAge}
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="fixed bottom-0 items-center justify-center w-full h-14 bg-blue-500 rounded-3xl mb-2"
                    onPress={() => handleSave()}
                >
                    <Text className='font-bold text-white text-xl'>Save Changes</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Editprofile;

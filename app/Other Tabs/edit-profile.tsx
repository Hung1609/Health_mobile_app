import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const Editprofile = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1 bg-white px-4'>
                <View className="flex-1 ">
                    {/* Header Section */}
                    <View className="py-4">
                        <Pressable
                            className="absolute flex-row items-center left-0 m-3"
                            onPress={() => navigation.goBack()}>
                            <Icon name="caret-back" size={20} color="black" />
                            <Text className=''>My Profile</Text>
                        </Pressable>
                        <View className='my-8'>
                            <Text className='font-semibold mt-5 mb-2'>Full Name</Text>
                            <TextInput
                                placeholder='Change your full name'
                                className='bg-white py-5 px-3 rounded-lg border'
                                autoCapitalize='none'
                                autoCorrect={false}
                            />

                            <Text className='font-semibold mt-5 mb-2'>Email</Text>
                            <TextInput
                                placeholder='Change your Email'
                                className='bg-white py-5 px-3 rounded-lg border'
                                autoCapitalize='none'
                                autoCorrect={false}
                            />

                            <Text className='font-semibold mt-5 mb-2'>Phone number</Text>
                            <TextInput
                                placeholder='Change your phone nuumber'
                                className='bg-white py-5 px-3 rounded-lg border'
                                autoCapitalize='none'
                                autoCorrect={false}
                            />

                            <Text className='font-semibold mt-5 mb-2'>Date of birth</Text>
                            <TextInput
                                placeholder='Change your full name'
                                className='bg-white py-5 px-3 rounded-lg border'
                                autoCapitalize='none'
                                autoCorrect={false}
                            />

                            <Text className='font-semibold mt-5 mb-2'>Weight</Text>
                            <TextInput
                                placeholder='Change your weight'
                                className='bg-white py-5 px-3 rounded-lg border'
                                autoCapitalize='none'
                                autoCorrect={false}
                            />

                            <Text className='font-semibold mt-5 mb-2'>Height</Text>
                            <TextInput
                                placeholder='Change your height'
                                className='bg-white py-5 px-3 rounded-lg border'
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="fixed bottom-0 items-center justify-center w-full h-14 bg-blue-500 rounded-3xl mb-2"
                    onPress={() => navigation.goBack()}
                >
                    <Text className='font-bold text-white text-xl'>Confirm</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Editprofile;

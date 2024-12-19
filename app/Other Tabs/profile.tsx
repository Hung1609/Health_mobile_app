import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const Notification = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1'>
                <ScrollView className="flex-1 ">
                    {/* Header Section */}
                    <View className="bg-blue-400 p-4 items-center m-2 border-2 border-white rounded-lg">
                        <Pressable
                            className="absolute flex-row items-center left-0 m-3"
                            onPress={() => navigation.goBack()}>
                            <Icon name="caret-back" size={20} color="black" />
                            <Text className=''>Home</Text>
                        </Pressable>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/100' }}
                            className="w-24 h-24 rounded-full border-4 border-black mt-10"
                        />

                        {/* User Info */}
                        <Text className="text-black text-xl font-bold mt-2">Madison Smith</Text>
                        <Text className="text-black-200 text-sm">madisons@example.com</Text>
                        <Text className="text-black text-base font-semibold mt-1">
                            Birthday: <Text className="text-black-200">April 1st</Text>
                        </Text>

                        {/* Stats Section */}
                        <View className="flex-row justify-around w-full border-2 border-black rounded-xl py-3 mt-4">
                            <View className="items-center">
                                <Text className="text-black text-lg font-bold">75 Kg</Text>
                                <Text className="text-black-200 text-xs">Weight</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-black text-lg font-bold">28</Text>
                                <Text className="text-black-200 text-xs">Years Old</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-black text-lg font-bold">1.65 CM</Text>
                                <Text className="text-black-200 text-xs">Height</Text>
                            </View>
                        </View>
                    </View>

                    {/* Menu Section */}
                    <View className="p-3">
                        <Pressable
                            className='flex-row items-center h-14'
                            onPress={() => router.push('/Other Tabs/edit-profile')}>
                            <Icon name="pencil" size={20} color="black" className='mr-2' />
                            <Text>Edit Profile</Text>
                            <Icon name="caret-forward" size={20} color="black" className='absolute right-0' />
                        </Pressable>

                        <Pressable
                            className='flex-row items-center mt-3 h-14'
                            onPress={() => router.push('/Main Tabs/favourite')}>
                            <Icon name="star" size={20} color="black" className='mr-2' />
                            <Text>Favorite</Text>
                            <Icon name="caret-forward" size={20} color="black" className='absolute right-0' />
                        </Pressable>

                        <Pressable
                            className='flex-row items-center mt-3 h-14'
                            onPress={() => router.push('/Other Tabs/policy')}>
                            <Icon name="shield-checkmark" size={20} color="black" className='mr-2' />
                            <Text>Privacy Policy</Text>
                            <Icon name="caret-forward" size={20} color="black" className='absolute right-0' />
                        </Pressable>

                        <Pressable
                            className='flex-row items-center mt-3 h-14'
                            onPress={() => router.push('/Other Tabs/setting')}>
                            <Icon name="settings" size={20} color="black" className='mr-2' />
                            <Text>Settings</Text>
                            <Icon name="caret-forward" size={20} color="black" className='absolute right-0' />
                        </Pressable>

                        <Pressable className='flex-row items-center mt-3 h-14'>
                            <Icon name="exit" size={20} color="black" className='mr-2' />
                            <Text>Logout</Text>
                            <Icon name="caret-forward" size={20} color="black" className='absolute right-0' />
                        </Pressable>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Notification;

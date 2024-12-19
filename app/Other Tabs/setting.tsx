import React, { useState, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ListRenderItem, FlatList, Pressable } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from '@react-navigation/native';
import { router } from "expo-router";

const Setting = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <View>
                    <Pressable
                        className="flex-row items-center left-0 m-3"
                        onPress={() => navigation.goBack()}>
                        <Icon name="caret-back" size={20} color="black" />
                        <Text className=''>My Profile</Text>
                    </Pressable>
                    <View className=" items-center mb-3 p-4">
                        <Pressable
                            className="flex-row items-center mb-5"
                            onPress={() => router.push('/Other Tabs/notification-setting')}>
                            <View className="bg-mau_sac1 rounded-full h-12 w-12 justify-center items-center">
                                <Icon name="notifications" size={20} color="white" />
                            </View>
                            <Text className="flex-1 ml-4 font-bold text-lg">Notification Setting</Text>
                            <Icon name="caret-forward" size={20} color="black" />
                        </Pressable>

                        <Pressable
                            className="flex-row items-center mb-5"
                            onPress={() => router.push('/Other Tabs/account-setting')}>

                            <View className="bg-mau_sac1 rounded-full h-12 w-12 justify-center items-center">
                                <Icon name="person" size={20} color="white" />
                            </View>
                            <Text className="flex-1 ml-4 font-bold text-lg">Account Setting</Text>
                            <Icon name="caret-forward" size={20} color="black" />
                        </Pressable>

                        <Pressable
                            className="flex-row items-center mb-5"
                            onPress={() => router.push('/Other Tabs/system-setting')}>
                            <View className="bg-mau_sac1 rounded-full h-12 w-12 justify-center items-center">
                                <Icon name="hardware-chip" size={20} color="white" />
                            </View>
                            <Text className="flex-1 ml-4 font-bold text-lg">System Setting</Text>
                            <Icon name="caret-forward" size={20} color="black" />
                        </Pressable>

                        <Pressable className="flex-row items-center mb-5">
                            <View className="bg-mau_sac1 rounded-full h-12 w-12 justify-center items-center">
                                <Icon name="person-remove" size={20} color="white" />
                            </View>
                            <Text className="flex-1 ml-4 font-bold text-lg">Delete Account</Text>
                            <Icon name="caret-forward" size={20} color="black" />
                        </Pressable>
                    </View>

                </View>
            </SafeAreaView>
        </SafeAreaProvider >
    );
}

export default Setting;
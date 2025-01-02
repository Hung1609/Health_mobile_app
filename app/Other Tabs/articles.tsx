import React from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLocalSearchParams } from "expo-router";

const Articles = () => {
    const route = useRoute();
    const params = useLocalSearchParams();

    const navigation = useNavigation();
    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1'>
                <Pressable
                    className="flex-row items-center m-3"
                    onPress={() => navigation.goBack()}>
                    <Icon name="caret-back" size={20} color="black" />
                    <Text className='font-bold text-2xl'>Articles</Text>
                </Pressable>
                <ScrollView className="flex-1 bg-white">
                    <View className="relative py-4 px-2">
                        <Image
                            source={{
                                uri: "https://via.placeholder.com/300x150",
                            }}
                            className="w-full h-60 rounded-2xl"
                        />
                        <View className="absolute bottom-5 left-4 right-4">
                            <Text className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-bold self-start">
                                {params.title}
                            </Text>
                            <Pressable className="absolute right-4">
                                <Icon name="star-outline" size={24} color="#FFC107" />
                            </Pressable>
                        </View>
                    </View>

                    {/* Articles */}
                    <View className="mt-5 px-5">
                        <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium eveniet esse voluptate, distinctio minus consequuntur. Accusantium exercitationem, minus ipsa doloribus error fuga mollitia quam soluta beatae sit necessitatibus, quia cumque.</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};


export default Articles;

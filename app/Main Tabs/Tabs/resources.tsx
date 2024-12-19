import React from "react";
import { StyleSheet, Text, View, Pressable, Alert, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native";


const handlePress = () => {
    Alert.alert('Button Pressed', 'You just clicked the button!');
};

const Resource = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1'>
                <ScrollView>

                    <View className='w-full h-full bg-white flex-1 px-5'>
                        <View className='flex-row items-center justify-between mt-10'>

                            <View>
                                <Text className='font-bold text-2xl'>Resources</Text>
                            </View>

                            <View className='flex-row space-x-1'>

                                <Pressable onPress={handlePress}>
                                    <Icon className="px-2" name={"search"} size={25} color="black" />
                                </Pressable>

                                <Pressable>
                                    <Icon className="px-2" name={"notifications"} size={25} color="black" />
                                </Pressable>

                                <Pressable>
                                    <Icon className="px-2" name={"person"} size={25} color="black" />
                                </Pressable>
                            </View>
                        </View>

                        <View className="flex-row justify-between items-center mt-10 w-full">

                            <Pressable onPress={handlePress} className="items-center w-[48%] bg-mau_sac1 border border-purple-500 px-3 py-3 rounded-full">
                                <Text className="text-center">Workout Videos</Text>
                            </Pressable>

                            <Pressable className="items-center w-[48%] bg-white border border-purple-500 px-6 py-3 rounded-full">
                                <Text className="text-center">Articles & Tips</Text>
                            </Pressable>

                        </View>
                    </View>

                    <View className="mt-6">

                        <View>
                            <Text className="text-lg font-bold mx-3">Quick & easy workout</Text>
                            <Text className="text-sm font-semibold mx-3">Discover fresh workouts & elevate your training</Text>
                        </View>
                        <View className="flex-row flex-wrap justify-center">
                            <View className="w-[48%] bg-gray-100 rounded-lg p-3">
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    className="h-32 w-full rounded-lg"
                                />
                                <Text className="text-black font-bold mt-2">Squat Exercise</Text>
                                <View className="flex-row items-center justify-between mt-1">
                                    <Text className="text-gray-600 text-sm">12 Minutes</Text>
                                    <Text className="text-gray-600 text-sm">120 Kcal</Text>
                                </View>
                                <Pressable className="absolute bottom-12 right-3">
                                    <Icon name="play-circle" size={24} color="black" />
                                </Pressable>
                                <Pressable className="absolute top-3 right-3">
                                    <Icon name="star" size={24} color="#FFC107" />
                                </Pressable>
                            </View>

                            <View className="w-[48%] bg-gray-100 rounded-lg p-3">
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    className="h-32 w-full rounded-lg"
                                />
                                <Text className="text-black font-bold mt-2">Full Body Stretching</Text>
                                <View className="flex-row items-center justify-between mt-1">
                                    <Text className="text-gray-600 text-sm">12 Minutes</Text>
                                    <Text className="text-gray-600 text-sm">120 Kcal</Text>
                                </View>
                                <Pressable className="absolute bottom-12 right-3">
                                    <Icon name="play-circle" size={24} color="black" />
                                </Pressable>
                                <Pressable className="absolute top-3 right-3">
                                    <Icon name="star-outline" size={24} color="#FFC107" />
                                </Pressable>
                            </View>

                            <View className="w-[48%] bg-gray-100 rounded-lg p-3">
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    className="h-32 w-full rounded-lg"
                                />
                                <Text className="text-black font-bold mt-2">Lateral raise</Text>
                                <View className="flex-row items-center justify-between mt-1">
                                    <Text className="text-gray-600 text-sm">12 Minutes</Text>
                                    <Text className="text-gray-600 text-sm">120 Kcal</Text>
                                </View>
                                <Pressable className="absolute bottom-12 right-3">
                                    <Icon name="play-circle" size={24} color="black" />
                                </Pressable>
                                <Pressable className="absolute top-3 right-3">
                                    <Icon name="star-outline" size={24} color="#FFC107" />
                                </Pressable>
                            </View>

                            <View className="w-[48%] bg-gray-100 rounded-lg p-3">
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    className="h-32 w-full rounded-lg"
                                />
                                <Text className="text-black font-bold mt-2">Lateral raise</Text>
                                <View className="flex-row items-center justify-between mt-1">
                                    <Text className="text-gray-600 text-sm">12 Minutes</Text>
                                    <Text className="text-gray-600 text-sm">120 Kcal</Text>
                                </View>
                                <Pressable className="absolute bottom-12 right-3">
                                    <Icon name="play-circle" size={24} color="black" />
                                </Pressable>
                                <Pressable className="absolute top-3 right-3">
                                    <Icon name="star-outline" size={24} color="#FFC107" />
                                </Pressable>
                            </View>

                            <View className="w-[48%] bg-gray-100 rounded-lg p-3">
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    className="h-32 w-full rounded-lg"
                                />
                                <Text className="text-black font-bold mt-2">Lateral raise</Text>
                                <View className="flex-row items-center justify-between mt-1">
                                    <Text className="text-gray-600 text-sm">12 Minutes</Text>
                                    <Text className="text-gray-600 text-sm">120 Kcal</Text>
                                </View>
                                <Pressable className="absolute bottom-12 right-3">
                                    <Icon name="play-circle" size={24} color="black" />
                                </Pressable>
                                <Pressable className="absolute top-3 right-3">
                                    <Icon name="star-outline" size={24} color="#FFC107" />
                                </Pressable>
                            </View>

                            <View className="w-[48%] bg-gray-100 rounded-lg p-3">
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    className="h-32 w-full rounded-lg"
                                />
                                <Text className="text-black font-bold mt-2">Lateral raise</Text>
                                <View className="flex-row items-center justify-between mt-1">
                                    <Text className="text-gray-600 text-sm">12 Minutes</Text>
                                    <Text className="text-gray-600 text-sm">120 Kcal</Text>
                                </View>
                                <Pressable className="absolute bottom-12 right-3">
                                    <Icon name="play-circle" size={24} color="black" />
                                </Pressable>
                                <Pressable className="absolute top-3 right-3">
                                    <Icon name="star-outline" size={24} color="#FFC107" />
                                </Pressable>
                            </View>

                            <View className="w-[48%] bg-gray-100 rounded-lg p-3">
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    className="h-32 w-full rounded-lg"
                                />
                                <Text className="text-black font-bold mt-2">Lateral raise</Text>
                                <View className="flex-row items-center justify-between mt-1">
                                    <Text className="text-gray-600 text-sm">12 Minutes</Text>
                                    <Text className="text-gray-600 text-sm">120 Kcal</Text>
                                </View>
                                <Pressable className="absolute bottom-12 right-3">
                                    <Icon name="play-circle" size={24} color="black" />
                                </Pressable>
                                <Pressable className="absolute top-3 right-3">
                                    <Icon name="star-outline" size={24} color="#FFC107" />
                                </Pressable>
                            </View>

                            <View className="w-[48%] bg-gray-100 rounded-lg p-3">
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    className="h-32 w-full rounded-lg"
                                />
                                <Text className="text-black font-bold mt-2">Lateral raise</Text>
                                <View className="flex-row items-center justify-between mt-1">
                                    <Text className="text-gray-600 text-sm">12 Minutes</Text>
                                    <Text className="text-gray-600 text-sm">120 Kcal</Text>
                                </View>
                                <Pressable className="absolute bottom-12 right-3">
                                    <Icon name="play-circle" size={24} color="black" />
                                </Pressable>
                                <Pressable className="absolute top-3 right-3">
                                    <Icon name="star-outline" size={24} color="#FFC107" />
                                </Pressable>
                            </View>

                            <View className="w-[48%] bg-gray-100 rounded-lg p-3">
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    className="h-32 w-full rounded-lg"
                                />
                                <Text className="text-black font-bold mt-2">Lateral raise</Text>
                                <View className="flex-row items-center justify-between mt-1">
                                    <Text className="text-gray-600 text-sm">12 Minutes</Text>
                                    <Text className="text-gray-600 text-sm">120 Kcal</Text>
                                </View>
                                <Pressable className="absolute bottom-12 right-3">
                                    <Icon name="play-circle" size={24} color="black" />
                                </Pressable>
                                <Pressable className="absolute top-3 right-3">
                                    <Icon name="star-outline" size={24} color="#FFC107" />
                                </Pressable>
                            </View>

                            <View className="w-[48%] bg-gray-100 rounded-lg p-3">
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    className="h-32 w-full rounded-lg"
                                />
                                <Text className="text-black font-bold mt-2">Lateral raise</Text>
                                <View className="flex-row items-center justify-between mt-1">
                                    <Text className="text-gray-600 text-sm">12 Minutes</Text>
                                    <Text className="text-gray-600 text-sm">120 Kcal</Text>
                                </View>
                                <Pressable className="absolute bottom-12 right-3">
                                    <Icon name="play-circle" size={24} color="black" />
                                </Pressable>
                                <Pressable className="absolute top-3 right-3">
                                    <Icon name="star-outline" size={24} color="#FFC107" />
                                </Pressable>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default Resource;
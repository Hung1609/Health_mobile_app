import React from "react";
import { StyleSheet, Text, View, Pressable, Alert, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native";


const handlePress = () => {
    Alert.alert('Button Pressed', 'You just clicked the button!');
};

const Favourite = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1'>
                <ScrollView>

                    <View className='w-full h-full bg-white flex-1 px-5'>
                        <View className='flex-row items-center justify-between mt-10'>

                            <View>
                                <Text className='font-bold text-2xl'>Favourites</Text>
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

                        <View className="flex-row justify-center items-center mt-10 w-full">

                            <Text className="mr-5">Sort by: </Text>

                            <Pressable onPress={handlePress} className="items-center w-1/5 bg-mau_sac1 border border-black py-2 rounded-full mx-2">
                                <Text className="text-center">All</Text>
                            </Pressable>

                            <Pressable className="items-center w-1/5 bg-white border border-black py-2 rounded-full mx-2">
                                <Text className="text-center">Video</Text>
                            </Pressable>

                            <Pressable className="items-center w-1/5 bg-white border border-black py-2 rounded-full mx-2">
                                <Text className="text-center">Articles</Text>
                            </Pressable>

                        </View>
                    </View>

                    <View className="mt-6">

                        <View>
                            <Text className="text-lg font-bold mx-3">Quick & easy workout</Text>
                            <Text className="text-sm font-semibold mx-3">Discover fresh workouts & elevate your training</Text>
                        </View>
                        <View className="flex-col justify-center">

                            {/* Exercise */}
                            <View className="flex-row bg-mau_sac1 rounded-lg p-1 m-2">
                                <View className="flex-1 justify-center mx-3">
                                    <Text className="text-white font-bold text-lg">Upper Body</Text>

                                    <View className="flex-row items-center mt-2 space-x-2">
                                        <View className="flex-row items-center mx-1">
                                            <Icon className="" name={"watch"} size={12} color="black" />
                                            <Text className="text-gray-400 text-sm"> 60 Minutes</Text>
                                        </View>
                                        <View className="flex-row items-center mx-1">
                                            <Icon2 className="" name={"fire"} size={12} color="black" />
                                            <Text className="text-gray-400 text-sm"> 1320 Kcal</Text>
                                        </View>
                                    </View>
                                    <View className="flex-row items-center mx-1">
                                        <Icon className="" name={"barbell"} size={12} color="black" />
                                        <Text className="text-gray-400 text-sm"> 5 Exercises</Text>
                                    </View>
                                </View>
                                <View className="w-[48%] bg-gray-100 rounded-lg">
                                    <View className="flex-row bg-mau_sac2 rounded-lg h-32">
                                        <Pressable className="flex-1 justify-center items-center">
                                            <Icon name="play-circle" size={24} color="black" />
                                        </Pressable>
                                        <Pressable className="absolute top-1 right-1">
                                            <Icon name="star" size={24} color="#FFC107" />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>

                            {/* Article */}
                            <View className="flex-row bg-mau_sac1 rounded-lg p-1 m-2">
                                <View className="flex-1 justify-center mx-3">
                                    <Text className="text-white font-bold text-lg">Boost energy and vitality</Text>

                                    <View className="flex-row items-center mt-2 space-x-2">
                                        <Text numberOfLines={3}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum voluptatibus nisi porro commodi assumenda. Cum, fugiat tempora! Omnis molestiae dicta, nemo aperiam nostrum est! Voluptatem unde ratione quam at iure?</Text>
                                    </View>
                                </View>
                                <View className="w-[48%] bg-gray-100 rounded-lg">
                                    <View className="flex-row bg-mau_sac2 rounded-lg h-32">
                                        <Pressable className="absolute top-1 right-1">
                                            <Icon name="star" size={24} color="#FFC107" />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default Favourite;
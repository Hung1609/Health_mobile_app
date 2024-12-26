import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import WorkoutScreen from "../Home/workout";
import ProgressScreen from "../Home/progress";
import NutritionScreen from "../Home/nutrition";
import CommunityScreen from "../Home/community";
import { router } from "expo-router";

const TopTab = createMaterialTopTabNavigator();

const CustomTopTabBar = ({ state, descriptors, navigation }: any) => {
  type TabName = "Workout" | "Progress" | "Nutrition" | "Community";

  return (
    <View className="w-full px-5 bg-white">
      <View className='flex-row items-center justify-between mt-14'>

        <View>
          <Text className='font-bold text-2xl'>Welcome, username</Text>
          <Text className='text-blue-500 text-lg font-semibold'>It's time to change your lifestyle</Text>
        </View>

        <View className='flex-row space-x-1'>

          <TouchableOpacity activeOpacity={0.7}>
            <Icon className="px-2" name={"search"} size={25} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/Other Tabs/notification')}>
            <Icon className="px-2" name={"notifications"} size={25} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/Other Tabs/profile')}>
            <Icon className="px-2" name={"person"} size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row my-6 justify-center items-center">
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = (options.tabBarLabel ?? route.name) as TabName; // Explicitly cast label

          const isFocused = state.index === index;

          const handlePress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const icon: Record<TabName, JSX.Element> = {
            Workout: <Icon2 name="dumbbell" size={25} color={isFocused ? "#3B82F6" : "black"} />,
            Progress: <Icon2 name="clipboard-list" size={25} color={isFocused ? "#3B82F6" : "black"} />,
            Nutrition: <Icon2 name="apple-alt" size={25} color={isFocused ? "#3B82F6" : "black"} />,
            Community: <Icon name="people" size={25} color={isFocused ? "#3B82F6" : "black"} />,
          };

          return (
            <React.Fragment key={route.key}>
              <TouchableOpacity
                className="items-center w-1/4 justify-center"
                onPress={handlePress}
                activeOpacity={0.7}
              >
                {icon[label]}
                <Text className={`text-center ${isFocused ? "text-blue-500 font-bold" : "text-black"}`}>
                  {label}
                </Text>
              </TouchableOpacity>
              {index < state.routes.length - 1 && (
                <View className="h-full w-[1px] bg-gray-300" />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};


const HomeScreen = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <CustomTopTabBar {...props} />}
    >
      <TopTab.Screen name="Workout" component={WorkoutScreen} />
      <TopTab.Screen name="Progress" component={ProgressScreen} />
      <TopTab.Screen name="Nutrition" component={NutritionScreen} />
      <TopTab.Screen name="Community" component={CommunityScreen} />
    </TopTab.Navigator>
  );
};

export default HomeScreen;

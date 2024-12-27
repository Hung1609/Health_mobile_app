import React, { useState } from "react";
import { Text, View, Pressable, Image, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Calendar, DateData } from "react-native-calendars";

const activities = [
  { id: 1, title: "Morning Run", calories: 300, date: "2024-12-26" },
  { id: 2, title: "Yoga", calories: 150, date: "2024-12-27" },
  { id: 3, title: "Cycling", calories: 250, date: "2024-12-26" },
];

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Progress = () => {
  const [selectedDate, setSelectedDate] = useState<string>(getToday());

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const filteredActivities = activities.filter(
    (activity) => activity.date === selectedDate
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1'>
        <ScrollView>
          <View className="mt-3">
            <View className="bg-blue-500 p-4 items-center m-2 border-2 border-white rounded-3xl">
              {/* User Info */}
              <Text className="text-white text-xl font-bold ">Madison Smith</Text>

              {/* Stats Section */}
              <View className="flex-row justify-around w-full border-2 border-white rounded-xl py-3 mt-4">
                <View className="items-center">
                  <Text className="text-white text-lg font-bold">75 Kg</Text>
                  <Text className="text-white text-xs">Weight</Text>
                </View>
                <View className="items-center">
                  <Text className="text-white text-lg font-bold">28</Text>
                  <Text className="text-white text-xs">Years Old</Text>
                </View>
                <View className="items-center">
                  <Text className="text-white text-lg font-bold">1.65 CM</Text>
                  <Text className="text-white text-xs">Height</Text>
                </View>
              </View>
            </View>
            <View>
              <View className="border-blue-500 border-2 rounded-md m-2">
                <Calendar
                  onDayPress={onDayPress}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      marked: true,
                      selectedColor: "#007BFF",
                    },
                  }}
                  theme={{
                    backgroundColor: "#FFFFFF",
                    calendarBackground: "#FFFFFF",
                    textSectionTitleColor: "#007BFF",
                    selectedDayBackgroundColor: "#007BFF",
                    selectedDayTextColor: "#ffffff",
                    todayTextColor: "#007BFF",
                    dayTextColor: "#2d4150",
                    textDisabledColor: "#d9e1e8",
                    arrowColor: "#007BFF",
                    monthTextColor: "#007BFF",
                    indicatorColor: "#007BFF",
                  }}
                /></View>
              <Text className="m-5 text-lg font-bold text-darkBlue">Activities</Text>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((item) => (
                  <View
                    className="mx-2"
                    key={item.id}>
                    <View className="flex-row items-center border-blue-500 border-2 bg-white my-2 rounded-lg p-3">
                      <View className="bg-blue-500 rounded-full h-10 w-10 justify-center items-center">
                        <Icon name="checkmark-done" size={20} color="white" />
                      </View>
                      <View className="ml-3 flex-1">
                        <Text className="text-black font-bold">{item.title}</Text>
                        <Text className="text-gray-500 text-sm">Calories Burned: {item.calories} kcal</Text>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <Text className="mx-2 text-gray-500 text-center">No activities for this date.</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Progress;
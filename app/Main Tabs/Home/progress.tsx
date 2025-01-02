import React, { useState } from "react";
import { Text, View, Pressable, Image, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from 'react-native-vector-icons/Octicons';
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Calendar, DateData } from "react-native-calendars";
import { LineChart, BarChart } from 'react-native-chart-kit';

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'], // X-axis labels
  datasets: [
    {
      data: [150, 170, 200, 250, 230, 170, 190, 240, 240, 240, 240, 240], // Y-axis values
    },
  ],
};

const activities = [
  { id: 1, title: "Morning Run", calories: 300, time: '20 Minutes', date: "2024-12-26" },
  { id: 2, title: "Yoga", calories: 150, time: '20 Minutes', date: "2024-12-27" },
  { id: 3, title: "Cycling", calories: 250, time: '20 Minutes', date: "2024-12-26" },
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
  const [currentView, setCurrentView] = useState<"calendar" | "tracking">("calendar");

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const filteredActivities = activities.filter(
    (activity) => activity.date === selectedDate
  );

  // Set width for the BarChart
  const fixedBarWidth = 70;
  const minChartWidth = Dimensions.get('window').width - 20;
  const dataLength = chartData.datasets[0].data.length;
  const chartWidth = fixedBarWidth * dataLength;
  const finalChartWidth = Math.max(chartWidth, minChartWidth);

  // Get the current day name
  const getDayName = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[new Date().getDay()];
  };

  // Get the current year, month, day
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  // Weekly data
  const weeklyData = [
    {
      day: getDayName(),
      date: `${currentDay}/${currentMonth}`,
      calories: 1200,
      duration: "30m",
    },
    {
      day: getDayName(),
      date: `${currentDay}/${currentMonth}`,
      calories: 1500,
      duration: "45m",
    },
    {
      day: getDayName(),
      date: `${currentDay}/${currentMonth}`,
      calories: 2000,
      duration: "20m",
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 bg-white'>
        <ScrollView>
          <View className="mx-4">
            <View className="bg-blue-500 p-4 items-center mt-2 mb-2 rounded-3xl">
              {/* User Info */}
              <Text className="text-white text-xl font-bold">Madison Smith</Text>

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

            <View className="flex-row justify-center gap-4 my-4">
              <TouchableOpacity
                onPress={() => setCurrentView("calendar")} 
                activeOpacity={0.7}
                className={`p-2 w-1/3 border border-blue-500 rounded-3xl justify-center items-center
                  ${currentView === "calendar" ? "bg-blue-500" : "bg-white"}`}
              >
                <Text className={`${currentView === "calendar" ? "text-white font-semibold" : "text-black"}`}>Workout Log</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setCurrentView("tracking")}
                activeOpacity={0.7}
                className={`py-2 w-1/3 border border-blue-500 rounded-3xl justify-center items-center
                  ${currentView === "tracking" ? "bg-blue-500" : "bg-white"}`}
              >
                <Text className={`${currentView === "tracking" ? "text-white font-semibold" : "text-black"}`}>Charts</Text>
              </TouchableOpacity>
            </View>

            {currentView === "calendar" ? (
              <View>
                <View className="border-blue-500 border-2 rounded-3xl my-4 overflow-hidden">
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
                  />
                </View>
                
                <View className="mb-2">
                  <Text className="mt-3 mb-2 text-xl font-bold text-yellow-500">Activities</Text>
                  {filteredActivities.length > 0 ? (
                    filteredActivities.map((item) => (
                      <View
                        key={item.id}>
                        <View className="flex-row items-center border-blue-500 border-2 bg-white my-2 rounded-3xl p-3">
                          <View className="bg-blue-500 rounded-full h-10 w-10 justify-center items-center">
                            <Icon name="checkmark-done" size={20} color="white" />
                          </View>
                          <View className="ml-3">
                            <Text className="text-black font-bold">{item.title}</Text>
                            <View className="flex-row gap-5">
                              <View className="flex-row items-center gap-1">
                                <Icon name="time-outline" />
                                <Text className="text-gray-500 text-sm">{item.time}</Text>
                              </View>
                              <View className='flex-row items-center gap-1'>
                                <Icon2 name="flame" color="gray" />
                                <Text className="text-gray-500 text-sm">{item.calories} Cal</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text className="mx-2 mb-2 text-gray-500 text-center">No activities for this date.</Text>
                  )}
                </View>
              </View>
            ) : (
              <View className="flex-1 justify-center items-center mb-4">
                <Text className="text-yellow-500 text-xl font-bold mt-2 mb-8">My progress in {currentYear}</Text>

                <ScrollView 
                  horizontal={true} 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', marginBottom: 6 }}
                >
                <BarChart
                  data={chartData}
                  width={finalChartWidth}
                  height={220}
                  chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    fillShadowGradientOpacity: 1,
                    decimalPlaces: 0, // Remove decimal points
                    color: (opacity = 1) => `rgba(29, 78, 216, ${opacity})`, // Bar color
                    labelColor: (opacity = 1) => `rgba(234, 179, 80, ${opacity})`, // Label color
                    style: {
                      borderRadius: 16,
                    },
                    propsForBackgroundLines: {
                      stroke: 'lightgray', // Line color
                      strokeDasharray: "5", // Remove dashed lines
                      strokeWidth: 0.5, // Line width
                    },
                  }}
                  verticalLabelRotation={0}
                  yAxisLabel="" // Optional: Add a prefix (e.g., "$", "kcal", etc.)
                  yAxisSuffix=" cal" // Optional: Add a suffix (e.g., " kcal", " steps")
                  showValuesOnTopOfBars={true}
                  fromZero={true}
                />
                </ScrollView>

                {weeklyData.map((item, index) => (
                <View 
                  key={index}
                  className="mt-4 bg-blue-500 rounded-3xl py-2 flex-row w-full items-center justify-evenly"
                >
                  <View className="justify-center items-center">
                    <Text className="text-white text-sm">{item.day}</Text>
                    <Text className="text-white font-bold text-xl">{item.date}</Text>
                  </View>
                  <View className="h-full w-[1px] bg-white" />
                  <View className="justify-center items-center">
                    <Text className="text-white text-sm">Calories</Text>
                    <View className="flex-row items-center gap-1">
                      <Icon2 name="flame" size={20} color="white" />
                      <Text className="text-white font-bold text-xl">{item.calories}</Text>
                    </View>
                  </View>
                  <View className="justify-center items-center">
                    <Text className="text-white text-sm">Duration</Text>
                    <View className="flex-row items-center gap-1">
                      <Icon name="time-outline" size={20} color="white" />
                      <Text className="text-white font-bold text-xl">{item.duration}</Text>
                    </View>
                  </View>
                </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Progress;
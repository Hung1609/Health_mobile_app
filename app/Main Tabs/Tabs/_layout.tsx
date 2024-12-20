import { View, Text } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { Stack } from "expo-router"
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome5";

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#3b82f6',
                tabBarInactiveTintColor: '#393E46',
                tabBarStyle: {
                    height: 70,
                    backgroundColor: '#ffffff',
                    borderColor: '#112D4E'
                }
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon className="justify-center align-middle" name={"home"} size={20} color={color} />
                    )
                }} />
            <Tabs.Screen
                name="resources"
                options={{
                    title: 'Resources',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon className="justify-center align-middle" name={"bookmarks"} size={20} color={color} />
                    )
                }} />
            <Tabs.Screen
                name="favourite"
                options={{
                    title: 'Favourites',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon className="justify-center align-middle" name={"star"} size={20} color={color} />
                    )
                }} />
            <Tabs.Screen
                name="chat"
                options={{
                    title: 'Chatbot',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon2 className="justify-center align-middle" name={"comments"} size={20} color={color} />
                    )
                }} />
        </Tabs>
    )
}

export default TabLayout
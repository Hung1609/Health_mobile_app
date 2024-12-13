import { View, Text } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { Stack } from "expo-router"
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome5";

const TabLayout = () => {
    return (
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#4CC9FE',
                    tabBarInactiveTintColor: 'white',
                    tabBarStyle: {
                        height: 60,
                        backgroundColor: '#3C3D37',
                    }
                }}>
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <Icon className="justify-center align-middle" name={"home"} size={20} color={color} />
                        )
                    }} />
                <Tabs.Screen
                    name="resources"
                    options={{
                        title: 'Resources',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <Icon className="justify-center align-middle" name={"bookmarks"} size={20} color={color} />
                        )
                    }} />
                <Tabs.Screen
                    name="favourite"
                    options={{
                        title: 'Favourites',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <Icon className="justify-center align-middle" name={"star"} size={20} color={color} />
                        )
                    }} />
                <Tabs.Screen
                    name="chat"
                    options={{
                        title: 'Chatbot',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <Icon2 className="justify-center align-middle" name={"comments"} size={20} color={color} />
                        )
                    }} />
            </Tabs>
    )
}

export default TabLayout
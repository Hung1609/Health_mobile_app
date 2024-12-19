import React, { useState } from "react";
import { View, Text, Switch, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

interface NotificationOption {
    key: keyof SettingsState;
    title: string;
}

interface SettingsState {
    generalNotification: boolean;
    sound: boolean;
    doNotDisturb: boolean;
    vibrate: boolean;
    lockScreen: boolean;
    reminders: boolean;
}

const NotificationSettings = () => {
    const navigation = useNavigation();
    const [settings, setSettings] = useState<SettingsState>({
        generalNotification: true,
        sound: true,
        doNotDisturb: false,
        vibrate: true,
        lockScreen: true,
        reminders: true,
    });

    const toggleSwitch = (key: keyof SettingsState) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [key]: !prevSettings[key],
        }));
    };

    const options: NotificationOption[] = [
        { key: "generalNotification", title: "General Notification" },
        { key: "sound", title: "Sound" },
        { key: "doNotDisturb", title: "Don’t Disturb Mode" },
        { key: "vibrate", title: "Vibrate" },
        { key: "lockScreen", title: "Lock Screen" },
        { key: "reminders", title: "Reminders" },
    ];

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <View>
                    <Pressable
                        className="flex-row items-center my-3"
                        onPress={() => navigation.goBack()}>
                        <Icon name="caret-back" size={20} color="black" />
                        <Text className='font-bold text-xl'>Settings</Text>
                    </Pressable>
                    {options.map((option) => (
                        <View
                            key={option.key}
                            className="flex-row justify-between items-center mb-4 px-5"
                        >
                            <Text className="text-black text-lg">{option.title}</Text>
                            <Switch
                                trackColor={{
                                    false: "#767577",
                                    true: "purple",
                                }}
                                thumbColor={settings[option.key] ? "#FFFFFF" : "#767577"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => toggleSwitch(option.key)}
                                value={settings[option.key]}
                            />
                        </View>
                    ))}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default NotificationSettings;

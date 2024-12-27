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
    access: boolean;
}

const SystemSettings = () => {
    const navigation = useNavigation();
    const [settings, setSettings] = useState<SettingsState>({
        access: true,
    });

    const toggleSwitch = (key: keyof SettingsState) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [key]: !prevSettings[key],
        }));
    };

    const options: NotificationOption[] = [
        { key: "access", title: "Allow access to Photos" },
    ];

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <View>
                    <Pressable
                        className="flex-row items-center m-3"
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
                                    true: "#3b82f6",
                                }}
                                thumbColor="#FFFFFF"
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

export default SystemSettings;

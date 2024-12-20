import React, { useState, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ListRenderItem, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import tw from "tailwind-react-native-classnames";


const Policy = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <Text>Co cai dau buoi</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default Policy;
import React, { useState, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ListRenderItem, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import tw from "tailwind-react-native-classnames";

interface ChatMessage {
  id: number;
  text: string;
  fromBot: boolean;
}

const Chat = () => {
  const [inputHeight, setInputHeight] = useState(40);
  const [isFocused, setIsFocused] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello, I'm your personal assistant. How can I help you?",
      fromBot: true
    }
  ]);

  const [textInputValue, setTextInputValue] = useState("");
  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    handleBlur();
  };

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello, I'm your personal assistant. How can I help you?",
        fromBot: true
      }
    ]);
    setTextInputValue("");
    setInputHeight(40);
  };

  const sendMessage = () => {
    if (textInputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: textInputValue,
        fromBot: false,
      };
      const botReply = {
        id: messages.length + 2,
        text: "Toi bi ngu",
        fromBot: true,
      }
      setMessages((prevMessages) => [...prevMessages, newMessage, botReply]);
      setTextInputValue("");
      setInputHeight(40);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const renderItem: ListRenderItem<ChatMessage> = ({ item }) => (
    <View 
      style={tw`${item.fromBot ? 'justify-start' : 'justify-end'}`}
      className="my-3 flex-row items-center"
    >
      {item.fromBot && (
        <Icon name="robot-excited-outline" size={24} color="dodgerblue" className="mr-3 bg-blue-50 rounded-full p-2" />
      )}
      <View 
        style={tw`${item.fromBot ? 'bg-gray-200' : 'bg-blue-500'}`} 
        className="max-w-xs p-2 rounded-lg"  
      >
        <Text style={tw`${item.fromBot ? 'text-black' : 'text-white'}`}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior="padding"
        >
          <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}> 
            <View className="w-full h-full bg-white flex-1">
              <Text className="text-center font-bold text-3xl mt-20">HealthCare Chatbot</Text>
              
              <View className="flex-1">
                <FlatList 
                  ref={flatListRef}
                  data={messages}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                  className="px-4 mt-10 mb-10"
                />
              </View>

              <View className="justify-end">
                <View className="flex-row justify-between w-full px-4 mb-4">
                  <View className="justify-end">
                    {!isFocused && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={resetChat}
                        className="bg-blue-500 justify-center items-center p-3 rounded-full mr-4"
                      >
                        <Icon name="chat-plus-outline" size={25} color="white" />
                      </TouchableOpacity>
                    )}
                  </View>
                  
                  <View className="flex-row border-2 rounded-lg flex-grow items-center justify-between">
                    <TextInput 
                      placeholder="Ask me anything..."
                      value={textInputValue}
                      onChangeText={setTextInputValue}
                      className="p-3 flex-1"
                      style={{ height: isFocused ? 3 + inputHeight : inputHeight }}
                      keyboardType="default"
                      multiline={true}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
                    />

                    <View className="flex-row">
                    <TouchableOpacity 
                      activeOpacity={0.7}
                      className="mr-3"
                    >
                      <Icon name="camera" size={20} color="dodgerblue" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                      activeOpacity={0.7}
                      onPress={sendMessage}
                      className="mr-3"
                    >
                      <Icon name="send" size={20} color="dodgerblue" />
                    </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Chat;
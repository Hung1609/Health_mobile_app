import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';

const FilterExample = () => {
    const [filter, setFilter] = useState('all'); // 'all', 'typeA', 'typeB'

    // Define all the views in a single array
    const data = [
        { id: 1, type: 'typeA', content: 'View 1 - Type A' },
        { id: 2, type: 'typeA', content: 'View 2 - Type A' },
        { id: 3, type: 'typeB', content: 'View 3 - Type B' },
        { id: 4, type: 'typeB', content: 'View 4 - Type B' },
    ];

    // Filter the views based on the selected filter
    const filteredData =
        filter === 'all' ? data : data.filter((item) => item.type === filter);

    return (
        <View className="flex-1 bg-white p-4">
            {/* Filter Buttons */}
            <View className="flex-row justify-around mb-4">
                <Pressable
                    className={`p-2 rounded ${filter === 'all' ? 'bg-purple-500' : 'bg-gray-200'
                        }`}
                    onPress={() => setFilter('all')}
                >
                    <Text className={`text-white ${filter !== 'all' && 'text-gray-700'}`}>
                        Show All
                    </Text>
                </Pressable>

                <Pressable
                    className={`p-2 rounded ${filter === 'typeA' ? 'bg-purple-500' : 'bg-gray-200'
                        }`}
                    onPress={() => setFilter('typeA')}
                >
                    <Text className={`text-white ${filter !== 'typeA' && 'text-gray-700'}`}>
                        Show Type A
                    </Text>
                </Pressable>

                <Pressable
                    className={`p-2 rounded ${filter === 'typeB' ? 'bg-purple-500' : 'bg-gray-200'
                        }`}
                    onPress={() => setFilter('typeB')}
                >
                    <Text className={`text-white ${filter !== 'typeB' && 'text-gray-700'}`}>
                        Show Type B
                    </Text>
                </Pressable>
            </View>

            {/* Render Views */}
            <ScrollView className="flex-1">
                {filteredData.map((item) => (
                    <View
                        key={item.id}
                        className={`p-4 mb-2 rounded ${item.type === 'typeA' ? 'bg-blue-200' : 'bg-yellow-200'
                            }`}
                    >
                        <Text className="text-black">{item.content}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default FilterExample;

import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Octicons';

const NutritionDetails = () => {
  const { item } = useLocalSearchParams(); // Retrieve the query parameter
  const mealItem = item ? JSON.parse(item as string) : {}; // Parse the serialized object

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white p-4" showsVerticalScrollIndicator={false}>
      <Text className="text-yellow-500 text-2xl font-bold mb-4">{mealItem.title}</Text>
      <Image
        source={{ uri: mealItem.image }}
        className="w-full h-52 rounded-lg mb-4"
      />
      <View className='flex-row gap-5'>
        <View className="flex-row items-center gap-1">
            <Icon name="time-outline" />
            <Text className="text-gray-500 text-sm">{mealItem.time}</Text>
        </View>
        <View className="flex-row items-center gap-1">
            <Icon2 name="flame" color="gray" />
            <Text className="text-gray-500 text-sm">{mealItem.calories}</Text>
        </View>  
      </View>
      <Text className="text-yellow-500 text-xl font-bold mt-6">Ingredients</Text>
      <Text className='font-semibold text-lg text-black mt-2'>For the Steak</Text>
      <Text className="text-black text-base">
        - 2 steaks (e.g., ribeye, sirloin, or filet mignon, about 200–250g each) {'\n'}
        - 1 tablespoon olive oil {'\n'}
        - Salt and black pepper (to taste) {'\n'}
        - 2 cloves garlic (minced) {'\n'}
        - 1 teaspoon fresh rosemary or thyme (optional) {'\n'}
        - 1 tablespoon butter (for finishing) {'\n'}
      </Text>
      <Text className='font-semibold text-lg text-black'>For the Vegetables</Text>
      <Text className="text-black text-base">
        - 1 cup broccoli florets{'\n'}
        - 1 cup sliced bell peppers (any color){'\n'}
        - 1 cup sliced zucchini or carrots{'\n'}
        - 1 cup cherry tomatoes{'\n'}
        - 2 tablespoons olive oil{'\n'}
        - Salt and black pepper (to taste){'\n'}
        - 1 teaspoon garlic powder{'\n'}
        - 1 teaspoon paprika (optional){'\n'}
      </Text>
      <Text className="text-yellow-500 text-xl font-bold mt-2">Preparation</Text>
      <Text className='font-semibold text-lg text-black mt-2'>Step 1: Prepare the Steak</Text>
      <Text className="text-black text-base mt-2">
        1. Season the Steak: Pat the steaks dry with a paper towel. Season both sides generously with salt, black pepper, and minced garlic. Add rosemary or thyme if desired.{'\n'}
        2. Bring to Room Temperature: Let the steaks sit at room temperature for 20–30 minutes before cooking.{'\n'}
      </Text>
      <Text className='font-semibold text-lg text-black'>Step 2: Prepare the Vegetables:</Text>
      <Text className="text-black text-base mt-2">
        1. Preheat the oven to 400°F (200°C).{'\n'}
        2. Toss Vegetables: In a large bowl, toss the broccoli, bell peppers, zucchini, and cherry tomatoes with olive oil, salt, black pepper, garlic powder, and paprika.{'\n'}
        3. Roast or Sauté:{'\n'}
        - Roasting: Spread the vegetables on a baking sheet and roast for 20–25 minutes, stirring halfway through.{'\n'}
        - Sautéing: Heat a pan with 1 tablespoon olive oil over medium heat. Sauté the vegetables for 8–10 minutes until tender-crisp.{'\n'}
      </Text>
      <Text className='font-semibold text-lg text-black'>Step 3: Cook the Steak</Text>
      <Text className="text-black text-base mt-2">
        1. Heat the Pan: Heat a skillet or grill pan over medium-high heat. Add 1 tablespoon olive oil.{'\n'}
        2. Sear the Steak: Place the steaks in the pan and cook for 3–4 minutes per side for medium-rare (adjust time for desired doneness).{'\n'}
        3. Add Butter: In the last minute of cooking, add 1 tablespoon butter to the pan and baste the steaks for extra flavor.{'\n'}
        4. Rest the Steak: Remove the steaks from the pan and let them rest for 5–10 minutes before slicing.{'\n'}
      </Text>
      <Text className='font-semibold text-lg text-black'>Step 4: Serve</Text>
      <Text className="text-black text-base mt-2 mb-14">
        1. Slice the Steak: Slice the steak against the grain for maximum tenderness.{'\n'}
        2. Plate: Serve the sliced steak alongside the roasted or sautéed vegetables.{'\n'}
        3. Garnish: Optional garnish with fresh herbs like parsley or thyme.
      </Text>
    </ScrollView>
  );
};

export default NutritionDetails;

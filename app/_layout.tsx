import { Stack } from "expo-router"
import "../global.css"

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}></Stack.Screen>
      
      <Stack.Screen 
        name="Log In/log-in" 
        options={{ 
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitle: 'Log In',
          headerTitleStyle: {
            fontWeight: 'semibold',
          },
        }}
        />
        
        <Stack.Screen 
        name="Log In/sign-up" 
        options={{ 
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitle: 'Create Account',
          headerTitleStyle: {
            fontWeight: 'semibold',
          },
        }}
        />
        
        <Stack.Screen name="Main Tabs" options={{ headerShown: false }}></Stack.Screen>

    </Stack>
  )
}

export default RootLayout


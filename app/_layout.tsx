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

      <Stack.Screen 
        name="Log In/Forgot Password/forgot-password" 
        options={{ 
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitle: 'Forgotten Password',
          headerTitleStyle: {
            fontWeight: 'semibold',
          },
        }}
      />

      <Stack.Screen 
        name="Log In/Forgot Password/otp-verify" 
        options={{ 
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitle: 'Verification',
          headerTitleStyle: {
            fontWeight: 'semibold',
          },
        }}
      />

      <Stack.Screen 
        name="Log In/Forgot Password/set-password" 
        options={{ 
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitle: 'Set Password',
          headerTitleStyle: {
            fontWeight: 'semibold',
          },
        }}
      />

      <Stack.Screen 
        name="Log In/success-screen" 
        options={{ 
          headerShown: false,
        }}
      />
        
      <Stack.Screen name="Main Tabs" options={{ headerShown: false }}></Stack.Screen>

      <Stack.Screen 
        name="Set Up/gender"
        options={{
          headerTitle: 'Back',
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen 
        name="Set Up/age"
        options={{
          headerTitle: 'Back',
          headerShadowVisible: false,
        }}
      />
    </Stack>
  )
}

export default RootLayout


1. Install Expo CLI (Must have Node.js)
- npm install -g expo-cli

2. Install Project Dependencies
- npm install

3. Start the Expo Project
- Default: npm start
- To clear cache after changing some dependencies: npx expo start -c

4. Run the Project on a Device or Emulator
- On a Physical Device: Scan the QR code using the Expo Go app available on the App Store or Google Play Store.
- On an Emulator: If you have an iOS simulator or Android emulator installed, you can run the app on it by pressing the appropriate option in the terminal (usually 'i' for iOS and 'a' for Android).

5. Install NativeWind
- npx expo install nativewind tailwindcss react-native-reanimated react-native-safe-area-context 

6. To run the backend
- change the ip in all .tsx file to your device ip 
- cd .\src\base\
- uvicorn main:app --host 0.0.0.0 --port 8000 --reload

Note: Make sure to install some additional libraries which are used in the project.

## Demo Video
https://drive.google.com/file/d/1LHrprylIDOMqW_KuTnmDQpJEYlYKF25J/view?usp=sharing

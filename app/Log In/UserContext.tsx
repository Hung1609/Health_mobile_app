import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP, PORT } from "@env";

// Define TypeScript interface for user data
interface UserData {
  full_name?: string;
  email?: string;
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
  birthday?: string;
  goals?: string[];
  level?: string;
}

// Define the context type
interface UserContextType {
  userData: UserData | null;
  fetchUserData: () => Promise<void>;
  updateUserData: (updateData: Partial<UserData>) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const userEmail = await AsyncStorage.getItem("userEmail");
      if (!userEmail) {
        Alert.alert("Error", "No userEmail found. Please login again.");
        return;
      }

      const response = await fetch(`${IP}:${PORT}/get_user_info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();
      if (!response.ok) {
        Alert.alert("Error", data.detail || "Failed to retrieve user info.");
        return;
      }

      setUserData(data);
    } catch (err) {
      console.error(err);
      Alert.alert("Network Error", "Unable to fetch user data.");
    }
  };

  // Update user data when edit profile
  const updateUserData = (updateData: Partial<UserData>) => {
    setUserData((prevData) => ({
      ...prevData,
      ...updateData, // Merge the new updates with existing data
    }));
  };

  // Save the updated user data to AsyncStorage to ensure persistence if restart app
  // const updateUserData = async (updateData: Partial<UserData>) => {
  //   setUserData((prevData) => {
  //       const updatedUser = { ...prevData, ...updateData };

  //       // Save to AsyncStorage
  //       AsyncStorage.setItem("userData", JSON.stringify(updatedUser));

  //       return updatedUser;
  //   });
  // };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, fetchUserData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

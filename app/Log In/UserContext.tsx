import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the user data
interface UserData {
  fullName: string;
  email: string;
}

// Define the shape of the context value
interface UserContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

// Create the context with a default undefined value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook for consuming the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Props for the UserProvider component
interface UserProviderProps {
  children: ReactNode;
}

// Context provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({ fullName: '', email: '' });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

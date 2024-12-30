import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the FavoriteItem type
export type FavoriteItem = {
  id: number;
  title: string;
  image: string;
  time: string;
  calories: string;
  exercises?: string;
  type: string;
};

// Define the shape of the context
interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: number) => void;
}

// Create the context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Provider component
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addFavorite = (item: FavoriteItem) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  const removeFavorite = (id: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook to use the context
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export default FavoritesProvider;

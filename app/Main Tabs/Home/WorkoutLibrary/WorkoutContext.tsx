import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of a workout
interface Workout {
  id: string; // Example: unique ID for the workout
  title: string; // Workout name
  time?: string; // Duration (optional)
  calories?: number; // Calories burned (optional)
  level?: string; // Difficulty level (optional)
  date: string; // Date
  [key: string]: any; // For any additional properties
}

// Define the context value type
interface WorkoutContextType {
  workoutData: Workout[]; // Array of workouts
  addWorkout: (workout: Workout, date: string) => void; // Function to add a workout
}

// Create the context with a default value
const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

// Provider props
interface WorkoutProviderProps {
  children: ReactNode; // React children
}

// Provider component
export const WorkoutProvider: React.FC<WorkoutProviderProps> = ({ children }) => {
  const [workoutData, setWorkoutData] = useState<Workout[]>([]);

  const addWorkout = (workout: Workout, date: string) => {
    setWorkoutData((prev) => [...prev, { ...workout, date }]);
  };

  return (
    <WorkoutContext.Provider value={{ workoutData, addWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};

// Hook to use the WorkoutContext
export const useWorkout = (): WorkoutContextType => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};

export default WorkoutProvider;

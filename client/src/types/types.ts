// src/types/types.ts

export interface UserData {
    email: string;
    first_name: string;
    last_name: string;
}

export interface NavBarProps {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
  }
import axios from 'axios';
import { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
    // Define the structure of your user object
    // For example:
    id: string;
    name: string;
    email: string;
    // Add other properties as needed
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({ user: null, setUser: () => {} });

interface UserContextProviderProps {
    children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps): JSX.Element {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
            });
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
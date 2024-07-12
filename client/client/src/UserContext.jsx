import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const PORT = 'http://localhost:5000';
    
    // User State
    const [user, setUser] = useState(null);

    // Fetch user profile on mount and if user is null
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data } = await axios.get(`${PORT}/profile`, { withCredentials: true });
                setUser(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (!user) {
            fetchUserProfile();
        }
    }, [user]);

    const updateUser = async (userId, updates) => {
        try {
            const response = await axios.put(`${PORT}/user/${userId}`, updates);
            setUser(response.data);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}
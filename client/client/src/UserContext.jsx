import axios from "axios";

const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext({});



export function UserContextProvider({ children }) {
    const PORT = 'http://localhost:5000';
    
    // User State
    const [user, setUser] = useState(null);

    // Fetch user profile on mount and if user is null
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data } = await axios.get(`${PORT}/profile`);
                setUser(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (!user) {
            fetchUserProfile();
        }
    }, []);

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
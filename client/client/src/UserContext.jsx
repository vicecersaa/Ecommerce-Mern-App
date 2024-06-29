import axios from "axios";

const { createContext, Children, useState, useEffect } = require("react");

export const UserContext = createContext({});



export function UserContextProvider({children}) {
    // Port 
    const PORT = 'http://localhost:5000'

    // User State
    const [user, setUser] = useState(null);

    //  getting user profile
    useEffect(() => {
        if (!user) {
        axios.get(`${PORT}/profile`,).then(({data}) => {
            setUser(data);
        });
        
        }
    },[])

    return (
        
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>

    );
}
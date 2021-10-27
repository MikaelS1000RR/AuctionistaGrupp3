import { createContext, useContext } from "react";

const UserContext = createContext();

export const user = () => {
  return useContext(UserContext);
}



const UserContextProvider = ({children}) => {

  const value = {
    userName,
    email,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
   );
}
 
export default UserContextProvider;
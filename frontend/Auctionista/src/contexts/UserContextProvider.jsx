import { createContext, useState } from "react";

const UserContext = createContext();

// export const user = () => {
//   return useContext(UserContext);
// }



const UserContextProvider = ({children}) => {
  const [userName, setUserName] = useState('userName');
  const [email, setEmail] = useState('email');
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
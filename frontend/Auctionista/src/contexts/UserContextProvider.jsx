import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();
// export const useUserContextProvider = () => {
//   return useContext(UserContext);
// }


const UserContextProvider = ({children}) => {
  const [userName, setUserName] = useState('userName');
  const [email, setEmail] = useState('email');
  const [user, setUser] = useState('');

  useEffect(() => {
    
      whoAmI();
    console.log({ children }, "children")
  }, [user])
  const whoAmI = async () => {
    let res = await fetch('/api/whoami')
    try {
      let user = await res.json()
      console.log(user, "this is user usercontext")
      setUserName(user.username)
      setEmail(user.email)
      // setUser(user)
      // setIsLoggedIn(true)
    } catch {
      console.log('Not logged in usercontext')
    }
  }

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
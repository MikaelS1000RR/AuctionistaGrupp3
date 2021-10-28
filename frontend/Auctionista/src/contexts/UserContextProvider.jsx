import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();
export const useGlobal = () => useContext(UserContext);


const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
      whoAmI();
  }, [user])
  const whoAmI = async () => {
    let res = await fetch('/api/whoami')
    try {
      let user = await res.json()
      console.log(user, "this is user usercontext")
      setUserId(user.id)
      setUserName(user.username)
      setEmail(user.email)
      
    } catch {
      setUserId('')
      setUserName('')
      setEmail('')
      console.log('Not logged in usercontext')
    }
  }

  const value = {
    userId,
    userName,
    email,
    setUserName,
    whoAmI
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
   );
}
 
export default UserContextProvider;
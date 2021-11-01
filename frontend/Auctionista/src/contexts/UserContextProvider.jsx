import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();
export const useGlobal = () => useContext(UserContext);


const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    if (user == '') {
      whoAmI();
    }
  }, [user])
  const whoAmI = async () => {
    let res = await fetch('/api/whoami')
    try {
      let user = await res.json()
      console.log(user, "this is user usercontext")
      setUserId(user.id)
      setUserName(user.username)
      setEmail(user.email)
      setUser(user)
      setIsLoggedIn(true)
      
    } catch {
      setUserId('')
      setUserName('')
      setEmail('')
      console.log('Not logged in usercontext')
    }
  }

  const value = {
    user,
    userId,
    userName,
    email,
    setUserName,
    whoAmI,
    isLoggedIn,
    setIsLoggedIn
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
   );
}
 
export default UserContextProvider;
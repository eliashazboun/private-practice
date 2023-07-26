import { useEffect, useState } from 'react';
import { decodeToken } from "react-jwt";

import './OwnerAuthenticatedApp'
import './UnauthenticatedApp'
import OwnerAuthenticatedApp from './OwnerAuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import ClientAuthenticatedApp from './ClientAuthenticatedApp';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [user, setUser] = useState()

  const handleUser = (user) => {
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")

    if(token){
      const user = decodeToken(token)
      setUser(user)
      setIsLoggedIn(true)
      setIsOwner(user.isAdmin)
    }else{
      setIsLoggedIn(false)
    }
  },[])

  return (
   <>
    {isLoggedIn && isOwner ? <OwnerAuthenticatedApp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user}/> 
      : isOwner === false && isLoggedIn === true ? <ClientAuthenticatedApp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user}/>
      : <UnauthenticatedApp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={handleUser}/> }
   </>
  );
}

export default App;

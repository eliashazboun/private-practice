import { useEffect, useState } from 'react';
import { decodeToken } from "react-jwt";

import './OwnerAuthenticatedApp'
import './UnauthenticatedApp'
import OwnerAuthenticatedApp from './OwnerAuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import ClientAuthenticatedApp from './ClientAuthenticatedApp';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState()
  const [isOwner, setIsOwner] = useState()
  const [user, setUser] = useState()

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
      : <UnauthenticatedApp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> }
   </>
  );
}

export default App;

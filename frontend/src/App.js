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

  useEffect(() => {
    const token = localStorage.getItem("token")

    if(token){
      const {isAdmin} = decodeToken(token)
      setIsLoggedIn(true)
      setIsOwner(isAdmin)
    }else{
      setIsLoggedIn(false)
    }
  },[])

  return (
   <>
    {isLoggedIn && isOwner ? <OwnerAuthenticatedApp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> 
      : isOwner === false && isLoggedIn === true ? <ClientAuthenticatedApp/>
      : <UnauthenticatedApp/> }
   </>
  );
}

export default App;


import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs' 

import Home from './pages/Home'
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import ClientDashboard from './pages/ClientDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';



function ClientAuthenticatedApp({isLoggedIn, setIsLoggedIn, user}) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}> 
      <div className="App">
        <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} user={user}/>
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/api/clientdash' element={<ClientDashboard isLoggedIn={isLoggedIn}/>}/>
            <Route path='/api/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path='/api/signup' element={<Signup/>}/>
            <Route path='*' element={<Home/>}/>
          </Routes>
        </div>
        
        <Footer/>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default ClientAuthenticatedApp;
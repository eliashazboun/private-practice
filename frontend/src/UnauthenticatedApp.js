import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs' 
import {useState } from 'react';

import Home from './pages/Home'
import NavBar from './components/NavBar/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer/Footer';

function UnauthenticatedApp() {
  const [isLoggedIn, setIsLoggedIn] = useState()

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}> 
      <div className="App">
        <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn}/>
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home/>}/>
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

export default UnauthenticatedApp;

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs' 

import Home from './pages/Home'
import NavBar from './components/NavBar/NavBar';
import Profile from './pages/Profile'
import Clients from './pages/Clients';
import Appointment from './pages/Appointment';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Video from './pages/Video';
import Footer from './components/Footer/Footer';
import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import Loading from './pages/Loading';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}> 
      <div className="App">
        <BrowserRouter>
        <NavBar/>
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/api/clients' element={<Clients/>}/>
            <Route path='/api/profile/' element={<Profile/>}/>
            <Route path='/api/appointments' element={<Appointment/>}/>
            <Route path='/api/login' element={<Login/>}/>
            <Route path='/api/signup' element={<Signup/>}/>
            <Route path='/api/video' element={<Video/>}/>
            <Route path='/api/admindash' element={<AdminDashboard/>}/>
            <Route path='/api/clientdash' element={<ClientDashboard/>}/>
            <Route path='/api/loading' element={<Loading/>}/>
          </Routes>
        </div>
        <Footer/>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;

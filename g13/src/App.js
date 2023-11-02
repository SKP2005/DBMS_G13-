import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Democouns from './pages/counsellors/democouns';
import Chatting from './pages/chatting';
import Profile from './pages/profile';

function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<Home/>}></Route>
      <Route path='/booking/:id' element={<Democouns/>}></Route>
      <Route path='/login' element={<LoginForm/>}></Route>
      <Route path='/register' element={<RegisterForm/>}></Route>
      <Route path='/chatting' element={<Chatting/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

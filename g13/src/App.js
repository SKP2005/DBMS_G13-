import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Democouns from './pages/counsellors/democouns';
import Chatting from './pages/chatting';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/booking' element={<Democouns/>}></Route>
      <Route path='/login' element={<LoginForm/>}></Route>
      <Route path='/register' element={<RegisterForm/>}></Route>
      <Route path='/chatting' element={<Chatting/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

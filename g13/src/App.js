import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';

function App() {
  return (
    <>
      <Navbar/>
      <LoginForm/>
      <RegisterForm/>
    </>
  );
}

export default App;

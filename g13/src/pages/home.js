import '../App.css';
import LoginForm from '../components/loginForm';
import { NavbarWithMegaMenu } from '../components/navbar';

function Home() {
  return (
    <>
    <NavbarWithMegaMenu/>
    <LoginForm/>
    </>
  );
}

export default Home;
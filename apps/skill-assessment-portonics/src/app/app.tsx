import useAuth from '../features/authentication';
import Home from './home';
import { LoginForm, NavBar } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const { token } = useAuth();

  return (
    <>
      <NavBar />
      <div className="container">{token ? <Home /> : <LoginForm />}</div>
      <ToastContainer />
    </>
  );
};

export default App;

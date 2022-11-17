import useAuth from '../features/authentication';
import Home from './home';
import { LoginForm, NavBar } from './components';

export const App = () => {
  const { token } = useAuth();

  return (
    <>
      <NavBar />
      <div className="container">{token ? <Home /> : <LoginForm />}</div>
    </>
  );
};

export default App;

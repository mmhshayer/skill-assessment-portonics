import useAuth from '../features/authentication';
import Home from './home';
import { LoginForm } from './components';

export const App = () => {
  const { token } = useAuth();

  if (!token) {
    return <LoginForm />;
  }

  return <Home />;
};

export default App;

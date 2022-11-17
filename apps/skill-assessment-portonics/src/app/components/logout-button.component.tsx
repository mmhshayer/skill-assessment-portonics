import { FC } from 'react';
import useAuth from '../../features/authentication';

const LogOutButton: FC = () => {
  const { logout } = useAuth();

  const handleClick = () => {
    logout();
  };

  return (
    <button className="button" onClick={handleClick}>
      Logout
    </button>
  );
};

export default LogOutButton;

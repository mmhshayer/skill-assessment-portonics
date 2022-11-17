import { FC } from 'react';
import useAuth from '../../features/authentication';
import LogOutButton from './logout-button.component';

const NavBar: FC = () => {
  const { token } = useAuth();

  return (
    <nav className="navbar">
      <div className="title">
        <a href="/">Sakib's Book</a>
      </div>

      {token ? <LogOutButton /> : null}
    </nav>
  );
};

export default NavBar;

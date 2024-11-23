import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Todo List</h1>
      <nav>
        <div>
          <ul>
            <li>
              <NavLink className={({ isActive }) => (isActive ? 'menu-dark' : 'menu')} to='home'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? 'menu-dark' : 'menu')} to='about'>
                About
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? 'menu-dark' : 'menu')} to='list'>
                TodoList
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;

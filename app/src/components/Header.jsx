import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useSelector } from 'react-redux';

export default function Header() {
  const user = useSelector((s) => s.auth.user);
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="font-bold text-xl">ModernBlog</Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-primary-600' : ''}>Home</NavLink>
          {user && <NavLink to="/create" className={({isActive}) => isActive ? 'text-primary-600' : ''}>Create</NavLink>}
          {user ? (
            <NavLink to="/profile" className={({isActive}) => isActive ? 'text-primary-600' : ''}>Profile</NavLink>
          ) : (
            <>
              <NavLink to="/login" className={({isActive}) => isActive ? 'text-primary-600' : ''}>Login</NavLink>
              <NavLink to="/register" className={({isActive}) => isActive ? 'text-primary-600' : ''}>Register</NavLink>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

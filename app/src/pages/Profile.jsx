import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Profile() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();

  if (!user) return null;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="rounded-md border p-4">
        <div><span className="font-medium">Name:</span> {user.name}</div>
        <div><span className="font-medium">Email:</span> {user.email}</div>
      </div>
      <button className="mt-6 px-4 py-2 border rounded-md" onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
}

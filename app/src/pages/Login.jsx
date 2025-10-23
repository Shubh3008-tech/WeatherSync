import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({ defaultValues: { email: '', password: '' } });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((s) => s.auth);

  const onSubmit = async (data) => {
    const res = await dispatch(login(data));
    if (res.type.endsWith('fulfilled')) navigate('/');
  };

  return (
    <div className="container py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" className="w-full rounded-md border px-3 py-2 bg-transparent" {...register('email', { required: true })} />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" className="w-full rounded-md border px-3 py-2 bg-transparent" {...register('password', { required: true })} />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={isSubmitting} className="px-4 py-2 rounded-md border w-full">{isSubmitting ? 'Logging in...' : 'Login'}</button>
      </form>
      <p className="text-sm mt-4">No account? <Link to="/register" className="underline">Register</Link></p>
    </div>
  );
}

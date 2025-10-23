import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerUser } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({ defaultValues: { name: '', email: '', password: '' } });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((s) => s.auth);

  const onSubmit = async (data) => {
    const res = await dispatch(registerUser(data));
    if (res.type.endsWith('fulfilled')) navigate('/');
  };

  return (
    <div className="container py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input className="w-full rounded-md border px-3 py-2 bg-transparent" {...register('name', { required: true })} />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" className="w-full rounded-md border px-3 py-2 bg-transparent" {...register('email', { required: true })} />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" className="w-full rounded-md border px-3 py-2 bg-transparent" {...register('password', { required: true, minLength: 8 })} />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={isSubmitting} className="px-4 py-2 rounded-md border w-full">{isSubmitting ? 'Creating account...' : 'Create account'}</button>
      </form>
      <p className="text-sm mt-4">Already have an account? <Link to="/login" className="underline">Login</Link></p>
    </div>
  );
}

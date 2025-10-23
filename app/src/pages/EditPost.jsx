import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TinyEditor from '../components/Editor';
import { postsService } from '../services/appwrite';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPost() {
  const { id } = useParams();
  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { title: '', slug: '', content: '' }
  });
  const user = useSelector((s) => s.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const post = await postsService.get(id);
      reset({ title: post.title, slug: post.slug, content: post.content });
    })();
  }, [id, reset]);

  const onSubmit = async (data) => {
    await postsService.update(id, data);
    navigate(`/post/${id}`);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input className="w-full rounded-md border px-3 py-2 bg-transparent" {...register('title', { required: true })} />
          {errors.title && <p className="text-red-600 text-sm">Title is required</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Slug</label>
          <input className="w-full rounded-md border px-3 py-2 bg-transparent" {...register('slug')} />
        </div>
        <div>
          <label className="block text-sm mb-1">Content</label>
          <TinyEditor value={watch('content')} onChange={(val) => setValue('content', val, { shouldDirty: true })} />
        </div>
        <button disabled={isSubmitting} className="px-4 py-2 rounded-md border">{isSubmitting ? 'Saving...' : 'Save changes'}</button>
      </form>
    </div>
  );
}

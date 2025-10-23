import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { postsService } from '../services/appwrite';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((s) => s.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await postsService.get(id);
        if (isMounted) setPost(res);
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [id]);

  const canEdit = user && post && user.$id === post.authorId;

  const onDelete = async () => {
    if (!canEdit) return;
    if (!confirm('Delete this post?')) return;
    await postsService.remove(id);
    navigate('/');
  };

  if (loading) return <div className="container py-8">Loading...</div>;
  if (!post) return <div className="container py-8">Not found</div>;

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-neutral-500 mb-6">By {post.authorName} • {new Date(post.$createdAt).toLocaleString()}</div>
      {canEdit && (
        <div className="flex gap-2 mb-6">
          <Link to={`/edit/${post.$id}`} className="px-3 py-1.5 border rounded-md">Edit</Link>
          <button onClick={onDelete} className="px-3 py-1.5 border rounded-md">Delete</button>
        </div>
      )}
      <div className="prose dark:prose-invert max-w-none">
        {parse(post.content || '')}
      </div>
    </div>
  );
}

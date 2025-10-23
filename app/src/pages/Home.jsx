import { useEffect, useState } from 'react';
import { postsService } from '../services/appwrite';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await postsService.list({ limit: 20 });
        if (isMounted) setPosts(res.documents);
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      {loading ? (
        <div>Loading...</div>
      ) : posts.length === 0 ? (
        <div>No posts yet.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.$id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}

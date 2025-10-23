import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

export default function PostCard({ post }) {
  return (
    <article className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:shadow-md transition-shadow">
      <Link to={`/post/${post.$id}`} className="block">
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <div className="text-sm text-neutral-500 mb-3">By {post.authorName} • {new Date(post.$createdAt).toLocaleDateString()}</div>
        <div className="line-clamp-3 text-neutral-700 dark:text-neutral-300">
          {post.excerpt ? post.excerpt : parse(post.content?.slice(0, 160) || '')}
        </div>
      </Link>
    </article>
  );
}

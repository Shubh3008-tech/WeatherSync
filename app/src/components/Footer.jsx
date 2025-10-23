export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-12">
      <div className="container py-6 text-sm text-neutral-500">© {new Date().getFullYear()} ModernBlog. All rights reserved.</div>
    </footer>
  );
}

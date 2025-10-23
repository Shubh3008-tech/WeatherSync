import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);
  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      className="inline-flex items-center gap-2 rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
      aria-label="Toggle theme"
    >
      <span className="i-sun hidden dark:inline" aria-hidden />
      <span className="i-moon inline dark:hidden" aria-hidden />
      {mode === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
}

import { Editor } from '@tinymce/tinymce-react';

export default function TinyEditor({ value, onChange }) {
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY || '';
  return (
    <Editor
      apiKey={apiKey}
      value={value}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code | table | image media link',
        content_style: 'body { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, "Fira Sans", "Droid Sans"; }',
        skin: document.documentElement.classList.contains('dark') ? 'oxide-dark' : 'oxide',
        content_css: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
      }}
      onEditorChange={onChange}
    />
  );
}

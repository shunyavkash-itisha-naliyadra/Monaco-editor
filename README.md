# Monaco Markdown Editor with Live Preview

A React-based Markdown editor using Monaco Editor, with a built-in live preview powered by `react-markdown`. Toggle between editing and previewing your Markdown in real-time!

## ✨ Features

- 📝 Markdown Editing with Monaco Editor
- 🔍 Live Markdown Preview using react-markdown
- 🌗 Dark-themed editor for better focus
- 🔀 Toggle Preview Panel dynamically
- ⚙️ Auto-resizing of editor when preview is toggled

## 🚀 Demo

📦 Installation

1 Clone the repository:

```sh
git clone https://github.com/your-username/monaco-markdown-editor.git
cd monaco-markdown-editor
```

2 Install dependencies:

```SH
npm install
```

3 Run the development server:

```SH
npm run dev
```

4 Open http://localhost:5173 in your browser (or whatever port Vite/CRA runs on).

## 🧱 Built With

- [React](https://react.dev/)
- [Monaco Editor](https://www.npmjs.com/package/@monaco-editor/react)
- [React Markdown](https://www.npmjs.com/package/react-markdown)

## 📁 Project Structure

```sh
/public
/src
  ├── App.jsx       // Main editor and preview component
  ├── App.css       // Styling for layout and components
  └── main.jsx      // Entry point
```

## 🔑 Usage

- Start typing Markdown in the editor.
- Click the "Show Preview" button to toggle live Markdown preview.
- Click "Hide Preview" to focus solely on the editor.

## 🎨 Customization

- Modify App.css for layout and theme adjustments.
- Replace or extend react-markdown for custom renderers (like code highlighting).

## 📜 License

This project is licensed under the MIT License.

import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import "./App.css";
function App() {
  const [markdown, setMarkdown] = useState(
    "## Welcome to Monaco Markdown Editor!"
  );
  const [showPreview, setShowPreview] = useState(false);
  const editorRef = useRef(null);
  // Handle content change
  const handleEditorChange = (value) => {
    setMarkdown(value || "");
  };
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };
  // Toggle preview panel
  const togglePreview = () => {
    setShowPreview((prev) => !prev);
  };
  useEffect(() => {
    if (editorRef.current) {
      requestAnimationFrame(() => {
        editorRef.current.layout();
      });
    }
  }, [showPreview]);
  return (
    <div className="app-container">
      {/* Header with Toggle Button */}
      <header className="header">
        <button onClick={togglePreview} className="toggle-btn">
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </header>
      {/* Main Content: Editor and Preview */}
      <main className={`main-content ${showPreview ? "with-preview" : ""}`}>
        {/* Editor Section */}
        <section className="editor-section">
          <Editor
            height="100%"
            defaultLanguage="markdown"
            value={markdown}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            theme="vs-dark"
          />
        </section>
        {/* Preview Section */}
        {showPreview && (
          <section className="preview-section">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </section>
        )}
      </main>
    </div>
  );
}
export default App;

import { useCallback, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./App.css";
import { saveMarkdown } from "./utils/craeteData";
import { getMarkdown } from "./utils/getData";
function App() {
  const [markdown, setMarkdown] = useState(
    "## Welcome to Monaco Markdown Editor!"
  );
  const [showPreview, setShowPreview] = useState(false);
  const [theme, setTheme] = useState("light");
  const editorRef = useRef(null);
  const saveTimeout = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMarkdown();
        console.log("Fetched markdown:", data);
        setMarkdown(data || "");
      } catch (error) {
        console.error("Error fetching markdown:", error);
      }
    };
    fetchData();
  }, []);
  const debouncedSave = useCallback((content) => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(async () => {
      try {
        await saveMarkdown(content);
      } catch (error) {
        console.error("Error auto-saving markdown:", error);
      }
    }, 1000);
  }, []);
  // Handle content change
  const handleEditorChange = (value) => {
    setMarkdown(value || "");
    debouncedSave(value || "");
  };
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };
  const togglePreview = () => {
    setShowPreview((prev) => !prev);
  };
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
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
        <label className="switch">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <span className="slider round"></span>
        </label>
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
            theme={theme === "dark" ? "vs-dark" : "light"}
          />
        </section>
        {/* Preview Section */}
        {showPreview && (
          <section className="preview-section">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </section>
        )}
      </main>
    </div>
  );
}
export default App;

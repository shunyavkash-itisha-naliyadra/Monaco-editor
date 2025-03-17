import { useCallback, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./App.css";
import { saveMarkdown } from "./utils/craeteData";
import { getMarkdown } from "./utils/getData";
import { setupMonacoEnvironment } from "./utils/monacoSetup";

function App() {
  const defaultTemplates = {
    markdown: "# Write your Markdown here\n",
    html: "<!-- Write your HTML here -->\n<html>\n  <head></head>\n  <body></body>\n</html>",
    css: "/* Write your CSS here */\nbody {\n  margin: 0;\n  padding: 0;\n}",
    javascript: "// Write your JavaScript here\nconsole.log('Hello, World!');",
    json: '{\n  "key": "value"\n}',
  };

  const [markdown, setMarkdown] = useState(defaultTemplates["markdown"]);
  const [language, setLanguage] = useState("markdown");
  const [showPreview, setShowPreview] = useState(false);
  const [theme, setTheme] = useState("light");

  const editorRef = useRef(null);
  const saveTimeout = useRef(null);
  console.log("markdown", markdown);

  useEffect(() => {
    setupMonacoEnvironment();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMarkdown(language);
        console.log(`Fetched markdown for ${language}:`, data);
        setMarkdown(data || defaultTemplates[language] || "");
      } catch (error) {
        console.error("Error fetching markdown:", error);
        setMarkdown(defaultTemplates[language] || "");
      }
    };
    fetchData();
  }, [language]);

  const debouncedSave = useCallback(
    (content) => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(async () => {
        try {
          await saveMarkdown(content, language);
        } catch (error) {
          console.error("Error auto-saving markdown:", error);
        }
      }, 1000);
    },
    [language]
  );

  const handleEditorChange = (value) => {
    setMarkdown(value || "");
    debouncedSave(value || "");
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const togglePreview = () => setShowPreview((prev) => !prev);
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    if (editorRef.current) {
      requestAnimationFrame(() => editorRef.current.layout());
    }
  }, [showPreview]);

  const handleLanguageChange = (e) => setLanguage(e.target.value);

  return (
    <div className={`app-container ${theme}`}>
      <header className="header">
        <select
          onChange={handleLanguageChange}
          value={language}
          className="toggle-btn"
        >
          {Object.keys(defaultTemplates).map((lang) => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
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

      <main className={`main-content ${showPreview ? "with-preview" : ""}`}>
        <section className="editor-section">
          <Editor
            height="100%"
            language={language}
            value={markdown}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            theme={theme === "dark" ? "vs-dark" : "light"}
            options={{
              fontSize: 14,
              wordWrap: "on",
              minimap: { enabled: false },
              automaticLayout: true,
            }}
          />
        </section>
        {showPreview && (
          <section className="preview-section">
            {language === "markdown" ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
              </ReactMarkdown>
            ) : ["html", "css", "javascript"].includes(language) ? (
              <iframe
                title="Preview"
                srcDoc={
                  language === "html"
                    ? markdown
                    : language === "css"
                      ? `<style>${markdown}</style>`
                      : `<script>${markdown}</script>`
                }
                sandbox="allow-scripts allow-same-origin"
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            ) : (
              <p>Preview not supported for this language.</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;

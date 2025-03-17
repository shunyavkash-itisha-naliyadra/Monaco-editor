export const saveMarkdown = async (markdown) => {
  try {
    const res = await fetch(`http://localhost:8081/api/v1/readme/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: markdown }),
    });
    const data = await res.json();
    console.log("Saved:", data);
  } catch (err) {
    console.error(err);
  }
};

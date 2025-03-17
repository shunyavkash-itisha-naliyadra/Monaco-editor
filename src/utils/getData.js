export const getMarkdown = async () => {
  try {
    const res = await fetch(`http://localhost:8081/api/v1/readme/`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data?.data[0]?.description;
  } catch (err) {
    console.error(err);
  }
};

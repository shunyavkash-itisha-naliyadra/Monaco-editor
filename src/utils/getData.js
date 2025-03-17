export const getMarkdown = async (type) => {
  try {
    console.log("================", type);

    const res = await fetch(`http://localhost:8081/api/v1/readme/${type}`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data?.data?.description;
  } catch (err) {
    console.error(err);
  }
};

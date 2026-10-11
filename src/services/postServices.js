export const createPost = async (postData) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.error(err);
  }
};

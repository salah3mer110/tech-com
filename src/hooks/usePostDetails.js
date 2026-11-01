// hooks/usePostDetails.js
import { useState, useEffect } from "react";

const API_BASE = "https://jsonplaceholder.typicode.com";

export function usePostDetails(postId) {
  const [state, setState] = useState({
    post: null,
    user: null,
    comments: [],
    photoUrl: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!postId) return;

    async function fetchPostDetails() {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const [postRes, userRes, commentsRes, photoRes] =
          await Promise.allSettled([
            fetch(`${API_BASE}/posts/${postId}`),
            fetch(`${API_BASE}/users/${postId}`),
            fetch(`${API_BASE}/posts/${postId}/comments`),
            fetch(
              `https://api.slingacademy.com/v1/sample-data/photos/${postId}`,
            ),
          ]);

        if (postRes.status === "rejected" || !postRes.value.ok) {
          throw new Error("Failed to fetch post details.");
        }
        const postData = await postRes.value.json();

        let userData = null;
        if (userRes.status === "fulfilled" && userRes.value.ok) {
          const users = await userRes.value.json();
          userData = Array.isArray(users)
            ? users.find((u) => u.id === postData.userId)
            : users;
        }

        let commentsData = [];
        if (commentsRes.status === "fulfilled" && commentsRes.value.ok) {
          commentsData = await commentsRes.value.json();
        }

        let photoUrl = `https://picsum.photos/id/${postId}/800/400`;
        if (photoRes.status === "fulfilled" && photoRes.value.ok) {
          const photoJson = await photoRes.value.json();
          photoUrl = photoJson?.photo?.url || photoUrl;
        }

        setState({
          post: postData,
          user: userData,
          comments: commentsData,
          photoUrl,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: err.message,
        }));
      }
    }

    fetchPostDetails();
  }, [postId]);

  return state;
}

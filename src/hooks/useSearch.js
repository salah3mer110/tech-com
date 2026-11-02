import { useMemo } from "react";

const useSearch = (posts = [], searchQuery = "") => {
  return useMemo(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      return posts;
    }
    const postsData = posts || [];
    const filteredPosts = postsData?.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    // navigate("posts");
    return filteredPosts || [];
  }, [posts, searchQuery]);
};

export default useSearch;

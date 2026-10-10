import { useMemo, useState } from "react";
import Community from "./components/Community";
import Form from "./components/Form";
import Hero from "./components/Hero";
import { transformedPosts } from "../../utils/transformPosts";
import useSearch from "../../hooks/useSearch";
import { createPost } from "../../services/postServices";
import useCommunityData from "../../hooks/useCommunityData";

function Home({ searchQuery }) {
  const [addedPosts, setAddedPosts] = useState([]);

  const { postsData, photosData, usersData, isLoading, error } =
    useCommunityData();

  const posts = useMemo(
    () => [
      ...addedPosts,
      ...transformedPosts(postsData, usersData, photosData),
    ],
    [addedPosts, usersData, postsData, photosData],
  );
  const filteredPosts = useSearch(posts, searchQuery);

  const addPost = async (postData) => {
    const post = await createPost(postData);
    setAddedPosts((prevPosts) => [post, ...prevPosts]);
  };

  return (
    <>
      <Hero />
      <Community posts={filteredPosts} isLoading={isLoading} error={error} />
      <Form addPost={addPost} />
      <div className="p-16" />
    </>
  );
}

export default Home;

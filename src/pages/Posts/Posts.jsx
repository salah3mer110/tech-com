import { useMemo } from "react";
import useCommunityData from "../../hooks/useCommunityData";
import useSearch from "../../hooks/useSearch";
import { transformedPosts } from "../../utils/transformPosts";
import Card from "../../components/common/Card/Card";
import LoadingCard from "../../components/common/LoadingCard/LoadingCard";

function Posts({ searchQuery }) {
  const { postsData, photosData, usersData, isLoading, error } =
    useCommunityData();

  const posts = useMemo(
    () => [...transformedPosts(postsData, usersData, photosData)],
    [usersData, postsData, photosData],
  );
  const filteredPosts = useSearch(posts, searchQuery);

  if (error) return <div>{error}</div>;
  if (isLoading)
    return (
      <div className=" max-w-7xl mx-auto flex justify-evenly flex-col lg:flex-row gap-4 items-center py-9">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    );
  return (
    <section className="max-w-7xl mx-auto py-14">
      <div className="w-full">
        {filteredPosts.length !== 0 ? (
          <div className=" flex flex-wrap justify-between gap-6 pt-16 mx-14 lg:mx-0">
            {filteredPosts.map((post) => (
              <Card key={post.id} post={post}></Card>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col py-28">
            <p className="text-2xl font-bold text-on-surface">Didn't find any posts...</p>
            <p className="text-on-surface-variant/70">try searching for another posts</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Posts;

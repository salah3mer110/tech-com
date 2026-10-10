import { Link } from "react-router-dom";
import Card from "../../../components/common/Card/Card";

function Community({ posts, isLoading, error }) {
  if (isLoading) return <div>Loading posts and users...</div>;
  if (error) return <div>{error}</div>;
  if (!posts) return <div>No data available</div>;
  return (
    <section className="py-16 max-w-7xl mx-auto">
      <div className="mx-14">
        <div className="">
          <h2 className="text-3xl font-bold leading-10 text-on-surface">
            Community Highlights
          </h2>
          <div className="flex justify-between items-center flex-wrap">
            <p className="text-on-surface-variant">
              The latest insights from our global network of creators.
            </p>
            <Link to="/posts">
              <span className="font-bold cursor-pointer text-primary hover:opacity-90 transition-opacity">
                View all posts &rarr;
              </span>
            </Link>
          </div>
        </div>

        {posts.length !== 0 ? (
          <div className="flex justify-between lg:flex-nowrap flex-wrap gap-6 pt-16">
            {[...posts.slice(0, 3)].map((post) => (
              <Card key={post.id} post={post}></Card>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col py-6">
            <p className="text-2xl font-bold text-on-surface">Didn't find any posts...</p>
            <p className="text-on-surface-variant/70">try searching for another posts</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Community;

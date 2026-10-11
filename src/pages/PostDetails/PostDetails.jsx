import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import Spinnner from "../../components/common/Spinnner/Spinnner";
import { usePostDetails } from "../../hooks/usePostDetails";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, user, comments, photoUrl, isLoading, error } =
    usePostDetails(id);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinnner />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center text-on-surface">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <p className="text-on-surface-variant mb-6">
          {error || "The post you're looking for does not exist."}
        </p>
        <Button onClick={() => navigate("/posts")}>Back to Posts</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-on-surface">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-opacity cursor-pointer"
      >
        &larr; Back to Posts
      </button>

      {photoUrl && (
        <img
          src={photoUrl}
          alt={post.title}
          className="w-full h-80 md:h-400px object-cover rounded-xl mb-6 shadow-md border border-outline-variant"
        />
      )}

      <div className="bg-surface rounded-xl p-6 md:p-8 border border-outline-variant shadow-sm transition-colors duration-300">
        <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface mb-6 leading-tight">
          {post.title}
        </h1>

        {user && (
          <div className="flex items-center gap-4 p-4 mb-6 bg-surface-low border border-outline-variant rounded-lg">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg border border-primary/20">
              {user.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-on-surface">{user.name}</h4>
              <p className="text-sm text-on-surface-variant">
                {user.company?.name || "Contributor"} &bull; {user.email}
              </p>
            </div>
          </div>
        )}

        <p className="text-lg text-on-surface-variant leading-relaxed whitespace-pre-line mb-8">
          {post.body}
        </p>

        <hr className="border-outline-variant my-8" />

        <div>
          <h3 className="text-2xl font-bold text-on-surface mb-6">
            Comments ({comments.length})
          </h3>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-surface-container border border-outline-variant rounded-lg p-4 md:p-5 transition-colors duration-300"
              >
                <div className="flex justify-between items-start gap-2 mb-2 flex-wrap">
                  <h5 className="font-semibold text-on-surface">
                    {comment.name}
                  </h5>
                  <span className="text-xs text-on-surface-variant/80 font-mono">
                    {comment.email}
                  </span>
                </div>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                  {comment.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;

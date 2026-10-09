import { useState } from "react";
import { Link } from "react-router-dom";
import Upvote from "../Upvote/Upvote";
import DownVote from "../DownVote/DownVote";

function Card({ post }) {
  const [upVoteCounter, setUpVoteCounter] = useState(0);
  const [downVoteCounter, setDownVoteCounter] = useState(0);

  const { title, description, author, role, img, id } = post;

  const handleUpVote = () => {
    setUpVoteCounter((upVoteCounter) => upVoteCounter + 1);
  };

  const handleDownVote = () => {
    setDownVoteCounter((downVoteCounter) => downVoteCounter + 1);
  };
  return (
    <div className="lg:max-w-96 rounded overflow-hidden shadow-lg border border-outline-variant bg-surface text-on-surface flex flex-col transition-colors duration-300">
      <div className="flex-1 w-full">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 hover:text-primary transition-colors">
            <Link to={`/posts/${id}`}>{title}</Link>
          </div>
          <p className="text-on-surface-variant text-base line-clamp-3">{description}</p>
        </div>
      </div>
      <div className="flex items-center py-4 mx-3 w-full border-t border-outline-variant mt-auto">
        <img src={img} alt="" className="rounded-full w-15 h-15" />
        <div className="ml-4">
          <h4 className="font-bold">{author}</h4>
          <span className="text-on-surface-variant">{role}</span>
        </div>
      </div>
      <div className="flex items-center gap-10 p-3">
        <Upvote
          handleUpVote={handleUpVote}
          upVoteCounter={upVoteCounter}
        ></Upvote>
        <DownVote
          handleDownVote={handleDownVote}
          downVoteCounter={downVoteCounter}
        ></DownVote>
      </div>
    </div>
  );
}

export default Card;

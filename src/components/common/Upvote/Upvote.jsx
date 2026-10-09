import { BiUpvote } from "react-icons/bi";

function Upvote({ handleUpVote, upVoteCounter }) {
  return (
    <div
      className="flex items-center cursor-pointer gap-0.5"
      onClick={handleUpVote}
    >
      <BiUpvote className="text-on-surface-variant"></BiUpvote>
      <span className="text-[12px] font-bold text-on-surface-variant/80">
        {upVoteCounter}
      </span>
    </div>
  );
}

export default Upvote;

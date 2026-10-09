import { BiDownvote } from "react-icons/bi";
function DownVote({ handleDownVote, downVoteCounter }) {
  return (
    <div
      className="flex items-center cursor-pointer gap-0.5"
      onClick={handleDownVote}
    >
      <BiDownvote className="text-on-surface-variant"></BiDownvote>
      <span className="text-[12px] font-bold text-on-surface-variant/80">
        {downVoteCounter}
      </span>
    </div>
  );
}

export default DownVote;

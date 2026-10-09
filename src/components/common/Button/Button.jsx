function Button({ children, onClick, moreStyle }) {
  return (
    <button
      onClick={onClick}
      className={`bg-primary text-on-primary py-2 px-6 w-fit h-10 font-semibold rounded hover:opacity-90 cursor-pointer transition-all ${moreStyle}`}
    >
      {children}
    </button>
  );
}

export default Button;

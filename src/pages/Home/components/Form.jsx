import { useState } from "react";
import Button from "../../../components/common/Button/Button";
import { v4 as uuidv4 } from "uuid";

function Form({ addPost }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in both fields");
      return;
    }
    addPost({
      title: title,
      description: description,
      userId: uuidv4(),
      author: "Salah",
      role: "MERN Developer",
      img: null,
    });
    setTitle("");
    setDescription("");
  };
  return (
    <section className="py-16 flex justify-center bg-surface-low text-on-surface transition-colors duration-300">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-4 text-on-surface">Stay in the Loop</h2>
        <p className="text-on-surface-variant mb-4">
          Get weekly curated tutorials, industry news, and event invitations
          directly in your inbox.
        </p>
        <form
          className="bg-surface max-w-sm border border-outline-variant shadow-md rounded px-8 pt-6 pb-8 mb-4 transition-colors duration-300"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-on-surface-variant text-sm font-bold mb-2"
              htmlFor="title"
            >
              Post Title
            </label>
            <input
              className="shadow appearance-none border border-outline-variant bg-surface text-on-surface rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              id="title"
              type="text"
              placeholder="eg. Tech last updates"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-on-surface-variant text-sm font-bold mb-2"
              htmlFor="description"
            >
              Post Description
            </label>
            <input
              className="shadow appearance-none border border-outline-variant bg-surface text-on-surface rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              id="description"
              placeholder="Enter post description..."
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <Button>Share the post</Button>
          </div>
          <p className="text-center text-on-surface-variant/70 text-xs mt-4">
            By sharing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </form>
      </div>
    </section>
  );
}

export default Form;

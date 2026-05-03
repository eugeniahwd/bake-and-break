import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !duration) return alert("Isi semua field!");
    onAdd(title, parseInt(duration));
    setTitle("");
    setDuration("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-2 mb-6 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border-2 border-pink-200 shadow-md"
    >
      <input
        type="text"
        placeholder="Task name..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-4 py-2 rounded-xl border-2 border-pink-200 bg-white/80 text-pink-900 font-semibold placeholder-pink-300 outline-none focus:border-pink-500 transition"
      />
      <input
        type="number"
        placeholder="Estimated time (mins)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        min="1"
        className="w-52 px-4 py-2 rounded-xl border-2 border-pink-200 bg-white/80 text-pink-900 font-semibold placeholder-pink-300 outline-none focus:border-pink-500 transition"
      />
      <button
        type="submit"
        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-extrabold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
      >
        + Add Task
      </button>
    </form>
  );
}

export default TaskForm;
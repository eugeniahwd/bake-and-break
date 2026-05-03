import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import StickerBackground from "../components/StickerBackground";

const API = "https://friendly-intuition-production-6d8d.up.railway.app";

function AppPage() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async (title, duration_minutes) => {
    await axios.post(`${API}/tasks`, { title, duration_minutes });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await axios.patch(`${API}/tasks/${id}/status`, { status });
    fetchTasks();
  };

  const toggleComplete = async (id, completed) => {
    await axios.patch(`${API}/tasks/${id}/complete`, { completed });
    fetchTasks();
  };

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.completed).length;

  return (
    <div
      className="min-h-screen font-['Nunito',sans-serif] text-pink-900"
      style={{
        backgroundColor: "#fff0f3",
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 38px, rgba(255,182,193,0.25) 38px, rgba(255,182,193,0.25) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 38px, rgba(255,182,193,0.25) 38px, rgba(255,182,193,0.25) 40px),
          repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(255,210,220,0.15) 18px, rgba(255,210,220,0.15) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,210,220,0.15) 18px, rgba(255,210,220,0.15) 40px)
        `,
      }}
    >
    <StickerBackground />
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b-2 border-pink-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-pink-600 font-extrabold text-lg hover:text-pink-800 hover:-translate-x-1 transition-all"
          >
            ← Bake and Break
          </button>

          {/* Progress badge */}
          <div className="flex items-center gap-2 bg-pink-50 border-2 border-pink-200 rounded-full px-4 py-1">
            <span className="text-sm font-bold text-pink-500">
              {doneTasks}/{totalTasks} done
            </span>
            <div className="w-24 h-2 bg-pink-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-500"
                style={{ width: totalTasks ? `${(doneTasks / totalTasks) * 100}%` : "0%" }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-extrabold text-pink-700 tracking-wide mb-1"
            style={{ textShadow: "2px 2px 0px #f8bbd0" }}
          >
            My Tasks 📋
          </h1>
          <p className="text-pink-400 font-semibold">
            Add your tasks and start focusing!
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total Tasks", value: totalTasks, emoji: "📝", color: "from-pink-400 to-pink-500" },
            { label: "In Progress", value: tasks.filter(t => t.status === "sedang").length, emoji: "⚡", color: "from-blue-400 to-blue-500" },
            { label: "Completed", value: doneTasks, emoji: "✅", color: "from-emerald-400 to-emerald-500" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/60 backdrop-blur-sm border-2 border-pink-100 rounded-2xl p-3 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className={`text-2xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-xs text-pink-400 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        <TaskForm onAdd={addTask} />
        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onUpdateStatus={updateStatus}
          onToggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
}

export default AppPage;
import PomodoroTimer from "./PomodoroTimer";

const statusStyle = {
  belum:  { bg: "bg-amber-50",   text: "text-amber-500",   border: "border-amber-300",  label: "Not Started" },
  sedang: { bg: "bg-blue-50",    text: "text-blue-500",    border: "border-blue-300",   label: "On Progress" },
  selesai:{ bg: "bg-emerald-50", text: "text-emerald-500", border: "border-emerald-300",label: "Completed"   },
};

function TaskList({ tasks, onDelete, onUpdateStatus, onToggleComplete }) {
  return (
    <div className="flex flex-col gap-3">
      {tasks.length === 0 && (
        <p className="text-center text-pink-300 font-bold mt-10 text-lg">
          No tasks yet! Add some tasks to get started! 🌸
        </p>
      )}
      {tasks.map((task) => {
        const s = statusStyle[task.status] || statusStyle.belum;
        return (
          <div
            key={task.id}
            className={`bg-white/60 backdrop-blur-sm rounded-2xl p-4 border-2 border-pink-200 shadow-sm hover:-translate-y-0.5 transition-all ${task.completed ? "opacity-50" : ""}`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => {
                  onToggleComplete(task.id, e.target.checked);
                  // kalau di-centang → selesai, uncheck → belum
                  onUpdateStatus(task.id, e.target.checked ? "selesai" : "belum");
                }}
                className="w-5 h-5 cursor-pointer accent-pink-500"
              />
              <div className="flex-1">
                <h3 className={`font-bold text-pink-900 text-base ${task.completed ? "line-through" : ""}`}>
                  {task.title}
                </h3>
                <span className="text-xs text-pink-400 font-semibold">⏱ {task.duration_minutes} mins</span>
              </div>

              {/* Status badge — otomatis, bukan dropdown */}
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
                {s.label}
              </span>

              <button
                onClick={() => onDelete(task.id)}
                className="flex items-center p-2 rounded-xl border-2 border-pink-200 bg-pink-50 hover:bg-pink-100 transition"
              >
                ❌
              </button>
            </div>

            {/* Pomodoro — sambungkan onStatusChange */}
            <PomodoroTimer
              taskId={task.id}
              duration={task.duration_minutes}
              onStatusChange={onUpdateStatus}
            />
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;
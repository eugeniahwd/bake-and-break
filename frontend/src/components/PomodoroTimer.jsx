import { useState, useEffect, useRef } from "react";

const POMODORO = 25 * 60; // 1 sesi fokus = 25 menit
const BREAK    = 5  * 60; // break = 5 menit

function PomodoroTimer({ taskId, duration, onStatusChange }) {
  const totalSeconds = duration * 60;

  // Sisa waktu tugas yang belum dikerjakan
  const [remainingTask, setRemainingTask] = useState(totalSeconds);

  // Durasi sesi focus sekarang (25 min, atau sisa kalau < 25 min)
  const [seconds, setSeconds] = useState(Math.min(POMODORO, totalSeconds));

  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak]     = useState(false);
  const [isDone, setIsDone]       = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);

            if (!isBreak) {
              // Sesi focus habis
              setRemainingTask((prevRemaining) => {
                const newRemaining = prevRemaining - Math.min(POMODORO, prevRemaining);

                if (newRemaining <= 0) {
                  // Tidak ada sisa → break lalu selesai
                  alert("Focus session complete! Starting break now ☕");
                  setIsBreak(true);
                  setSeconds(BREAK);
                  // isRunning tetap true → break auto-start
                } else {
                  // Masih ada sisa → break dulu, nanti lanjut focus
                  alert(`Focus session complete! ${Math.ceil(newRemaining / 60)} mins remaining after break ☕`);
                  setIsBreak(true);
                  setSeconds(BREAK);
                  // isRunning tetap true → break auto-start
                }

                return newRemaining;
              });
            } else {
              // Break habis → cek sisa waktu
              setRemainingTask((prevRemaining) => {
                if (prevRemaining <= 0) {
                  // Semua sudah dikerjakan → Completed!
                  alert("Break complete! Great job, task is done! 🎉");
                  setIsRunning(false);
                  setIsDone(true);
                  onStatusChange && onStatusChange(taskId, "selesai");
                } else {
                  // Masih ada sisa → lanjut focus
                  const nextFocus = Math.min(POMODORO, prevRemaining);
                  alert(`Break complete! Let's focus for ${Math.ceil(nextFocus / 60)} more mins! 🎯`);
                  setIsBreak(false);
                  setSeconds(nextFocus);
                  // isRunning tetap true → focus auto-start
                }
                return prevRemaining;
              });
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isBreak]);

  const handleStart = () => {
    if (isDone) return;
    onStatusChange && onStatusChange(taskId, "sedang");
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsBreak(false);
    setIsDone(false);
    setRemainingTask(totalSeconds);
    setSeconds(Math.min(POMODORO, totalSeconds));
    onStatusChange && onStatusChange(taskId, "belum");
  };

  const format = (s) => {
    const m   = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  // Hitung progress ronde (berapa sesi dari total)
  const totalSessions  = Math.ceil(totalSeconds / POMODORO);
  const doneSeconds    = totalSeconds - remainingTask;
  const sessionsDone   = Math.floor(doneSeconds / POMODORO);

  // Tampilan kalau sudah selesai
  if (isDone) {
    return (
      <div className="flex items-center gap-3 flex-wrap bg-emerald-50/60 px-4 py-2 rounded-xl border border-emerald-200">
        <span className="text-xs font-extrabold px-3 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-300">
          🎉 Done!
        </span>
        <span className="flex-1 text-sm font-bold text-emerald-600">
          Task completed! Well done 🌸
        </span>
        <button
          onClick={handleReset}
          className="flex items-center justify-center min-w-[70px] px-3 py-1.5 rounded-xl border-2 border-emerald-200 bg-white/70 text-emerald-700 font-bold text-sm hover:bg-emerald-100 transition hover:-translate-y-0.5"
        >
          Reset
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 flex-wrap bg-pink-50/60 px-4 py-2 rounded-xl border border-pink-100">

      {/* Mode badge */}
      <span
        className={`flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full border ${
          isBreak
            ? "bg-green-50 text-green-700 border-green-300"
            : "bg-pink-100 text-pink-700 border-pink-300"
        }`}
      >
        {isBreak ? "☕ Break" : "🎯 Focus"}
      </span>

      {/* Timer */}
      <span className="flex-1 text-2xl font-extrabold text-pink-800 tracking-widest font-mono">
        {format(seconds)}
      </span>

      {/* Sesi indicator — misal: Sesi 1/2 */}
      <span className="text-xs text-pink-400 font-bold">
        Session {Math.min(sessionsDone + 1, totalSessions)}/{totalSessions}
      </span>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={isRunning ? handlePause : handleStart}
          className="flex items-center justify-center min-w-[70px] px-3 py-1.5 rounded-xl border-2 border-pink-200 bg-white/70 text-pink-800 font-bold text-sm hover:bg-pink-100 transition hover:-translate-y-0.5"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center min-w-[70px] px-3 py-1.5 rounded-xl border-2 border-pink-200 bg-white/70 text-pink-800 font-bold text-sm hover:bg-pink-100 transition hover:-translate-y-0.5"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default PomodoroTimer;
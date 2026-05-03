import { useNavigate } from "react-router-dom";
import StickerBackground from "../components/StickerBackground";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center font-['Nunito',sans-serif]"
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
      {/* Card */}
      <div className="flex flex-col items-center gap-8 bg-white/60 backdrop-blur-sm border-2 border-pink-200 rounded-3xl shadow-xl px-16 py-14 animate-fade-in">

        {/* Logo image — ganti path sesuai file logo kamu */}
        <div className="w-52 h-52 rounded-2xl overflow-hidden shadow-lg border-4 border-pink-200 flex items-center justify-center bg-pink-50">
          <img
            src="/logo.png"
            alt="App Logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML = `<span class='text-6xl'>🍳</span>`;
            }}
          />
        </div>

        {/* App name & tagline */}
        <div className="text-center">
          <h1
            className="text-5xl font-extrabold text-pink-700 tracking-wide mb-2"
            style={{ textShadow: "2px 2px 0px #f8bbd0" }}
          >
            Bake and Break
          </h1>
          <p className="text-pink-400 font-semibold text-lg">
            Stay focused. Get things done.
          </p>
        </div>

        {/* START button */}
        <button
          onClick={() => navigate("/app")}
          className="group relative px-12 py-4 bg-gradient-to-r from-pink-400 to-pink-600 text-white text-xl font-extrabold rounded-2xl shadow-lg
            hover:shadow-pink-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105
            active:scale-95 active:translate-y-0
            transition-all duration-200"
        >
          <span className="relative z-10 tracking-widest">START!</span>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-300 to-pink-500 opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-200" />
        </button>

        {/* Footer note */}
        <p className="text-pink-300 text-sm font-medium">
          Your cute productivity companion 🎀
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
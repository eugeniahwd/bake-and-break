const stickers = [
  // Sisi Kiri
  { src: "/stickers/milk.png", top: "10%", left: "3%", size: 70, rotation: -15, delay: "0s" },
  { src: "/stickers/pretzel.png", top: "25%", left: "8%", size: 55, rotation: -20, delay: "0.8s" },
  { src: "/stickers/bear2.png", top: "45%", left: "2%", size: 65, rotation: 12, delay: "1.5s" },
  { src: "/stickers/loaf.png", top: "65%", left: "7%", size: 60, rotation: 20, delay: "0.5s" },
  { src: "/stickers/croissant.png", top: "85%", left: "4%", size: 70, rotation: 10, delay: "0.3s" },

  // Sisi Kanan
  { src: "/stickers/loaf.png", top: "8%", left: "88%", size: 60, rotation: 20, delay: "1.1s" },
  { src: "/stickers/milk.png", top: "22%", left: "82%", size: 65, rotation: -10, delay: "0.4s" },
  { src: "/stickers/bear.png", top: "40%", left: "91%", size: 75, rotation: -8, delay: "1s" },
  { src: "/stickers/pretzel.png", top: "60%", left: "85%", size: 55, rotation: 15, delay: "0.7s" },
  { src: "/stickers/croissant.png", top: "78%", left: "90%", size: 70, rotation: -12, delay: "1.3s" },

  // Bagian Bawah
  { src: "/stickers/tools.png", top: "85%", left: "25%", size: 60, rotation: -5, delay: "1.2s" },
  { src: "/stickers/bear2.png", top: "83%", left: "45%", size: 65, rotation: 8, delay: "0.9s" },
  { src: "/stickers/tools.png", top: "88%", left: "75%", size: 60, rotation: 15, delay: "0.2s" },
];

function StickerBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stickers.map((s, i) => (
        <img
          key={i}
          src={s.src}
          alt=""
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            objectFit: "contain",
            transform: `rotate(${s.rotation}deg)`,
            opacity: 0.75,
            animation: `float 4s ease-in-out infinite alternate`,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}

export default StickerBackground;
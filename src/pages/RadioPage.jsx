import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────
//  🎵 CONFIGURA TUS CANCIONES AQUÍ
// ─────────────────────────────────────────────
import welcomeAudio from "../assets/audio/radio_welcome.mp3";
import welcomeImage from "../assets/images/radio/welcome.jpg";
import song1 from "../assets/audio/songs/song1.mp3";
import bg1 from "../assets/images/radio/bg1.jpg";
import song2 from "../assets/audio/songs/song2.mp3";
import bg2 from "../assets/images/radio/bg2.jpg";
import song3 from "../assets/audio/songs/song3.mp3";
import bg3 from "../assets/images/radio/bg3.jpg";
import song4 from "../assets/audio/songs/song4.mp3";
import bg4 from "../assets/images/radio/bg4.jpg";
import song5 from "../assets/audio/songs/song5.mp3";
import bg5 from "../assets/images/radio/bg5.jpg";
import song6 from "../assets/audio/songs/song6.mp3";
import bg6 from "../assets/images/radio/bg6.jpg";
import song7 from "../assets/audio/songs/song7.mp3";
import bg7 from "../assets/images/radio/bg7.jpg";
import song8 from "../assets/audio/songs/song8.mp3";
import bg8 from "../assets/images/radio/bg8.jpg";
import song9 from "../assets/audio/songs/song9.mp3";
import bg9 from "../assets/images/radio/bg9.jpg";
import song10 from "../assets/audio/songs/song10.mp3";
import bg10 from "../assets/images/radio/bg10.jpg";
import song11 from "../assets/audio/songs/song11.mp3";
import bg11 from "../assets/images/radio/bg11.jpg";
import song12 from "../assets/audio/songs/song12.mp3";
import bg12 from "../assets/images/radio/bg12.jpg";
import song13 from "../assets/audio/songs/song13.mp3";
import bg13 from "../assets/images/radio/bg13.jpg";
import song14 from "../assets/audio/songs/song14.mp3";
import bg14 from "../assets/images/radio/bg14.jpg";
import song15 from "../assets/audio/songs/song15.mp3";
import bg15 from "../assets/images/radio/bg15.jpg";
import song16 from "../assets/audio/songs/song16.mp3";
import bg16 from "../assets/images/radio/bg16.jpg";

const WELCOME_AUDIO = welcomeAudio;
const WELCOME_IMAGE = welcomeImage;

const TRACKS = [
  { title: "SEBA VAMO A MARTINETE", artist: "JAVIER MARTÍNEZ", src: song1, bg: bg1, color: "#e80000" },
  { title: "LOST MEDIA", artist: "JAVIER MARTÍNEZ", src: song2, bg: bg2, color: "#aaaaaa" },
  { title: "MANGASES", artist: "JAVIER MARTÍNEZ", src: song3, bg: bg3, color: "#f4970b" },
  { title: "PLAYACUCU", artist: "JAVIER MARTÍNEZ", src: song4, bg: bg4, color: "#00c5e8" },
  { title: "LAS CHINAS", artist: "MANU VACA", src: song5, bg: bg5, color: "#be00e8" },
  { title: "LÍNEA TEMPORAL 2", artist: "JAVIER MARTÍNEZ", src: song6, bg: bg6, color: "#4200e8" },
  { title: "LÍNEA TEMPORAL 3", artist: "JAVIER MARTÍNEZ", src: song7, bg: bg7, color: "#5100e8" },
  { title: "LÍNEA TEMPORAL", artist: "JAVIER MARTÍNEZ", src: song8, bg: bg8, color: "#590d9c" },
  { title: "LOST MEDIA 2", artist: "JAVIER MARTÍNEZ", src: song9, bg: bg9, color: "#aaaaaa" },
  { title: "LUI AMO A VE", artist: "SEBAS PIEDEHIERRO", src: song10, bg: bg10, color: "#00e813" },
  { title: "MUCHAQUEBAB", artist: "JAVIER MARTÍNEZ", src: song11, bg: bg11, color: "#995d0f" },
  { title: "MUCHALOWEEN", artist: "JAVIER MARTÍNEZ", src: song12, bg: bg12, color: "#e8a000" },
  { title: "NOOO MI PELOTAA", artist: "SEBAS PIEDEHIERRO", src: song13, bg: bg13, color: "#0027e8" },
  { title: "OH JOSE DÓNDE ESTÁS", artist: "JAVIER MARTÍNEZ", src: song14, bg: bg14, color: "#e800c9" },
  { title: "PEPERONI DE SES", artist: "MANU VACA", src: song15, bg: bg15, color: "#00e851" },
  { title: "POCA INGENIERÍA LIBRE", artist: "JAVIER MARTÍNEZ", src: song16, bg: bg16, color: "#7400e8" },
];
// ─────────────────────────────────────────────

// Número de barras de la onda
const BARS = 28;

function createShuffledQueue(length) {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Componente barra de onda animada con Canvas
function WaveBar({ color, playing }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const barsRef = useRef(
    Array.from({ length: BARS }, () => ({
      h: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.04 + 0.02,
      phase: Math.random() * Math.PI * 2,
    }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const draw = (t) => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const barW = W / BARS;
      const gap = barW * 0.25;
      const bw = barW - gap;

      barsRef.current.forEach((bar, i) => {
        const target = playing
          ? 0.15 + 0.8 * Math.abs(Math.sin(t * bar.speed + bar.phase + i * 0.3))
          : 0.05;
        bar.h += (target - bar.h) * 0.12;

        const barH = Math.max(2, bar.h * H);
        const x = i * barW + gap / 2;
        const y = (H - barH) / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + barH);
        grad.addColorStop(0, color + "ff");
        grad.addColorStop(0.5, color + "cc");
        grad.addColorStop(1, color + "44");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, bw, barH, bw / 2);
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [color, playing]);

  return (
    <canvas
      ref={canvasRef}
      width={220}
      height={40}
      style={{ display: "block", width: "100%", height: "40px" }}
    />
  );
}

export default function RadioPage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const queueRef = useRef([]);
  const queuePosRef = useRef(0);

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [entered, setEntered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bgFade, setBgFade] = useState(false);
  const [widgetVisible, setWidgetVisible] = useState(false);

  // ⏰ Estado para el reloj digital
  const [currentTime, setCurrentTime] = useState(new Date());

  const track = TRACKS[trackIndex] ?? null;
  const accentColor = track?.color ?? "#e8c100";

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Silenciar música global al entrar
  useEffect(() => {
    document.querySelectorAll("audio").forEach((el) => {
      if (el !== audioRef.current) el.pause();
    });
  }, []);

  // ⏰ Efecto para actualizar el reloj cada segundo
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const handleEnter = useCallback(() => {
    setEntered(true);

    if (TRACKS.length > 0) {
      queueRef.current = createShuffledQueue(TRACKS.length);
      queuePosRef.current = 0;
      setTrackIndex(queueRef.current[0]);
    }

    if (WELCOME_AUDIO) {
      const welcome = new Audio(WELCOME_AUDIO);
      welcome.volume = 0.8;
      welcome.play().catch(() => setWelcomeDone(true));
      welcome.addEventListener("ended", () => setWelcomeDone(true));
    } else {
      setWelcomeDone(true);
    }
  }, []);

  // Arrancar primera canción cuando termina el welcome
  useEffect(() => {
    if (!welcomeDone || !audioRef.current || TRACKS.length === 0) return;
    const idx = queueRef.current[queuePosRef.current] ?? 0;
    const audio = audioRef.current;
    audio.src = TRACKS[idx]?.src ?? "";
    audio.volume = 0.7;
    audio.play()
      .then(() => {
        setIsPlaying(true);
        setTimeout(() => setWidgetVisible(true), 100);
      })
      .catch(() => { });
  }, [welcomeDone]);

  // Pasar a siguiente canción automáticamente
  const handleNext = useCallback(() => {
    if (TRACKS.length === 0) return;
    queuePosRef.current += 1;
    if (queuePosRef.current >= queueRef.current.length) {
      queueRef.current = createShuffledQueue(TRACKS.length);
      queuePosRef.current = 0;
    }
    const newIdx = queueRef.current[queuePosRef.current];
    setBgFade(true);
    setTimeout(() => {
      setTrackIndex(newIdx);
      setBgFade(false);
      if (audioRef.current) {
        audioRef.current.src = TRACKS[newIdx]?.src ?? "";
        audioRef.current.volume = 0.7;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => { });
      }
    }, 400);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener("ended", handleNext);
    return () => audio.removeEventListener("ended", handleNext);
  }, [handleNext]);

  // Teclado: solo ESC para salir
  useEffect(() => {
    const onKey = (e) => {
      if (!entered) {
        if (e.key === "Enter" || e.key === " ") handleEnter();
        if (e.key === "Escape") navigate(-1);
        return;
      }
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [entered, handleEnter, navigate]);

  // Formatear datos para el estilo Despertador
  const formatTime = currentTime.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const formatDay = currentTime.toLocaleDateString("es-ES", { weekday: "short" }).toUpperCase().replace('.', '');
  const formatDateNum = currentTime.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" });

  return (
    <div id="menu-screen" style={{ position: "relative" }}>
      <audio ref={audioRef} preload="auto" />

      {/* ── FONDO ── */}
      <div
        className={`radio-bg${bgFade ? " fade-out" : ""}`}
        style={{
          backgroundImage: entered && WELCOME_IMAGE ? `url(${WELCOME_IMAGE})` : "none",
          backgroundColor: "#0a0e1a",
        }}
      />
      <div className="radio-bg-overlay" />

      {/* ── PANTALLA DE ENTRADA ── */}
      {!entered && (
        <div className={`radio-entry${mounted ? " mounted" : ""}`}>
          <div className="radio-entry-disc">
            <div className="radio-entry-disc-grooves" />
            <div className="radio-entry-disc-center"><span>♪</span></div>
            <div className="radio-entry-disc-hole" />
          </div>
          <div className="radio-entry-title">RADIO MUCHACHO</div>
          <div className="radio-entry-sub">NO PULSES EL BOTÓN SI NO QUIERES SER BODRIO</div>
          <button className="radio-entry-btn" onClick={handleEnter}>
            <span>▶</span>
            SUPONGO
          </button>
          <div className="radio-entry-hint">TAMBIÉN PUEDES ECHAR A LUIS PA FUERA</div>
        </div>
      )}

      {/* 🚨 ── RELOJ DIGITAL ESTILO DESPERTADOR ROJO (SUPERIOR IZQUIERDA) ── */}
      {entered && (
        <div className={`radio-alarm-clock ${widgetVisible ? "visible" : ""}`}>
          <div className="alarm-glow" />
          <div className="alarm-segment">
            <span className="alarm-tag">DATE</span>
            <span className="alarm-num text-red">{formatDay} {formatDateNum}</span>
          </div>
          <div className="alarm-divider" />
          <div className="alarm-segment">
            <span className="alarm-tag">TIME</span>
            <span className="alarm-num text-red">{formatTime}</span>
          </div>
        </div>
      )}

      {/* ── WIDGET ESQUINA SUPERIOR DERECHA ── */}
      {entered && (
        <div className={`radio-widget${widgetVisible ? " visible" : ""}`} style={{ "--accent": accentColor }}>

          {/* Carátula */}
          <div className="radio-widget-art">
            {track?.bg
              ? <img src={track.bg} alt={track?.title} />
              : <div className="radio-widget-art-placeholder">♪</div>
            }
            {/* Indicador ON AIR */}
            <div className="radio-widget-onair">
              <span className="radio-widget-dot" />
              ON AIR
            </div>
          </div>

          {/* Info + onda */}
          <div className="radio-widget-info">
            {!welcomeDone ? (
              <div className="radio-widget-welcome">▶ SINTONIZANDO...</div>
            ) : (
              <>
                <div className="radio-widget-title">{track?.title ?? "—"}</div>
                <div className="radio-widget-artist">{track?.artist ?? ""}</div>
                <div className="radio-widget-wave">
                  <WaveBar color={accentColor} playing={isPlaying} />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Botón ESC / BACK (móvil) */}
      {entered && (
        <button className="radio-back-btn" onClick={() => navigate(-1)}>BACK</button>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Anton&family=Barlow+Condensed:wght@300;700&family=Orbitron:wght@700&display=swap');

        /* ── FONDO ── */
        .radio-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          transition: opacity 0.5s ease; z-index: 0;
        }
        .radio-bg.fade-out { opacity: 0; }
        .radio-bg-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(160deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.5) 100%);
          z-index: 1;
        }

        /* ── PANTALLA DE ENTRADA ── */
        .radio-entry {
          position: absolute; inset: 0; z-index: 2;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;
          opacity: 0; transition: opacity 0.6s ease;
        }
        .radio-entry.mounted { opacity: 1; }
        .radio-entry-disc {
          width: 160px; height: 160px; border-radius: 50%; position: relative;
          background: radial-gradient(circle at 30% 25%, #2a2a2a 0%, #111 40%, #0a0a0a 100%);
          box-shadow: 0 0 0 3px #1a1a1a, 0 0 0 5px #111, 0 0 60px rgba(232,193,0,0.15);
          animation: entry-float 3s ease-in-out infinite;
        }
        @keyframes entry-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .radio-entry-disc-grooves {
          position: absolute; inset: 6px; border-radius: 50%;
          background: repeating-radial-gradient(circle at center, transparent 0px, transparent 5px, rgba(255,255,255,0.03) 5px, rgba(255,255,255,0.03) 6px);
        }
        .radio-entry-disc-center {
          position: absolute; top:50%; left:50%; transform:translate(-50%,-50%);
          width:55px; height:55px; border-radius:50%; background:#e8c100;
          display:flex; align-items:center; justify-content:center;
          font-size:22px; color:rgba(0,0,0,0.7);
        }
        .radio-entry-disc-hole {
          position: absolute; top:50%; left:50%; transform:translate(-50%,-50%);
          width:9px; height:9px; border-radius:50%; background:#000;
          box-shadow:0 0 0 2px #1a1a1a; z-index:2;
        }
        .radio-entry-title {
          font-family:'Anton',sans-serif; font-size:68px; letter-spacing:10px;
          color:#fff; line-height:1; text-shadow:0 0 40px rgba(255,255,255,0.15);
        }
        .radio-entry-sub {
          font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:4px;
          color:rgba(255,255,255,0.3); margin-top:-8px;
        }
        .radio-entry-btn {
          display:flex; align-items:center; gap:12px; margin-top:10px;
          background:transparent; border:1px solid #e8c100;
          color:#e8c100; font-family:'Bebas Neue',sans-serif;
          font-size:18px; letter-spacing:5px; padding:14px 40px; cursor:pointer;
          clip-path:polygon(0 0,100% 0,calc(100% - 12px) 100%,12px 100%);
          transition:background 0.2s, box-shadow 0.2s;
        }
        .radio-entry-btn:hover { background:rgba(255,255,255,0.06); box-shadow:0 0 20px #e8c10066; }
        .radio-entry-hint {
          font-family:'Barlow Condensed',sans-serif; font-size:12px;
          letter-spacing:2px; color:rgba(255,255,255,0.12); margin-top:-6px;
        }

        /* 🚨 ── RELOJ DESPERTADOR DIGITAL ROJO ── */
        .radio-alarm-clock {
          position: absolute;
          top: 24px; left: 24px;
          z-index: 10;
          background: #080202;
          border: 2px solid #260a0f;
          border-radius: 4px;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.7), inset 0 0 15px rgba(0,0,0,0.9);
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .radio-alarm-clock.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .alarm-glow {
          position: absolute; inset: 0;
          background: radial-gradient(circle at center, rgba(255, 0, 51, 0.04) 0%, transparent 80%);
          pointer-events: none;
        }
        .alarm-segment {
          display: flex;
          flex-direction: column;
        }
        .alarm-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          color: #54191f; /* Rojo muy apagado para simular texto impreso o grabado */
          line-height: 1;
          margin-bottom: 2px;
        }
        .alarm-num {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 1px;
          line-height: 1;
        }
        .text-red {
          color: #ff003c;
          text-shadow: 0 0 8px rgba(255, 0, 60, 0.8), 0 0 2px rgba(255, 0, 60, 0.4);
        }
        .alarm-divider {
          width: 1px;
          height: 24px;
          background: #260a0f;
        }

        /* ── WIDGET ESQUINA ── */
        .radio-widget {
          position: absolute;
          top: 24px; right: 24px;
          z-index: 10;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
          border-left: 3px solid var(--accent, #e8c100);
          border-radius: 4px;
          padding: 10px 14px 10px 10px;
          width: 280px;
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .radio-widget.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Carátula */
        .radio-widget-art {
          position: relative;
          width: 64px; height: 64px;
          border-radius: 3px;
          overflow: hidden;
          flex-shrink: 0;
          background: #111;
        }
        .radio-widget-art img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .radio-widget-art-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; color: rgba(255,255,255,0.2);
        }
        .radio-widget-onair {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: rgba(0,0,0,0.7);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9px; letter-spacing: 2px; color: #fff;
          display: flex; align-items: center; justify-content: center; gap: 4px;
          padding: 2px 0;
        }
        .radio-widget-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #c4001a;
          animation: radio-pulse 1.4s ease-in-out infinite;
        }
        @keyframes radio-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.6)} }

        /* Info */
        .radio-widget-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 3px;
          overflow: hidden;
          min-height: 64px;
        }
        .radio-widget-title {
          font-family: 'Anton', sans-serif;
          font-size: 13px; letter-spacing: 1.5px;
          color: var(--accent, #e8c100);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          text-shadow: 0 0 10px var(--accent,#e8c100);
          line-height: 1.1;
        }
        .radio-widget-artist {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 300; font-size: 10px; letter-spacing: 3px;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .radio-widget-wave {
          margin-top: 4px;
        }
        .radio-widget-welcome {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px; letter-spacing: 3px;
          color: rgba(255,255,255,0.4);
          animation: radio-fade-pulse 1.5s ease-in-out infinite;
        }
        @keyframes radio-fade-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        /* ── BACK MÓVIL ── */
        .radio-back-btn {
          position: absolute; bottom: max(16px, env(safe-area-inset-bottom)); left: 16px;
          font-family: 'Bebas Neue', sans-serif; font-size: 13px; letter-spacing: 2px;
          color: #fff; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 16px; border-radius: 6px; cursor: pointer; z-index: 20;
        }

        @media (max-width: 768px) {
          .radio-entry-title { font-size: 44px; letter-spacing: 6px; }
          .radio-entry-disc  { width: 120px; height: 120px; }
          .radio-widget      { top: 12px; right: 12px; width: 220px; }
          .radio-alarm-clock { top: auto; bottom: 80px; left: 50%; transform: translateX(-50%); gap: 10px; padding: 6px 12px; }
          .radio-alarm-clock .alarm-num { font-size: 14px; }
        }
      `}</style>
    </div>
  );
}
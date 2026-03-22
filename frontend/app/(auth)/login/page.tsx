"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";

function TravelGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const W = 500, H = 500;
    canvas.width = W;
    canvas.height = H;

    const cx = W / 2, cy = H / 2, R = 195;

    let rot = 0;
    let tick = 0;
    let anim: number;

    const off = document.createElement("canvas");
    off.width = 1024;
    off.height = 512;
    const offCtx = off.getContext("2d")!;

    let tex: Uint8ClampedArray | null = null;
    let loaded = false;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/1280px-Blue_Marble_2002.png";

    img.onload = () => {
      offCtx.drawImage(img, 0, 0, 1024, 512);
      tex = offCtx.getImageData(0, 0, 1024, 512).data;
      loaded = true;
    };

    const routeDefs = [
      { from: [40.7,  -74.0], to: [51.5,   -0.1] },
      { from: [51.5,   -0.1], to: [35.7,  139.7] },
      { from: [35.7,  139.7], to: [28.6,   77.2] },
      { from: [28.6,   77.2], to: [-33.9, 151.2] },
      { from: [-33.9, 151.2], to: [-23.5, -46.6] },
      { from: [-23.5, -46.6], to: [40.7,  -74.0] },
      { from: [48.9,    2.3], to: [55.8,   37.6] },
      { from: [1.3,   103.8], to: [25.2,   55.3] },
    ];

    const routes = routeDefs.map(r => ({
      ...r,
      color: `hsl(${Math.random() * 360},80%,70%)`,
      speed: 0.0015 + Math.random() * 0.002,
      arc: 8 + Math.random() * 15,
    }));

    const planes = routes.map(() => ({
      t: Math.random(),
      trail: [] as { x: number; y: number }[],
    }));

    function toXYZ(lat: number, lon: number) {
      const phi   = (90 - lat)  * (Math.PI / 180);
      const theta = (lon + rot) * (Math.PI / 180);
      const sx =  Math.sin(phi) * Math.cos(theta);
      const sy = -Math.cos(phi);
      const sz =  Math.sin(phi) * Math.sin(theta);
      return { x: cx + R * sx, y: cy + R * sy, z: sz };
    }

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

    function drawPlane(x: number, y: number, angle: number, color: string) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(1.2, 1.2);

      ctx.shadowColor = color;
      ctx.shadowBlur = 6;

      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.8;

      // Fuselage
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(-10, -2.5);
      ctx.lineTo(-8, 0);
      ctx.lineTo(-10, 2.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Left wing
      ctx.beginPath();
      ctx.moveTo(2, -1);
      ctx.lineTo(-4, -10);
      ctx.lineTo(-8, -9);
      ctx.lineTo(-4, -1);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right wing
      ctx.beginPath();
      ctx.moveTo(2, 1);
      ctx.lineTo(-4, 10);
      ctx.lineTo(-8, 9);
      ctx.lineTo(-4, 1);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Tail fin left
      ctx.beginPath();
      ctx.moveTo(-7, -1);
      ctx.lineTo(-10, -5);
      ctx.lineTo(-11, -4);
      ctx.lineTo(-9, -1);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Tail fin right
      ctx.beginPath();
      ctx.moveTo(-7, 1);
      ctx.lineTo(-10, 5);
      ctx.lineTo(-11, 4);
      ctx.lineTo(-9, 1);
      ctx.closePath();
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      tick++;

      const pulse = 0.5 + Math.sin(tick * 0.03) * 0.2;

      if (loaded && tex) {
        const imgData = ctx.createImageData(W, H);
        const data = imgData.data;

        for (let py = 0; py < H; py++) {
          for (let px = 0; px < W; px++) {
            const dx = px - cx;
            const dy = py - cy;
            const d  = dx * dx + dy * dy;
            if (d > R * R) continue;

            const dz = Math.sqrt(R * R - d);
            const nx =  dx / R;
            const ny =  dy / R;
            const nz =  dz / R;

            const cosR = Math.cos(rot * Math.PI / 180);
            const sinR = Math.sin(rot * Math.PI / 180);
            const rx =  nx * cosR + nz * sinR;
            const ry =  ny;
            const rz = -nx * sinR + nz * cosR;

            const lon = Math.atan2(rx, rz);
            const lat = Math.asin(-ry);

            const u = lon / (2 * Math.PI) + 0.5;
            const v = 0.5 - lat / Math.PI;

            const tx = Math.min(Math.floor(u * 1024), 1023);
            const ty = Math.min(Math.floor(v * 512),  511);

            const ti = (ty * 1024 + tx) * 4;
            const i  = (py * W   + px) * 4;

            const light = 0.45 + 0.55 * nz;
            data[i]     = tex[ti]     * light;
            data[i + 1] = tex[ti + 1] * light;
            data[i + 2] = tex[ti + 2] * light;
            data[i + 3] = 255;
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }

      ctx.beginPath();
      ctx.arc(cx, cy, R + 15, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100,180,255,${0.08 * pulse})`;
      ctx.fill();

      for (let i = 0; i < routes.length; i++) {
        const r = routes[i];
        const p = planes[i];

        const lat  = lerp(r.from[0], r.to[0], p.t);
        const lon  = lerp(r.from[1], r.to[1], p.t);
        const arc  = r.arc * Math.sin(Math.PI * p.t);
        const pos  = toXYZ(lat + arc, lon);
        const dest = toXYZ(r.to[0], r.to[1]);

        if (pos.z > 0) {
          const angle = Math.atan2(dest.y - pos.y, dest.x - pos.x);

          p.trail.push({ x: pos.x, y: pos.y });
          if (p.trail.length > 15) p.trail.shift();

          for (let j = 1; j < p.trail.length; j++) {
            const alpha = j / p.trail.length;
            ctx.beginPath();
            ctx.moveTo(p.trail[j - 1].x, p.trail[j - 1].y);
            ctx.lineTo(p.trail[j].x,     p.trail[j].y);
            ctx.strokeStyle = r.color;
            ctx.globalAlpha = alpha * 0.8;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }

          drawPlane(pos.x, pos.y, angle, r.color);
        } else {
          p.trail = [];
        }

        p.t += r.speed;
        if (p.t > 1) p.t = 0;
      }

      rot += 0.06 + Math.sin(tick * 0.01) * 0.03;
      anim = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setIsLoading(false);
    if (res?.error) alert(res.error);
    else router.push("/home");
  };

  return (
    <div className="relative min-h-screen bg-[#04010e] flex flex-col lg:flex-row overflow-hidden">

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0520] via-[#04010e] to-[#010210]" />
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-violet-900/35 blur-[150px]" />
        <div className="absolute -bottom-20 -right-20 w-[550px] h-[550px] rounded-full bg-fuchsia-900/20 blur-[160px]" />
        <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-blue-900/15 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 8% 12%, rgba(255,255,255,0.7) 0%, transparent 100%),
              radial-gradient(1px 1px at 22% 38%, rgba(255,255,255,0.5) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 38% 8%, rgba(255,255,255,0.6) 0%, transparent 100%),
              radial-gradient(1px 1px at 52% 58%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1px 1px at 67% 22%, rgba(255,255,255,0.6) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 78% 68%, rgba(255,255,255,0.5) 0%, transparent 100%),
              radial-gradient(1px 1px at 88% 42%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1px 1px at 12% 72%, rgba(255,255,255,0.5) 0%, transparent 100%),
              radial-gradient(1px 1px at 58% 82%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 32% 52%, rgba(255,255,255,0.6) 0%, transparent 100%),
              radial-gradient(1px 1px at 45% 28%, rgba(255,255,255,0.5) 0%, transparent 100%),
              radial-gradient(1px 1px at 72% 85%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1px 1px at 3% 48%, rgba(255,255,255,0.5) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 90% 10%, rgba(255,255,255,0.6) 0%, transparent 100%),
              radial-gradient(1px 1px at 18% 88%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1px 1px at 62% 5%, rgba(255,255,255,0.5) 0%, transparent 100%),
              radial-gradient(1px 1px at 85% 55%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 50% 95%, rgba(255,255,255,0.5) 0%, transparent 100%)
            `,
          }}
        />
      </div>

      {/* LEFT — Globe */}
      <div className="relative z-10 w-full lg:w-1/2 min-h-[460px] lg:min-h-screen flex items-center justify-center">
        <div className="w-[500px] h-[500px]">
          <TravelGlobe />
        </div>
      </div>

      <div className="hidden lg:block absolute left-1/2 top-[6%] h-[88%] w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent z-10" />

      {/* RIGHT — Login */}
      <div className="relative z-10 w-full lg:w-1/2 min-h-screen flex items-center justify-center px-8 py-12">
        <div className="relative w-full max-w-md">

          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-violet-500/50 via-fuchsia-500/35 to-pink-500/50 opacity-40 blur-[2px]" />

          <div className="relative bg-white/[0.05] backdrop-blur-3xl rounded-3xl p-8 border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.7)]">

            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-fuchsia-300 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full px-3 py-1 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-ping inline-block" />
              Secure Login
            </span>

            <h2
              className="text-4xl font-black text-white mb-1 leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Welcome back ✈️
            </h2>
            <p className="text-gray-400 mb-8 text-sm">
              Continue your journey from where you left off.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="group relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/[0.07] border border-white/10 text-white placeholder-gray-500 text-sm focus:ring-2 focus:ring-violet-500/60 focus:border-violet-500/40 focus:bg-white/[0.10] outline-none transition-all"
                  required
                />
              </div>

              <div className="group relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-4 rounded-2xl bg-white/[0.07] border border-white/10 text-white placeholder-gray-500 text-sm focus:ring-2 focus:ring-violet-500/60 focus:border-violet-500/40 focus:bg-white/[0.10] outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full overflow-hidden rounded-2xl py-4 font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 group"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
                  boxShadow: "0 0 32px rgba(168,85,247,0.4)",
                }}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                    </svg>
                    Signing in…
                  </span>
                ) : (
                  <>
                    Continue
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-gray-500 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <button
              onClick={() => signIn("google", { callbackUrl: "/home" })}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-white/[0.06] border border-white/10 text-white text-sm font-medium hover:bg-white/[0.12] hover:border-white/20 active:scale-[0.98] transition-all duration-200"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
                <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.615 24 12.255 24z"/>
                <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"/>
                <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.64 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/>
              </svg>
              Continue with Google
            </button>

            <p className="mt-7 text-center text-sm text-gray-500">
              New explorer?{" "}
              <span
                onClick={() => router.push("/signup")}
                className="text-violet-400 font-semibold cursor-pointer hover:text-fuchsia-400 transition-colors"
              >
                Create account →
              </span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </div>
  );
}
/* =====================================================================
   APP FILE: desktop, windows, dock, menus, apps and the iPhone version.
   Lekha bodlate ei file chhunte hobe na — content.js edit koro.
   ===================================================================== */
(() => {
  "use strict";

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (h) => { const t = document.createElement("template"); t.innerHTML = h.trim(); return t.content.firstElementChild; };
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const isMobile = () => matchMedia("(max-width: 760px)").matches;
  const has = (v) => Array.isArray(v) ? v.length > 0 : v && typeof v === "object" ? Object.keys(v).length > 0 : !!String(v ?? "").trim();
  const strip = (h) => String(h || "").replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const tel = (p) => "tel:" + String(p).replace(/[^\d+]/g, "");
  const initials = SITE.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  const avatar = (cls = "") => SITE.photo ? `<div class="avatar ${cls}" style="background-image:url('${SITE.photo}')"></div>` : `<div class="avatar ${cls}">${initials}</div>`;
  const empty = (msg = "Coming soon", ic = "✏️") => `<div class="empty"><div class="empty-ic">${ic}</div><p>${esc(msg)}</p></div>`;
  const fmtDate = (d, o = { day: "numeric", month: "short", year: "numeric" }) => { if (!d) return ""; const x = new Date(d); return isNaN(x) ? "" : x.toLocaleDateString("en-US", o); };
  // pictures from Behance / YouTube are looked up in images/work/ first, then online
  const localOf = (u) => { let m = String(u).match(/behance\.net\/(.+)$/); if (m) return "images/work/" + m[1].split("/").pop().replace(/\.(png|jpe?g|webp)$/i, "") + ".jpg"; m = String(u).match(/ytimg\.com\/vi\/([\w-]+)\//); return m ? "images/work/yt-" + m[1] + ".jpg" : null; };
  const srcAttr = (u) => { const l = localOf(u); return l ? `src="${esc(l)}" data-fb="${esc(u)}"` : `src="${esc(u)}"`; };
  const store = {
    get(k, d) { try { const v = localStorage.getItem("shanto-" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem("shanto-" + k, JSON.stringify(v)); } catch {} },
  };

  /* ---------- preferences (this browser only) ---------- */
  const prefs = Object.assign({ theme: isMobile() ? "light" : "dark", wall: isMobile() ? "sky" : "glow", accent: "#0a84ff", dockMag: true }, store.get("prefs", {}));
  const savePrefs = () => store.set("prefs", prefs);

  /* ---------- wallpapers (drawn in CSS, plus your own photos) ---------- */
  const SWIRL = "url(\"data:image/svg+xml," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 860' preserveAspectRatio='xMidYMid slice'><defs><linearGradient id='a' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#0b2f8a'/><stop offset='.5' stop-color='#1f6fd6'/><stop offset='1' stop-color='#7cc4f2'/></linearGradient><linearGradient id='b' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='#fff' stop-opacity='0'/><stop offset='.5' stop-color='#fff' stop-opacity='.9'/><stop offset='1' stop-color='#fff' stop-opacity='0'/></linearGradient><filter id='f'><feGaussianBlur stdDeviation='14'/></filter></defs><rect width='400' height='860' fill='url(#a)'/><path d='M-60 520C80 380 220 700 470 300V900H-60z' fill='#0a2a7a' opacity='.55' filter='url(#f)'/><path d='M-40 120C120 260 260-40 460 140V-20H-40z' fill='#5fb3ff' opacity='.45' filter='url(#f)'/><path d='M-20 640C140 420 260 760 430 520' stroke='url(#b)' stroke-width='2.5' fill='none'/><path d='M-30 300C120 460 300 140 440 330' stroke='url(#b)' stroke-width='1.6' fill='none' opacity='.8'/><path d='M60 900C120 640 300 680 360-20' stroke='url(#b)' stroke-width='1.2' fill='none' opacity='.6'/><path d='M-40 760C150 560 330 900 450 600' stroke='#9fd8ff' stroke-width='22' fill='none' opacity='.18' filter='url(#f)'/></svg>`) + "\") center/cover";
  const WALLS = {
    swirl: { name: "Blue Swirl", css: SWIRL + ", #0b2f8a" },
    sky: { name: "Sky Blur", css: "radial-gradient(70% 45% at 85% 55%, rgba(255,214,200,.9) 0%, transparent 60%), radial-gradient(90% 60% at 10% 20%, #8fd3ff 0%, transparent 65%), radial-gradient(80% 50% at 40% 70%, #1f6fe0 0%, transparent 70%), linear-gradient(170deg, #9fd8ff 0%, #2f7de8 45%, #0d2c6e 100%)" },
    tealnight: { name: "Teal Night", css: "radial-gradient(60% 40% at 80% 25%, rgba(140,230,215,.75) 0%, transparent 65%), radial-gradient(80% 60% at 20% 60%, #0f5d5a 0%, transparent 70%), linear-gradient(170deg, #0b3b3d 0%, #072528 55%, #02090c 100%)" },
    glow: { name: "Blue Glow", css: "radial-gradient(1200px 700px at 78% 88%, #2f7bff 0%, transparent 60%), radial-gradient(900px 600px at 12% 8%, #3b2bb8 0%, transparent 60%), radial-gradient(700px 500px at 50% 50%, #0f3fae 0%, transparent 70%), linear-gradient(160deg, #071a52 0%, #0a2a78 55%, #0b1f5c 100%)" },
    lake: { name: "Lake", css: "radial-gradient(900px 500px at 50% 110%, #5ad1ff 0%, transparent 60%), radial-gradient(1200px 700px at 80% 0%, #6a5cff 0%, transparent 60%), linear-gradient(180deg, #0b1b4a 0%, #134a9c 55%, #2b8fd6 100%)" },
    aurora: { name: "Aurora", css: "radial-gradient(1200px 700px at 15% 20%, #7b5cff 0%, transparent 60%), radial-gradient(1000px 700px at 85% 80%, #00c2ff 0%, transparent 60%), radial-gradient(900px 600px at 60% 10%, #ff5ea8 0%, transparent 55%), linear-gradient(160deg, #1a1446 0%, #0d2a5c 100%)" },
    dusk: { name: "Dhaka Dusk", css: "radial-gradient(1100px 500px at 70% 105%, #ffb36b 0%, transparent 60%), radial-gradient(900px 500px at 10% 100%, #e2483d 0%, transparent 55%), linear-gradient(180deg, #16244a 0%, #4b2f6e 42%, #b6527a 72%, #f2a06b 100%)" },
    cinema: { name: "Cinema Red", css: "radial-gradient(900px 600px at 20% 30%, #ff2d2d 0%, transparent 60%), radial-gradient(800px 600px at 90% 90%, #7a0000 0%, transparent 60%), linear-gradient(135deg, #2a0000 0%, #0d0000 100%)" },
    walnut: { name: "Walnut", css: "radial-gradient(900px 600px at 30% 30%, #b8743e 0%, transparent 60%), linear-gradient(135deg, #5a2e14 0%, #8c4a22 50%, #3a1c0c 100%)" },
    mint: { name: "Mint", css: "radial-gradient(900px 600px at 20% 80%, #9af0c8 0%, transparent 60%), linear-gradient(135deg, #d9fff0 0%, #a9d9ff 100%)" },
    graphite: { name: "Graphite", css: "radial-gradient(900px 600px at 50% 0%, #4a4a52 0%, transparent 70%), linear-gradient(180deg, #1c1c1f 0%, #0b0b0d 100%)" },
    rec: { name: "REC. (photo)", css: "url('images/gallery/rec-studio.jpg') center 30%/cover" },
    portrait: { name: "B&W (photo)", css: "url('images/gallery/bw-portrait.jpg') center 30%/cover" },
  };
  const ACCENTS = ["#0a84ff", "#bf5af2", "#ff375f", "#ff9f0a", "#30d158", "#8e8e93"];
  function applyLook() {
    const dark = prefs.theme === "dark" || (prefs.theme === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
    $("#wallpaper").style.background = (WALLS[prefs.wall === "sky" && dark ? "tealnight" : prefs.wall] || WALLS.sky).css;
    document.documentElement.style.setProperty("--accent", prefs.accent);
    if (prefs.theme === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", prefs.theme);
  }

  /* =====================================================================
     ICONS — original artwork drawn in code, in a 2026 glass style
     ===================================================================== */
  const GRADS = new Set();
  const gid = (a, b) => "g" + a.slice(1) + b.slice(1);
  const SQ = (a, b, inner) => { GRADS.add(a + b); return `<svg viewBox="0 0 100 100" class="ic"><rect class="bg" x="2" y="2" width="96" height="96" rx="23" fill="url(#${gid(a, b)})"/><rect x="2" y="2" width="96" height="96" rx="23" fill="url(#hl)"/><g filter="url(#gs)">${inner}</g><rect x="2" y="2" width="96" height="96" rx="23" fill="url(#gloss)"/><rect x="2.6" y="2.6" width="94.8" height="94.8" rx="22.4" fill="none" stroke="url(#rim)" stroke-width="1.3"/></svg>`; };
  const ICONS = {
    finder: SQ("#6fd6ff", "#1063e6", `<path d="M20 34a6 6 0 0 1 6-6h15l6 6h27a6 6 0 0 1 6 6v28a7 7 0 0 1-7 7H27a7 7 0 0 1-7-7z" fill="url(#fold-b)"/><path d="M20 42h60v26a7 7 0 0 1-7 7H27a7 7 0 0 1-7-7z" fill="url(#fold-f)"/><circle cx="41" cy="55" r="3" fill="#1063e6"/><circle cx="59" cy="55" r="3" fill="#1063e6"/><path d="M41 63q9 6 18 0" stroke="#1063e6" stroke-width="3.2" fill="none" stroke-linecap="round"/>`),
    launchpad: SQ("#55555c", "#18181b", [["#ff453a", 22, 22], ["#ff9f0a", 41, 22], ["#ffd60a", 60, 22], ["#30d158", 22, 41], ["#64d2ff", 41, 41], ["#0a84ff", 60, 41], ["#bf5af2", 22, 60], ["#ff375f", 41, 60], ["#ac8e68", 60, 60]].map(([c, x, y]) => `<rect x="${x}" y="${y}" width="16" height="16" rx="5" fill="${c}"/><rect x="${x}" y="${y}" width="16" height="7" rx="3.5" fill="#fff" opacity=".22"/>`).join("")),
    notes: SQ("#ffffff", "#ececef", `<path d="M2 25a23 23 0 0 1 23-23h50a23 23 0 0 1 23 23v8H2z" fill="url(#note-y)"/><path d="M2 33h96" stroke="#d9a400" stroke-width="1.5"/><path d="M12 33h76" stroke="#b58900" stroke-width="1.6" stroke-dasharray="1.6 3.2" transform="translate(0 -3)"/><path d="M12 48h76M12 61h76M12 74h76M12 87h60" stroke="#dcdce2" stroke-width="1.8"/>`),
    messages: SQ("#86f597", "#0fb437", `<path d="M50 20c-20 0-35 12.6-35 28.5 0 8.6 4.5 16.3 11.6 21.5L23 81l13.8-6.6c4 1.3 8.6 2 13.2 2 20 0 35-12.7 35-28.4S70 20 50 20z" fill="#fff"/>`),
    mail: SQ("#7dd0ff", "#0857dc", `<rect x="15" y="27" width="70" height="48" rx="9" fill="#fff"/><path d="M15 70l26-21M85 70L59 49" stroke="#d6e6fb" stroke-width="2.5"/><path d="M17 32l33 24 33-24" fill="none" stroke="#1a7cf0" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>`),
    photos: SQ("#ffffff", "#e9ebf0", `<rect x="26" y="16" width="56" height="48" rx="8" fill="#d8dde6" transform="rotate(8 54 40)"/><rect x="16" y="26" width="62" height="54" rx="9" fill="#fff"/><rect x="20" y="30" width="54" height="42" rx="6" fill="url(#ph-sky)"/><circle cx="62" cy="41" r="6" fill="#ffd60a"/><path d="M20 66l16-18 11 11 8-8 19 19v2a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6z" fill="#2fb35a"/>`),
    music: SQ("#ff8a9b", "#ef1c45", `<path d="M41 31l33-8v40" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M41 31v40" stroke="#fff" stroke-width="6" stroke-linecap="round"/><ellipse cx="33.5" cy="71" rx="10" ry="8.5" fill="#fff"/><ellipse cx="66.5" cy="63" rx="10" ry="8.5" fill="#fff"/>`),
    calendar: (() => { const d = new Date(); return `<svg viewBox="0 0 100 100" class="ic"><rect x="2" y="2" width="96" height="96" rx="23" fill="#fff"/><text x="50" y="33" text-anchor="middle" font-size="15" font-weight="700" fill="#ff3b30" font-family="Inter,system-ui">${d.toLocaleDateString("en", { month: "short" }).toUpperCase()}</text><text x="50" y="80" text-anchor="middle" font-size="46" font-weight="400" fill="#1d1d1f" font-family="Inter,system-ui">${d.getDate()}</text><rect x="2" y="2" width="96" height="96" rx="23" fill="url(#gloss)"/><rect x="2.6" y="2.6" width="94.8" height="94.8" rx="22.4" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="1.2"/></svg>`; })(),
    preview: SQ("#a6dcff", "#2775d6", `<rect x="22" y="16" width="44" height="60" rx="6" fill="#fff"/><path d="M30 28h28M30 37h28M30 46h18" stroke="#a9c9ee" stroke-width="3" stroke-linecap="round"/><circle cx="61" cy="61" r="14" fill="rgba(200,230,255,.55)" stroke="#0b3a80" stroke-width="5.5"/><path d="M57 55a7 7 0 0 1 8-1" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M71 71l11 11" stroke="#0b3a80" stroke-width="8" stroke-linecap="round"/>`),
    terminal: SQ("#3e3e44", "#0b0b0d", `<rect x="10" y="12" width="80" height="13" rx="5" fill="rgba(255,255,255,.07)"/><circle cx="18" cy="18.5" r="2.2" fill="#ff5f57"/><circle cx="25" cy="18.5" r="2.2" fill="#febc2e"/><circle cx="32" cy="18.5" r="2.2" fill="#28c840"/><path d="M22 42l14 11-14 11" stroke="#30d158" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 66h22" stroke="#e8e8ea" stroke-width="5" stroke-linecap="round"/>`),
    settings: SQ("#c9c9cf", "#6a6a70", `<g transform="translate(50 50)"><circle r="37" fill="url(#metal)"/>${Array.from({ length: 18 }, (_, i) => `<rect x="-3.2" y="-35" width="6.4" height="9" rx="1.6" fill="#3a3a3e" transform="rotate(${i * 20})"/>`).join("")}<circle r="26" fill="#3a3a3e"/><circle r="22" fill="url(#metal)"/>${Array.from({ length: 6 }, (_, i) => `<rect x="-2.5" y="-20" width="5" height="16" rx="2.5" fill="#4a4a50" transform="rotate(${i * 60})"/>`).join("")}<circle r="7" fill="#3a3a3e"/><circle r="3.5" fill="#9a9aa0"/></g>`),
    trash: `<svg viewBox="0 0 100 100" class="ic"><defs><linearGradient id="trash-g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9dde3"/><stop offset=".5" stop-color="#f7f8fa"/><stop offset="1" stop-color="#c3c8cf"/></linearGradient></defs><path d="M22 22h56l-6 70H28z" fill="url(#trash-g)" stroke="#9aa1aa" stroke-width="1.5"/>${[32, 41, 50, 59, 68].map((x) => `<path d="M${x} 28l${((x - 50) * 0.06).toFixed(2)} 58" stroke="#aab0b8" stroke-width="2"/>`).join("")}<ellipse cx="50" cy="22" rx="29" ry="5" fill="#e9ecef" stroke="#9aa1aa" stroke-width="1.5"/></svg>`,
    hire: SQ("#7cc8ff", "#1a6fe8", `<path d="M38 34v-5a5 5 0 0 1 5-5h14a5 5 0 0 1 5 5v5" fill="none" stroke="#fff" stroke-width="6"/><rect x="20" y="34" width="60" height="42" rx="9" fill="#fff"/><rect x="45" y="48" width="10" height="8" rx="2" fill="#1a6fe8"/>`),
    linkedin: SQ("#2f8cff", "#0a66c2", `<rect x="25" y="42" width="11" height="34" rx="2" fill="#fff"/><circle cx="30.5" cy="30" r="6.5" fill="#fff"/><path d="M43 42h10v5c2-4 7-6 12-6 9 0 12 6 12 15v20H66V58c0-5-1-8-5-8s-7 3-7 8v18H43z" fill="#fff"/>`),
    instagram: SQ("#ffd35a", "#c3268f", `<rect x="24" y="24" width="52" height="52" rx="15" fill="none" stroke="#fff" stroke-width="6"/><circle cx="50" cy="50" r="12" fill="none" stroke="#fff" stroke-width="6"/><circle cx="66" cy="34" r="4" fill="#fff"/>`),
    facebook: SQ("#3b9bff", "#0866ff", `<path d="M56 90V58h11l2-13H56v-8c0-4 1-7 7-7h7V19c-2 0-6-1-11-1-11 0-17 7-17 18v9H31v13h11v32z" fill="#fff"/>`),
    behance: SQ("#3d7bff", "#0040e6", `<text x="50" y="64" text-anchor="middle" font-size="34" font-weight="800" fill="#fff" font-family="Inter,system-ui">Bē</text>`),
    phone: SQ("#7cf08a", "#14b83a", `<path d="M35 22c3 0 6 7 7 11 1 4-4 6-3 9 3 7 9 13 16 16 3 1 5-4 9-3 4 1 11 4 11 7 0 7-7 12-12 12C40 73 26 59 25 36c0-5 5-14 10-14z" fill="#fff"/>`),
    files: SQ("#ffffff", "#ebedf2", `<path d="M16 32a6 6 0 0 1 6-6h17l6 7h33a6 6 0 0 1 6 6v31a7 7 0 0 1-7 7H23a7 7 0 0 1-7-7z" fill="url(#fold-b)"/><path d="M16 41h68v29a7 7 0 0 1-7 7H23a7 7 0 0 1-7-7z" fill="url(#fold-f)"/><path d="M16 41h68" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/>`),
    folder: `<svg viewBox="0 0 100 80" class="ic"><path d="M6 14a6 6 0 0 1 6-6h24l8 8h44a6 6 0 0 1 6 6v46a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill="#3e9cf2"/><path d="M6 26h88v42a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill="#70b8fa"/></svg>`,
    pdf: `<svg viewBox="0 0 80 100" class="ic"><path d="M8 4h46l18 18v70a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z" fill="#fff" stroke="#c7c7cc" stroke-width="2"/><path d="M54 4v14a4 4 0 0 0 4 4h14" fill="#eee" stroke="#c7c7cc" stroke-width="2"/><rect x="12" y="58" width="40" height="18" rx="3" fill="#ff3b30"/><text x="32" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="Inter">PDF</text></svg>`,
  };
  // small line symbols used inside apps (sidebars, toolbars)
  const LI = (d) => `<svg viewBox="0 0 24 24" class="li">${d}</svg>`;
  const SYM = {
    star: LI(`<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>`),
    library: LI(`<rect x="7" y="7" width="13" height="13" rx="2.5"/><path d="M4 16V6.5A2.5 2.5 0 0 1 6.5 4H16"/>`),
    heart: LI(`<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>`),
    folder: LI(`<path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/>`),
    sidebar: LI(`<rect x="3.5" y="5" width="17" height="14" rx="2.5"/><path d="M9.5 5v14"/>`),
    compose: LI(`<path d="M14 5H6.5A2.5 2.5 0 0 0 4 7.5v10A2.5 2.5 0 0 0 6.5 20h10a2.5 2.5 0 0 0 2.5-2.5V10"/><path d="M18 3.5l2.5 2.5L12 14.5 9 15l.5-3z"/>`),
    font: LI(`<path d="M4 18l5-12 5 12M5.8 14h6.4M15 18v-5a2.5 2.5 0 0 1 5 0v5M15 15.5h5"/>`),
    check: LI(`<circle cx="6" cy="7" r="1.6"/><circle cx="6" cy="12" r="1.6"/><circle cx="6" cy="17" r="1.6"/><path d="M10 7h10M10 12h10M10 17h10"/>`),
    table: LI(`<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M3.5 10h17M3.5 14.5h17M9 5v14M15 5v14"/>`),
    clip: LI(`<path d="M8 12.5l6.5-6.5a3 3 0 0 1 4.2 4.2L10.5 18.4a4.6 4.6 0 0 1-6.5-6.5L11 5"/>`),
    share: LI(`<path d="M12 3.5V15M8 7.5l4-4 4 4"/><path d="M8 10.5H6.5A2 2 0 0 0 4.5 12.5v6a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H16"/>`),
    more: LI(`<circle cx="6" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="18" cy="12" r="1.3"/>`),
    search: LI(`<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>`),
    person: LI(`<circle cx="12" cy="8" r="4"/><path d="M4.5 20c1-4 4-6 7.5-6s6.5 2 7.5 6"/>`),
    brief: LI(`<rect x="3.5" y="7" width="17" height="12" rx="2"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12h17"/>`),
    grad: LI(`<path d="M2.5 9L12 4.5 21.5 9 12 13.5z"/><path d="M6.5 11v4.5c2.5 2.5 8.5 2.5 11 0V11"/>`),
    doc: LI(`<path d="M7 3.5h7l4.5 4.5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"/><path d="M14 3.5V8h4.5"/>`),
    play: LI(`<path d="M8 5.5v13l10-6.5z" fill="currentColor"/>`),
    back: LI(`<path d="M15 5l-7 7 7 7"/>`),
    album: LI(`<rect x="3.5" y="6" width="17" height="13" rx="2.5"/><path d="M6 3.5h12"/>`),
  };

  /* ---------- app registry ---------- */
  const APPS = {
    finder: { name: "Finder", phoneName: "Files", w: 860, h: 540, render: renderFinder },
    launchpad: { name: "Launchpad", action: () => openLaunchpad() },
    notes: { name: "Notes", w: 900, h: 580, render: renderNotes },
    photos: { name: "Photos", w: 1100, h: 700, render: renderPhotos },
    messages: { name: "Messages", w: 780, h: 580, render: renderMessages },
    mail: { name: "Mail", title: "New Message", w: 660, h: 520, render: renderMail },
    preview: { name: "Preview", title: "Ahanaf-Shanto-CV.pdf", w: 720, h: 680, render: renderPreview },
    terminal: { name: "Terminal", w: 700, h: 440, render: renderTerminal, desk: true },
    music: { name: "Music", w: 740, h: 540, render: renderMusic },
    calendar: { name: "Calendar", w: 760, h: 560, render: renderCalendar },
    settings: { name: "System Settings", phoneName: "Settings", w: 760, h: 560, render: renderSettings },
    trash: { name: "Trash", w: 660, h: 440, render: renderTrash },
    hire: { name: "Quick View", phoneName: "Quick View", title: "About " + SITE.short, w: 780, h: 620, render: renderHire },
    linkedin: { name: "LinkedIn", link: () => SITE.linkedin },
    instagram: { name: "Instagram", link: () => SITE.instagram },
    facebook: { name: "Facebook", link: () => SITE.facebook },
    behance: { name: "Behance", link: () => SITE.behance },
    phone: { name: "Phone", link: () => SITE.phone && tel(SITE.phone) },
  };
  const appLabel = (k) => (isMobile() && APPS[k].phoneName) || APPS[k].name;
  const iconFor = (k) => k === "finder" && isMobile() ? ICONS.files : ICONS[k];
  // a tappable icon: real <a> links for websites & phone (these always open on phones), buttons for apps
  function appTag(k, cls, inner) {
    const a = APPS[k]; if (!a) return "";
    if (a.link) { const u = a.link(); if (!u) return ""; const ext = !u.startsWith("tel:"); return `<a class="${cls}" href="${esc(u)}" ${ext ? 'target="_blank" rel="noopener"' : ""} data-k="${k}" aria-label="${esc(a.name)}">${inner}</a>`; }
    return `<button class="${cls}" data-open="${k}" data-k="${k}" aria-label="${esc(a.name)}">${inner}</button>`;
  }
  const DOCK = ["finder", "launchpad", "notes", "messages", "mail", "photos", "music", "calendar", "preview", "terminal", "settings", "linkedin", "|", "trash"];
  let badge = Math.min(SITE.chat.length, 9);

  /* =====================================================================
     WINDOW MANAGER
     ===================================================================== */
  let z = 10, cascade = 0;
  const openWins = {};
  function openApp(key, arg, fromEl) {
    const app = APPS[key]; if (!app) return;
    hideMenu(); closeSpot(); closeLaunchpad();
    if (app.action) return app.action();
    if (app.link) { const u = app.link(); if (u) window.open(u, u.startsWith("tel:") ? "_self" : "_blank", "noopener"); return; }
    if (key === "messages") { badge = 0; updateDock(); }
    let w = openWins[key];
    if (w) { w.classList.remove("minimized"); focusWin(w); if (arg !== undefined) app.render($(".win-body", w), arg, w); return; }
    const vw = innerWidth, vh = innerHeight;
    const W = Math.min(app.w, vw - 40), H = Math.min(app.h, vh - 130);
    const x = clamp((vw - W) / 2 + cascade * 26 - 70, 10, vw - W - 10), y = clamp(48 + cascade * 24, 34, vh - H - 92);
    cascade = (cascade + 1) % 6;
    w = el(`<section class="window opening" data-key="${key}" role="dialog" aria-label="${esc(app.name)}" style="left:${x}px;top:${y}px;width:${W}px;height:${H}px">
      <div class="win-bar">
        <div class="lights"><button class="l-close" aria-label="Close"></button><button class="l-min" aria-label="Minimise"></button><button class="l-max" aria-label="Maximise"></button></div>
        <button class="m-back" aria-label="Home">${SYM.back}</button>
        <div class="win-title">${esc(app.title || app.name)}</div>
        <div class="win-tools"></div>
      </div>
      <div class="win-body"></div>
      <div class="m-home" aria-label="Close app"><span></span></div>
      <div class="win-resize"></div>
    </section>`);
    if (isMobile() && fromEl) { const r = fromEl.getBoundingClientRect(); w.style.transformOrigin = `${r.left + r.width / 2}px ${r.top + r.height / 2}px`; }
    $("#windows").append(w);
    openWins[key] = w;
    focusWin(w);
    app.render($(".win-body", w), arg, w);
    requestAnimationFrame(() => requestAnimationFrame(() => w.classList.remove("opening")));
    $(".l-close", w).onclick = () => closeWin(w);
    $(".m-back", w).onclick = () => closeWin(w);
    $(".m-home", w).onclick = () => closeWin(w);
    $(".l-min", w).onclick = () => { w.classList.add("minimized"); updateDock(); setAppName(); };
    $(".l-max", w).onclick = () => w.classList.toggle("maxed");
    $(".win-bar", w).ondblclick = (e) => { if (!e.target.closest("button, input")) w.classList.toggle("maxed"); };
    w.addEventListener("pointerdown", () => focusWin(w));
    drag(w); resize(w); swipeHome(w);
    updateDock();
  }
  function closeWin(w) {
    if (w.dataset.key === "music" && !w._reallyClose && $(".mu-frame iframe", w)) { w.classList.add("minimized", "bg-play"); updateDock(); setAppName(); showToast("🎵 Music keeps playing. Open Music → Stop music to stop."); return; }
    w.classList.add("closing");
    delete openWins[w.dataset.key]; updateDock();
    setTimeout(() => { w.remove(); setAppName(); }, 260);
  }
  function showToast(t) { $(".toast")?.remove(); const n = el(`<div class="toast glass">${esc(t)}</div>`); document.body.append(n); setTimeout(() => n.remove(), 3200); }
  function focusWin(w) {
    $$(".window").forEach((x) => x.classList.remove("active"));
    w.style.zIndex = ++z; w.classList.add("active");
    setAppName(APPS[w.dataset.key]);
  }
  const topWin = () => $$(".window:not(.minimized):not(.closing)").sort((a, b) => b.style.zIndex - a.style.zIndex)[0];
  function setAppName(app) {
    if (!app) { const t = topWin(); app = t ? APPS[t.dataset.key] : null; }
    $("#mb-app").textContent = app ? app.name.replace("System ", "") : "Finder";
  }
  function drag(w) {
    const bar = $(".win-bar", w);
    bar.addEventListener("pointerdown", (e) => {
      if (e.target.closest("button, input, a, label") || isMobile() || w.classList.contains("maxed")) return;
      const sx = e.clientX, sy = e.clientY, ox = w.offsetLeft, oy = w.offsetTop;
      bar.setPointerCapture(e.pointerId); w.classList.add("dragging");
      const mv = (ev) => {
        w.style.left = clamp(ox + ev.clientX - sx, -w.offsetWidth + 100, innerWidth - 100) + "px";
        w.style.top = clamp(oy + ev.clientY - sy, 28, innerHeight - 50) + "px";
      };
      const up = () => { w.classList.remove("dragging"); bar.removeEventListener("pointermove", mv); bar.removeEventListener("pointerup", up); };
      bar.addEventListener("pointermove", mv); bar.addEventListener("pointerup", up);
    });
  }
  function resize(w) {
    const h = $(".win-resize", w);
    h.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      const sx = e.clientX, sy = e.clientY, ow = w.offsetWidth, oh = w.offsetHeight;
      h.setPointerCapture(e.pointerId);
      const mv = (ev) => { w.style.width = Math.max(380, ow + ev.clientX - sx) + "px"; w.style.height = Math.max(260, oh + ev.clientY - sy) + "px"; };
      const up = () => { h.removeEventListener("pointermove", mv); h.removeEventListener("pointerup", up); };
      h.addEventListener("pointermove", mv); h.addEventListener("pointerup", up);
    });
  }
  // iPhone: swipe up on the home bar closes the app
  function swipeHome(w) {
    const bar = $(".m-home", w); let sy = null;
    bar.addEventListener("touchstart", (e) => { sy = e.touches[0].clientY; }, { passive: true });
    bar.addEventListener("touchend", (e) => { if (sy !== null && sy - e.changedTouches[0].clientY > 25) closeWin(w); sy = null; });
  }
  // hide pictures that fail to load (e.g. offline) instead of showing a broken icon
  document.addEventListener("error", (e) => { const t = e.target; if (t.tagName !== "IMG") return; if (t.dataset.fb && !t.dataset.tried) { t.dataset.tried = "1"; t.src = t.dataset.fb; } else t.classList.add("broken"); }, true);
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-open]"); if (!a) return;
    e.preventDefault(); openApp(a.dataset.open, a.dataset.arg, a);
  });
  const iosHead = (title) => isMobile() && title ? `<div class="ios-large">${esc(title)}</div>` : "";

  /* =====================================================================
     NOTES
     ===================================================================== */
  let myNotes = [];
  const allNotes = () => [...myNotes.map((n) => ({ ...n, mine: true })), ...SITE.notes];
  // notes get friendly "edited" times: pinned + today, then yesterday, then earlier
  const noteAge = (i) => i < 4 ? 0 : i < 6 ? 1 : i - 4;
  function noteWhen(i, short) {
    const d = new Date(); d.setDate(d.getDate() - noteAge(i)); d.setMinutes(d.getMinutes() - 37 * (i + 1));
    if (short) return noteAge(i) === 0 ? d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : d.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "2-digit" });
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) + " at " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }
  function renderNotes(body, arg, win) {
    let cur = arg !== undefined ? +arg + myNotes.length : 0, q = "", side = true;
    const tools = $(".win-tools", win);
    tools.innerHTML = `
      <button class="tb" data-nt="side" title="Sidebar">${SYM.sidebar}</button>
      <div class="tb-label"><b>All iCloud</b><span class="nt-count"></span></div>
      <div class="tb-group"><button class="tb" title="More">${SYM.more}</button></div>
      
      <div class="tb-group tb-hide"><button class="tb" title="Format">${SYM.font}</button><button class="tb" title="Checklist">${SYM.check}</button><button class="tb" title="Table">${SYM.table}</button><button class="tb" title="Attach">${SYM.clip}</button></div>
      <div class="tb-group tb-hide"><button class="tb" data-nt="share" title="Copy link">${SYM.share}</button></div>
      <label class="tb-search">${SYM.search}<input placeholder="Search" aria-label="Search notes"></label>`;
    body.innerHTML = `<div class="split notes"><aside class="side nt-list"></aside><article class="nt-page doc"></article></div>`;
    const list = $(".nt-list", body), page = $(".nt-page", body);
    const draw = () => {
      const notes = allNotes();
      $(".nt-count", tools).textContent = notes.length + " notes";
      const shown = notes.map((n, i) => [n, i]).filter(([n]) => !q || (n.title + strip(n.html || n.text)).toLowerCase().includes(q));
      const pinned = shown.filter(([n]) => n.date === "Pinned"), rest = shown.filter(([n]) => n.date !== "Pinned");
      const item = ([n, i]) => `<button class="nt-item ${i === cur ? "sel" : ""}" data-i="${i}"><b>${esc(n.title)}</b><span><em>${esc(noteWhen(i, true))}</em> ${esc(strip(n.html || n.text).slice(n.title.length - 2, 80))}</span><small>${SYM.folder} Notes</small></button>`;
      const groups = [["Today", rest.filter(([, i]) => noteAge(i) === 0)], ["Yesterday", rest.filter(([, i]) => noteAge(i) === 1)], ["Previous 7 Days", rest.filter(([, i]) => noteAge(i) > 1)]].filter(([, l]) => l.length);
      list.innerHTML = iosHead("Notes") + (pinned.length ? `<div class="side-h">Pinned</div><div class="grp">${pinned.map(item).join("")}</div>` : "") + groups.map(([t, l]) => `<div class="side-h">${t}</div><div class="grp">${l.map(item).join("")}</div>`).join("");
      const n = notes[cur];
      if (n && n.mine) {
        page.innerHTML = `<div class="nt-meta">${esc(fmtDate(n.at, { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit" }))}</div><textarea class="nt-edit" placeholder="Write something… it stays in your browser.">${esc(n.text || "")}</textarea>
          <div class="nt-send"><b>📨 Send this note to ${esc(SITE.short)}</b><span class="muted">Opens your email app with the note filled in.</span><div><a class="btn" href="mailto:${esc(SITE.email)}">Send</a> <button class="btn ghost" data-nt="del">Delete</button></div></div>`;
        const ta = $(".nt-edit", page), send = $(".nt-send a", page);
        const upd = () => { send.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Note from your portfolio")}&body=${encodeURIComponent(ta.value)}`; };
        ta.oninput = () => { const m = myNotes.find((x) => x.id === n.id); m.text = ta.value; m.title = ta.value.split("\n")[0].slice(0, 40) || "New Note"; store.set("notes", myNotes); upd(); };
        upd(); setTimeout(() => ta.focus(), 30);
      } else page.innerHTML = n ? `<div class="nt-meta">${esc(noteWhen(cur))}</div>` + n.html + (strip(n.html).replace(/[^\w]/g, "").length < 30 ? empty("This note will be filled in soon.") : "") : "";
      body.classList.toggle("detail", !!body._picked);
      mobileBack(body, "Notes");
    };
    list.onclick = (e) => { const b = e.target.closest(".nt-item"); if (!b) return; cur = +b.dataset.i; body._picked = true; draw(); page.scrollTop = 0; };
    tools.onclick = (e) => {
      const b = e.target.closest("[data-nt]"); if (!b) return;
      if (b.dataset.nt === "side") { side = !side; body.classList.toggle("no-side", !side); }
      if (b.dataset.nt === "new") { myNotes.unshift({ id: Date.now(), title: "New Note", text: "", at: Date.now() }); store.set("notes", myNotes); cur = 0; body._picked = true; draw(); }
      if (b.dataset.nt === "share") { navigator.clipboard?.writeText(location.href.split("#")[0] + "#notes"); b.classList.add("flash"); setTimeout(() => b.classList.remove("flash"), 600); }
    };
    page.onclick = (e) => { if (e.target.closest('[data-nt="del"]')) { const id = allNotes()[cur].id; myNotes = myNotes.filter((x) => x.id !== id); store.set("notes", myNotes); cur = 0; body._picked = false; draw(); } };
    $("input", tools).oninput = (e) => { q = e.target.value.toLowerCase(); draw(); };
    if (arg !== undefined) body._picked = true;
    draw();
  }
  function mobileBack(body, label) {
    if (!isMobile()) return;
    const main = $(".nt-page, .fd-main", body); if (!main || $(".m-sub-back", main)) return;
    const b = el(`<button class="m-sub-back">${SYM.back}<span>${esc(label)}</span></button>`);
    b.onclick = () => { body._picked = false; body.classList.remove("detail"); };
    main.prepend(b);
  }

  /* =====================================================================
     FINDER
     ===================================================================== */
  function renderFinder(body, arg) {
    const sections = [["experience", SYM.brief, "Experience"], ["projects", SYM.folder, "Projects"], ["education", SYM.grad, "Education"], ["documents", SYM.doc, "Documents"], ["about", SYM.person, "About me"]];
    let cur = arg || "experience";
    body.innerHTML = `<div class="split"><aside class="side fd-side">${iosHead("Files")}<div class="side-h">Favourites</div><div class="grp">${sections.map(([k, ic, l]) => `<button class="side-it fd-nav" data-k="${k}">${ic}<span>${l}</span></button>`).join("")}</div></aside><div class="fd-main"></div></div>`;
    const main = $(".fd-main", body);
    const xp = (e) => `<div class="xp"><div class="xp-logo">${logoI(e)}</div><div class="xp-text"><b>${esc(e.role || e.school)}</b><div class="muted">${[e.company || e.degree, e.type, e.dates].filter(Boolean).map(esc).join(" · ")}</div>${e.about ? `<p>${esc(e.about)}</p>` : ""}${has(e.points) ? `<ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}${e.link ? `<a href="${esc(e.link)}" target="_blank" rel="noopener">Website ↗</a>` : ""}</div></div>`;
    const draw = () => {
      $$(".fd-nav", body).forEach((b) => b.classList.toggle("sel", b.dataset.k === cur));
      const title = sections.find((s) => s[0] === cur)[2];
      let html = `<div class="pane-h"><h2>${title}</h2></div>`;
      if (cur === "experience") html += `<div class="inset">${SITE.experience.map(xp).join("")}</div>`;
      else if (cur === "education") html += `<div class="inset">${SITE.education.map((e) => xp({ ...e, color: "#0a66c2" })).join("")}</div>`;
      else if (cur === "projects") html += `<table class="fd-table"><thead><tr><th>Name</th><th>Kind</th><th>Date</th></tr></thead><tbody>${SITE.campaigns.map((c, i) => `<tr data-open="photos" data-arg="p${i}"><td><span class="fd-ic">${ICONS.folder}</span>${esc(c.title)}</td><td>${esc(c.type || "")}</td><td>${esc(fmtDate(c.date) || c.year || "")}</td></tr>`).join("")}</tbody></table>`;
      else if (cur === "documents") html += `<div class="fd-grid"><button class="fd-file" data-open="preview">${ICONS.pdf}<span>Ahanaf-Shanto-CV.pdf</span></button><button class="fd-file" data-open="notes">${ICONS.folder}<span>About me</span></button><button class="fd-file" data-open="photos">${ICONS.folder}<span>Projects</span></button><button class="fd-file" data-open="photos" data-arg="library">${ICONS.folder}<span>Work Videos</span></button></div>`;
      main.innerHTML = html;
      if (cur === "about") { const d = el("<div></div>"); renderHire(d); main.innerHTML = ""; main.append(d); }
      body.classList.toggle("detail", !!body._picked);
      mobileBack(body, "Files");
    };
    $(".fd-side", body).onclick = (e) => { const b = e.target.closest(".fd-nav"); if (!b) return; cur = b.dataset.k; body._picked = true; draw(); };
    if (arg) body._picked = true;
    draw();
  }

  /* =====================================================================
     PHOTOS — Projects · Library · Favorites · Collections
     ===================================================================== */
  const ytId = (u) => (String(u).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/) || [])[1];
  const vimeoId = (u) => (String(u).match(/vimeo\.com\/(?:video\/)?(\d+)/) || [])[1];
  const igCode = (u) => String(u).match(/instagram\.com\/(?:[\w.]+\/)?(p|reel|reels|tv)\/([\w-]+)/) || [];
  function embedUrl(u) {
    if (ytId(u)) return `https://www.youtube.com/embed/${ytId(u)}?rel=0&playsinline=1`;
    if (vimeoId(u)) return `https://player.vimeo.com/video/${vimeoId(u)}`;
    const ig = igCode(u); if (ig[2]) return `https://www.instagram.com/${ig[1] === "reels" ? "reel" : ig[1]}/${ig[2]}/embed`;
    return u;
  }
  const isVid = (p) => p.type === "video" || /\.(mp4|webm|mov)$/i.test(p.src);
  const isEmbed = (p) => p.type === "embed";
  function thumbOf(p) {
    if (isEmbed(p)) { const y = ytId(p.src); return y ? `https://i.ytimg.com/vi/${y}/hqdefault.jpg` : null; }
    return isVid(p) ? p.poster : p.src;
  }
  // everything in the Library: your gallery + every project's pictures
  function libraryItems() {
    const items = SITE.gallery.map((p, i) => ({ ...p, id: "g" + i }));
    SITE.campaigns.forEach((c, ci) => (c.gallery || []).forEach((src, k) => items.push({ src, date: c.date || (c.year ? c.year + "-01-01" : ""), album: c.type, caption: c.title, project: ci, id: `p${ci}-${k}` })));
    return items.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  }
  let favs = new Set(store.get("favs", SITE.gallery.map((p, i) => p.fav ? "g" + i : null).filter(Boolean)));
  const saveFavs = () => store.set("favs", [...favs]);
  function albums() {
    const items = libraryItems(), names = has(SITE.collections) ? SITE.collections : [...new Set(items.map((p) => p.album).filter(Boolean))];
    return names.map((n) => [n, items.filter((p) => p.album === n)]).filter(([, l]) => l.length);
  }
  function itemTile(p) {
    const t = thumbOf(p), ig = isEmbed(p) && igCode(p.src)[2], vm = isEmbed(p) && vimeoId(p.src);
    return `<button class="lib-it" data-id="${esc(p.id)}" title="${esc(p.caption || "")}">
      ${t ? `<img ${srcAttr(t)} alt="${esc(p.caption || "")}" loading="lazy" referrerpolicy="no-referrer">` : `<div class="lib-ph ${ig ? "ig" : vm ? "vm" : ""}">${ig ? ICONS.instagram : SYM.play}<span>${ig ? "Instagram" : vm ? "Vimeo" : "Video"}</span></div>`}
      ${isVid(p) || isEmbed(p) ? `<span class="vid-badge">${SYM.play}</span>` : ""}
      ${favs.has(p.id) ? `<span class="fav-badge">${SYM.heart}</span>` : ""}
    </button>`;
  }
  function renderPhotos(body, arg) {
    let view = isMobile() ? "library" : "projects", filter = "All", album = null, group = "months", zoom = 1;
    if (arg === "library" || arg === "favorites" || arg === "projects") view = arg;
    if (typeof arg === "string" && /^p\d+$/.test(arg)) view = "projects";
    const cols = albums(), items = libraryItems();
    body.innerHTML = `<div class="split ph">
      <aside class="side ph-side">
        <div class="side-h">Portfolio</div>
        <button class="side-it" data-v="projects">${SYM.star}<span>Projects</span></button>
        <div class="side-h">Library</div>
        <button class="side-it" data-v="library">${SYM.library}<span>Library</span></button>
        <button class="side-it" data-v="favorites">${SYM.heart}<span>Favorites</span></button>
        ${cols.length ? `<div class="side-h">Collections</div>${cols.map(([n]) => `<button class="side-it" data-v="album" data-a="${esc(n)}">${SYM.folder}<span>${esc(n)}</span></button>`).join("")}` : ""}
      </aside>
      <div class="ph-main"><div class="ph-head"></div><div class="ph-chips"></div><div class="ph-scroll"></div></div>
      <nav class="ios-tabs glass"><button data-v="library">${SYM.library}<span>Library</span></button><button data-v="collections">${SYM.album}<span>Collections</span></button><button data-v="projects">${SYM.star}<span>Projects</span></button></nav>
    </div>`;
    const main = $(".ph-main", body);
    const byId = (id) => items.find((p) => p.id === id);
    const draw = () => {
      main.innerHTML = `<div class="ph-head"></div><div class="ph-chips"></div><div class="ph-scroll"></div>`;
      const head = $(".ph-head", main), chips = $(".ph-chips", main), scroll = $(".ph-scroll", main);
      $$(".side-it, .ios-tabs button", body).forEach((b) => b.classList.toggle("sel", b.dataset.v === view && (view !== "album" || b.dataset.a === album)));
      body.style.setProperty("--tile", Math.round((isMobile() ? 118 : 150) * zoom) + "px");
      if (view === "projects") {
        const types = [...new Set(SITE.campaigns.map((c) => c.type).filter(Boolean))];
        const list = SITE.campaigns.map((c, i) => [c, i]).filter(([c]) => filter === "All" || (filter === "★" ? c.featured : c.type === filter));
        head.innerHTML = `<div><h1>Projects</h1><span>${SITE.campaigns.length} projects & campaigns</span></div>`;
        chips.innerHTML = ["All", "★", ...types].map((t) => `<button class="chip ${t === filter ? "sel" : ""}" data-f="${esc(t)}">${t === "★" ? "★ Flagship" : esc(t)}</button>`).join("");
        scroll.innerHTML = list.length ? `<div class="pgrid">${list.map(([c, i]) => projectTile(c, i)).join("")}</div>` : empty("Projects will be added soon.");
      } else if (view === "collections") {
        head.innerHTML = `<div><h1>Collections</h1><span>${cols.length} albums</span></div>`;
        scroll.innerHTML = `<div class="albums">${cols.map(([n, l]) => `<button class="alb" data-v="album" data-a="${esc(n)}"><div class="alb-c">${l.filter(thumbOf).slice(0, 4).map((p) => `<img ${srcAttr(thumbOf(p))} alt="" loading="lazy" referrerpolicy="no-referrer">`).join("")}</div><b>${esc(n)}</b><span>${l.length} Items</span></button>`).join("")}</div>`;
      } else {
        const list = view === "favorites" ? items.filter((p) => favs.has(p.id)) : view === "album" ? items.filter((p) => p.album === album) : items;
        const ds = list.map((p) => p.date).filter(Boolean).sort();
        const range = ds.length ? `${fmtDate(ds[0])} – ${fmtDate(ds[ds.length - 1])}` : "";
        head.innerHTML = `<div>${view === "album" && isMobile() ? `<button class="m-sub-back" data-v="collections">${SYM.back}<span>Collections</span></button>` : ""}<h1>${esc(view === "album" ? album : view === "favorites" ? "Favorites" : "Library")}</h1><span>${view === "library" ? esc(range) : list.length + " items"}</span></div>
          <div class="ph-ctrl"><div class="seg sm"><button data-z="-1" aria-label="Smaller">−</button><button data-z="1" aria-label="Bigger">+</button></div>${view === "library" ? `<div class="seg">${[["years", "Years"], ["months", "Months"], ["all", "All Photos"]].map(([k, l]) => `<button data-g="${k}" class="${group === k ? "sel" : ""}">${l}</button>`).join("")}</div>` : ""}</div>`;
        if (!list.length) { scroll.innerHTML = view === "favorites" ? empty("Tap ♡ on any photo or video to add it here.", "♡") : empty(); return; }
        if (view !== "library" || group === "all") scroll.innerHTML = `<div class="lib">${list.map(itemTile).join("")}</div>`;
        else {
          const key = (p) => group === "years" ? String(p.date).slice(0, 4) : String(p.date).slice(0, 7);
          const groups = []; list.forEach((p) => { const k = key(p); let g = groups.find((x) => x.k === k); if (!g) groups.push(g = { k, items: [] }); g.items.push(p); });
          scroll.innerHTML = groups.map((g) => {
            const label = group === "years" ? g.k : fmtDate(g.k + "-01T00:00", { month: "long", year: "numeric" });
            const where = [...new Set(g.items.map((p) => p.album).filter(Boolean))].slice(0, 2).join(", ");
            return `<section class="lib-g"><h3>${esc(label)} <span>${esc(where)}</span></h3><div class="lib">${g.items.map(itemTile).join("")}</div></section>`;
          }).join("");
        }
      }
    };
    body.onclick = (e) => {
      const v = e.target.closest("[data-v]"); if (v) { view = v.dataset.v; album = v.dataset.a || null; filter = "All"; draw(); return; }
      const f = e.target.closest("[data-f]"); if (f) { filter = f.dataset.f; draw(); return; }
      const g = e.target.closest("[data-g]"); if (g) { group = g.dataset.g; draw(); return; }
      const zz = e.target.closest("[data-z]"); if (zz) { zoom = clamp(zoom + (+zz.dataset.z) * 0.25, 0.5, 2); body.style.setProperty("--tile", Math.round((isMobile() ? 118 : 150) * zoom) + "px"); return; }
      const p = e.target.closest("[data-p]"); if (p) { projectPage(body, +p.dataset.p, draw); return; }
      const it = e.target.closest(".lib-it"); if (it) {
        const list = $$(".lib-it", main).map((x) => byId(x.dataset.id));
        lightbox(list, list.findIndex((x) => x.id === it.dataset.id), draw);
      }
    };
    draw();
    if (typeof arg === "string" && /^p\d+$/.test(arg)) projectPage(body, +arg.slice(1), draw);
  }
  function projectTile(c, i) {
    const cover = SITE.tileStyle === "cover" && c.image;
    const [a, b] = c.colors || ["#7b5cff", "#1a1446"];
    const tag = c.tag || "#" + String(c.title).replace(/\W+/g, "");
    const sub = tag.replace("#", "").toLowerCase() === c.title.replace(/\W/g, "").toLowerCase() ? (c.role || c.type) : c.title;
    const fs = clamp(31 - tag.length * 0.8, 12, 24);
    return `<button class="ptile ${cover ? "cover" : ""}" data-p="${i}" style="--a:${a};--b:${b};${cover ? `--img:url('${esc(c.image)}')` : ""}">
      <span class="pt-hash">#</span>${c.featured ? `<span class="pt-star">★</span>` : ""}
      <span class="pt-text"><b style="font-size:${fs}px">${esc(tag)}</b><span>${esc(sub)}</span></span>
    </button>`;
  }
  function projectPage(body, i, back) {
    const c = SITE.campaigns[i]; if (!c) return back();
    const main = $(".ph-main", body), n = SITE.campaigns.length, vids = (c.videos || []).map(embedUrl);
    main.innerHTML = `<div class="pj">
      <div class="pj-nav"><button class="pj-back">${SYM.back}<span>Projects</span></button><span class="seg sm"><button data-step="-1" aria-label="Previous">‹</button><button data-step="1" aria-label="Next">›</button></span></div>
      <div class="pj-banner" style="--a:${(c.colors || [])[0] || "#7b5cff"};--b:${(c.colors || [])[1] || "#1a1446"}">${c.image ? `<img ${srcAttr(c.image)} alt="" referrerpolicy="no-referrer">` : ""}<span class="pt-hash">#</span><b>${esc(c.tag || c.title)}</b></div>
      <div class="pj-body doc">
        <div class="pj-kicker">${c.featured ? "★ Flagship · " : ""}${esc(c.kind || "Project")}</div>
        <h1>${esc(c.title)}</h1>
        <div class="pj-meta">${[c.type, c.client, fmtDate(c.date, { month: "long", year: "numeric" }) || c.year].filter(Boolean).map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</div>
        ${c.role ? `<p><b>My role:</b> ${esc(c.role)}</p>` : ""}
        ${has(c.stats) ? `<div class="stats">${c.stats.map(([a, b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div>` : ""}
        ${c.desc ? `<p>${esc(c.desc)}</p>` : ""}
        ${c.details || ""}
        ${c.video ? `<video class="pj-video" src="${esc(c.video)}" ${c.image ? `poster="${esc(c.image)}"` : ""} controls playsinline></video>` : ""}
        ${vids.length ? `<h3>Videos</h3><div class="pj-vids">${vids.map((u) => `<div class="pj-vid"><iframe src="${esc(u)}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen title="Video"></iframe></div>`).join("")}</div>` : ""}
        ${has(c.gallery) ? `<h3>Gallery</h3><div class="pj-gal">${c.gallery.map((s, k) => `<button data-k="${k}"><img ${srcAttr(s)} loading="lazy" alt="" referrerpolicy="no-referrer"></button>`).join("")}</div>` : ""}
        ${c.link ? `<p><a class="btn" href="${esc(c.link)}" target="_blank" rel="noopener">View on Behance ↗</a></p>` : ""}
      </div></div>`;
    $(".pj", main).scrollTop = 0;
    $(".pj-back", main).onclick = (e) => { e.stopPropagation(); body._projectKeys = null; back(); };
    $$("[data-step]", main).forEach((b) => b.onclick = (e) => { e.stopPropagation(); projectPage(body, (i + +b.dataset.step + n) % n, back); });
    $$(".pj-gal button", main).forEach((b) => b.onclick = (e) => { e.stopPropagation(); lightbox(c.gallery.map((src) => ({ src, caption: c.title, date: c.date, id: "x" + src })), +b.dataset.k); });
    body._projectKeys = (dir) => projectPage(body, (i + dir + n) % n, back);
  }
  function lightbox(list, i, onChange) {
    const o = el(`<div class="lb" role="dialog" aria-label="Viewer"><div class="lb-top"><div class="lb-info"></div><div class="lb-act"><button class="lb-fav" aria-label="Favorite">${SYM.heart}</button><button class="lb-x" aria-label="Close">✕</button></div></div><button class="lb-p" aria-label="Previous">‹</button><div class="lb-c"></div><button class="lb-n" aria-label="Next">›</button></div>`);
    const show = () => {
      const p = list[i];
      $(".lb-c", o).innerHTML = isEmbed(p) ? `<div class="lb-emb ${igCode(p.src)[2] ? "tall" : ""}"><iframe src="${esc(embedUrl(p.src))}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen title="Video"></iframe></div>`
        : isVid(p) ? `<video src="${esc(p.src)}" ${p.poster ? `poster="${esc(p.poster)}"` : ""} controls autoplay playsinline></video>` : `<img ${srcAttr(p.src)} alt="" referrerpolicy="no-referrer">`;
      $(".lb-info", o).innerHTML = `<b>${esc(p.caption || "")}</b><span>${esc([fmtDate(p.date, { day: "numeric", month: "long", year: "numeric" }), p.album].filter(Boolean).join(" · "))}</span><em>${i + 1} of ${list.length}</em>`;
      $(".lb-fav", o).classList.toggle("on", favs.has(p.id));
      $(".lb-fav", o).hidden = String(p.id).startsWith("x");
    };
    const go = (d) => { i = (i + d + list.length) % list.length; show(); };
    $(".lb-x", o).onclick = () => o.remove();
    $(".lb-p", o).onclick = () => go(-1);
    $(".lb-n", o).onclick = () => go(1);
    $(".lb-fav", o).onclick = () => { const id = list[i].id; favs.has(id) ? favs.delete(id) : favs.add(id); saveFavs(); show(); onChange && onChange(); };
    o.onclick = (e) => { if (e.target === o || e.target.classList.contains("lb-c")) o.remove(); };
    o.tabIndex = -1; o.onkeydown = (e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); };
    let sx = null; o.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    o.addEventListener("touchend", (e) => { if (sx !== null) { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) go(d < 0 ? 1 : -1); } sx = null; });
    document.body.append(o); show(); o.focus();
  }

  /* =====================================================================
     MESSAGES
     ===================================================================== */
  function bestAnswer(text) {
    const t = " " + text.toLowerCase() + " ";
    let best = null, score = 0;
    [...SITE.chat, ...(SITE.chatExtra || [])].forEach((c) => {
      if (!has(c.a)) return;
      const s = (c.words || []).reduce((n, w) => n + (t.includes(w.length < 4 ? ` ${w} ` : w) ? w.length : 0), 0);
      if (s > score) { score = s; best = c.a; }
    });
    return best || SITE.chatFallback;
  }
  function renderMessages(body, arg) {
    const main = { name: SITE.short, me: true, pinned: true, preview: SITE.chatGreeting[0], chat: SITE.chat, greeting: SITE.chatGreeting };
    const convs = [main, ...(SITE.conversations || [])];
    let cur = isMobile() ? -1 : 0;
    const av = (c, cls = "") => c.me ? avatar(cls) : `<div class="avatar ${cls} cv-av" style="background:${c.color || "#8e8e93"}">${esc(c.short || c.name.slice(0, 2).toUpperCase())}</div>`;
    const list = () => {
      const pin = convs.map((c, i) => [c, i]).filter(([c]) => c.pinned), rest = convs.map((c, i) => [c, i]).filter(([c]) => !c.pinned);
      return `<div class="ios-head-row"><span></span><button class="ios-ico" aria-label="Compose" data-open="mail">${SYM.compose}</button></div>
        <div class="ios-large">Messages</div>
        <label class="ios-search">${SYM.search}<input placeholder="Search" aria-label="Search"></label>
        <div class="pins">${pin.map(([c, i]) => `<button class="pin" data-c="${i}">${c.preview && !c.me ? `<span class="pin-bub">${esc(c.preview)}</span>` : `<span class="pin-bub ghost"></span>`}${av(c, "pin-av")}<span class="pin-n">${c.me ? "" : `<i class="dot"></i>`}${esc(c.name)}</span></button>`).join("")}</div>
        <div class="cv-list">${rest.map(([c, i]) => `<button class="cv-row" data-c="${i}"><i class="dot"></i>${av(c, "md")}<div><b>${esc(c.name)}</b><span>${esc(c.preview || "")}</span></div><em>${esc(c.date || "")} ›</em></button>`).join("")}</div>`;
    };
    const chatView = (i) => {
      const c = convs[i];
      return `${isMobile() ? `<div class="ms-top"><button class="m-sub-back" data-back>${SYM.back}</button><div class="ms-who">${av(c, "md")}<b>${esc(c.name)} ›</b></div><span></span></div>` : `<div class="ms-head">${av(c, "md")}<b>${esc(c.name)}</b><span class="muted">iMessage</span></div>`}
        <div class="ms-log"></div>
        <div class="ms-chips">${c.chat.filter((x) => has(x.a)).map((x, k) => `<button class="chip" data-q="${k}">${esc(x.q)}</button>`).join("")}</div>
        <form class="ms-form"><input placeholder="iMessage" aria-label="Type a message"><button aria-label="Send">↑</button></form>`;
    };
    const draw = () => {
      if (isMobile()) body.innerHTML = `<div class="msg ios-page ${cur < 0 ? "" : "chat"}">${cur < 0 ? list() : chatView(cur)}</div>`;
      else body.innerHTML = `<div class="split msg"><aside class="side"><label class="tb-search wide">${SYM.search}<input placeholder="Search" aria-label="Search"></label>${convs.map((c, i) => `<button class="ms-conv ${i === cur ? "sel" : ""}" data-c="${i}">${av(c, "sm")}<div><b>${esc(c.name)}</b><span>${esc(c.preview || "")}</span></div></button>`).join("")}</aside><div class="ms-main">${chatView(cur)}</div></div>`;
      if (cur < 0) return;
      const c = convs[cur], log = $(".ms-log", body);
      const add = (who, text) => { log.append(el(`<div class="bub ${who}">${esc(text)}</div>`)); log.scrollTop = log.scrollHeight; };
      const reply = (q, a) => {
        add("me", q);
        const typing = el(`<div class="bub them typing"><i></i><i></i><i></i></div>`); log.append(typing); log.scrollTop = log.scrollHeight;
        setTimeout(() => { typing.remove(); add("them", a || bestAnswer(q)); }, 650);
      };
      (c.greeting || [c.preview || "Hi! 👋", "Tap a question below."]).forEach((g) => add("them", g));
      const qs = c.chat.filter((x) => has(x.a));
      $(".ms-chips", body).onclick = (e) => { const b = e.target.closest("[data-q]"); if (b) reply(qs[+b.dataset.q].q, qs[+b.dataset.q].a); };
      $(".ms-form", body).onsubmit = (e) => { e.preventDefault(); const i = $("input", e.target); if (i.value.trim()) { reply(i.value.trim()); i.value = ""; } };
    };
    body.onclick = (e) => {
      const c = e.target.closest("[data-c]"); if (c) { cur = +c.dataset.c; draw(); return; }
      if (e.target.closest("[data-back]")) { cur = -1; draw(); }
    };
    draw();
  }

  /* ---------- Mail ---------- */
  function renderMail(body) {
    body.innerHTML = `<form class="ml">
      <div class="ml-row"><span>To:</span><b>${esc(SITE.email)}</b></div>
      ${SITE.phone ? `<div class="ml-row"><span>Call:</span><a href="${tel(SITE.phone)}">${esc(SITE.phone)}</a><span class="muted ml-w">· WhatsApp too</span></div>` : ""}
      <label class="ml-row"><span>Subject:</span><input name="s" placeholder="Hi ${esc(SITE.short)}!"></label>
      <textarea name="m" placeholder="Write your message…"></textarea>
      <div class="ml-foot"><span class="muted">Opens your email app</span><button class="btn">Send</button></div></form>`;
    const f = $(".ml", body);
    f.onsubmit = (e) => { e.preventDefault(); location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(f.s.value)}&body=${encodeURIComponent(f.m.value)}`; };
  }

  /* ---------- Preview (CV) ---------- */
  function renderPreview(body) {
    if (has(SITE.resumePages)) {
      body.innerHTML = `<div class="pv pv-pages">${SITE.resumePages.map((p) => `<img src="${esc(p)}" alt="CV page">`).join("")}<div class="pv-bar glass"><a class="btn" href="${esc(SITE.resume)}" download>Download PDF</a><a class="btn ghost" href="${esc(SITE.resume)}" target="_blank" rel="noopener">Open</a></div></div>`;
      return;
    }
    body.innerHTML = SITE.resume
      ? `<div class="pv"><object data="${esc(SITE.resume)}" type="application/pdf"><div class="pv-fb">${ICONS.pdf}<p>Tap to open the CV.</p><a class="btn" href="${esc(SITE.resume)}" target="_blank" rel="noopener">Open CV</a></div></object><a class="btn pv-dl" href="${esc(SITE.resume)}" download>Download</a></div>`
      : empty("CV will be added soon.");
  }

  /* ---------- Terminal ---------- */
  function renderTerminal(body) {
    const ps = `${esc(SITE.short.toLowerCase())}@macbook ~ %`;
    body.innerHTML = `<div class="term"><div class="term-out"></div><form class="term-line"><span class="term-ps">${ps}</span><input autocomplete="off" spellcheck="false" aria-label="Terminal input"></form></div>`;
    const out = $(".term-out", body), inp = $("input", body);
    const print = (h) => { out.insertAdjacentHTML("beforeend", h + "\n"); body.scrollTop = 1e9; };
    const link = (u, t) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t || u)}</a>`;
    const CMD = {
      help: () => `<span class="y">Commands you can try:</span>
  <span class="c">whoami</span>       who I am
  <span class="c">about</span>        a short intro
  <span class="c">experience</span>   my career, role by role
  <span class="c">projects</span>     my work
  <span class="c">skills</span>       what I'm good at
  <span class="c">contact</span>      how to reach me
  <span class="c">resume</span>       open my CV
  <span class="c">behance</span>, <span class="c">instagram</span>, <span class="c">facebook</span>, <span class="c">linkedin</span>
  <span class="c">open</span> <span class="d">app</span>     open an app (notes, photos, messages…)
  <span class="c">ls</span>, <span class="c">date</span>, <span class="c">echo</span>, <span class="c">clear</span>`,
      whoami: () => `${esc(SITE.name)}\n${esc(SITE.title)} · ${esc(SITE.location)}`,
      about: () => esc(strip(SITE.notes[0].html).split("Explore")[0].replace(/^Hi, I'm Shanto 👋\s*/, "").trim()),
      experience: () => SITE.experience.map((e) => `<span class="y">${esc((e.dates || "—").padEnd(18))}</span> <b>${esc(e.role)}</b> <span class="d">@ ${esc(e.company)}</span>`).join("\n"),
      projects: () => SITE.campaigns.map((c) => `<span class="c">${esc(String(c.title).padEnd(28))}</span>${esc(c.type || "")} <span class="d">${esc(c.year || "")}</span>`).join("\n"),
      skills: () => Object.entries(SITE.skills).map(([k, v]) => `<span class="y">${esc(k)}</span>\n  ${v.map(esc).join(", ")}`).join("\n"),
      contact: () => [`phone      <a href="${tel(SITE.phone)}">${esc(SITE.phone)}</a>`, `email      <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`, `behance    ${link(SITE.behance)}`, `instagram  ${link(SITE.instagram)}`, `facebook   ${link(SITE.facebook)}`, `linkedin   ${link(SITE.linkedin)}`].join("\n"),
      resume: () => { openApp("preview"); return "Opening CV…"; },
      behance: () => link(SITE.behance, "→ open Behance"), instagram: () => link(SITE.instagram, "→ open Instagram"),
      facebook: () => link(SITE.facebook, "→ open Facebook"), linkedin: () => link(SITE.linkedin, "→ open LinkedIn"),
      ls: () => `<span class="c">Desktop/</span>  <span class="c">Documents/</span>  <span class="c">Projects/</span>  <span class="c">Work Videos/</span>  Ahanaf-Shanto-CV.pdf`,
      date: () => new Date().toString(),
      clear: () => { out.innerHTML = ""; return null; },
    };
    print(`Last login: ${new Date().toDateString()} on ttys000\nType <span class="c">help</span> to see what I can do.`);
    $("form", body).onsubmit = (e) => {
      e.preventDefault();
      const raw = inp.value.trim(); inp.value = "";
      print(`<span class="term-ps">${ps}</span> ${esc(raw)}`);
      if (!raw) return;
      const [cmd, ...rest] = raw.split(/\s+/);
      let r;
      if (cmd === "echo") r = esc(rest.join(" "));
      else if (cmd === "open") r = APPS[rest[0]] ? (openApp(rest[0]), "Opening " + esc(rest[0]) + "…") : "App not found. Try: notes, photos, messages, mail, finder, music";
      else if (cmd === "sudo" && /hire/.test(rest.join(" "))) { r = `<span class="g">✔ Access granted.</span> Great choice 😄 Call <a href="${tel(SITE.phone)}">${esc(SITE.phone)}</a> or opening Mail…`; setTimeout(() => openApp("mail"), 700); }
      else if (cmd === "sudo") r = "Nice try 😏";
      else r = CMD[cmd] ? CMD[cmd]() : `zsh: command not found: ${esc(cmd)}. Type <span class="c">help</span>`;
      if (r !== null) print(r);
    };
    body.onclick = (e) => { if (!e.target.closest("a")) inp.focus(); };
    setTimeout(() => inp.focus(), 60);
  }

  /* ---------- Music ---------- */
  function musicEmbed(u) {
    try {
      const url = new URL(u);
      if (/spotify\.com/.test(url.host)) { const [, type, id] = url.pathname.split("/"); return `https://open.spotify.com/embed/${type}/${id}`; }
      if (/music\.apple\.com/.test(url.host)) return u.replace("music.apple.com", "embed.music.apple.com");
      if (/youtu/.test(url.host)) return embedUrl(u);
    } catch {}
    return null;
  }
  function renderMusic(body) {
    const p = (SITE.playlists || []).filter((x) => x.url).map((x) => ({ ...x, e: musicEmbed(x.url) }));
    const svc = (x) => /spotify/.test(x.url) ? "Spotify" : /apple/.test(x.url) ? "Apple Music" : /soundcloud/.test(x.url) ? "SoundCloud" : "YouTube";
    const col = { Spotify: "#1db954", "Apple Music": "#fa243c", YouTube: "#ff0000", SoundCloud: "#ff5500" };
    const cov = (x, cls) => `<span class="${cls}" style="background:linear-gradient(135deg, ${col[svc(x)]}, #1c1c1e)">♪</span>`;
    const player = (x) => x.e ? `<div class="mu-frame" style="height:${/\/track\//.test(x.url) ? 152 : 452}px"><iframe src="${esc(x.e)}" title="${esc(x.name)}" allow="autoplay *; clipboard-write; encrypted-media *; fullscreen *; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><p class="mu-note">Plays through ${svc(x)}. Listeners signed in to ${svc(x)} hear full songs; others may hear previews.</p>` : `<p class="muted">This link isn't recognised.</p>`;
    if (!p.length) { body.innerHTML = empty("Playlists coming soon 🎧", "🎵"); return; }
    let cur = 0;
    const stopBtn = `<button class="btn ghost" data-stop>■ Stop music</button>`;
    if (isMobile()) {
      const list = () => { body.innerHTML = `<div class="ios-page mu-page"><div class="ios-large">Music</div><div class="ios-subt">${p.length} playlists</div><div class="mu-grid">${p.map((x, i) => `<button class="mu-card" data-m="${i}">${cov(x, "mu-cov")}<b>${esc(x.name)}</b><span>${svc(x)}</span></button>`).join("")}</div></div>`; };
      const open = (i) => { const x = p[i]; body.innerHTML = `<div class="ios-page mu-page"><button class="m-sub-back" data-back>${SYM.back}<span>Music</span></button>${cov(x, "mu-big")}<div class="ios-large mu-title">${esc(x.name)}</div><div class="ios-subt">${svc(x)}</div>${player(x)}<div class="mu-acts">${stopBtn}</div></div>`; };
      body.onclick = (e) => { const c = e.target.closest("[data-m]"); if (c) return open(+c.dataset.m); if (e.target.closest("[data-back]")) return list(); if (e.target.closest("[data-stop]")) stopMusic(body); };
      list(); return;
    }
    const draw = () => {
      const x = p[cur];
      body.innerHTML = `<div class="split mus"><aside class="side"><div class="side-h">Playlists</div>${p.map((y, i) => `<button class="side-it mu-row ${i === cur ? "sel" : ""}" data-m="${i}">${cov(y, "mu-thumb")}<span><b>${esc(y.name)}</b><small>${svc(y)}</small></span></button>`).join("")}</aside>
        <div class="mu-main"><div class="mu-head">${cov(x, "mu-big")}<div><span class="mu-kicker">${svc(x)}</span><h1>${esc(x.name)}</h1><div class="mu-acts">${stopBtn}</div></div></div>${player(x)}</div></div>`;
    };
    body.onclick = (e) => { const r = e.target.closest("[data-m]"); if (r && +r.dataset.m !== cur) { cur = +r.dataset.m; draw(); } if (e.target.closest("[data-stop]")) stopMusic(body); };
    draw();
  }
  // music keeps playing when the Music window is closed; only "Stop music" really closes it
  function stopMusic(body) { const w = body.closest(".window"); if (w) { w._reallyClose = true; closeWin(w); } }

  /* ---------- Calendar ---------- */
  function renderCalendar(body) {
    let d = new Date(); d.setDate(1);
    const draw = () => {
      const m = d.getMonth(), y = d.getFullYear(), first = (d.getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate(), today = new Date();
      const evs = {}; SITE.campaigns.forEach((c) => { const x = new Date(c.date); if (x.getMonth() === m && x.getFullYear() === y) (evs[x.getDate()] = evs[x.getDate()] || []).push(c.title); });
      body.innerHTML = `<div class="cal"><div class="cal-h"><b>${d.toLocaleDateString("en", { month: "long" })}</b> ${y}<span class="seg"><button data-m="-1">‹</button><button data-m="0">Today</button><button data-m="1">›</button></span></div>
        <div class="cal-g">${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((x) => `<i>${x}</i>`).join("")}${"<span></span>".repeat(first)}${Array.from({ length: days }, (_, i) => `<span class="${i + 1 === today.getDate() && m === today.getMonth() && y === today.getFullYear() ? "today" : ""}"><em>${i + 1}</em>${(evs[i + 1] || []).map((t) => `<small>${esc(t)}</small>`).join("")}</span>`).join("")}</div></div>`;
      $$("[data-m]", body).forEach((b) => b.onclick = () => { const k = +b.dataset.m; if (!k) { d = new Date(); d.setDate(1); } else d.setMonth(d.getMonth() + k); draw(); });
    };
    draw();
  }

  /* ---------- Settings ---------- */
  function renderSettings(body) {
    if (isMobile()) return renderSettingsIOS(body);
    body.innerHTML = `<div class="st doc">
      <div class="st-card">${avatar("md")}<div><b>${esc(SITE.name)}</b><div class="muted">${esc(SITE.mac.osName)} ${esc(SITE.mac.osVersion)} · ${esc(SITE.location)}</div></div></div>
      <h2>Appearance</h2><div class="seg st-theme">${["light", "dark", "auto"].map((t) => `<button data-th="${t}" class="${prefs.theme === t ? "sel" : ""}">${t[0].toUpperCase() + t.slice(1)}</button>`).join("")}</div>
      <h2>Accent colour</h2><div class="st-acc">${ACCENTS.map((c) => `<button data-ac="${c}" style="background:${c}" class="${prefs.accent === c ? "sel" : ""}" aria-label="Accent ${c}"></button>`).join("")}</div>
      <h2>Wallpaper</h2>${wallGrid()}
      <h2>Dock</h2><label class="st-row"><input type="checkbox" ${prefs.dockMag ? "checked" : ""} data-mag> Magnification</label>
      <h2>About this Mac</h2><div class="inset"><table class="st-about">${[["Name", SITE.mac.deviceName], ["Model", SITE.mac.model], ["Chip", SITE.mac.chip], ["Memory", SITE.mac.memory], ["Serial", "SHANTO-2026"]].filter((r) => r[1]).map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join("")}</table></div>
    </div>`;
    body.onclick = (e) => { if (lookClick(e)) renderSettings(body); };
    $("[data-mag]", body).onchange = (e) => { prefs.dockMag = e.target.checked; savePrefs(); };
  }
  const wallGrid = () => `<div class="st-walls">${Object.entries(WALLS).map(([k, w]) => `<button data-wl="${k}" class="${prefs.wall === k ? "sel" : ""}"><i style="background:${w.css}"></i><span>${esc(w.name)}</span></button>`).join("")}</div>`;
  function lookClick(e) {
    const t = e.target.closest("[data-th]"), a = e.target.closest("[data-ac]"), w = e.target.closest("[data-wl]");
    if (t) prefs.theme = t.dataset.th; else if (a) prefs.accent = a.dataset.ac; else if (w) prefs.wall = w.dataset.wl; else return false;
    savePrefs(); applyLook(); return true;
  }
  const RI = {
    plane: `<path d="M12 3c.8 0 1.3.8 1.3 1.8V9l6.2 3.7v1.8l-6.2-1.9v3.9l1.8 1.4V19L12 18l-3.1 1v-1.1l1.8-1.4v-3.9l-6.2 1.9v-1.8L10.7 9V4.8C10.7 3.8 11.2 3 12 3z" fill="#fff"/>`,
    wifi: `<path d="M12 18.5l-2-2a2.8 2.8 0 0 1 4 0zM7.2 13.7a6.8 6.8 0 0 1 9.6 0l-1.4 1.4a4.8 4.8 0 0 0-6.8 0zM4.4 10.9a10.8 10.8 0 0 1 15.2 0l-1.4 1.4a8.8 8.8 0 0 0-12.4 0z" fill="#fff"/>`,
    bt: `<path d="M8 8l8 8-4 3.5V4.5L16 8l-8 8" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>`,
    batt: `<rect x="4" y="8.5" width="14" height="7" rx="2" fill="none" stroke="#fff" stroke-width="1.6"/><rect x="6" y="10.5" width="8" height="3" rx="1" fill="#fff"/><path d="M19.5 11v2" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`,
    gear: `<circle cx="12" cy="12" r="3" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M12 4v2.5M12 17.5V20M4 12h2.5M17.5 12H20M6.3 6.3l1.8 1.8M15.9 15.9l1.8 1.8M6.3 17.7l1.8-1.8M15.9 8.1l1.8-1.8" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>`,
    sun: `<circle cx="12" cy="12" r="3.5" fill="#fff"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6L18 18M6 18l1.4-1.4M16.6 7.4L18 6" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>`,
    pic: `<rect x="4.5" y="5.5" width="15" height="13" rx="2.5" fill="none" stroke="#fff" stroke-width="1.6"/><circle cx="9" cy="10" r="1.6" fill="#fff"/><path d="M5 17l4.5-4.5 3 3 2-2L19 17" fill="none" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>`,
    moon: `<path d="M15.5 17.5A6.5 6.5 0 0 1 10 6a6.5 6.5 0 1 0 8.4 9.6 6.5 6.5 0 0 1-2.9 1.9z" fill="#fff"/>`,
    phone: `<path d="M8.5 4.5c.7 0 1.4 1.7 1.6 2.6.2.9-.9 1.4-.7 2.1.7 1.6 2 2.9 3.6 3.6.7.2 1.2-.9 2.1-.7.9.2 2.6.9 2.6 1.6 0 1.6-1.6 2.8-2.8 2.8-5.3-.3-8.6-3.6-8.9-8.9 0-1.2 1.2-3.1 2.5-3.1z" fill="#fff"/>`,
  };
  function renderSettingsIOS(body, sub) {
    const ic = (k, c) => `<i class="ios-ic" style="background:${c}"><svg viewBox="0 0 24 24">${RI[k]}</svg></i>`;
    const row = (icon, label, val = "", attr = "", chev = true) => `<button class="ios-row" ${attr}>${icon}<span>${label}</span>${val ? `<em>${val}</em>` : ""}${chev ? `<b class="chev">›</b>` : ""}</button>`;
    if (sub === "display") {
      body.innerHTML = `<div class="ios-page"><button class="m-sub-back" data-sub="">${SYM.back}<span>Settings</span></button><div class="ios-large">Display &amp; Brightness</div>
        <div class="ios-cap">APPEARANCE</div><div class="ios-grp ios-look">${["light", "dark", "auto"].map((t) => `<button data-th="${t}" class="${prefs.theme === t ? "sel" : ""}"><i class="look-${t}"></i><span>${t === "auto" ? "Automatic" : t[0].toUpperCase() + t.slice(1)}</span><b>${prefs.theme === t ? "✓" : ""}</b></button>`).join("")}</div>
        <div class="ios-cap">ACCENT</div><div class="ios-grp ios-pad"><div class="st-acc">${ACCENTS.map((c) => `<button data-ac="${c}" style="background:${c}" class="${prefs.accent === c ? "sel" : ""}" aria-label="Accent ${c}"></button>`).join("")}</div></div></div>`;
    } else if (sub === "wall") {
      body.innerHTML = `<div class="ios-page"><button class="m-sub-back" data-sub="">${SYM.back}<span>Settings</span></button><div class="ios-large">Wallpaper</div><div class="ios-grp ios-pad">${wallGrid()}</div></div>`;
    } else {
      body.innerHTML = `<div class="ios-page">
        <div class="ios-large">Settings</div>
        <div class="ios-grp">
          <button class="ios-row prof" data-open="hire">${avatar("lg")}<div><b>${esc(SITE.name)}</b><span>${esc(SITE.short)} ID, portfolio and more</span></div><b class="chev">›</b></button>
          ${row("", "Recruiter Quick View", `<i class="ios-badge">1</i>`, 'data-open="hire"')}
        </div>
        <div class="ios-grp">
          <div class="ios-row">${ic("plane", "#ff9500")}<span>Airplane Mode</span><label class="tgl"><input type="checkbox" aria-label="Airplane Mode"><i></i></label></div>
          ${row(ic("wifi", "#0a84ff"), "Wi-Fi", esc(SITE.short) + "-5G")}
          ${row(ic("bt", "#0a84ff"), "Bluetooth", "On")}
          ${row(ic("phone", "#34c759"), "Call " + esc(SITE.short), esc(SITE.phone), `data-tel`)}
          ${row(ic("batt", "#34c759"), "Battery", "100%")}
        </div>
        <div class="ios-grp">
          ${row(ic("gear", "#8e8e93"), "General", "", 'data-open="hire"')}
          ${row(ic("sun", "#0a84ff"), "Display &amp; Brightness", esc(prefs.theme[0].toUpperCase() + prefs.theme.slice(1)), 'data-sub="display"')}
          ${row(ic("pic", "#32ade6"), "Wallpaper", "", 'data-sub="wall"')}
          ${row(ic("moon", "#5e5ce6"), "Focus", "Editing")}
        </div>
        <div class="ios-grp">${row("", "About this iPhone", esc(SITE.mac.osName + " " + SITE.mac.osVersion), '', false)}</div>
      </div>
      <label class="ios-searchbar glass">${SYM.search}<input placeholder="Search" aria-label="Search" data-spot readonly></label>`;
    }
    body.onclick = (e) => {
      const s = e.target.closest("[data-sub]"); if (s) { renderSettingsIOS(body, s.dataset.sub); return; }
      if (e.target.closest("[data-tel]")) { location.href = tel(SITE.phone); return; }
      if (e.target.closest("[data-spot]")) { openSpot(); return; }
      if (lookClick(e)) renderSettingsIOS(body, sub);
    };
  }

  /* ---------- Trash ---------- */
  function renderTrash(body) {
    body.innerHTML = has(SITE.trash) ? `<div class="fd-grid">${SITE.trash.map((t, i) => `<button class="fd-file" data-t="${i}">${ICONS.pdf}<span>${esc(t.name)}</span></button>`).join("")}</div><div class="doc tr-view"></div>` : empty("Trash is empty.", "🗑");
    body.onclick = (e) => { const b = e.target.closest("[data-t]"); if (b) $(".tr-view", body).innerHTML = SITE.trash[+b.dataset.t].html; };
  }

  /* ---------- Quick View ---------- */
  function renderHire(body) {
    const x = SITE.experience[0];
    body.innerHTML = `<div class="hire doc">
      <div class="hire-top"><div class="hire-photo" style="background-image:url('${esc(SITE.portrait || SITE.photo)}')"></div>
        <div><h1>${esc(SITE.name)}</h1><p class="muted">${esc(SITE.title)}</p><p>📍 ${esc(SITE.location)}${x ? ` · 💼 ${esc(x.role)} @ ${esc(x.company)}` : ""}</p>
        <div class="hire-btns"><a class="btn" href="${tel(SITE.phone)}">Call</a><button class="btn ghost" data-open="mail">Email</button><button class="btn ghost" data-open="preview">CV</button>${["behance", "instagram", "facebook", "linkedin"].map((k) => appTag(k, "btn ghost", esc(APPS[k].name))).join("")}</div>
        <p class="muted">${esc(SITE.phone)} · ${esc(SITE.email)}</p></div></div>
      <div class="facts">${[["5+ yrs", "experience"], [SITE.campaigns.length, "projects"], [libraryItems().filter((p) => isVid(p) || isEmbed(p)).length, "work videos"], [SITE.experience.length, "companies"]].map(([a, b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div>
      <h2>Skills</h2><div class="chips">${Object.values(SITE.skills).flat().map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
      <h2>Experience</h2><div class="inset">${SITE.experience.map((e) => `<div class="row"><b>${esc(e.company)}</b><span>${esc(e.role)}</span><em>${esc(e.dates || "")}</em></div>`).join("")}</div>
    </div>`;
  }

  /* =====================================================================
     DOCK, DESKTOP ICONS, WIDGETS, LAUNCHPAD
     ===================================================================== */
  function buildDock() {
    const dock = $("#dock");
    const keys = isMobile() ? ["notes", "messages", "photos", "music"] : DOCK;
    dock.innerHTML = keys.map((k) => k === "|" ? `<span class="dock-sep"></span>` : appTag(k, "dock-it", `<span class="dock-ic">${iconFor(k)}${k === "messages" ? `<span class="badge"></span>` : ""}</span><span class="dock-tip">${esc(APPS[k].name)}</span><span class="dock-dot"></span>`)).join("");
    dock.onpointermove = (e) => {
      if (!prefs.dockMag || isMobile()) return;
      $$(".dock-it", dock).forEach((b) => { const r = b.getBoundingClientRect(); const d = Math.abs(e.clientX - (r.left + r.width / 2)); b.style.setProperty("--s", 1 + Math.max(0, 1 - d / 150) * 0.5); });
    };
    dock.onpointerleave = () => $$(".dock-it", dock).forEach((b) => b.style.setProperty("--s", 1));
    $$(".dock-it[data-open]", dock).forEach((b) => b.addEventListener("click", (e) => {
      const w = openWins[b.dataset.k]; if (w && w.classList.contains("minimized")) { e.stopImmediatePropagation(); w.classList.remove("minimized"); focusWin(w); updateDock(); }
      else if (!w) { b.classList.add("bounce"); setTimeout(() => b.classList.remove("bounce"), 700); }
    }, true));
    updateDock();
  }
  function updateDock() {
    $$(".dock-it").forEach((b) => b.classList.toggle("on", !!openWins[b.dataset.k]));
    $$(".badge").forEach((b) => { b.textContent = badge || ""; b.hidden = !badge; });
    document.body.classList.toggle("app-open", Object.values(openWins).some((w) => !w.classList.contains("minimized")));
  }
  const docIcon = (label, color) => `<svg viewBox="0 0 80 100" class="ic"><path d="M8 4h46l18 18v70a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z" fill="#fff" stroke="#c7c7cc" stroke-width="2"/><path d="M54 4v14a4 4 0 0 0 4 4h14" fill="#eee" stroke="#c7c7cc" stroke-width="2"/><path d="M14 34h44M14 42h44M14 72h44M14 80h30" stroke="#e1e1e6" stroke-width="3"/><rect x="10" y="48" width="${label.length * 11 + 10}" height="18" rx="3" fill="${color}"/><text x="${15 + label.length * 5.5}" y="62" text-anchor="middle" font-size="12" font-weight="800" fill="#fff" font-family="Inter,system-ui">${label}</text></svg>`;
  function buildDesk() {
    $("#desk-icons").innerHTML = [
      `<button class="desk-it" data-open="hire"><span class="desk-ic">${docIcon("HIRE", "#1a7cf0")}</span><span>For Recruiters</span></button>`,
      `<button class="desk-it" data-open="preview"><span class="desk-ic">${docIcon("PDF", "#ff3b30")}</span><span>Ahanaf-Shanto-CV.pdf</span></button>`,
      `<button class="desk-it" data-open="photos" data-arg="projects"><span class="desk-ic">${ICONS.folder}</span><span>Projects</span></button>`,
      `<button class="desk-it" data-open="finder" data-arg="experience"><span class="desk-ic">${ICONS.folder}</span><span>Experience</span></button>`,
      `<button class="desk-it" data-open="photos" data-arg="library"><span class="desk-ic">${ICONS.folder}</span><span>Work Videos</span></button>`,
      `<button class="desk-it" data-open="messages"><span class="desk-ic">${docIcon("CHAT", "#28c840")}</span><span>Say hi.txt</span></button>`,
    ].join("");
  }
  const logoI = (e) => `<i class="logo-i" style="background:${e.color || "var(--accent)"}">${esc((e.company || e.school || "?")[0])}${e.logo ? `<img src="${esc(e.logo)}" alt="" referrerpolicy="no-referrer">` : ""}</i>`;
  const workRows = (n, short) => SITE.experience.slice(0, n).map((e) => `<div class="hw-row">${logoI(e)}<div><b>${esc(e.company)}</b><span>${esc(short ? String(e.dates || e.role).replace(/^[A-Za-z]+ /, "").replace("Present", "Now") : e.dates || e.role)}</span></div></div>`).join("");
  function stickyHTML(cls = "sticky") {
    const n = SITE.campaigns.length, f = SITE.campaigns.filter((c) => c.featured).length, v = libraryItems().filter((p) => isVid(p) || isEmbed(p)).length;
    return `<button class="${cls}" data-open="photos" data-arg="projects"><b>${esc(SITE.sticky.title)}</b><div class="st-n">${n}</div><span>projects & campaigns</span><small>${SITE.campaigns.filter((c) => c.kind === "Campaign").length} campaigns · ${SITE.campaigns.filter((c) => c.kind !== "Campaign").length} projects</small><em>${isMobile() ? "See all →" : esc(SITE.sticky.button)}</em></button>`;
  }
  const sessionGet = (k) => { try { return sessionStorage.getItem("shanto-" + k); } catch { return null; } };
  const sessionSet = (k, v) => { try { sessionStorage.setItem("shanto-" + k, v); } catch {} };
  function deskSticky() {
    const n = SITE.campaigns.length, f = SITE.campaigns.filter((c) => c.featured).length, types = new Set(SITE.campaigns.map((c) => c.type)).size, v = libraryItems().filter((p) => isVid(p) || isEmbed(p)).length;
    return `<div class="dsk"><button class="dsk-x" aria-label="Close">×</button><b>${esc(SITE.sticky.title)}</b><p>${n} projects & campaigns across ${types} categories.</p><div class="dsk-st"><span><b>${v}</b> work videos</span><span><b>${f}</b> flagship</span></div><span class="dsk-pill">★ Flagship ${f}</span><button class="dsk-btn" data-open="photos" data-arg="projects">${esc(SITE.sticky.button)}</button></div>`;
  }
  function buildWidgets() {
    const w = $("#widgets"); if (isMobile()) { w.innerHTML = ""; return; }
    const photos = libraryItems().filter((p) => !isEmbed(p) && thumbOf(p)).slice(0, 14);
    w.innerHTML = `
      <div class="wg-row">
        <div class="wg clk drag" data-w="clock"><svg viewBox="0 0 100 100" class="clk-face">${Array.from({ length: 12 }, (_, i) => `<text x="${50 + 36 * Math.sin(i * Math.PI / 6)}" y="${53.5 + -36 * Math.cos(i * Math.PI / 6)}" text-anchor="middle">${i || 12}</text>`).join("")}<line id="clk-h" x1="50" y1="50" x2="50" y2="28"/><line id="clk-m" x1="50" y1="50" x2="50" y2="18"/><line id="clk-s" x1="50" y1="56" x2="50" y2="14"/><circle cx="50" cy="50" r="2.6"/></svg><span class="clk-city">${esc(SITE.weather.city)}</span></div>
        ${SITE.weather.show ? `<div class="wg wx drag" id="wx" data-w="weather"><b>${esc(SITE.weather.city)} ➤</b><div class="wx-t">--°</div><span>Loading…</span></div>` : ""}
      </div>
      ${photos.length ? `<div class="wg pho drag" data-w="photos"><div class="pho-st">${photos.map((p, i) => `<img ${srcAttr(thumbOf(p))} alt="" class="${i ? "" : "on"}" data-i="${i}" referrerpolicy="no-referrer">`).join("")}</div><div class="pho-cap"><b>Photos</b><span></span></div><div class="pho-dots">${photos.map((_, i) => `<i class="${i ? "" : "on"}"></i>`).join("")}</div><button class="pho-nav p" aria-label="Previous">‹</button><button class="pho-nav n" aria-label="Next">›</button></div>` : ""}
      ${SITE.sticky.show && !sessionGet("sticky-x") ? deskSticky() : ""}`;
    const x = $(".dsk-x", w); if (x) x.onclick = (e) => { e.stopPropagation(); sessionSet("sticky-x", 1); $(".dsk", w).remove(); };
    // photo slideshow
    const pho = $(".pho", w);
    if (pho) {
      let k = 0, timer;
      const show = (n) => { k = (n + photos.length) % photos.length; $$(".pho-st img", pho).forEach((im, i) => im.classList.toggle("on", i === k)); $$(".pho-dots i", pho).forEach((d, i) => d.classList.toggle("on", i === k)); $(".pho-cap span", pho).textContent = photos[k].caption || ""; };
      const play = () => { clearInterval(timer); timer = setInterval(() => show(k + 1), 3800); };
      $(".pho-nav.p", pho).onclick = (e) => { e.stopPropagation(); show(k - 1); play(); };
      $(".pho-nav.n", pho).onclick = (e) => { e.stopPropagation(); show(k + 1); play(); };
      pho.onclick = (e) => { if (pho._dragged) return; lightbox(photos, k); };
      pho.onmouseenter = () => clearInterval(timer); pho.onmouseleave = play;
      show(0); play();
    }
    $("#clk-s") && tickClock();
    makeDraggable(w);
    loadWeather(); clearInterval(buildWidgets._wx); buildWidgets._wx = setInterval(loadWeather, 10 * 60 * 1000);
  }
  // real clock in Dhaka time
  function tickClock() {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: SITE.timezone || undefined }));
    const s = now.getSeconds() + now.getMilliseconds() / 1000, m = now.getMinutes() + s / 60, h = (now.getHours() % 12) + m / 60;
    const set = (id, deg) => { const e = document.getElementById(id); if (e) e.setAttribute("transform", `rotate(${deg} 50 50)`); };
    set("clk-h", h * 30); set("clk-m", m * 6); set("clk-s", s * 6);
    if ($("#clk-s")) requestAnimationFrame(tickClock);
  }
  // widgets and desktop icons can be dragged around; positions are remembered
  function makeDraggable(root) {
    const pos = store.get("widget-pos", {});
    $$(".drag", root).forEach((el) => {
      const key = el.dataset.w; if (pos[key]) { el.style.translate = `${pos[key][0]}px ${pos[key][1]}px`; }
      el.addEventListener("pointerdown", (e) => {
        if (e.target.closest("button")) return;
        const [ox, oy] = (el.style.translate || "0px 0px").split(" ").map((v) => parseFloat(v) || 0), sx = e.clientX, sy = e.clientY;
        el._dragged = false; el.setPointerCapture(e.pointerId); el.classList.add("lift");
        const mv = (ev) => { const dx = ev.clientX - sx, dy = ev.clientY - sy; if (Math.abs(dx) + Math.abs(dy) > 4) el._dragged = true; el.style.translate = `${ox + dx}px ${oy + dy}px`; };
        const up = () => { el.classList.remove("lift"); el.removeEventListener("pointermove", mv); el.removeEventListener("pointerup", up); const t = (el.style.translate || "0px 0px").split(" ").map((v) => parseFloat(v) || 0); pos[key] = t; store.set("widget-pos", pos); setTimeout(() => { el._dragged = false; }, 0); };
        el.addEventListener("pointermove", mv); el.addEventListener("pointerup", up);
      });
      el.addEventListener("click", (e) => { if (el._dragged) { e.stopPropagation(); e.preventDefault(); } }, true);
    });
  }
  const WMO = (c) => c === 0 ? ["☀️", "Clear"] : c < 3 ? ["⛅", "Partly Cloudy"] : c < 45 ? ["☁️", "Cloudy"] : c < 60 ? ["🌫", "Fog"] : c < 70 ? ["🌧", "Rain"] : c < 80 ? ["❄️", "Snow"] : c < 95 ? ["🌦", "Showers"] : ["⛈", "Storm"];
  async function loadWeather() {
    const box = $("#wx"); if (!box) return;
    try {
      const { lat, lon } = SITE.weather;
      const j = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day,apparent_temperature,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=2`).then((r) => r.json());
      const [ic, txt] = WMO(j.current.weather_code);
      const nowH = new Date(j.current.time).getHours(), start = j.hourly.time.findIndex((t) => t >= j.current.time.slice(0, 13));
      const hrs = j.hourly.time.slice(start + 1, start + 6).map((t, i) => `<div><span>${new Date(t).toLocaleTimeString("en-US", { hour: "numeric" })}</span><i>${WMO(j.hourly.weather_code[start + 1 + i])[0]}</i><b>${Math.round(j.hourly.temperature_2m[start + 1 + i])}°</b></div>`).join("");
      box.classList.toggle("night", !j.current.is_day);
      box.innerHTML = `<b>${esc(SITE.weather.city)} ➤</b><div class="wx-t">${Math.round(j.current.temperature_2m)}°<i class="wx-ic">${!j.current.is_day && ic === "☀️" ? "🌙" : ic}</i></div><span>${txt} · H:${Math.round(j.daily.temperature_2m_max[0])}° L:${Math.round(j.daily.temperature_2m_min[0])}°</span><span class="wx-more">Feels ${Math.round(j.current.apparent_temperature)}° · 💧${j.current.relative_humidity_2m}% · 🌬 ${Math.round(j.current.wind_speed_10m)} km/h</span><div class="wx-hrs">${hrs}</div><span class="wx-upd">Updated ${String(nowH).padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")} · live</span>`;
    } catch { box.innerHTML = `<b>${esc(SITE.weather.city)} ➤</b><div class="wx-t">--°</div><span>Weather offline</span><span class="wx-more">Will update when you're online</span>`; }
  }
  function openLaunchpad() {
    if ($("#lp")) return closeLaunchpad();
    const keys = Object.keys(APPS).filter((k) => k !== "launchpad" && !(isMobile() && APPS[k].desk));
    const o = el(`<div id="lp" class="lp"><label class="lp-search">${SYM.search}<input placeholder="Search" aria-label="Search apps"></label><div class="lp-grid">${keys.map((k) => appTag(k, "lp-it", `<span class="lp-ic">${iconFor(k)}</span><span>${esc(appLabel(k))}</span>`)).join("")}</div></div>`);
    o.onclick = (e) => { if (e.target === o || e.target.classList.contains("lp-grid")) closeLaunchpad(); };
    $("input", o).oninput = (e) => { const q = e.target.value.toLowerCase(); $$(".lp-it", o).forEach((b) => b.hidden = !b.textContent.toLowerCase().includes(q)); };
    document.body.append(o); requestAnimationFrame(() => o.classList.add("on")); if (!isMobile()) setTimeout(() => $("input", o).focus(), 50);
  }
  function closeLaunchpad() { const o = $("#lp"); if (o) { o.classList.remove("on"); setTimeout(() => o.remove(), 220); } }

  /* =====================================================================
     iPHONE HOME SCREEN
     ===================================================================== */
  function buildHome() {
    const home = $("#home"); if (!isMobile()) { home.innerHTML = ""; return; }
    const apps = ["finder", "notes", "messages", "photos", "mail", "linkedin", "hire", "calendar", "settings", "music"];
    home.innerHTML = `
      <button class="h-prof wglass" data-open="hire">${avatar("md")}<div><b>${esc(SITE.name)}</b><span>${esc(SITE.title.split("|")[0].trim())} · ${esc(SITE.experience[0]?.company || "")}</span></div></button>
      <div class="h-wid">
        <div class="hw-wrap"><button class="hw wglass" data-open="finder" data-arg="experience"><b>Work ›</b>${workRows(3, true)}</button><span>Work</span></div>
        <div class="hw-wrap">${stickyHTML("hw sticky")}<span>Projects</span></div>
      </div>
      <div class="h-grid">${apps.map((k) => appTag(k, "h-app", `<span class="h-ic">${iconFor(k)}${k === "messages" ? `<span class="badge"></span>` : ""}</span><span>${esc(appLabel(k))}</span>`)).join("")}</div>
      <button class="h-search wglass" id="h-search">${SYM.search}<span>Search</span></button>`;
    $("#h-search").onclick = openSpot;
    updateDock();
  }

  /* =====================================================================
     MENUS, SPOTLIGHT, SHORTCUTS
     ===================================================================== */
  const MENUS = {
    brand: () => [["About This Mac", () => openApp("settings")], ["System Settings…", () => openApp("settings")], "-", ["Launchpad", openLaunchpad], "-", ["Lock Screen", lock], ["Restart…", restart]],
    app: () => [["About " + SITE.short, () => openApp("hire")], "-", ["Hide Others", () => { const t = topWin(); $$(".window").forEach((w) => w !== t && w.classList.add("minimized")); updateDock(); }], ["Close Window", () => topWin() && closeWin(topWin())]],
    file: () => [["New Note", () => openApp("notes")], ["New Message", () => openApp("mail")], ["Open CV", () => openApp("preview")], "-", ["Close Window", () => topWin() && closeWin(topWin())]],
    edit: () => [["Copy Email", () => navigator.clipboard?.writeText(SITE.email)], ["Copy Phone Number", () => navigator.clipboard?.writeText(SITE.phone)], ["Copy Link to This Site", () => navigator.clipboard?.writeText(location.href.split("#")[0])]],
    view: () => [["Enter Full Screen", () => document.documentElement.requestFullscreen?.()], ["Dark Mode", () => { prefs.theme = "dark"; savePrefs(); applyLook(); }], ["Light Mode", () => { prefs.theme = "light"; savePrefs(); applyLook(); }]],
    go: () => [["Projects", () => openApp("photos", "projects")], ["Library", () => openApp("photos", "library")], ["Favorites", () => openApp("photos", "favorites")], ["Experience", () => openApp("finder", "experience")], "-", ...["behance", "instagram", "facebook", "linkedin"].map((k) => [APPS[k].name + " ↗", () => openApp(k)])],
    window: () => [["Minimise", () => { const t = topWin(); t && t.classList.add("minimized"); updateDock(); }], ["Zoom", () => topWin()?.classList.toggle("maxed")], "-", ...Object.keys(openWins).map((k) => [APPS[k].name, () => openApp(k)])],
    recruit: () => [["Quick View", () => openApp("hire")], ["Open CV", () => openApp("preview")], ["Call " + SITE.phone, () => { location.href = tel(SITE.phone); }], ["Email " + SITE.short, () => openApp("mail")], "-", ["Rising Star Award ⭐", () => openApp("photos", "p0")]],
    help: () => [["Keyboard Shortcuts", showShortcuts], ["Search", openSpot], ["About this website", () => openApp("notes", SITE.notes.length - 1)]],
  };
  function showMenu(btn) {
    const m = $("#menu"), key = btn.dataset.menu;
    if (!m.hidden && m.dataset.for === key) return hideMenu();
    const items = MENUS[key](), real = items.filter((i) => i !== "-");
    m.dataset.for = key;
    m.innerHTML = items.map((i) => i === "-" ? `<hr>` : `<button>${esc(i[0])}</button>`).join("");
    $$("button", m).forEach((b, i) => b.onclick = () => { hideMenu(); real[i][1](); });
    const r = btn.getBoundingClientRect(); m.style.left = r.left + "px"; m.style.top = ""; m.hidden = false;
    $$(".mb-item").forEach((b) => b.classList.toggle("open", b === btn));
  }
  function hideMenu() { $("#menu").hidden = true; $$(".mb-item").forEach((b) => b.classList.remove("open")); }
  $$(".mb-item[data-menu]").forEach((b) => b.onclick = (e) => { e.stopPropagation(); showMenu(b); });
  document.addEventListener("pointerdown", (e) => { if (!e.target.closest("#menu, .mb-item")) hideMenu(); });

  function searchIndex() {
    const r = [];
    Object.entries(APPS).forEach(([k, a]) => r.push({ t: a.name, s: "Application", go: () => openApp(k) }));
    SITE.notes.forEach((n, i) => r.push({ t: n.title, s: "Note", body: strip(n.html), go: () => openApp("notes", i) }));
    SITE.campaigns.forEach((c, i) => r.push({ t: c.title, s: "Project", body: [c.desc, c.type, c.client, c.tag].join(" "), go: () => openApp("photos", "p" + i) }));
    SITE.experience.forEach((e) => r.push({ t: e.company + " · " + e.role, s: "Experience", go: () => openApp("finder", "experience") }));
    return r;
  }
  let spotSel = 0, spotList = [];
  function openSpot() { hideMenu(); const s = $("#spot"); s.hidden = false; const i = $("#spot-in"); i.value = ""; drawSpot(""); setTimeout(() => i.focus(), 20); }
  function closeSpot() { $("#spot").hidden = true; }
  function drawSpot(q) {
    q = q.toLowerCase().trim();
    spotList = searchIndex().filter((x) => !q || (x.t + " " + (x.body || "")).toLowerCase().includes(q)).slice(0, 9);
    spotSel = 0;
    $("#spot-res").innerHTML = spotList.map((x, i) => `<button class="${i ? "" : "sel"}" data-i="${i}"><b>${esc(x.t)}</b><span>${esc(x.s)}</span></button>`).join("") || `<div class="muted spot-none">No results</div>`;
  }
  $("#spot-in").oninput = (e) => drawSpot(e.target.value);
  $("#spot-in").onkeydown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); spotSel = clamp(spotSel + (e.key === "ArrowDown" ? 1 : -1), 0, spotList.length - 1); $$("#spot-res button").forEach((b, i) => b.classList.toggle("sel", i === spotSel)); }
    if (e.key === "Enter" && spotList[spotSel]) { closeSpot(); spotList[spotSel].go(); }
    if (e.key === "Escape") closeSpot();
  };
  $("#spot-res").onclick = (e) => { const b = e.target.closest("[data-i]"); if (b) { closeSpot(); spotList[+b.dataset.i].go(); } };
  $("#spot").onclick = (e) => { if (e.target.id === "spot") closeSpot(); };
  $("#mb-search").onclick = openSpot;

  const SHORTCUTS = [["N", "Notes", "notes"], ["P", "Photos (projects)", "photos"], ["M", "Messages", "messages"], ["E", "Mail", "mail"], ["F", "Finder", "finder"], ["R", "Quick view", "hire"], ["L", "Launchpad", "launchpad"], ["T", "Terminal", "terminal"], ["S", "Settings", "settings"], ["W", "Close the front window"], ["← →", "Previous / next project"], ["/ or ⌘K", "Search everything"], ["?", "This list"], ["Esc", "Close menus"]];
  function showShortcuts() {
    if ($("#kb")) return $("#kb").remove();
    const o = el(`<div id="kb" class="kb-over"><div class="kb-card"><h2>Keyboard shortcuts</h2>${SHORTCUTS.map(([k, l]) => `<div><kbd>${k}</kbd><span>${l}</span></div>`).join("")}</div></div>`);
    o.onclick = () => o.remove(); document.body.append(o);
  }
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSpot(); return; }
    if (e.key === "Escape") { hideMenu(); closeSpot(); closeLaunchpad(); $("#kb")?.remove(); $(".lb")?.remove(); return; }
    if (e.target.closest("input, textarea") || e.metaKey || e.ctrlKey || e.altKey || !$("#lock").hidden || $(".lb")) return;
    const t = topWin(), tb = t && $(".win-body", t);
    if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && tb && tb._projectKeys && $(".pj", t)) return tb._projectKeys(e.key === "ArrowLeft" ? -1 : 1);
    if (e.key === "?") return showShortcuts();
    if (e.key === "/") { e.preventDefault(); return openSpot(); }
    if (e.key.toLowerCase() === "w") return t && closeWin(t);
    const s = SHORTCUTS.find((x) => x[0] === e.key.toUpperCase() && x[2]); if (s) openApp(s[2]);
  });

  /* =====================================================================
     CLOCK, LOCK SCREEN, RESTART
     ===================================================================== */
  function tick() {
    const d = new Date();
    const hm = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    $("#clock").textContent = d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) + "  " + hm;
    $("#sb-time").textContent = hm.replace(/\s?[AP]M/, "");
    $("#lock-time").textContent = hm.replace(/\s?[AP]M/, "");
    $("#lock-date").textContent = d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  }
  function lock() { $("#lock").hidden = false; }
  function unlock() {
    $("#lock").classList.add("leaving");
    setTimeout(() => { $("#lock").hidden = true; $("#lock").classList.remove("leaving"); }, 450);
    try { sessionStorage.setItem("shanto-unlocked", "1"); } catch {}
  }
  function restart() {
    Object.values(openWins).forEach(closeWin);
    const b = $("#boot"); b.hidden = false;
    setTimeout(() => { b.hidden = true; lock(); }, 2200);
  }
  $("#lock-btn").onclick = unlock;
  let ly = null;
  $("#lock").addEventListener("touchstart", (e) => { ly = e.touches[0].clientY; }, { passive: true });
  $("#lock").addEventListener("touchend", (e) => { if (ly !== null && ly - e.changedTouches[0].clientY > 40) unlock(); ly = null; });

  /* =====================================================================
     START
     ===================================================================== */
  document.body.insertAdjacentHTML("afterbegin", `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <radialGradient id="hl" cx=".3" cy=".08" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".5" stop-color="#fff" stop-opacity=".15"/><stop offset="1" stop-color="#fff" stop-opacity=".35"/></linearGradient>
    <filter id="gs" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="1.6" stdDeviation="1.6" flood-color="#000" flood-opacity=".22"/></filter>
    <linearGradient id="fold-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4aa8ff"/><stop offset="1" stop-color="#1468e0"/></linearGradient>
    <linearGradient id="fold-f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd0ff"/><stop offset="1" stop-color="#3a95f5"/></linearGradient>
    <linearGradient id="note-y" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe066"/><stop offset="1" stop-color="#ffc823"/></linearGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8e8ec"/><stop offset=".5" stop-color="#a7a7ae"/><stop offset="1" stop-color="#d7d7dc"/></linearGradient>
    <linearGradient id="gloss" x1="0" y1="0" x2=".55" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".42"/><stop offset=".42" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".08"/></linearGradient>
    <linearGradient id="dark-ic" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a3e"/><stop offset="1" stop-color="#151517"/></linearGradient>
    <linearGradient id="ph-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ac8fa"/><stop offset="1" stop-color="#b7e6ff"/></linearGradient>
    ${[...GRADS].map((k) => `<linearGradient id="${gid(k.slice(0, 7), k.slice(7))}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${k.slice(0, 7)}"/><stop offset="1" stop-color="${k.slice(7)}"/></linearGradient>`).join("")}</defs></svg>`);
  $("#lock-avatar").outerHTML = avatar("big");
  $("#lock-name").textContent = SITE.name;
  applyLook(); tick(); setInterval(tick, 15000);
  buildDock(); buildDesk(); buildWidgets(); buildHome();
  const guide = el(`<button id="guide" class="guide">? Guide</button>`); document.body.append(guide);
  guide.onclick = () => {
    if ($("#guide-pop")) return $("#guide-pop").remove();
    const g = el(`<div id="guide-pop" class="guide-pop"><b>Welcome 👋</b><p>This is a tiny Mac. Try these:</p><button data-open="photos" data-arg="projects">📸 See my projects & videos</button><button data-open="hire">💼 Recruiter quick view</button><button data-open="messages">💬 Ask me anything</button><button data-open="preview">📄 Read my CV</button><p class="muted">Press <kbd>?</kbd> for keyboard shortcuts.</p></div>`);
    g.onclick = () => g.remove(); document.body.append(g);
  };
  try { if (sessionStorage.getItem("shanto-unlocked")) $("#lock").hidden = true; } catch {}
  let wasMobile = isMobile();
  addEventListener("resize", () => { if (isMobile() !== wasMobile) { wasMobile = isMobile(); Object.values(openWins).forEach((w) => w.remove()); Object.keys(openWins).forEach((k) => delete openWins[k]); buildDock(); buildWidgets(); buildHome(); } });
  // gentle parallax on the wallpaper
  addEventListener("pointermove", (e) => { if (isMobile()) return; const x = (e.clientX / innerWidth - .5) * -14, y = (e.clientY / innerHeight - .5) * -10; $("#wallpaper").style.transform = `scale(1.04) translate(${x}px, ${y}px)`; });
  // right-click on the desktop
  document.addEventListener("contextmenu", (e) => {
    if (isMobile() || e.target.closest(".window, .dock, input, textarea, a")) return;
    e.preventDefault(); hideMenu();
    const m = $("#menu"), items = [["Open Projects", () => openApp("photos", "projects")], ["Open Photos Library", () => openApp("photos", "library")], ["For Recruiters", () => openApp("hire")], "-", ["Change Wallpaper…", () => openApp("settings")], ["Next Wallpaper", () => { const k = Object.keys(WALLS); prefs.wall = k[(k.indexOf(prefs.wall) + 1) % k.length]; savePrefs(); applyLook(); }], ["Reset Widget Positions", () => { store.set("widget-pos", {}); buildWidgets(); }], "-", ["Show Keyboard Shortcuts", showShortcuts]];
    const real = items.filter((i) => i !== "-");
    m.innerHTML = items.map((i) => i === "-" ? "<hr>" : `<button>${esc(i[0])}</button>`).join("");
    $$("button", m).forEach((b, i) => b.onclick = () => { hideMenu(); real[i][1](); });
    m.style.left = Math.min(e.clientX, innerWidth - 240) + "px"; m.style.top = Math.min(e.clientY, innerHeight - 300) + "px"; m.dataset.for = "ctx"; m.hidden = false;
  });
  const h = location.hash.slice(1);
  if (h) { $("#lock").hidden = true; ["library", "favorites", "projects"].includes(h) ? openApp("photos", h) : APPS[h] && openApp(h); }
})();

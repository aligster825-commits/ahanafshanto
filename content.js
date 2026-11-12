/* =====================================================================
   CONTENT FILE ✏️  (ei ekta file edit korlei site-er shob lekha bodlabe)
   ---------------------------------------------------------------------
   - "quote" ba `backtick` er bhitorer lekha bodlao, quote muchho na.
   - Protita line-er sheshe comma (,) rakho.
   - `backtick` lekhar bhitore simple HTML chole: <p> <b> <ul><li>
   - Kono jinish khali ("") rakhle site sheta lukiye rakhbe.
   ===================================================================== */

const BE = "https://mir-s3-cdn-cf.behance.net/";   // Behance image server (shortcut)

const SITE = {
  name: "Ahanaf Shanto",
  short: "Shanto",
  title: "Videographer | Films | Video Editor | AI Visualizer",
  location: "Dhaka, Bangladesh",
  status: "Available full-time · Dhaka",
  email: "ahanafshanto143@gmail.com",
  workEmail: "ashraf.shanto@musemind.agency",
  phone: "+880 1619 800523",
  linkedin: "https://www.linkedin.com/in/abdul-monem-asraf-shanto-8b089228a/",
  instagram: "https://www.instagram.com/ahanaf_shanto11/",
  facebook: "https://www.facebook.com/iam.ahanafshanto",
  behance: "https://www.behance.net/ahanafshanto1",
  resume: "Ahanaf-Shanto-CV.pdf",
  resumePages: ["images/cv/page-1.jpg"],   // CV-er chobi (phone-e PDF na khulle egulo dekhabe)
  photo: "images/avatar.jpg",
  portrait: "images/gallery/bw-portrait.jpg",
  timezone: "Asia/Dhaka",
  weather: { show: true, city: "Dhaka", lat: 23.8103, lon: 90.4125 },

  // "hashtag" = reference-er moto rong + #hashtag tile; "cover" = project-er asol chobi tile-e
  tileStyle: "hashtag",

  /* ---------------- NOTES ---------------- */
  notes: [
    {
      title: "👋 Hi, I'm Shanto", date: "Pinned",
      html: `
        <h1>Hi, I'm Shanto 👋</h1>
        <p>I'm a <b>Graphic Designer, Video Editor, AI Visual Creator and Videographer</b> with <b>5+ years</b> of experience. Art and films are my thing. Welcome to my cinema 🎥</p>
        <p>Right now I'm a <b>Video Editor & Videographer at Musemind</b>, a global UX design agency, based in <b>Dhaka</b>. In 2025 Musemind gave me the <b>Rising Star Award</b> ⭐</p>
        <h2>Explore this computer</h2>
        <ul>
          <li><a data-open="photos">Photos</a>: my projects, posters and work videos</li>
          <li><a data-open="finder" data-arg="experience">Finder</a>: my experience, role by role</li>
          <li><a data-open="messages">Messages</a>: ask me anything</li>
          <li><a data-open="preview">Preview</a>: read or download my CV</li>
          <li class="desk-only"><a data-open="terminal">Terminal</a>: for the curious (type <code>help</code>)</li>
        </ul>`,
    },
    {
      title: "🧰 Skills", date: "Pinned",
      html: `
        <h1>Skills 🧰</h1>
        <h2>What I make</h2>
        <ul>
          <li>Video editing, motion graphics and cinematic content</li>
          <li>Videography</li>
          <li>AI visuals</li>
          <li>Graphic design: logos, banners, movie posters, YouTube thumbnails, social media design</li>
          <li>Photoshop editing</li>
        </ul>
        <h2>Tools</h2>
        <ul><li>Photoshop, After Effects, Premiere Pro, Illustrator, Figma</li></ul>
        <h2>Also</h2>
        <ul><li>Market research & analysis, so my content looks strong and works strategically</li></ul>`,
    },
    {
      title: "💼 Where I've worked", date: "2020 – now",
      html: `
        <h1>Where I've worked 💼</h1>
        <h2>Musemind · May 2024 – Present</h2><p>Video Editor & Videographer (full-time)</p>
        <h2>BikeBD · 2022 – 2024</h2><p>Graphic Designer, Video Editor & Cinematographer (full-time)</p>
        <h2>Driven TV · 2020 – 2022</h2><p>Graphic Designer & Video Editor (full-time)</p>
        <h2>Prottoy Heron</h2><p>Publicity Designer</p>
        <h2>Go Entertainment</h2><p>Graphic Designer</p>`,
    },
    {
      title: "🎬 Highlights", date: "Selected work",
      html: `
        <h1>Highlights 🎬</h1>
        <ul>
          <li>⭐ <b>Rising Star Award 2025</b> at Musemind, as Video Editor & Videographer</li>
          <li>Poster countdown for <b>Bodmaish Polapain Season 4</b></li>
          <li>Web-series and natok posters: <b>Mission Cashout</b>, <b>Betman</b>, <b>Marryan</b>, <b>Aroma</b></li>
          <li><b>Rocking Polapain</b> poster for Club11 (2022)</li>
          <li>Social content for <b>Jeep Bangladesh</b></li>
          <li>YouTube thumbnail design, my most appreciated Behance project</li>
          <li>AI product reel for a <b>Tissot</b> watch</li>
        </ul>
        <p><a data-open="photos">See everything in Photos →</a></p>`,
    },
    {
      title: "🎓 Education", date: "Background",
      html: `
        <h1>Education 🎓</h1>
        <h2>Stanford University</h2><p>Bachelor's and Master's degree · 2022 – 2026</p>
        <h2>Bir Sreshtha Abdur Rouf College</h2><p>Higher Secondary Certificate (H.S.C.) · 2020 – 2021</p>`,
    },
    {
      title: "📞 Contact", date: "Say hi",
      html: `
        <h1>Contact 📞</h1>
        <ul>
          <li>Phone / WhatsApp: <a href="tel:+8801619800523">+880 1619 800523</a></li>
          <li>Email: <a href="mailto:ahanafshanto143@gmail.com">ahanafshanto143@gmail.com</a></li>
          <li>Work: <a href="mailto:ashraf.shanto@musemind.agency">ashraf.shanto@musemind.agency</a></li>
          <li>Behance: <a href="https://www.behance.net/ahanafshanto1" target="_blank" rel="noopener">behance.net/ahanafshanto1</a></li>
          <li>Instagram: <a href="https://www.instagram.com/ahanaf_shanto11/" target="_blank" rel="noopener">@ahanaf_shanto11</a></li>
          <li>Facebook: <a href="https://www.facebook.com/iam.ahanafshanto" target="_blank" rel="noopener">iam.ahanafshanto</a></li>
        </ul>`,
    },
    { title: "🧭 Principles I live by", date: "Always", html: `<h1>Principles I live by 🧭</h1><ul><li><!-- ✏️ --></li></ul>` },
    {
      title: "💻 About this website", date: "Colophon",
      html: `
        <h1>About this website</h1>
        <p>This site is a tiny pretend computer that runs in your browser. Drag windows by their top bar, resize them from the bottom-right corner, and use the coloured buttons to close, minimise or maximise.</p>
        <p>Built with plain HTML, CSS and JavaScript. No frameworks, no database.</p>
        <p>Try the menu in the top-left corner, open Launchpad, change the wallpaper in Settings, or open Terminal and type <code>sudo hire-shanto</code>.</p>
        <h2>Disclaimer</h2>
        <p>Not affiliated with Apple Inc. The look is a creative tribute to macOS and iOS; the apps and icons are simple look-alikes made for this portfolio.</p>`,
    },
  ],

  /* ---------------- EXPERIENCE (Finder + Work widget) ---------------- */
  experience: [
    { role: "Video Editor & Videographer", company: "Musemind", dates: "May 2024 – Present", type: "Full-time",
      logo: "https://cdn.prod.website-files.com/6adcbfca4bed994eeae3d780/6adcbfcb4bed994eeae3e160_musemind-favicon.png",
      color: "#111111", link: "https://musemind.agency", about: "Global UX design agency.", points: ["Won the Rising Star Award 2025 for my work as Video Editor & Videographer."] },
    { role: "Graphic Designer, Video Editor & Cinematographer", company: "BikeBD", dates: "2022 – 2024", type: "Full-time",
      logo: "https://www.google.com/s2/favicons?domain=bikebd.com&sz=128",
      color: "#e4002b", link: "", about: "", points: [] },
    { role: "Graphic Designer & Video Editor", company: "Driven TV", dates: "2020 – 2022", type: "Full-time",
      color: "#1f6feb", link: "", about: "", points: [] },
    { role: "Publicity Designer", company: "Prottoy Heron", dates: "", color: "#8e44ad", link: "", about: "", points: [] },
    { role: "Graphic Designer", company: "Go Entertainment", dates: "", color: "#f39c12", link: "", about: "", points: [] },
  ],

  education: [
    { school: "Stanford University", degree: "Bachelor's and Master's degree", dates: "2022 – 2026" },
    { school: "Bir Sreshtha Abdur Rouf College", degree: "Higher Secondary Certificate (H.S.C.)", dates: "2020 – 2021" },
  ],

  skills: {
    "Video": ["Video Editing", "Videography", "Motion Graphics", "Cinematic Content"],
    "Design": ["Graphic Design", "Photoshop Editing", "Logo & Banner Design", "Movie Posters", "YouTube Thumbnails", "Social Media Design"],
    "AI & more": ["AI Visuals", "Market Research & Analysis"],
    "Tools": ["Photoshop", "After Effects", "Premiere Pro", "Illustrator", "Figma"],
  },

  /* ---------------- PROJECTS (Photos → Projects) ----------------
     title, tag (#hashtag), kind ("Project"/"Campaign"), featured (★), type (filter),
     year, client, role, colors (tile), image (cover), gallery (chobi), video (mp4),
     videos (YouTube/Vimeo links), desc, link (Behance) */
  campaigns: [
    {
      title: "Rising Star Award 2025", date: "2025-12-01", tag: "#RisingStar", kind: "Award", featured: true,
      type: "Awards", year: "2025", client: "Musemind", role: "Video Editor & Videographer",
      colors: ["#ff6a1a", "#3a1200"], image: "images/gallery/rising-star-musemind.jpg",
      desc: "Musemind honoured me with the Rising Star Award 2025 for my work as Video Editor & Videographer.",
      gallery: ["images/gallery/rising-star-musemind.jpg", "images/gallery/rising-star-award.jpg"], link: "", stats: [["2025", "Rising Star"], ["Musemind", "awarded by"]],
    },
    {
      title: "Video Editing Portfolio", date: "2024-02-20", tag: "#VideoEditing", kind: "Project", featured: true,
      type: "Video", year: "2024", client: "Various clients", role: "Video Editor & Motion",
      colors: ["#ff2d55", "#3a0b2e"], image: BE + "projects/max_808_webp/3a5446191953095.Y3JvcCwxMTkyLDkzMywxMDMsMA.jpg",
      desc: "A collection of my edits: commercials, social reels, product films and motion pieces.",
      videos: [
        "https://www.youtube.com/watch?v=bc0E2Bv7CQU", "https://www.youtube.com/watch?v=0zhS6TLumsM", "https://www.youtube.com/watch?v=9v8lloDZGDs",
        "https://www.youtube.com/watch?v=1a6kqwSvMrA", "https://www.youtube.com/watch?v=IO0-c2E5VeM", "https://www.youtube.com/watch?v=RcOatPMLcgw",
        "https://www.youtube.com/watch?v=rA6f_bUBTcg", "https://www.youtube.com/watch?v=k4Xv9KomHC8", "https://www.youtube.com/watch?v=tDaRtNdj2_c",
        "https://vimeo.com/1079656516", "https://vimeo.com/1079656551", "https://vimeo.com/1079656505",
      ],
      gallery: [BE + "project_modules/1400_webp/252e2f191953095.65d458970c44e.jpg", BE + "project_modules/1400_webp/3032d4191953095.65d45897075ff.jpg", BE + "project_modules/1400_webp/8eba3e191953095.65d45897008ed.jpg", BE + "project_modules/1400_webp/159956191953095.65d458970d6a6.jpg"],
      link: "https://www.behance.net/gallery/191953095/Video-Editing-Portfolio", stats: [["12", "videos"], ["96", "Behance views"]],
    },
    {
      title: "Portfolio Reel 2026", date: "2026-11-10", tag: "#Portfolio2026", kind: "Project", featured: true,
      type: "Video", year: "2026", client: "Personal", role: "Concept, design, motion & edit",
      colors: ["#a3e635", "#1a2e05"], image: "images/gallery/portfolio-reel.jpg", video: "images/gallery/portfolio-reel.mp4",
      desc: "My 2026 portfolio reel: graphic, video and AI work in one short piece.", link: "", stats: [],
    },
    {
      title: "Tissot · AI Reels", date: "2026-11-05", tag: "#TissotAI", kind: "Campaign", featured: true,
      type: "AI Visuals", year: "2026", client: "Tissot (concept)", role: "AI visuals & edit",
      colors: ["#5b8def", "#0b1f4d"], image: "images/gallery/tissot-ai-reel.jpg", video: "images/gallery/tissot-ai-reel.mp4",
      desc: "AI-generated product reel for a Tissot watch: macro, cinematic shots built with AI tools.", link: "", stats: [],
    },
    {
      title: "Bodmaish Polapain S4", date: "2023-01-30", tag: "#BodmaishPolapain", kind: "Campaign", featured: true,
      type: "Movie Posters", year: "2023", client: "Bodmaish Polapain", role: "Poster countdown design",
      colors: ["#ff9f0a", "#4a1a00"], image: BE + "projects/max_808_webp/96c5cf162482731.Y3JvcCw4MDgsNjMyLDAsMA.jpg",
      desc: "A day-by-day poster countdown for the Season 4 launch.",
      gallery: [BE + "project_modules/1400_webp/bb7f73162482731.63d6bab98c04e.jpg", BE + "project_modules/1400_webp/802de8162482731.63d6bab98cf76.jpg", BE + "project_modules/1400_webp/62a9ed162482731.63d6bab98deb5.jpg", BE + "project_modules/1400_webp/15ddee162482731.63d6bab98a23c.jpg", BE + "project_modules/1400_webp/a61694162482731.63d6bab988441.jpg", BE + "project_modules/1400_webp/aec949162482731.63d6bab98939a.jpg", BE + "project_modules/1400_webp/5f4f55162482731.63d6bab98b0cd.jpg"],
      link: "https://www.behance.net/gallery/162482731/Bodmaish-Polapain-S4-Poster-Countdown-Poster-Design", stats: [["7", "posters"]],
    },
    {
      title: "YouTube Thumbnails", date: "2022-04-17", tag: "#Thumbnails", kind: "Project", featured: true,
      type: "Thumbnails", year: "2022", client: "YouTube creators", role: "Thumbnail design",
      colors: ["#ff3b30", "#2a0606"], image: BE + "projects/max_808_webp/4467f5141850959.Y3JvcCwxNTUwLDEyMTMsMzAzLDA.jpg",
      desc: "Click-worthy YouTube thumbnails. My most appreciated project on Behance.",
      gallery: [BE + "project_modules/1400_webp/fae3a7141850959.625c38c7213d0.jpg", BE + "project_modules/1400_webp/722a6e141850959.625c38c7220f3.jpg", BE + "project_modules/1400_webp/2068d4141850959.625c38c721a14.jpg", BE + "project_modules/1400_webp/2ff5d8141850959.625c38c723214.jpg", BE + "project_modules/1400_webp/bc0783141850959.625c38c722cc7.jpg", BE + "project_modules/1400_webp/25df05141850959.625c38c72374d.jpg", BE + "project_modules/1400_webp/830515141850959.625c38c72274a.jpg"],
      link: "https://www.behance.net/gallery/141850959/Youtube-Thumbnails-Design-Thumbnail-design", stats: [["20", "appreciations"], ["284", "views"]],
    },
    {
      title: "Jeep Bangladesh", date: "2022-07-05", tag: "#JeepBangladesh", kind: "Campaign", featured: true,
      type: "Brand & Social", year: "2022", client: "Jeep Bangladesh", role: "Social media design",
      colors: ["#30d158", "#06240f"], image: BE + "projects/max_808_webp/898670146166607.Y3JvcCwxMDU0LDgyNCw3MywyNTA.png",
      desc: "Social media creatives for Jeep Bangladesh.",
      gallery: [BE + "project_modules/hd_webp/6034f5146166607.62ab3f8a4f212.png", BE + "project_modules/1400/1e8546146166607.62ab3f86c3f16.png", BE + "project_modules/1400/6aa670146166607.62ab3f874b826.png", BE + "project_modules/1400/5c4d43146166607.62ab3f87d59c8.png", BE + "project_modules/1400/a3ddc3146166607.62ab3f8859636.png", BE + "project_modules/1400/18ca08146166607.62ab3f88c4cb4.png"],
      link: "https://www.behance.net/gallery/146166607/Jeep-Bangladesh", stats: [],
    },
    {
      title: "Movie Poster Collection", date: "2023-01-29", tag: "#MoviePosters", kind: "Project",
      type: "Movie Posters", year: "2023", client: "Films & natok", role: "Poster design",
      colors: ["#bf5af2", "#240a3d"], image: BE + "projects/max_808_webp/dd987b162480559.Y3JvcCwyNDI0LDE4OTYsMCww.jpg",
      desc: "A collection of film and natok posters.",
      gallery: [BE + "project_modules/1400_webp/cb04e3162480559.63d6b2c98865a.jpg", BE + "project_modules/1400_webp/05d11d162480559.63d6b2c989df6.jpg", BE + "project_modules/1400_webp/058bf0162480559.63d6b2c986eb0.jpg", BE + "project_modules/1400_webp/d17048162480559.63d6b2c98b1b0.jpg", BE + "project_modules/1400_webp/eddaa5162480559.63d6b2c98c4c5.jpg"],
      link: "https://www.behance.net/gallery/162480559/Move-Poster-Design-Collection", stats: [],
    },
    {
      title: "Movie Poster Collection V2", date: "2023-01-30", tag: "#FilmPosters", kind: "Project",
      type: "Movie Posters", year: "2023", client: "Films & natok", role: "Poster design",
      colors: ["#ff375f", "#3d0a1a"], image: BE + "projects/max_808_webp/925801162481743.Y3JvcCw4MDgsNjMyLDAsMA.jpg",
      desc: "The second volume of my film poster collection.",
      gallery: [BE + "project_modules/1400_webp/af147f162481743.63d6b6f80bf10.jpg", BE + "project_modules/1400_webp/2338ec162481743.63d6b6f810770.jpg", BE + "project_modules/1400_webp/c0edee162481743.63d6b6f8132dc.jpg", BE + "project_modules/1400_webp/4f1ef9162481743.63d6b6f8124c3.jpg", BE + "project_modules/1400_webp/57663e162481743.63d6b6f80f983.jpg", BE + "project_modules/1400_webp/4f7e4d162481743.63d6b6f8115cc.jpg", BE + "project_modules/1400_webp/7f238c162481743.63d6b6f80b164.jpg", BE + "project_modules/1400_webp/e39921162481743.63d6b6f80cce5.jpg"],
      link: "https://www.behance.net/gallery/162481743/Movie-Poster-Design-Collection-V2-Film-Poster-Design", stats: [],
    },
    {
      title: "Mission Cashout", date: "2022-03-31", tag: "#MissionCashout", kind: "Campaign",
      type: "Movie Posters", year: "2022", client: "Web series", role: "Poster design",
      colors: ["#ffd60a", "#3a2f00"], image: BE + "projects/max_808_webp/feb6d6140692459.Y3JvcCw5OTksNzgyLDAsOTQ.jpg",
      desc: "Key art and posters for the web series Mission Cashout.",
      gallery: [BE + "project_modules/hd_webp/d0fe79140692459.6245e3cf9fb0d.jpg", BE + "project_modules/1400_webp/5bc91a140692459.6245e3cfa4102.jpg", BE + "project_modules/1400_webp/17796e140692459.6245e3cfa68a1.jpg", BE + "project_modules/1400_webp/52457c140692459.6245e3cfa1e24.jpg", BE + "project_modules/1400_webp/0ec2c2140692459.6245e3cfa6fbb.jpg", BE + "project_modules/1400_webp/5b16fd140692459.6245e3cfa1627.jpg"],
      link: "https://www.behance.net/gallery/140692459/Movie-Poster-Mission-Cashout-web-series-Poster", stats: [],
    },
    {
      title: "Rocking Polapain · Club11", date: "2022-03-28", tag: "#RockingPolapain", kind: "Campaign",
      type: "Movie Posters", year: "2022", client: "Club11", role: "Poster design",
      colors: ["#0a84ff", "#061a3d"], image: BE + "projects/max_808_webp/c8aa67140414609.Y3JvcCwxOTk5LDE1NjQsMCwxMDQ0.jpg",
      desc: "Poster design for Rocking Polapain by Club11.",
      gallery: [BE + "project_modules/1400_webp/da184b140414609.62419a2c1df38.jpg", BE + "project_modules/1400_webp/971931140414609.62419a2c1d057.jpg", BE + "project_modules/1400_webp/32925b140414609.62419a2c1d71d.jpg"],
      link: "https://www.behance.net/gallery/140414609/Poster-DesignRocking-Polapain-Club11-2022", stats: [],
    },
    {
      title: "Betman Natok", date: "2022-03-29", tag: "#Betman", kind: "Campaign",
      type: "Movie Posters", year: "2022", client: "Natok", role: "Poster design",
      colors: ["#64d2ff", "#06283d"], image: BE + "projects/max_808_webp/4289c4140515569.Y3JvcCwxOTk5LDE1NjQsMCwyNjI.jpg",
      desc: "Poster design for the natok Betman.",
      gallery: [BE + "project_modules/1400_webp/7b5fc4140515569.62431de3a2d1f.jpg", BE + "project_modules/1400_webp/76733f140515569.62431de3a4abf.jpg", BE + "project_modules/1400_webp/3c1af3140515569.62431de3a538a.jpg", BE + "project_modules/1400_webp/e5bf3f140515569.62431de3a3c84.jpg", BE + "project_modules/1400_webp/e811af140515569.62431de3a346a.jpg", BE + "project_modules/1400_webp/657387140515569.62431de3a447a.jpg"],
      link: "https://www.behance.net/gallery/140515569/Betman-Natok-Poster-Design-(-2022-)", stats: [],
    },
    {
      title: "Aroma", date: "2022-02-23", tag: "#Aroma", kind: "Campaign",
      type: "Movie Posters", year: "2022", client: "Film", role: "Poster design",
      colors: ["#ff6b35", "#3a1200"], image: BE + "projects/max_808_webp/947a59138049181.Y3JvcCw5NjAsNzUwLDAsMjIw.jpg",
      desc: "Movie poster design for Aroma.",
      gallery: [BE + "project_modules/hd_webp/935e64138049181.6216059295a15.jpg", BE + "project_modules/1400_webp/265fd8138049181.6243218131842.jpg", BE + "project_modules/1400_webp/f48615138049181.624321813279b.jpg", BE + "project_modules/1400_webp/7b713a138049181.6243218131fcc.jpg"],
      link: "https://www.behance.net/gallery/138049181/Movie-Poster-Design-Aroma", stats: [],
    },
    {
      title: "Marryan Natok", date: "2021-10-18", tag: "#Marryan", kind: "Campaign",
      type: "Movie Posters", year: "2021", client: "Natok", role: "Poster design",
      colors: ["#ff2d78", "#3a0820"], image: BE + "projects/max_808_webp/c67939129551181.Y3JvcCwyNTAwLDE5NTUsMCw4MjM.jpg",
      desc: "Poster design for the natok Marryan.",
      gallery: [BE + "project_modules/1400_webp/5ef3dd129551181.616dae4fbdf59.jpg"],
      link: "https://www.behance.net/gallery/129551181/Marryan-Natok-Poster", stats: [],
    },
    // ✏️ notun project: upore ekta { ... }, block copy kore niche paste koro
  ],

  /* ---------------- LIBRARY (Photos → Library + Collections) ----------------
     { src, date: "YYYY-MM-DD", album: "Collection name", caption }
     video: type:"video" + poster   ·   YouTube/Vimeo/Instagram link: type:"embed"  */
  gallery: [
    { src: "images/gallery/portfolio-reel.mp4", fav: true, poster: "images/gallery/portfolio-reel.jpg", type: "video", date: "2026-11-10", album: "Work Videos", caption: "Portfolio Reel 2026" },
    { src: "images/gallery/tissot-ai-reel.mp4", poster: "images/gallery/tissot-ai-reel.jpg", type: "video", date: "2026-11-05", album: "Work Videos", caption: "Tissot · AI Reels" },
    { src: "images/gallery/rising-star-musemind.jpg", fav: true, date: "2025-12-01", album: "Rising Star Award", caption: "Rising Star Award · Musemind" },
    { src: "images/gallery/rising-star-award.jpg", date: "2025-12-01", album: "Rising Star Award", caption: "Rising Star Award 2025" },
    { src: "images/gallery/rec-studio.jpg", fav: true, date: "2026-10-20", album: "Portraits", caption: "REC. On set" },
    { src: "images/gallery/bw-portrait.jpg", fav: true, date: "2026-10-20", album: "Portraits", caption: "ahanaf shanto" },
    { src: "images/gallery/sweater-portrait.jpg", date: "2026-09-14", album: "Portraits", caption: "Portrait" },
    { src: "images/gallery/beach-cat.jpg", date: "2026-02-08", album: "Travel", caption: "Beach day" },
    { src: "https://www.instagram.com/reel/DUP-2jgjKoK/", type: "embed", date: "2026-02-01", album: "Work Videos", caption: "Instagram reel" },
    ...["bc0E2Bv7CQU", "0zhS6TLumsM", "9v8lloDZGDs", "1a6kqwSvMrA", "IO0-c2E5VeM", "RcOatPMLcgw", "rA6f_bUBTcg", "k4Xv9KomHC8", "tDaRtNdj2_c"]
      .map((id, i) => ({ src: "https://www.youtube.com/watch?v=" + id, type: "embed", date: "2024-02-20", album: "Work Videos", caption: "Edit #" + (i + 1) })),
    ...["1079656516", "1079656551", "1079656505"].map((id, i) => ({ src: "https://vimeo.com/" + id, type: "embed", date: "2024-02-20", album: "Work Videos", caption: "Vimeo edit #" + (i + 1) })),
    // ✏️ beraite jawar chobi: images/gallery folder-e rekhe { src, date, album: "Travel" } jog koro
  ],
  // Collections-e kon album gulo dekhabe (khali rakhle shob album)
  collections: ["Rising Star Award", "Work Videos", "Movie Posters", "Thumbnails", "Brand & Social", "Video", "Portraits", "Travel"],

  /* ---------------- MESSAGES ---------------- */
  chatGreeting: ["Hey 👋 I'm Shanto.", "Tap a question below or type your own."],
  chat: [
    { q: "What do you do?", words: ["what do you do", "job", "role", "who are you", "yourself"], a: "I'm a Graphic Designer, Video Editor, AI Visual Creator and Videographer with 5+ years of experience. Right now I'm a Video Editor & Videographer at Musemind 🎥" },
    { q: "Show me your best work", words: ["best", "work", "project", "portfolio", "show me"], a: "Open Photos → Projects → ★ Flagship: my video editing portfolio, Portfolio Reel 2026, Tissot AI reels, Bodmaish Polapain S4 posters, YouTube thumbnails and Jeep Bangladesh." },
    { q: "Where have you worked?", words: ["worked", "experience", "company", "companies", "career"], a: "Musemind (2024 – now), BikeBD (2022 – 2024), Driven TV (2020 – 2022), plus Prottoy Heron and Go Entertainment. Open Finder to see each role." },
    { q: "What tools do you use?", words: ["tool", "software", "photoshop", "premiere", "after effects", "skill"], a: "Photoshop, After Effects, Premiere Pro, Illustrator and Figma, plus AI tools for visuals." },
    { q: "Any awards?", words: ["award", "rising star", "achievement", "proud", "recognition"], a: "Yes! Musemind gave me the Rising Star Award 2025 for my work as Video Editor & Videographer ⭐" },
    { q: "Do you design posters?", words: ["poster", "thumbnail", "graphic", "design"], a: "Yes! Movie and natok posters (Bodmaish Polapain S4, Mission Cashout, Betman, Aroma, Marryan) and YouTube thumbnails. They're all in Photos." },
    { q: "Are you available?", words: ["available", "hire", "freelance", "full time", "full-time"], a: "I'm open to full-time roles and interesting projects. Call or WhatsApp +880 1619 800523 🙂" },
    { q: "Where are you based?", words: ["where", "based", "location", "live"], a: "I'm based in Dhaka, Bangladesh 🇧🇩" },
    { q: "How can I contact you?", words: ["contact", "email", "reach", "phone", "number", "whatsapp"], a: "Call or WhatsApp +880 1619 800523, email ahanafshanto143@gmail.com, or use the Mail app here 🙂" },
  ],
  chatExtra: [
    { words: ["hi", "hello", "hey", "salam", "assalam"], a: "Hey 👋 Thanks for stopping by! Ask me anything about my work." },
    { words: ["thank", "thanks"], a: "You're welcome! 🙂" },
    { words: ["are you a bot", "is this ai", "real person"], a: "These replies are written by me in advance. For anything else, send me a message through Mail 🙂" },
  ],
  chatFallback: "Good question! I don't have a ready answer here. Send it through the Mail app or WhatsApp +880 1619 800523 and I'll reply personally 🙂",

  /* ---------------- MUSIC ---------------- */
  // Spotify / Apple Music / YouTube link boshao; url khali thakle card "coming soon" dekhabe
  playlists: [
    { name: "Cigarettes After Sex", url: "https://open.spotify.com/artist/1QAJqy2dA3ihHBFIHRphZj" },
    { name: "BRAZILIAN PHONK 🇧🇷 2026 🔥", url: "https://open.spotify.com/playlist/2oDkia6b2EOrcoIRNkD4CG" },
  ],

  /* ---------------- MESSAGES conversations (phone + Mac) ---------------- */
  conversations: [
    { name: "Recruiters & Hiring", short: "RH", color: "linear-gradient(135deg,#0a84ff,#0040a8)", pinned: true, preview: "Quick answers for recruiters",
      chat: [
        { q: "Quick summary?", a: "5+ years as a video editor, videographer and designer. Now at Musemind, Rising Star Award 2025, 13 projects and 15+ work videos here." },
        { q: "Are you available?", a: "Open to full-time roles and interesting projects. Call or WhatsApp +880 1619 800523." },
        { q: "Where are you based?", a: "Dhaka, Bangladesh 🇧🇩" },
        { q: "CV?", a: "Open Preview on this computer, or tap 'CV' in About Me." },
      ] },
    { name: "Video Desk", short: "VD", color: "linear-gradient(135deg,#ff375f,#a3002b)", pinned: true, preview: "🎬 Edits, reels and films",
      chat: [
        { q: "What do you edit?", a: "Commercials, social reels, product films and motion pieces. 12 of them are in my Video Editing Portfolio." },
        { q: "Your tools?", a: "Premiere Pro and After Effects, plus Photoshop and AI tools." },
        { q: "Do you shoot too?", a: "Yes, I'm a videographer as well, from planning to the final grade." },
      ] },
    { name: "Design Desk", short: "DD", color: "linear-gradient(135deg,#30d158,#0a7a2e)", pinned: true, preview: "🎨 Posters & thumbnails",
      chat: [
        { q: "Posters?", a: "Bodmaish Polapain S4, Mission Cashout, Betman, Aroma, Marryan and two poster collections." },
        { q: "Thumbnails?", a: "Yes, YouTube thumbnails are my most appreciated Behance project." },
      ] },
    { name: "AI Visuals", short: "AI", color: "linear-gradient(135deg,#bf5af2,#5e1a9e)", pinned: true, preview: "✨ AI product reels",
      chat: [{ q: "AI work?", a: "I make AI product visuals, like my Tissot watch reel. Open Photos → AI Visuals." }] },
    { name: "Brand & Commercial", short: "BC", color: "linear-gradient(135deg,#8e8e93,#48484a)", preview: "🤝 Brands I've worked with", date: "11/7/26",
      chat: [{ q: "Brands?", a: "Jeep Bangladesh, Club11, BikeBD, Driven TV and more." }] },
  ],


  trash: [
    { name: "final_FINAL_v9_render.mp4", html: "<h1>final_FINAL_v9_render</h1><p>Nine renders later, the real one lives in Photos 😅</p>" },
    { name: "poster_v23_client-feedback.psd", html: "<h1>poster_v23</h1><p>“Make the logo bigger.” 🙃</p>" },
  ],

  sticky: { show: true, title: "Start here 👋", button: "See all projects →" },

  mac: {
    deviceName: "Shanto's MacBook Pro",
    model: "MacBook Pro · Dhaka Edition",
    chip: "Cinema Pro (5+ years)",
    memory: "13 projects · 16 work videos",
    osName: "Shanto OS",
    osVersion: "2.0",
  },
};

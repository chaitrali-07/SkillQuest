import React, { useMemo, useState } from "react";
import {
  Sparkles, ArrowRight, Menu, X, Search,
  Code2, Palette, Braces, Coffee, Layers, Cpu, Terminal, Cloud,
} from "lucide-react";

const ACCENTS = ["cyan", "purple", "magenta"];

// Self-contained copy of the catalog, matching what's in App.jsx.
// If the technology list ever changes there, update it here too.
const CATALOG = [
  { name: "HTML", icon: Code2, xp: 150, difficulty: "Beginner", desc: "Structure the web with semantic markup. No prior coding experience needed." },
  { name: "CSS", icon: Palette, xp: 150, difficulty: "Beginner", desc: "Style and lay out modern web interfaces." },
  { name: "JavaScript", icon: Braces, xp: 250, difficulty: "Intermediate", desc: "Build interactive websites and master modern web development." },
  { name: "C", icon: Terminal, xp: 250, difficulty: "Beginner", desc: "Learn programming fundamentals — variables, loops, memory — from the ground up." },
  { name: "C++", icon: Cpu, xp: 350, difficulty: "Advanced", desc: "Master object-oriented programming and performance-critical code." },
  { name: "Core Java", icon: Coffee, xp: 300, difficulty: "Intermediate", desc: "Learn object-oriented fundamentals with Java." },
  { name: "Advanced Java", icon: Layers, xp: 350, difficulty: "Advanced", desc: "Dive into frameworks and enterprise patterns." },
  { name: "Python", icon: Terminal, xp: 300, difficulty: "Intermediate", desc: "Automate, analyze, and build with Python." },
  { name: "Fundamentals of AI & ML", icon: Sparkles, xp: 400, difficulty: "Advanced", desc: "Understand how machine learning models actually work, using Python." },
  { name: "Cloud Computing", icon: Cloud, xp: 400, difficulty: "Advanced", desc: "Deploy and scale applications in the cloud." },
].map((t, i) => ({ ...t, accent: ACCENTS[i % ACCENTS.length] }));

function buildTracks(known, learning, questProgress) {
  return CATALOG.map((t) => {
    if (known.has(t.name)) return { ...t, state: "completed", progress: 100 };
    if (learning.has(t.name)) {
      const qp = questProgress ? questProgress[t.name] : null;
      const pct = qp && qp.totalNodes
        ? Math.min(100, Math.round((qp.nodeIndex / qp.totalNodes) * 100))
        : 0;
      return { ...t, state: "learning", progress: pct };
    }
    return { ...t, state: "available", progress: 0 };
  });
}

function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-grid" />
      <div className="ambient-glow ambient-glow-cyan" />
      <div className="ambient-glow ambient-glow-purple" />
    </div>
  );
}

function TechnologyCard({ t, onStart }) {
  const Icon = t.icon;
  const label = t.state === "completed" ? "Review" : t.state === "learning" ? "Continue Quest" : "Start Quest";
  return (
    <div className={`panel tech-card accent-${t.accent}`}>
      <div className="tech-card-top">
        <div className={`tech-icon icon-${t.accent}`}><Icon size={18} color="#050816" /></div>
        {t.state === "completed" && <span className="pill pill-done">Completed</span>}
        {t.state === "learning" && <span className="pill pill-learning">Learning</span>}
      </div>
      <h3 className="tech-name">{t.name}</h3>
      <p className="tech-desc">{t.desc}</p>
      <div className="tech-meta">
        <span>{t.difficulty}</span><span className="tech-meta-dot">·</span><span>+{t.xp} XP</span>
      </div>
      <div className="tech-progress-track">
        <div className={`tech-progress-fill fill-${t.accent}`} style={{ width: `${t.progress}%` }} />
      </div>
      <p className="tech-progress-label">{t.progress}% complete</p>
      <button className={`btn-tech btn-tech-${t.accent}`} onClick={() => onStart(t.name)}>
        {label} <ArrowRight size={14} />
      </button>
    </div>
  );
}

function NavBar({ user, onHome, onLogin, onSignup, onLogout, onProfile }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="brand" onClick={onHome} style={{ cursor: "pointer" }}>
        <div className="brand-mark"><Sparkles size={15} color="#050816" strokeWidth={2.5} /></div>
        <span className="brand-name">SkillQuest</span>
      </div>
      <div className="nav-links">
        <button className="nav-link nav-link-btn" onClick={onHome}>Home</button>
        {user && <button className="nav-link nav-link-btn" onClick={onProfile}>Profile</button>}
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-avatar" onClick={onProfile} style={{ cursor: "pointer" }}>
              {(user.displayName || user.email)[0].toUpperCase()}
            </span>
            <button className="btn-ghost" onClick={onLogout}>Log out</button>
          </>
        ) : (
          <>
            <button className="btn-ghost" onClick={onLogin}>Login</button>
            <button className="btn-glow" onClick={onSignup}>Get Started</button>
          </>
        )}
        <button className="nav-toggle" onClick={() => setOpen(!open)}>
          {open ? <X size={22} color="#EDEEF5" /> : <Menu size={22} color="#EDEEF5" />}
        </button>
      </div>
      {open && (
        <div className="mobile-menu panel">
          <button className="nav-link nav-link-btn" onClick={onHome}>Home</button>
          {user && <button className="nav-link nav-link-btn" onClick={onProfile}>Profile</button>}
          {user ? (
            <button className="btn-ghost" onClick={onLogout}>Log out</button>
          ) : (
            <>
              <button className="btn-ghost" onClick={onLogin}>Login</button>
              <button className="btn-glow" onClick={onSignup}>Get Started</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];

export default function TracksPage({ user, known, learning, questProgress = {}, onHome, onLogin, onSignup, onLogout, onProfile, onStartQuest }) {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  const tracks = useMemo(() => buildTracks(known, learning, questProgress), [known, learning, questProgress]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return tracks.filter((t) => {
      const matchesDifficulty = difficulty === "All" || t.difficulty === difficulty;
      const matchesSearch = !term || t.name.toLowerCase().includes(term) || t.desc.toLowerCase().includes(term);
      return matchesDifficulty && matchesSearch;
    });
  }, [tracks, search, difficulty]);

  return (
    <div className="page-shell">
      <AmbientBackground />
      <NavBar user={user} onHome={onHome} onLogin={onLogin} onSignup={onSignup} onLogout={onLogout} onProfile={onProfile} />

      <section className="hero" style={{ paddingBottom: 12 }}>
        <span className="eyebrow-pill"><Sparkles size={12} /> EVERY TECHNOLOGY, ONE PATH</span>
        <h1 className="hero-title" style={{ fontSize: "clamp(1.9rem, 5vw, 2.6rem)" }}>Choose Your Quest</h1>
        <p className="hero-subtext">Pick a technology and start leveling up — nothing here is locked.</p>
      </section>

      <section className="section-block">
        <div className="tracks-toolbar">
          <div className="tracks-search">
            <Search size={16} color="#8B93A7" />
            <input
              type="text"
              className="text-input"
              placeholder="Search technologies…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="tracks-filters">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                className={`filter-chip ${difficulty === d ? "filter-chip-active" : ""}`}
                onClick={() => setDifficulty(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" style={{ marginBottom: 70 }}>
        <p className="section-label">
          {filtered.length} {filtered.length === 1 ? "TECHNOLOGY" : "TECHNOLOGIES"}
        </p>
        {filtered.length === 0 ? (
          <p className="profile-empty">No technologies match your search — try a different term or filter.</p>
        ) : (
          <div className="tech-grid">
            {filtered.map((t) => <TechnologyCard key={t.name} t={t} onStart={onStartQuest} />)}
          </div>
        )}
      </section>
    </div>
  );
}
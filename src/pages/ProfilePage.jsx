import React, { useMemo, useState } from "react";
import { Sparkles, Flame, Trophy, Pencil, ArrowRight, Code2, Palette, Braces, Coffee, Layers, Cpu, Terminal, Cloud } from "lucide-react";

const ACCENTS = ["cyan", "purple", "magenta"];

// Self-contained copy of the technology catalog, so this page doesn't
// depend on anything inside App.jsx. If this list ever changes in
// App.jsx, it needs to be updated here too.
const CATALOG = [
  { name: "HTML", icon: Code2, xp: 150, difficulty: "Beginner" },
  { name: "CSS", icon: Palette, xp: 150, difficulty: "Beginner" },
  { name: "JavaScript", icon: Braces, xp: 250, difficulty: "Intermediate" },
  { name: "C", icon: Terminal, xp: 250, difficulty: "Beginner" },
  { name: "C++", icon: Cpu, xp: 350, difficulty: "Advanced" },
  { name: "Core Java", icon: Coffee, xp: 300, difficulty: "Intermediate" },
  { name: "Advanced Java", icon: Layers, xp: 350, difficulty: "Advanced" },
  { name: "Python", icon: Terminal, xp: 300, difficulty: "Intermediate" },
  { name: "Fundamentals of AI & ML", icon: Sparkles, xp: 400, difficulty: "Advanced" },
  { name: "Cloud Computing", icon: Cloud, xp: 400, difficulty: "Advanced" },
].map((t, i) => ({ ...t, accent: ACCENTS[i % ACCENTS.length] }));

function buildTracks(known, learning, questProgress) {
  return CATALOG.map((t) => {
    if (known.has(t.name)) return { ...t, state: "completed", progress: 100 };
    if (learning.has(t.name)) {
      const qp = questProgress[t.name];
      const pct = qp && qp.totalNodes
        ? Math.min(100, Math.round((qp.nodeIndex / qp.totalNodes) * 100))
        : 0;
      return { ...t, state: "learning", progress: pct };
    }
    return { ...t, state: "available", progress: 0 };
  });
}

// Same XP/level math as the Home page's StatsPanel — kept identical so
// the numbers never disagree between pages.
function computeStats(known, learning) {
  const xp = known.size * 200 + learning.size * 40;
  const xpNext = Math.max(500, Math.ceil((xp + 1) / 500) * 500);
  const level = Math.max(1, Math.floor(xp / 350) + 1);
  const streak = 12; // still a placeholder — no real daily-login tracking yet
  const badges = known.size;
  const pct = Math.min(100, Math.round((xp / xpNext) * 100));
  return { xp, xpNext, level, streak, badges, pct };
}

function ProfileTechCard({ t, onStart }) {
  const Icon = t.icon;
  return (
    <div className={`panel tech-card accent-${t.accent}`}>
      <div className="tech-card-top">
        <div className={`tech-icon icon-${t.accent}`}><Icon size={18} color="#050816" /></div>
        <span className="pill pill-learning">Learning</span>
      </div>
      <h3 className="tech-name">{t.name}</h3>
      <div className="tech-progress-track">
        <div className={`tech-progress-fill fill-${t.accent}`} style={{ width: `${t.progress}%` }} />
      </div>
      <p className="tech-progress-label">{t.progress}% complete</p>
      <button className={`btn-tech btn-tech-${t.accent}`} onClick={() => onStart(t.name)}>
        Continue Quest <ArrowRight size={14} />
      </button>
    </div>
  );
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

export default function ProfilePage({ user, known, learning, questProgress = {}, onBack, onLogout, onUpdateName, onStartQuest }) {
  const tracks = useMemo(() => buildTracks(known, learning, questProgress), [known, learning, questProgress]);
  const completedTracks = tracks.filter((t) => t.state === "completed");
  const learningTracks = tracks.filter((t) => t.state === "learning");
  const { xp, xpNext, level, streak, badges, pct } = computeStats(known, learning);

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.displayName || "");
  const [savingName, setSavingName] = useState(false);

  async function handleSaveName() {
    if (!nameInput.trim()) return;
    setSavingName(true);
    await onUpdateName(nameInput.trim());
    setSavingName(false);
    setEditingName(false);
  }

  return (
    <div className="page-shell">
      <AmbientBackground />
      <nav className="navbar">
        <div className="brand" onClick={onBack} style={{ cursor: "pointer" }}>
          <div className="brand-mark"><Sparkles size={15} color="#050816" strokeWidth={2.5} /></div>
          <span className="brand-name">SkillQuest</span>
        </div>
        <button className="btn-ghost" onClick={onLogout}>Log out</button>
      </nav>

      <section className="section-block profile-header-block">
        <div className="panel profile-header">
          <div className="profile-avatar-lg">
            {(user?.displayName || user?.email || "?")[0].toUpperCase()}
          </div>
          <div className="profile-identity">
            {editingName ? (
              <div className="name-edit-row">
                <input
                  className="text-input-plain-profile"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Your name"
                  autoFocus
                />
                <button className="btn-glow" onClick={handleSaveName} disabled={savingName}>
                  {savingName ? "Saving…" : "Save"}
                </button>
              </div>
            ) : (
              <div className="name-display-row">
                <h2 className="profile-name">{user?.displayName || "Unnamed Adventurer"}</h2>
                <button className="icon-btn" onClick={() => { setNameInput(user?.displayName || ""); setEditingName(true); }}>
                  <Pencil size={14} />
                </button>
              </div>
            )}
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>
      </section>

      <section className="section-block">
        <p className="section-label">YOUR STATS</p>
        <div className="profile-stats-grid">
          <div className="panel profile-stat-card">
            <span className="level-chip">LEVEL {String(level).padStart(2, "0")}</span>
            <p className="xp-fraction" style={{ marginTop: 10 }}>{xp.toLocaleString()} / {xpNext.toLocaleString()} XP</p>
            <div className="xp-track" style={{ marginTop: 10 }}><div className="xp-fill" style={{ width: `${pct}%` }} /></div>
          </div>
          <div className="panel profile-stat-card profile-stat-center">
            <Flame size={22} color="#F472B6" />
            <p className="profile-stat-value">{streak}</p>
            <p className="profile-stat-label">Day Streak</p>
          </div>
          <div className="panel profile-stat-card profile-stat-center">
            <Trophy size={22} color="#22D3EE" />
            <p className="profile-stat-value">{badges}</p>
            <p className="profile-stat-label">Badges Earned</p>
          </div>
        </div>
      </section>

      <section className="section-block">
        <p className="section-label">COMPLETED TECHNOLOGIES</p>
        {completedTracks.length === 0 ? (
          <p className="profile-empty">Nothing completed yet — finish your first quest to earn a badge here.</p>
        ) : (
          <div className="badge-grid">
            {completedTracks.map((t) => (
              <div key={t.name} className={`panel badge-card accent-${t.accent}`}>
                <div className={`tech-icon icon-${t.accent}`}><t.icon size={18} color="#050816" /></div>
                <p className="badge-name">{t.name}</p>
                <span className="pill pill-done">Completed</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="section-block" style={{ marginBottom: 60 }}>
        <p className="section-label">IN PROGRESS</p>
        {learningTracks.length === 0 ? (
          <p className="profile-empty">Nothing in progress right now — head back to Home and start a quest.</p>
        ) : (
          <div className="tech-grid">
            {learningTracks.map((t) => (
              <ProfileTechCard key={t.name} t={t} onStart={onStartQuest} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
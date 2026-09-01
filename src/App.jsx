import React, { useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  Check, ArrowRight, Menu, X, Flame, Trophy, Sparkles,
  Mail, KeyRound, User, Code2, Palette, Braces, Coffee, Layers, Cpu, Terminal, Cloud,
} from "lucide-react";
import { auth, db } from "./firebase";
import QuestView from "./QuestView";
import ProfilePage from "./pages/ProfilePage";
import TracksPage from "./pages/TracksPage";
import "./App.css";

const ACCENTS = ["cyan", "purple", "magenta"];

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

function friendlyAuthError(code) {
  switch (code) {
    case "auth/invalid-email": return "That email address doesn't look right.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential": return "Email or password is incorrect.";
    case "auth/email-already-in-use": return "An account with that email already exists — try logging in instead.";
    case "auth/weak-password": return "Password should be at least 6 characters.";
    default: return "Something went wrong. Please try again.";
  }
}

async function loadProgress(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    known: new Set(data.known || []),
    learning: new Set(data.learning || []),
  };
}

async function saveProgress(uid, known, learning) {
  await setDoc(
    doc(db, "users", uid),
    { known: Array.from(known), learning: Array.from(learning), updatedAt: Date.now() },
    { merge: true }
  );
}

function buildTracks(known, learning) {
  return CATALOG.map((t) => {
    if (known.has(t.name)) return { ...t, state: "completed", progress: 100 };
    if (learning.has(t.name)) return { ...t, state: "learning", progress: 0 };
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

function LearningPath({ tracks }) {
  return (
    <div className="path-list">
      {tracks.map((t, i) => (
        <div key={t.name} className="path-row">
          <div className="path-node-col">
            <div className={`path-node node-${t.state}`}>
              {t.state === "completed" && <Check size={16} strokeWidth={2.5} color="#050816" />}
              {t.state === "learning" && <span className="node-pulse" />}
              {t.state === "learning" && <t.icon size={16} color="#050816" strokeWidth={2.5} />}
              {t.state === "available" && <t.icon size={14} color="#8B93A7" strokeWidth={2} />}
            </div>
            {i < tracks.length - 1 && (
              <div className={`path-line ${t.state === "completed" ? "line-done" : ""}`} />
            )}
          </div>
          <div className="path-copy">
            <p className={`path-name label-${t.state}`}>{t.name}</p>
            {t.state === "learning" && <p className="path-tag">IN PROGRESS · {t.progress}%</p>}
            {t.state === "completed" && <p className="path-tag path-tag-done">COMPLETED</p>}
            {t.state === "available" && <p className="path-tag">AVAILABLE ANYTIME</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatsPanel({ known, learning }) {
  const xp = known.size * 200 + learning.size * 40;
  const xpNext = Math.max(500, Math.ceil((xp + 1) / 500) * 500);
  const level = Math.max(1, Math.floor(xp / 350) + 1);
  const streak = 12, badges = known.size;
  const pct = Math.min(100, Math.round((xp / xpNext) * 100));
  return (
    <div className="panel stats-panel">
      <div className="stats-top">
        <span className="level-chip">LEVEL {String(level).padStart(2, "0")}</span>
        <span className="xp-fraction">{xp.toLocaleString()} / {xpNext.toLocaleString()} XP</span>
      </div>
      <div className="xp-track"><div className="xp-fill" style={{ width: `${pct}%` }} /></div>
      <div className="stats-bottom">
        <div className="stat-item"><Flame size={16} color="#F472B6" /><span>{streak} day streak</span></div>
        <div className="stat-item"><Trophy size={16} color="#22D3EE" /><span>{badges} badges</span></div>
      </div>
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

function NavBar({ user, onLogin, onSignup, onLogout, onCustomize, onProfile, onTracks }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="brand">
        <div className="brand-mark"><Sparkles size={15} color="#050816" strokeWidth={2.5} /></div>
        <span className="brand-name">SkillQuest</span>
      </div>
      <div className="nav-links">
        <button className="nav-link nav-link-btn" onClick={onTracks}>Tracks</button>
        {user && <button className="nav-link nav-link-btn" onClick={onCustomize}>Customize tracks</button>}
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
          <button className="nav-link nav-link-btn" onClick={onTracks}>Tracks</button>
          {user && <button className="nav-link nav-link-btn" onClick={onCustomize}>Customize tracks</button>}
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

function OnboardingPage({ onDone, initialKnown, initialLearning }) {
  const [known, setKnown] = useState(new Set(initialKnown));
  const [learning, setLearning] = useState(new Set(initialLearning));
  const [saving, setSaving] = useState(false);

  function toggle(setFn, set, name) {
    const next = new Set(set);
    next.has(name) ? next.delete(name) : next.add(name);
    setFn(next);
  }

  async function handleDone() {
    setSaving(true);
    await onDone(known, learning);
    setSaving(false);
  }

  return (
    <div className="page-shell">
      <AmbientBackground />
      <div className="onboarding-wrap">
        <div className="panel onboarding-card">
          <span className="eyebrow-pill"><Sparkles size={12} /> QUICK SETUP</span>
          <h2 className="onboarding-title">Let's build your path.</h2>
          <p className="onboarding-subtitle">
            Everyone starts somewhere different — some of you have never
            written a line of code, some already know a few languages.
            Tell us where you stand and we'll build your path around it.
            Nothing here is locked; you can start any technology, any time.
          </p>

          <div className="onboarding-section">
            <h3 className="onboarding-heading">What do you already know?</h3>
            <p className="onboarding-hint">We'll mark these as completed so you're not stuck relearning them.</p>
            <div className="chip-grid">
              {CATALOG.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  className={`choice-chip ${known.has(t.name) ? "choice-chip-active" : ""}`}
                  onClick={() => toggle(setKnown, known, t.name)}
                >
                  <t.icon size={14} /> {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="onboarding-section">
            <h3 className="onboarding-heading">What do you want to learn right now?</h3>
            <p className="onboarding-hint">Pick as many as you like — everything else stays available for later.</p>
            <div className="chip-grid">
              {CATALOG.filter((t) => !known.has(t.name)).map((t) => (
                <button
                  key={t.name}
                  type="button"
                  className={`choice-chip ${learning.has(t.name) ? "choice-chip-active" : ""}`}
                  onClick={() => toggle(setLearning, learning, t.name)}
                >
                  <t.icon size={14} /> {t.name}
                </button>
              ))}
            </div>
          </div>

          <button className="btn-glow full-width btn-large" onClick={handleDone} disabled={saving}>
            {saving ? "Saving…" : "Build My Path"} <ArrowRight size={16} />
          </button>
          <p className="onboarding-skip" onClick={handleDone}>
            You can always change this later from "Customize tracks."
          </p>
        </div>
      </div>
    </div>
  );
}

function HomePage({ user, known, learning, onLogin, onSignup, onLogout, onGetStarted, onCustomize, onProfile, onTracks, onStartQuest }) {
  const tracks = useMemo(() => buildTracks(known, learning), [known, learning]);

  return (
    <div className="page-shell">
      <AmbientBackground />
      <NavBar user={user} onLogin={onLogin} onSignup={onSignup} onLogout={onLogout} onCustomize={onCustomize} onProfile={onProfile} onTracks={onTracks} />

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow-pill"><Sparkles size={12} /> GAMIFIED TECH LEARNING</span>
          <h1 className="hero-title">Level Up Your<br /><span className="gradient-text">Tech Skills.</span></h1>
          <p className="hero-subtext">Learn. Practice. Complete challenges. Earn XP. Build your future — starting exactly where you are.</p>
          <div className="hero-actions">
            <button className="btn-glow btn-large" onClick={user ? undefined : onGetStarted}>
              {user ? "Continue Quest" : "Start Your Quest"} <ArrowRight size={17} />
            </button>
            <button className="btn-outline btn-large" onClick={onTracks}>Explore Tracks</button>
          </div>
        </div>
        <div className="hero-visual panel">
          <p className="section-label">YOUR PATH</p>
          <LearningPath tracks={tracks} />
        </div>
      </section>

      <section className="section-block">
        <StatsPanel known={known} learning={learning} />
      </section>

      <section className="section-block" id="tracks">
        <p className="section-label">CHOOSE YOUR QUEST</p>
        <div className="tech-grid">
          {tracks.map((t) => <TechnologyCard key={t.name} t={t} onStart={onStartQuest} />)}
        </div>
      </section>
    </div>
  );
}

function AuthPage({ onBack, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (mode === "signup" && password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name.trim()) await updateProfile(cred.user, { displayName: name.trim() });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(friendlyAuthError(err.code));
      setLoading(false);
    }
  }

  return (
    <div className="page-shell auth-shell">
      <AmbientBackground />
      <div className="auth-left">
        <div className="brand" onClick={onBack} style={{ cursor: "pointer" }}>
          <div className="brand-mark"><Sparkles size={14} color="#050816" strokeWidth={2.5} /></div>
          <span className="brand-name">SkillQuest</span>
        </div>
        <div className="auth-left-copy">
          <h2 className="auth-headline">Your next level<br />starts here.</h2>
          <p className="auth-tagline">No forced order, no assumed experience — tell us where you're starting from and we'll build the path around you.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="panel auth-card">
          <h3 className="login-title">{mode === "login" ? "Log In" : "Start Your Quest"}</h3>
          <p className="login-subtitle">{mode === "login" ? "Pick up where you left off." : "Create an account to begin."}</p>

          <form className="login-form" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <label className="form-field">
                <span className="field-label">Name</span>
                <div className="input-shell">
                  <User size={16} color="#5B6478" />
                  <input className="text-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                </div>
              </label>
            )}
            <label className="form-field">
              <span className="field-label">Email</span>
              <div className="input-shell">
                <Mail size={16} color="#5B6478" />
                <input type="email" required className="text-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
            </label>
            <label className="form-field">
              <span className="field-label">Password</span>
              <div className="input-shell">
                <KeyRound size={16} color="#5B6478" />
                <input type="password" required minLength={6} className="text-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
            </label>
            {mode === "signup" && (
              <label className="form-field">
                <span className="field-label">Confirm Password</span>
                <div className="input-shell">
                  <KeyRound size={16} color="#5B6478" />
                  <input type="password" required minLength={6} className="text-input" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" />
                </div>
              </label>
            )}
            {error && <p className="form-error">{error}</p>}
            <button type="submit" disabled={loading} className="btn-glow full-width">
              {loading ? "Please wait…" : mode === "login" ? "Log In" : "Start Your Quest"}
            </button>
          </form>

          {mode === "login" && <a href="#" className="forgot-link">Forgot password?</a>}
          <p className="switch-line">
            {mode === "login" ? (
              <>New to SkillQuest? <span className="switch-link" onClick={() => setMode("signup")}>Create Account</span></>
            ) : (
              <>Already have an account? <span className="switch-link" onClick={() => setMode("login")}>Log In</span></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="page-shell">
      <AmbientBackground />
      <div className="onboarding-wrap">
        <p style={{ fontFamily: "Inter, sans-serif", color: "#8B93A7", position: "relative", zIndex: 1 }}>
          Loading your quest…
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [known, setKnown] = useState(new Set());
  const [learning, setLearning] = useState(new Set());
  const [resolving, setResolving] = useState(true);
  const [activeQuest, setActiveQuest] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (!u) {
        setKnown(new Set());
        setLearning(new Set());
        setView("home");
        setResolving(false);
        return;
      }

      try {
        const progress = await loadProgress(u.uid);
        if (progress) {
          setKnown(progress.known);
          setLearning(progress.learning);
          setView("home");
        } else {
          setKnown(new Set());
          setLearning(new Set());
          setView("onboarding");
        }
      } catch (err) {
        console.error("Failed to load progress from Firestore:", err);
        setView("home");
      } finally {
        setResolving(false);
      }
    });
    return unsubscribe;
  }, []);

  async function handleStartQuest(techName) {
    if (!user) {
      setAuthMode("signup");
      setView("login");
      return;
    }

    if (!known.has(techName) && !learning.has(techName)) {
      const nextLearning = new Set(learning);
      nextLearning.add(techName);
      setLearning(nextLearning);
      await saveProgress(user.uid, known, nextLearning);
    }

    setActiveQuest(techName);
    setView("quest");
  }

  async function handleQuestComplete(techName) {
    const nextKnown = new Set(known);
    nextKnown.add(techName);
    const nextLearning = new Set(learning);
    nextLearning.delete(techName);

    setKnown(nextKnown);
    setLearning(nextLearning);
    if (user) await saveProgress(user.uid, nextKnown, nextLearning);

    setActiveQuest(null);
    setView("home");
  }

  function handleExitQuest() {
    setActiveQuest(null);
    setView("home");
  }

  async function handleUpdateName(newName) {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName: newName });
    setUser({ ...auth.currentUser, displayName: newName });
  }

  if (resolving) return <LoadingScreen />;

  if (view === "quest" && activeQuest) {
    return (
      <QuestView
        questId={activeQuest}
        onExit={handleExitQuest}
        onComplete={handleQuestComplete}
      />
    );
  }

  if (view === "profile") {
    return (
      <ProfilePage
        user={user}
        known={known}
        learning={learning}
        onBack={() => setView("home")}
        onLogout={() => signOut(auth)}
        onUpdateName={handleUpdateName}
        onStartQuest={handleStartQuest}
      />
    );
  }

  if (view === "tracks") {
    return (
      <TracksPage
        user={user}
        known={known}
        learning={learning}
        onHome={() => setView("home")}
        onLogin={() => { setAuthMode("login"); setView("login"); }}
        onSignup={() => { setAuthMode("signup"); setView("login"); }}
        onLogout={() => signOut(auth)}
        onProfile={() => setView("profile")}
        onStartQuest={handleStartQuest}
      />
    );
  }

  if (view === "onboarding") {
    return (
      <OnboardingPage
        initialKnown={known}
        initialLearning={learning}
        onDone={async (k, l) => {
          setKnown(k);
          setLearning(l);
          if (user) await saveProgress(user.uid, k, l);
          setView("home");
        }}
      />
    );
  }

  if (view === "login") {
    return <AuthPage onBack={() => setView("home")} initialMode={authMode} />;
  }

  return (
    <HomePage
      user={user}
      known={known}
      learning={learning}
      onGetStarted={() => { setAuthMode("signup"); setView("login"); }}
      onLogin={() => { setAuthMode("login"); setView("login"); }}
      onSignup={() => { setAuthMode("signup"); setView("login"); }}
      onLogout={() => signOut(auth)}
      onCustomize={() => setView("onboarding")}
      onProfile={() => setView("profile")}
      onTracks={() => setView("tracks")}
      onStartQuest={handleStartQuest}
    />
  );
}
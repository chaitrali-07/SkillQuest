import React, { useState, useEffect } from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import "./App.css";

import html from "./quests/html";
import css from "./quests/css";
import javascript from "./quests/javascript";
import c from "./quests/c";
import cpp from "./quests/cpp";
import coreJava from "./quests/coreJava";
import advancedJava from "./quests/advjava";
import python from "./quests/python";
import aiml from "./quests/aiml";
import cloud from "./quests/cloud";

const QUEST_DB = {
  "HTML": html,
  "CSS": css,
  "JavaScript": javascript,
  "C": c,
  "C++": cpp,
  "Core Java": coreJava,
  "Advanced Java": advancedJava,
  "Python": python,
  "Fundamentals of AI & ML": aiml,
  "Cloud Computing": cloud,
};
7
function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-grid" />
    </div>
  );
}

export default function QuestView({ questId, onExit, onComplete, onProgress, initialNodeIndex = 0 }) {
  const questData = QUEST_DB[questId] || {
    name: questId || "Unknown Quest",
    nodes: [
      { id: 0, type: "briefing", title: "General Briefing", aiText: `Agent, you have initiated training for ${questId}. Review the data stream and complete the objective.`, code: `// INITIALIZING MODULE: ${questId}\n\n<span class='keyword'>const</span> status = <span class='string'>'active'</span>;\n<span class='keyword'>let</span> rewardXP = 200;` }
    ]
  };

  // Clamp in case saved progress somehow points past the end of the list
  // (e.g. a quest's node count changed since the learner last visited).
  const clampedInitial = Math.min(Math.max(initialNodeIndex, 0), questData.nodes.length - 1);

  const [currentNodeIdx, setCurrentNodeIdx] = useState(clampedInitial);
  const [selected, setSelected] = useState(null);

  const currentNode = questData.nodes[currentNodeIdx];
  const isLast = currentNodeIdx === questData.nodes.length - 1;
  const isQuiz = currentNode.type === "quiz";
  const isProject = currentNode.type === "project";

  useEffect(() => {
    setSelected(null);
  }, [currentNodeIdx]);

  // Report the current position back up to the parent every time it
  // changes (including on mount), so it can be saved to Firestore and
  // used to resume from here next time.
  useEffect(() => {
    if (onProgress) onProgress(questId, currentNodeIdx, questData.nodes.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNodeIdx, questId]);

  function handleNext() {
    if (isLast) {
      onComplete(questId);
    } else {
      setCurrentNodeIdx(prev => prev + 1);
    }
  }

  const dialogueLabel = isQuiz ? "KNOWLEDGE CHECK" : isProject ? "FIELD MISSION" : "SYSTEM A.I. // OVERSEER";
  const canProceedQuiz = !isQuiz || selected === currentNode.correctIndex;

  return (
    <div className="quest-shell">
      <AmbientBackground />

      <aside className="node-map-sidebar">
        <button className="btn-ghost" onClick={onExit} style={{ alignSelf: 'flex-start', marginBottom: '32px' }}>
          ← ABORT MISSION
        </button>

        <div className="quest-header">
          <p className="quest-status">ACTIVE DIRECTIVE</p>
          <h2 className="quest-title">{questData.name}</h2>
        </div>

        <div className="node-network">
          {questData.nodes.map((node, idx) => {
            const isCompleted = idx < currentNodeIdx;
            const isActive = idx === currentNodeIdx;
            const isUnlocked = idx <= currentNodeIdx;

            return (
              <div key={node.id} className={`network-node ${isUnlocked ? 'unlocked' : ''} ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                <div className="node-visuals">
                  <div className="node-icon">
                    {isCompleted ? <Check size={14} color="var(--purple)" /> : <span style={{fontFamily: 'var(--font-mono)', fontSize: '10px'}}>{idx + 1}</span>}
                  </div>
                  {idx !== questData.nodes.length - 1 && <div className="node-line" />}
                </div>
                <div className="node-label">{node.title}</div>
              </div>
            );
          })}
        </div>
      </aside>

      <main className="mission-briefing">
        {currentNode.code && (
          <div className="holo-display">
            <div className="code-terminal">
              <div className="code-header">/// HOLO-DISPLAY: SECURE DATA STREAM ///</div>
              <div className="code-content" dangerouslySetInnerHTML={{ __html: currentNode.code }} />
            </div>
          </div>
        )}

        <div className="dialogue-box">
          <div className="ai-avatar"><Sparkles color="var(--cyan)" size={32} /></div>
          <div className="dialogue-content">
            <div className="ai-name">{dialogueLabel}</div>

            {isQuiz ? (
              <>
                <p className="dialogue-text">{currentNode.prompt}</p>
                <div className="quiz-options">
                  {currentNode.options.map((opt, idx) => {
                    const isSelected = selected === idx;
                    const isRight = idx === currentNode.correctIndex;
                    let cls = "quiz-option";
                    if (isSelected) cls += isRight ? " quiz-option-correct" : " quiz-option-wrong";
                    return (
                      <button key={idx} type="button" className={cls} onClick={() => setSelected(idx)}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {selected !== null && (
                  <p className={`quiz-feedback ${selected === currentNode.correctIndex ? "feedback-correct" : "feedback-wrong"}`}>
                    {selected === currentNode.correctIndex ? currentNode.explanation : "Not quite — take another look and try again."}
                  </p>
                )}
                <div className="dialogue-actions">
                  <button className="btn-glow" onClick={handleNext} disabled={!canProceedQuiz}>
                    {isLast ? "COMPLETE DIRECTIVE" : "CONTINUE"} <ArrowRight size={16} />
                  </button>
                </div>
              </>
            ) : isProject ? (
              <>
                <p className="dialogue-text">{currentNode.description}</p>
                <ul className="project-checklist">
                  {currentNode.checklist.map((item, idx) => (
                    <li key={idx}><Check size={14} color="var(--cyan)" /> {item}</li>
                  ))}
                </ul>
                {currentNode.note && <p className="project-note">{currentNode.note}</p>}
                <div className="dialogue-actions">
                  <button className="btn-glow" onClick={handleNext}>
                    {isLast ? "MARK COMPLETE & FINISH" : "MARK COMPLETE & CONTINUE"} <ArrowRight size={16} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="dialogue-text">{currentNode.aiText}</p>
                <div className="dialogue-actions">
                  <button className="btn-glow" onClick={handleNext}>
                    {isLast ? "COMPLETE DIRECTIVE" : "ACKNOWLEDGE & PROCEED"} <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
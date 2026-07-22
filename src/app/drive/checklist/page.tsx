"use client";

import Link from "next/link";
import { useState } from "react";
import { DriveLayout } from "@/components/drive/drive-layout";
import { DRIVE_CHECKLIST } from "@/lib/drive/config";

export default function DriveChecklistPage() {
  const [categories, setCategories] = useState(() =>
    DRIVE_CHECKLIST.map((category) => ({ ...category, expanded: false }))
  );

  const assessed = categories.reduce((sum, c) => sum + c.completed, 0);
  const totalSkills = categories.reduce((sum, c) => sum + c.total, 0);
  const competent = categories.reduce((sum, c) => sum + c.competent, 0);
  const needsDev = categories.reduce((sum, c) => sum + c.needsDevelopment, 0);
  const pending = totalSkills - assessed;
  const pct = totalSkills > 0 ? Math.round((assessed / totalSkills) * 100) : 0;

  function toggleCategory(code: string) {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.code === code) {
          return { ...c, expanded: !c.expanded };
        }
        return { ...c, expanded: false };
      })
    );
  }

  return (
    <DriveLayout>
      <div className="drive-checklist-top">
        <Link href="/drive" className="drive-back-link">
          ‹ Back
        </Link>
        <span className="drive-checklist-top__view">Instructor View</span>
      </div>

      <div className="drive-checklist-title-row">
        <div>
          <h1 className="drive-page-title drive-page-title--checklist">Skills Assessment</h1>
          <p className="hub-section-desc">DVSA Standard Framework</p>
        </div>
        <div className="drive-checklist-lesson-badge">
          <strong>L4</strong>
          <span>LESSON</span>
        </div>
      </div>

      <div className="drive-checklist-header">
        <div className="drive-checklist-student">
          <span className="drive-checklist-student__avatar">AJ</span>
          <div>
            <strong>Alex Johnson</strong>
            <p>Toyota Corolla · Automatic</p>
          </div>
          <div className="drive-checklist-student__when">
            <span>📅 28 Jun 2026</span>
            <span>🕙 10:00 – 11:00am</span>
          </div>
        </div>
        <div className="drive-checklist-progress">
          <span>{assessed} of {totalSkills} skills assessed</span>
          <span>{pct}%</span>
        </div>
        <div className="progress-bar__track">
          <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="drive-checklist-summary">
          ✓ {competent} Competent · ✗ {needsDev} Needs Development · {pending} Pending
        </p>
      </div>

      <div className="drive-checklist-legend">
        <span>Mark as:</span>
        <span className="drive-checklist-mark drive-checklist-mark--c">C</span>
        <span>Competent</span>
        <span className="drive-checklist-mark drive-checklist-mark--d">D</span>
        <span>Needs Development</span>
      </div>

      <div className="drive-checklist-categories">
        {categories.map((cat) => (
          <div
            key={cat.code}
            className={`drive-checklist-category${cat.expanded ? " drive-checklist-category--open" : ""}`}
          >
            <button
              type="button"
              className="drive-checklist-category__head"
              onClick={() => toggleCategory(cat.code)}
            >
              <span className="drive-checklist-category__code">{cat.code}</span>
              <span className="drive-checklist-category__title">{cat.title}</span>
              <div className="drive-checklist-category__bar">
                <div
                  style={{
                    width: `${cat.total ? (cat.completed / cat.total) * 100 : 0}%`,
                  }}
                />
              </div>
              <span className="drive-checklist-category__count">
                {cat.completed}/{cat.total}
              </span>
              {cat.competent > 0 ? (
                <span className="drive-checklist-category__pill drive-checklist-category__pill--c">
                  {cat.competent}
                </span>
              ) : null}
              {cat.needsDevelopment > 0 ? (
                <span className="drive-checklist-category__pill drive-checklist-category__pill--d">
                  {cat.needsDevelopment}
                </span>
              ) : null}
              <span className="drive-checklist-category__toggle">
                {cat.expanded ? "∧" : "∨"}
              </span>
            </button>

            {cat.expanded && cat.skills ? (
              <ul className="drive-checklist-skills">
                {cat.skills.map((skill) => (
                  <li key={skill.id} className="drive-checklist-skill">
                    <span className="drive-checklist-skill__num">{skill.id}</span>
                    <span>{skill.label}</span>
                    <div className="drive-checklist-skill__marks">
                      <button
                        type="button"
                        className={`drive-checklist-mark drive-checklist-mark--c${
                          skill.status === "competent" ? " drive-checklist-mark--selected" : ""
                        }`}
                      >
                        C
                      </button>
                      <button
                        type="button"
                        className={`drive-checklist-mark drive-checklist-mark--d${
                          skill.status === "needs-development"
                            ? " drive-checklist-mark--selected"
                            : ""
                        }`}
                      >
                        D
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      <div className="drive-checklist-save">
        <button type="button" className="btn btn-primary btn-lg">
          Save Assessment Report
        </button>
        <p>Report will be shared with the student and logged to their profile</p>
      </div>
    </DriveLayout>
  );
}

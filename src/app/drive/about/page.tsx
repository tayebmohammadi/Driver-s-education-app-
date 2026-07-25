"use client";

import Link from "next/link";
import { useState } from "react";
import { DriveLayout } from "@/components/drive/drive-layout";
import {
  DRIVE_ABOUT_STATS,
  DRIVE_FAQ,
  DRIVE_HOW_IT_WORKS_SCHOOLS,
  DRIVE_HOW_IT_WORKS_SCHOOLS_SUBTITLE,
  DRIVE_HOW_IT_WORKS_STUDENTS,
  DRIVE_HOW_IT_WORKS_STUDENTS_SUBTITLE,
  DRIVE_HOW_IT_WORKS_TRUST_NOTE,
  DRIVE_WHY_CHOOSE,
} from "@/lib/drive/config";

type HowItWorksTab = "students" | "schools";

export default function DriveAboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [howItWorksTab, setHowItWorksTab] = useState<HowItWorksTab>("students");

  return (
    <DriveLayout>
      <header className="drive-about-header">
        <div className="drive-about-header__brand">
          <span className="drive-about-header__logo">DS</span>
          <span>DrivingSchool</span>
        </div>
        <h1>How It Works</h1>
      </header>

      <div className="drive-how-it-works__audience" role="tablist" aria-label="Choose your path">
        <button
          type="button"
          role="tab"
          aria-selected={howItWorksTab === "students"}
          className={`drive-how-it-works__audience-card${
            howItWorksTab === "students" ? " drive-how-it-works__audience-card--active" : ""
          }`}
          onClick={() => setHowItWorksTab("students")}
        >
          <span className="drive-how-it-works__audience-icon" aria-hidden>
            🎓
          </span>
          <strong>For Students</strong>
          <span>Preview lesson profiles and scheduling</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={howItWorksTab === "schools"}
          className={`drive-how-it-works__audience-card${
            howItWorksTab === "schools" ? " drive-how-it-works__audience-card--active" : ""
          }`}
          onClick={() => setHowItWorksTab("schools")}
        >
          <span className="drive-how-it-works__audience-icon" aria-hidden>
            🏫
          </span>
          <strong>For Driving Schools</strong>
          <span>Reach students and fill your schedule</span>
        </button>
      </div>

        <div className="drive-about-video">
        <span className="drive-about-video__play" aria-hidden="true">
          ◇
        </span>
        <p>Marketplace experience preview</p>
        <span className="drive-about-video__duration">Sample</span>
      </div>

      <div className="drive-about-stats">
        {DRIVE_ABOUT_STATS.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <section className="drive-how-it-works" id="how-it-works">
        <p className="drive-section-label drive-section-label--caps">How It Works</p>
        <p className="drive-how-it-works__subtitle">
          {howItWorksTab === "students"
            ? DRIVE_HOW_IT_WORKS_STUDENTS_SUBTITLE
            : DRIVE_HOW_IT_WORKS_SCHOOLS_SUBTITLE}
        </p>

        <div
          role="tabpanel"
          aria-label={howItWorksTab === "students" ? "For Students" : "For Driving Schools"}
        >
          <ol className="drive-about-steps">
            {(howItWorksTab === "students"
              ? DRIVE_HOW_IT_WORKS_STUDENTS
              : DRIVE_HOW_IT_WORKS_SCHOOLS
            ).map((step) => (
              <li key={`${howItWorksTab}-${step.step}`}>
                <span className="drive-about-steps__num">{step.step}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="drive-how-it-works__trust">{DRIVE_HOW_IT_WORKS_TRUST_NOTE}</p>

          <div className="drive-how-it-works__ctas">
            {howItWorksTab === "students" ? (
              <Link href="/drive" className="btn btn-primary drive-how-it-works__cta">
                Find Driving Lessons
              </Link>
            ) : (
              <Link href="/drive/about#how-it-works" className="btn btn-primary drive-how-it-works__cta">
                Preview Partner Experience
              </Link>
            )}
          </div>
        </div>
      </section>

      {howItWorksTab === "students" ? (
        <section id="why-students-use-us">
          <p className="drive-section-label drive-section-label--caps">Why students use us</p>
          <div className="drive-about-grid">
            {DRIVE_WHY_CHOOSE.map((card) => (
              <article key={card.title} className="drive-about-card">
                <span className="drive-about-card__icon" aria-hidden>
                  {card.icon}
                </span>
                <h3>{card.title}</h3>
                <ul>
                  {card.points.map((point) => (
                    <li key={point}>
                      <span aria-hidden>✓</span> {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {howItWorksTab === "students" ? (
        <section className="drive-about-testimonial" id="reviews">
          <p className="drive-section-label drive-section-label--caps">
            Marketplace preview
          </p>
          <blockquote>
            Instructor profiles, ratings, reviews, packages, and schedules shown
            in this experience are sample information for product evaluation.
          </blockquote>
          <footer>Live partner verification and booking are not yet available.</footer>
        </section>
      ) : null}

      <p className="drive-section-label drive-section-label--caps">
        Your questions, our answers
      </p>
      <div className="drive-about-faq">
        {DRIVE_FAQ.map((item, index) => (
          <div
            key={item.question}
            className={`drive-about-faq__item${
              openFaq === index ? " drive-about-faq__item--open" : ""
            }`}
          >
            <button
              type="button"
              className="drive-about-faq__question"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              {item.question}
              <span aria-hidden>›</span>
            </button>
            {openFaq === index ? <p>{item.answer}</p> : null}
          </div>
        ))}
      </div>

      <div className="drive-about-cta-block">
        <Link href="/drive/packs" className="btn btn-primary btn-lg drive-about-cta">
          Explore Sample Packages
        </Link>
        <p>Preview only · No booking or payment is created</p>
      </div>
    </DriveLayout>
  );
}

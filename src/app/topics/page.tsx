"use client";

import Link from "next/link";
import { HubLayout } from "@/components/hub/hub-layout";
import { STUDY_TOPICS } from "@/lib/learning/topics-config";

export default function TopicsPage() {
  return (
    <HubLayout title="Study by Topic">
      <p className="hub-section-desc">
        Learn by category — each topic includes lessons and mini quizzes.
      </p>
      <div className="topic-grid">
        {STUDY_TOPICS.map((topic) => (
          <Link
            key={topic.slug}
            href={`/topics/${topic.slug}`}
            className="topic-card"
          >
            <span className="topic-card__icon">{topic.icon}</span>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
          </Link>
        ))}
      </div>
    </HubLayout>
  );
}

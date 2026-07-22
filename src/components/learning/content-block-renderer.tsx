"use client";

import type { ContentBlockDTO } from "@/types/learning";
import type {
  CalloutBlockContent,
  ChecklistBlockContent,
  HeadingBlockContent,
  ImageBlockContent,
  ParagraphBlockContent,
  QuoteBlockContent,
  VideoBlockContent,
} from "@/types/learning";

interface ContentBlockRendererProps {
  blocks: ContentBlockDTO[];
}

export function ContentBlockRenderer({ blocks }: ContentBlockRendererProps) {
  return (
    <article className="lesson-content">
      {blocks.map((block) => (
        <ContentBlock key={block.id} block={block} />
      ))}
    </article>
  );
}

function ContentBlock({ block }: { block: ContentBlockDTO }) {
  switch (block.type) {
    case "HEADING":
      return <HeadingBlock content={block.content as HeadingBlockContent} />;
    case "PARAGRAPH":
      return <ParagraphBlock content={block.content as ParagraphBlockContent} />;
    case "CALLOUT":
      return <CalloutBlock content={block.content as CalloutBlockContent} />;
    case "IMAGE":
      return <ImageBlock content={block.content as ImageBlockContent} />;
    case "VIDEO":
      return <VideoBlock content={block.content as VideoBlockContent} />;
    case "CHECKLIST":
      return <ChecklistBlock content={block.content as ChecklistBlockContent} />;
    case "QUOTE":
      return <QuoteBlock content={block.content as QuoteBlockContent} />;
    default:
      return null;
  }
}

function HeadingBlock({ content }: { content: HeadingBlockContent }) {
  const level = content.level ?? 2;
  const className = "block-heading";

  if (level === 1) return <h1 className={className}>{content.text}</h1>;
  if (level === 3) return <h3 className={className}>{content.text}</h3>;
  if (level === 4) return <h4 className={className}>{content.text}</h4>;
  return <h2 className={className}>{content.text}</h2>;
}

function ParagraphBlock({ content }: { content: ParagraphBlockContent }) {
  return <p className="block-paragraph">{content.text}</p>;
}

function CalloutBlock({ content }: { content: CalloutBlockContent }) {
  const variant = content.variant ?? "info";
  return (
    <aside className={`block-callout block-callout--${variant}`}>
      {content.title ? (
        <strong className="block-callout__title">{content.title}</strong>
      ) : null}
      <p>{content.text}</p>
    </aside>
  );
}

function ImageBlock({ content }: { content: ImageBlockContent }) {
  return (
    <figure className="block-image">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={content.url} alt={content.alt} loading="lazy" />
      {content.caption ? (
        <figcaption>{content.caption}</figcaption>
      ) : null}
    </figure>
  );
}

function VideoBlock({ content }: { content: VideoBlockContent }) {
  return (
    <figure className="block-video">
      <video controls preload="metadata" src={content.url}>
        Your browser does not support video playback.
      </video>
      {content.caption ? (
        <figcaption>{content.caption}</figcaption>
      ) : null}
    </figure>
  );
}

function ChecklistBlock({ content }: { content: ChecklistBlockContent }) {
  return (
    <div className="block-checklist">
      {content.title ? <h3>{content.title}</h3> : null}
      <ul>
        {content.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function QuoteBlock({ content }: { content: QuoteBlockContent }) {
  return (
    <blockquote className="block-quote">
      <p>&ldquo;{content.text}&rdquo;</p>
      {content.attribution ? (
        <cite>— {content.attribution}</cite>
      ) : null}
    </blockquote>
  );
}

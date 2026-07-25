import type { InstructorPackage } from "@/lib/drive/pricing";
import { formatDrivePrice } from "@/lib/drive/pricing";

export function InstructorPricing({
  packages,
  hourlyRate,
  compact = false,
}: {
  packages: InstructorPackage[];
  hourlyRate: number;
  compact?: boolean;
}) {
  if (compact) {
    const starter = packages.find((pack) => pack.id === "starter") ?? packages[0];
    return (
      <p className="drive-instructor-card__price">
        {formatDrivePrice(hourlyRate)}/hr
        {starter ? (
          <span> · {starter.title} {formatDrivePrice(starter.price)}</span>
        ) : null}
      </p>
    );
  }

  return (
    <section className="drive-profile-pricing" aria-label="Lesson pricing">
      <div className="drive-profile-pricing__header">
        <h2>Prices & packages</h2>
        <p>Sample pricing from {formatDrivePrice(hourlyRate)}/hr · preview only</p>
      </div>
      <div className="drive-profile-pricing__grid">
        {packages.map((pack) => (
          <article
            key={pack.id}
            className={`drive-profile-pricing__card${
              pack.featured ? " drive-profile-pricing__card--featured" : ""
            }`}
          >
            <h3>{pack.title}</h3>
            <p className="drive-profile-pricing__hours">{pack.hours}</p>
            <p className="drive-profile-pricing__price">{formatDrivePrice(pack.price)}</p>
            {pack.originalPrice ? (
              <p className="drive-profile-pricing__was">
                Was {formatDrivePrice(pack.originalPrice)}
              </p>
            ) : null}
            <p className="drive-profile-pricing__rate">
              {pack.rateLabel}
              {pack.saveLabel ? ` · ${pack.saveLabel}` : ""}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

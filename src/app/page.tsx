import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";
import { DRIVE_INSTRUCTORS } from "@/lib/drive/instructors-data";
import { formatDrivePrice } from "@/lib/drive/pricing";
import { formatDistanceMiles } from "@/lib/drive/geo-utils";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4 10 4 4 8-9" />
    </svg>
  );
}

function RoadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 22 10 2M16 22 14 2M12 5v3M12 12v3M12 19v3" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" />
    </svg>
  );
}

function TestIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 5h9M9 10h9M9 15h5M5 5h.01M5 10h.01M5 15h.01M5 20h14" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3v3M19 3v3M3 9h18M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2ZM8 13h3M14 13h3M8 17h3" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 11 2-5h10l2 5M3 13a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5H3v-5ZM6 18v2M18 18v2M7 14h.01M17 14h.01" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17 4.5a3.5 3.5 0 0 1 0 6.5M17 15a3 3 0 0 1 3 3v2" />
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

const paths = [
  {
    label: "Teen first-time driver",
    eyebrow: "Full license journey",
    description:
      "Move from Driver’s Ed and your completion certificate through the permit, professional training, supervised practice, and road test.",
    items: ["Driver’s Ed course", "Permit preparation", "Training and practice roadmap"],
    href: "/get-started?path=teen",
  },
  {
    label: "Adult first-time driver",
    eyebrow: "A flexible route",
    description:
      "Prepare for the permit test, choose professional lessons when they help, practice your skills, and get ready for the road test.",
    items: ["Permit study tools", "Optional driving lessons", "Road-test readiness"],
    href: "/get-started?path=adult",
  },
  {
    label: "Driving lessons only",
    eyebrow: "Start behind the wheel",
    description:
      "Already have a permit or license? Find lessons for skill building, a refresher, local-road confidence, or road-test preparation.",
    items: ["Browse sample lesson options", "Compare example availability", "Preview an instructor"],
    href: "/get-started?path=lessons",
  },
];

const capabilities = [
  {
    title: "Structured online Driver’s Ed",
    description: "Focused California lessons, quizzes, and a clear series-by-series course path.",
    icon: BookIcon,
  },
  {
    title: "Permit-test preparation",
    description: "Topic study, question practice, full exams, explanations, and weak-area review.",
    icon: TestIcon,
  },
  {
    title: "Personal license roadmap",
    description: "See the next milestone from education and permit preparation through the road test.",
    icon: RoadIcon,
  },
  {
    title: "Marketplace preview",
    description: "Compare sample instructor profiles, service areas, vehicles, pricing, and example availability.",
    icon: UsersIcon,
    status: "Preview",
  },
  {
    title: "Scheduling interface preview",
    description: "Explore how a lesson package, pickup location, date, and time could be selected. No booking is created.",
    icon: CalendarIcon,
    status: "Preview",
  },
  {
    title: "Professional + supervised-hour tracking",
    description: "Planned tools will connect professional training and supervised practice to the license journey.",
    icon: ChartIcon,
    status: "Planned",
  },
  {
    title: "Road-test preparation",
    description: "Use practice content and behind-the-wheel lessons to build test-day confidence.",
    icon: CarIcon,
  },
];

const journeySteps = [
  "Complete Driver’s Ed",
  "Get Your Permit",
  "Learn to Drive",
  "Complete Practice",
  "Pass Your Road Test",
];

const faqs = [
  {
    question: "Who is this platform for?",
    answer:
      "It is designed for California teens beginning the full licensing journey, adults learning for the first time, current permit holders, licensed drivers who want a refresher, and students preparing for a road test.",
  },
  {
    question: "Can adults book driving lessons?",
    answer:
      "Yes. Adults can explore the driving-lesson experience without following the teen Driver’s Ed path. Current profiles and availability are marketplace previews rather than live bookings.",
  },
  {
    question: "When can a teen begin behind-the-wheel training?",
    answer:
      "A teen should begin professional behind-the-wheel training only after reaching the applicable permit and education milestones. The platform’s journey view is intended to keep those steps clear; always confirm current requirements with the California DMV.",
  },
  {
    question: "Can I book lessons if I took Driver’s Ed somewhere else?",
    answer:
      "Yes. Permit holders and licensed drivers can explore lesson options without completing this platform’s online course. Live partner booking is not yet available.",
  },
  {
    question: "How do driving-school partnerships work?",
    answer:
      "A future partner experience could present school and lesson information. Partner enrollment, verification, and school-management tools are not currently available.",
  },
];

export default async function RootPage() {
  const session = await getSessionFromCookies();

  if (session) {
    redirect(session.role === "ADMIN" ? "/admin" : "/home");
  }

  const instructorPreview = DRIVE_INSTRUCTORS.slice(0, 3);

  return (
    <main className="public-landing">
      <header className="public-header">
        <div className="public-header__inner">
          <Link href="/" className="public-logo" aria-label="DMV Study home">
            <span className="public-logo__mark" aria-hidden="true"><span /></span>
            <span>DMV Study</span>
          </Link>
          <nav className="public-header__nav" aria-label="Public navigation">
            <a href="#how-it-works">How It Works</a>
            <a href="#drivers-ed">Driver&apos;s Ed</a>
            <a href="#driving-lessons">Driving Lessons</a>
            <a href="#for-parents">For Parents</a>
            <a href="#for-schools">For Driving Schools</a>
          </nav>
          <div className="public-header__actions">
            <Link href="/login" className="public-signin">Sign in</Link>
            <Link href="/get-started" className="public-button public-button--small">
              Start Your License Journey
            </Link>
          </div>
        </div>
      </header>

      <section className="public-hero">
        <div className="public-hero__copy">
          <p className="public-eyebrow">California driver education + lessons</p>
          <h1>From driver&apos;s ed to your California license—all in one place.</h1>
          <p className="public-hero__lead">
            Complete driver&apos;s education, prepare for your permit, explore
            behind-the-wheel lesson options, and
            track every step toward your license.
          </p>
          <div className="public-hero__actions">
            <Link href="/get-started" className="public-button">
              Start Your License Journey <ArrowIcon />
            </Link>
            <Link href="/drive" className="public-button public-button--secondary">
              Find Driving Lessons
            </Link>
          </div>
          <ul className="public-hero__checks">
            <li><CheckIcon />California-focused journey</li>
            <li><CheckIcon />Driver&apos;s Ed and lesson tools</li>
            <li><CheckIcon />Paths for teens and adults</li>
          </ul>
        </div>

        <div className="public-hero__preview" aria-label="License journey product preview">
          <div className="public-preview__top">
            <div>
              <span>YOUR LICENSE JOURNEY</span>
              <strong>A clear next step, every step</strong>
            </div>
            <span className="public-preview__state">CA</span>
          </div>
          <div className="public-preview__route">
            {journeySteps.map((step, index) => (
              <div className={index === 0 ? "is-current" : ""} key={step}>
                <span>{index === 0 ? "✓" : index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
          <div className="public-preview__next">
            <span className="public-preview__next-icon"><BookIcon /></span>
            <div><small>NEXT UP</small><strong>Continue Driver&apos;s Ed</strong></div>
            <ArrowIcon />
          </div>
          <div className="public-preview__lesson">
            <span><CarIcon /></span>
            <p><strong>Need driving lessons?</strong> Compare local options and available times.</p>
          </div>
        </div>
      </section>

      <section className="public-paths" aria-labelledby="paths-title">
        <div className="public-section-heading">
          <p className="public-eyebrow">Choose your path</p>
          <h2 id="paths-title">One platform, built around where you&apos;re starting.</h2>
          <p>
            Choose the goal that fits you. The platform is designed to shape the
            journey around that choice as personalization is introduced.
          </p>
        </div>
        <div className="public-path-grid">
          {paths.map((path, index) => (
            <article className={index === 0 ? "public-path-card is-featured" : "public-path-card"} key={path.label}>
              <span className="public-path-card__number">0{index + 1}</span>
              <p className="public-path-card__eyebrow">{path.eyebrow}</p>
              <h3>{path.label}</h3>
              <p>{path.description}</p>
              <ul>
                {path.items.map((item) => <li key={item}><CheckIcon />{item}</li>)}
              </ul>
              <Link href={path.href}>
                Explore this path <ArrowIcon />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="public-how" id="how-it-works" aria-labelledby="how-title">
        <div className="public-how__intro">
          <p className="public-eyebrow">How it works</p>
          <h2 id="how-title">The teen journey, made easier to follow.</h2>
          <p>
            Keep the big picture in view while the platform helps organize the
            learning, lessons, practice, and preparation inside each stage.
          </p>
        </div>
        <ol className="public-journey">
          {journeySteps.map((step, index) => (
            <li key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
        <p className="public-how__note">
          Requirements vary by age and circumstance. The in-app journey provides
          more context, and students should confirm current rules with the California DMV.
        </p>
      </section>

      <section className="public-capabilities" id="drivers-ed" aria-labelledby="capabilities-title">
        <div className="public-section-heading public-section-heading--left">
          <p className="public-eyebrow">Everything works together</p>
          <h2 id="capabilities-title">More than an online course.</h2>
          <p>
            Study tools, lesson discovery, scheduling, and progress tracking
            connect around one goal: helping each driver know what comes next.
          </p>
        </div>
        <div className="public-capability-grid">
          {capabilities.map(({ title, description, icon: Icon, status }) => (
            <article key={title}>
              <span><Icon /></span>
              <h3>
                {title}
                {status ? <small>{status}</small> : null}
              </h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="public-lessons" id="driving-lessons" aria-labelledby="lessons-title">
        <div className="public-lessons__heading">
          <div>
            <p className="public-eyebrow">Behind-the-wheel lessons</p>
            <h2 id="lessons-title">Find lesson options that fit your needs.</h2>
          </div>
          <div>
            <p>
              Compare the details already available in the platform, then choose
              an instructor and an open time supplied through the lesson experience.
            </p>
            <Link href="/drive" className="public-text-link">
              Find Lessons <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="public-instructor-grid">
          {instructorPreview.map((instructor) => (
            <article className="public-instructor-card" key={instructor.id}>
              <p className="public-eyebrow">Sample instructor</p>
              <div className="public-instructor-card__head">
                <span className="public-instructor-card__avatar" aria-hidden="true">
                  {initials(instructor.name)}
                </span>
                <div>
                  <h3>{instructor.name}</h3>
                  <p>{instructor.drivingSchoolName}</p>
                </div>
                <span className="public-instructor-card__rating" aria-label={`Sample rating ${instructor.rating} out of 5`}>
                  ★ {instructor.rating} sample
                </span>
              </div>
              <dl>
                <div><dt>Lesson price</dt><dd>From {formatDrivePrice(instructor.hourlyRate)}/hr</dd></div>
                <div><dt>Vehicle</dt><dd>{instructor.vehicle} · {instructor.transmission}</dd></div>
                <div><dt>Service area</dt><dd>{instructor.area} · {formatDistanceMiles(instructor.distanceKm)}</dd></div>
                <div><dt>Example availability</dt><dd className="is-available">{instructor.availability}</dd></div>
              </dl>
              <Link href={`/drive/instructors/${instructor.id}`}>
                View Lessons <ArrowIcon />
              </Link>
            </article>
          ))}
        </div>
        <p className="public-lessons__disclosure">
          Marketplace preview uses sample instructor, school, rating, pricing, and
          availability information. Live listings will require partner verification.
        </p>
      </section>

      <section className="public-parents" id="for-parents" aria-labelledby="parents-title">
        <div className="public-parents__visual" aria-hidden="true">
          <div className="public-parent-card">
            <span className="public-parent-card__icon"><UsersIcon /></span>
            <div><small>FAMILY VIEW</small><strong>Stay connected to the journey</strong></div>
          </div>
          <div className="public-parent-progress">
            <span><i /></span>
            <div><strong>Supervised practice</strong><small>Daytime and nighttime hours</small></div>
          </div>
          <div className="public-parent-progress">
            <span><i /></span>
            <div><strong>Upcoming milestones</strong><small>Know what your teen needs next</small></div>
          </div>
        </div>
        <div className="public-parents__copy">
          <p className="public-eyebrow">For parents and guardians</p>
          <h2 id="parents-title">Support the journey without losing the big picture.</h2>
          <p>
            The parent experience is planned to make it easier to follow progress,
            help coordinate lessons, and understand the milestones ahead.
          </p>
          <ul>
            <li><CheckIcon />Follow Driver&apos;s Ed and permit-prep progress</li>
            <li><CheckIcon />Help manage behind-the-wheel lesson bookings</li>
            <li><CheckIcon />Track supervised and nighttime practice</li>
            <li><CheckIcon />See upcoming requirements and road-test readiness</li>
          </ul>
          <span className="public-coming-soon">Parent tools are planned—not yet a live dashboard.</span>
        </div>
      </section>

      <section className="public-trust" aria-labelledby="trust-title">
        <div>
          <p className="public-eyebrow">Built for informed decisions</p>
          <h2 id="trust-title">Clarity at every turn.</h2>
        </div>
        <ul>
          <li><CheckIcon /><span><strong>California-focused journey</strong>Course and roadmap content organized around California learners.</span></li>
          <li><CheckIcon /><span><strong>Marketplace preview</strong>Compare sample school, instructor, vehicle, service-area, and availability details together.</span></li>
          <li><CheckIcon /><span><strong>Example lesson pricing</strong>Preview how hourly prices and packages can be compared.</span></li>
          <li><CheckIcon /><span><strong>Connected learning</strong>Keep recorded study progress and the high-level license roadmap visible in one experience.</span></li>
        </ul>
      </section>

      <section className="public-partners" id="for-schools" aria-labelledby="partners-title">
        <div className="public-partners__icon" aria-hidden="true"><CarIcon /></div>
        <div>
          <p className="public-eyebrow">For driving schools</p>
          <h2 id="partners-title">Preview a future marketplace presence for your school.</h2>
          <p>
            A future partner program could present school, instructor, lesson,
            pricing, and availability information. Enrollment is not currently open.
          </p>
        </div>
        <button
          type="button"
          className="public-button public-button--light"
          aria-disabled="true"
          title="Partner applications are coming soon"
        >
          Partner program
          <span className="public-button__soon">Planned</span>
        </button>
      </section>

      <section className="public-faq" aria-labelledby="faq-title">
        <div className="public-faq__heading">
          <p className="public-eyebrow">Questions, answered</p>
          <h2 id="faq-title">Frequently asked questions</h2>
          <p>Start with the path that matches your situation. You do not have to use every part of the platform.</p>
        </div>
        <div className="public-faq__list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>{faq.question}<span aria-hidden="true">+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="public-final">
        <div>
          <p className="public-eyebrow">Wherever you&apos;re starting</p>
          <h2>Take the next step toward confident driving.</h2>
        </div>
        <div>
          <Link href="/get-started" className="public-button public-button--light">
            Start Your License Journey <ArrowIcon />
          </Link>
          <Link href="/drive" className="public-final__secondary">Find Driving Lessons</Link>
        </div>
      </section>

      <footer className="public-footer" id="legal">
        <div className="public-footer__top">
          <div className="public-footer__brand">
            <Link href="/" className="public-logo">
              <span className="public-logo__mark" aria-hidden="true"><span /></span>
              <span>DMV Study</span>
            </Link>
            <p>Driver education, lesson discovery, and license-journey tools for California learners.</p>
          </div>
          <div>
            <strong>Learn</strong>
            <a href="#drivers-ed">Driver&apos;s Ed</a>
            <a href="#how-it-works">How It Works</a>
            <Link href="/journey">License Journey</Link>
          </div>
          <div>
            <strong>Driving</strong>
            <Link href="/drive">Find Lessons</Link>
            <a href="#for-parents">For Parents</a>
            <a href="#for-schools">For Driving Schools</a>
          </div>
          <div>
            <strong>Account & support</strong>
            <Link href="/login">Sign in</Link>
            <span title="Support page is coming soon">Support <small>Coming soon</small></span>
            <span title="Privacy page is coming soon">Privacy <small>Coming soon</small></span>
            <span title="Terms page is coming soon">Terms <small>Coming soon</small></span>
          </div>
        </div>
        <div className="public-footer__legal">
          <p>
            DMV Study is an independent platform and is not affiliated with,
            endorsed by, or operated by the California Department of Motor Vehicles.
            Requirements can change; confirm official rules at the California DMV.
          </p>
          <p>© {new Date().getFullYear()} DMV Study</p>
        </div>
      </footer>
    </main>
  );
}

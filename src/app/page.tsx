import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";
import { PublicAppShowcase } from "@/components/marketing/public-app-showcase";
import {
  appIntro,
  brokenProcessSteps,
  certificateHighlight,
  faqs,
  heroJourneySteps,
  problemItems,
  schoolBenefits,
  surveyInsights,
  tractionMetrics,
} from "@/lib/marketing/landing-content";

export const metadata: Metadata = {
  title: "DriveEasy – Get Your License in One Simple App",
  description:
    "All-in-one driving school app for students, parents, and licensed schools. DMV-style prep, instructor search, online booking, and progress tracking in one place.",
};

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

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" />
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

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 4 7v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V7l-8-4Z" />
    </svg>
  );
}

const howItWorksSteps = [
  {
    title: "Start free",
    description: "30-hour driver ed or permit prep (18+).",
    icon: BookIcon,
  },
  {
    title: "Earn certificate",
    description: "Free when you finish — others charge $40–$85.",
    icon: ShieldIcon,
  },
  {
    title: "Pick instructor",
    description: "Filter by area, price, language, and availability.",
    icon: UsersIcon,
  },
  {
    title: "Book & track",
    description: "Schedule lessons and follow your journey to test day.",
    icon: CalendarIcon,
  },
] as const;

const REGISTER_DRIVE = "/register?redirect=%2Fdrive";

export default async function RootPage() {
  const session = await getSessionFromCookies();

  if (session) {
    redirect(session.role === "ADMIN" ? "/admin" : "/home");
  }

  return (
    <main className="public-landing">
      <header className="public-header">
        <div className="public-header__inner">
          <Link href="/" className="public-logo" aria-label="DriveEasy home">
            <span className="public-logo__mark" aria-hidden="true">
              <span />
            </span>
            <span>DriveEasy</span>
          </Link>
          <nav className="public-header__nav" aria-label="Public navigation">
            <a href="#problem">Problem</a>
            <a href="#app">App</a>
            <a href="#how-it-works">How it works</a>
            <a href="#schools">Schools</a>
            <a href="#faq">FAQ</a>
          </nav>
          <details className="public-header__menu">
            <summary aria-label="Open menu">Menu</summary>
            <nav aria-label="Mobile navigation">
              <a href="#problem">Problem</a>
              <a href="#app">App</a>
              <a href="#how-it-works">How it works</a>
              <a href="#schools">Schools</a>
              <a href="#faq">FAQ</a>
              <Link href="/register">Start for free</Link>
            </nav>
          </details>
          <div className="public-header__actions">
            <Link href="/login" className="public-signin">
              Sign in
            </Link>
            <Link href="/register" className="public-button public-button--small">
              Start for free
            </Link>
          </div>
        </div>
      </header>

      <section className="public-hero">
        <div className="public-hero__copy">
          <p className="public-eyebrow">All-in-one driving school app</p>
          <h1>Get your driver&apos;s license in one simple app.</h1>
          <p className="public-hero__lead">
            For students, parents, and licensed driving schools in California.
          </p>
          <div className="public-hero__actions">
            <Link href="/register" className="public-button">
              Start for free <ArrowIcon />
            </Link>
            <a href="#app" className="public-button public-button--secondary">
              See the app
            </a>
          </div>
        </div>
        <div className="public-hero__preview" aria-hidden="true">
          <div className="public-preview__top">
            <div>
              <span>License journey</span>
              <strong>One app, every step</strong>
            </div>
            <span className="public-preview__state">CA</span>
          </div>
          <div className="public-preview__route public-preview__route--six">
            {heroJourneySteps.map((step, index) => (
              <div key={step} className={index === 0 ? "is-current" : undefined}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
          <div className="public-preview__next">
            <span className="public-preview__next-icon">
              <BookIcon />
            </span>
            <div>
              <small>Next up</small>
              <strong>Continue Studying</strong>
            </div>
            <ArrowIcon />
          </div>
        </div>
      </section>

      <section className="public-intro" id="intro" aria-labelledby="intro-title">
        <div className="public-intro__panel">
          <div className="public-intro__content">
            <p className="public-intro__eyebrow">{appIntro.eyebrow}</p>
            <h2 id="intro-title">{appIntro.headline}</h2>
            <p className="public-intro__lead">{appIntro.lead}</p>
          </div>
          <footer className="public-intro__footer">
            <p className="public-intro__closing">{appIntro.closing}</p>
            <ul className="public-intro__audiences" aria-label="Who we serve">
              {appIntro.audiences.map((audience) => (
                <li key={audience}>{audience}</li>
              ))}
            </ul>
          </footer>
        </div>
      </section>

      <section className="public-problem" id="problem" aria-labelledby="problem-title">
        <div className="public-section-heading">
          <p className="public-eyebrow">The problem</p>
          <h2 id="problem-title">Six tools. No shared picture.</h2>
        </div>
        <div className="public-problem-grid">
          {problemItems.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <ol className="public-broken-flow__steps" aria-label="Today's disconnected process">
          {brokenProcessSteps.map((step, index) => (
            <li key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="public-how" id="how-it-works" aria-labelledby="how-title">
        <div className="public-how__intro">
          <p className="public-eyebrow">How it works</p>
          <h2 id="how-title">Your path, step by step.</h2>
        </div>
        <ol className="public-steps-four">
          {howItWorksSteps.map((step, index) => (
            <li key={step.title}>
              <span className="public-steps-four__num">{index + 1}</span>
              <span className="public-steps-four__icon">
                <step.icon />
              </span>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="public-how__cta">
          <Link href="/register" className="public-button">
            Start for free <ArrowIcon />
          </Link>
          <Link href={REGISTER_DRIVE} className="public-text-link">
            Find driving lessons <ArrowIcon />
          </Link>
        </div>
      </section>

      <section className="public-certificate-callout" aria-labelledby="certificate-title">
        <div className="public-certificate-callout__copy">
          <p className="public-eyebrow">{certificateHighlight.eyebrow}</p>
          <h2 id="certificate-title">{certificateHighlight.title}</h2>
          <p>{certificateHighlight.description}</p>
        </div>
        <div className="public-certificate-callout__compare" aria-label="Certificate price comparison">
          <div className="public-certificate-callout__price public-certificate-callout__price--ours">
            <span>{certificateHighlight.oursLabel}</span>
            <strong>{certificateHighlight.ours}</strong>
          </div>
          <div className="public-certificate-callout__price public-certificate-callout__price--theirs">
            <span>{certificateHighlight.theirsLabel}</span>
            <strong>{certificateHighlight.theirs}</strong>
          </div>
        </div>
      </section>

      <section className="public-app-intro" id="app" aria-labelledby="app-title">
        <h2 id="app-title" className="public-app-intro__title">
          See the app
        </h2>
        <PublicAppShowcase />
        <p className="public-app-intro__note">
          Not affiliated with the California DMV. Lessons through licensed schools
          and instructors.
        </p>
      </section>

      <section className="public-partners" id="schools" aria-labelledby="schools-title">
        <div className="public-partners__icon" aria-hidden="true">
          <CarIcon />
        </div>
        <div>
          <p className="public-eyebrow">For driving schools</p>
          <h2 id="schools-title">More students. Less admin.</h2>
          <p>
            Keep your license, fleet, and insurance. We send study-ready students
            and handle the online booking flow.
          </p>
          <ul className="public-partners__list">
            {schoolBenefits.map((item) => (
              <li key={item}>
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <a href="mailto:partners@driveeasy.com?subject=School%20partnership" className="public-button public-button--light">
          Partner with us <ArrowIcon />
        </a>
      </section>

      <section className="public-traction" id="traction" aria-labelledby="traction-title">
        <div className="public-section-heading">
          <p className="public-eyebrow">Traction</p>
          <h2 id="traction-title">Validated with real conversations.</h2>
        </div>
        <div className="public-traction-grid">
          {tractionMetrics.map((metric) => (
            <article key={metric.label}>
              <strong>{metric.value}</strong>
              <h3>{metric.label}</h3>
              <p>{metric.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="public-testimonials" aria-labelledby="testimonials-title">
        <div className="public-section-heading">
          <p className="public-eyebrow">Survey results</p>
          <h2 id="testimonials-title">What students, parents, and schools told us.</h2>
        </div>
        <div className="public-testimonial-grid">
          {surveyInsights.map((item) => (
            <blockquote key={item.audience} className="public-testimonial-card public-survey-card">
              <p className="public-survey-card__audience">{item.audience}</p>
              <p>&ldquo;{item.quote}&rdquo;</p>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="public-faq" id="faq" aria-labelledby="faq-title">
        <div className="public-faq__heading">
          <p className="public-eyebrow">FAQ</p>
          <h2 id="faq-title">Quick answers</h2>
        </div>
        <div className="public-faq__list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>
                {faq.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="public-final">
        <div>
          <p className="public-eyebrow">Ready to start?</p>
          <h2>Ready to start your license journey?</h2>
          <p className="public-final__sub">
            Free study path and free certificate. Book lessons when you&apos;re ready. Schools — join the waitlist.
          </p>
        </div>
        <div className="public-final__actions">
          <Link href="/register" className="public-button public-button--light">
            Start for free <ArrowIcon />
          </Link>
          <Link href={REGISTER_DRIVE} className="public-button public-button--secondary">
            Find driving lessons
          </Link>
          <a
            href="mailto:partners@driveeasy.com?subject=School%20partnership"
            className="public-final__secondary"
          >
            Partner with us
          </a>
        </div>
      </section>

      <footer className="public-footer">
        <div className="public-footer__top">
          <div className="public-footer__brand">
            <Link href="/" className="public-logo">
              <span className="public-logo__mark" aria-hidden="true">
                <span />
              </span>
              <span>DriveEasy</span>
            </Link>
            <p>California driver&apos;s ed and lesson booking, simplified.</p>
          </div>
          <div>
            <strong>Product</strong>
            <a href="#app">The app</a>
            <a href="#how-it-works">How it works</a>
            <Link href="/register">Start for free</Link>
          </div>
          <div>
            <strong>Driving</strong>
            <Link href={REGISTER_DRIVE}>Find lessons</Link>
          </div>
          <div>
            <strong>Company</strong>
            <a href="#schools">Partner schools</a>
            <a href="#faq">FAQ</a>
            <Link href="/login">Sign in</Link>
            <span title="Support page coming soon">
              Contact <small>Coming soon</small>
            </span>
            <span title="Privacy page coming soon">
              Privacy <small>Coming soon</small>
            </span>
            <span title="Terms page coming soon">
              Terms <small>Coming soon</small>
            </span>
          </div>
        </div>
        <div className="public-footer__legal">
          <p>
            DriveEasy is an independent platform and is not affiliated with,
            endorsed by, or operated by the California Department of Motor
            Vehicles. Requirements can change; confirm official rules at the
            California DMV.
          </p>
          <p>© {new Date().getFullYear()} DriveEasy</p>
        </div>
      </footer>
    </main>
  );
}

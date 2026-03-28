import "./home.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page">
      <header className="hero">
        <nav className="top-nav" aria-label="Primary">
          <p className="brand">BrightCalm Pediatric Care</p>
          <Link className="nav-link" href="#support">
            Parent Resources
          </Link>
        </nav>

        <div className="hero-inner">
          <p className="eyebrow">Pediatric Anxiety Care Portal</p>
          <h1>Gentle support for brave kids and calmer families.</h1>
          <p className="hero-copy">
            Connect with licensed pediatric anxiety specialists, build a
            personalized care plan, and access tools that help children feel
            safe, heard, and in control.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/intake">
              Start Care Journey
            </Link>
            <Link className="btn btn-secondary" href="#about">
              How It Works
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="trust-strip" aria-label="Highlights">
          <article>
            <h2>Age-Specific Plans</h2>
            <p>Tailored strategies for ages 4-17, built with parents and kids.</p>
          </article>
          <article>
            <h2>Licensed Experts</h2>
            <p>
              Pediatric-focused therapists trained in CBT, exposure, and play
              based care.
            </p>
          </article>
          <article>
            <h2>Family Coaching</h2>
            <p>Weekly guidance to help caregivers respond with confidence.</p>
          </article>
        </section>

        <section className="steps" id="about" aria-label="Care process">
          <h2>Your portal in three simple steps</h2>
          <div className="step-grid">
            <article>
              <p className="step-number">01</p>
              <h3>Intake & Screening</h3>
              <p>
                Complete a short digital intake and child anxiety screener in
                under 10 minutes.
              </p>
            </article>
            <article>
              <p className="step-number">02</p>
              <h3>Match & Meet</h3>
              <p>
                Meet your matched specialist and set goals your child can own.
              </p>
            </article>
            <article>
              <p className="step-number">03</p>
              <h3>Track Progress</h3>
              <p>
                Use mood check-ins and session notes to celebrate growth each
                week.
              </p>
            </article>
          </div>
        </section>

        <section className="support" id="support" aria-label="Support resources">
          <div className="support-card">
            <h2>Resources for parents, schools, and caregivers</h2>
            <p>
              Download coping guides, teacher communication templates, and daily
              routines designed for anxious moments at home and in class.
            </p>
            <Link className="btn btn-primary" href="/intake">
              Explore Support Library
            </Link>
          </div>
        </section>
      </main>

      <footer className="footer" id="start" aria-label="Site footer">
        <section className="footer-cta" aria-label="Consultation call to action">
          <p className="footer-title">Ready when you are.</p>
          <p className="footer-copy">
            Begin with a 20-minute parent consultation and receive a suggested
            care pathway for your child.
          </p>
          <Link className="btn btn-secondary" href="/intake">
            Book First Consultation
          </Link>
        </section>

        <section className="footer-grid" aria-label="Footer links and contact">
          <div>
            <h2>Portal</h2>
            <ul>
              <li>
                <a href="#about">How it Works</a>
              </li>
              <li>
                <a href="#support">Support Library</a>
              </li>
              <li>
                <a href="#">Insurance & Billing</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Care Team</h2>
            <ul>
              <li>
                <a href="#">Meet Specialists</a>
              </li>
              <li>
                <a href="#">Parent Coaching</a>
              </li>
              <li>
                <a href="#">School Collaboration</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li>
                <a href="mailto:hello@brightcalmcare.org">
                  hello@brightcalmcare.org
                </a>
              </li>
              <li>
                <a href="tel:+18005551234">(800) 555-1234</a>
              </li>
              <li>Mon-Fri, 8:00 AM-6:00 PM</li>
            </ul>
          </div>
        </section>

        <section className="footer-bottom" aria-label="Legal">
          <p>© 2026 BrightCalm Pediatric Care. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">HIPAA Notice</a>
          </div>
        </section>
      </footer>
    </div>
  );
}

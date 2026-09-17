import { getContent } from "@/lib/content";
import ContactForm from "./ContactForm";
import RevealScript from "./RevealScript";

export const revalidate = 60; // re-fetch content from the database at most once a minute

export default async function Home() {
  const c = await getContent();
  const whatsappBase = "https://wa.me/918714181898";

  return (
    <>
      <RevealScript />
      <header className="site">
        <div className="wrap nav">
          <a className="brand" href="#home">
            <img src="/logo.png" alt="Growferry" className="logo-img" />
          </a>
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#work">Why Us</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <a
            className="nav-cta"
            href={`${whatsappBase}?text=Hi%20Growferry!%20I%20would%20like%20to%20book%20a%20free%20consultation.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="home" style={{ borderTop: "none" }}>
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow">Digital agency · Kerala, India</div>
              <h1>{c.heroHeadline}</h1>
              <p className="sub">{c.heroSub}</p>
              <div className="hero-actions">
                <a
                  className="btn-primary"
                  href={`${whatsappBase}?text=Hi%20Growferry!%20I%20would%20like%20to%20book%20a%20free%20consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a free consultation
                </a>
                <a className="btn-ghost" href="#services">See our services</a>
              </div>
            </div>
            <div className="hero-art">
              <div className="route-panel">
                <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="route-path"
                    d="M20 170 C 100 190, 140 120, 200 130 C 260 140, 280 60, 380 40"
                    stroke="#c89b3c"
                    strokeWidth="2"
                  />
                  <circle cx="20" cy="170" r="5" fill="#f6f4ee" />
                  <circle cx="200" cy="130" r="4" fill="#e4c983" />
                  <circle cx="380" cy="40" r="6" fill="#c89b3c" />
                  <path
                    d="M368 34 L382 40 L368 48"
                    stroke="#c89b3c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <div className="route-caption">From first idea to a site your customers trust.</div>
              </div>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="tag">Services</div>
              <h2>Everything you need to grow online</h2>
              <p className="desc">
                We handle the design, the build, and the strategy — so you get one team responsible
                for the result, not three vendors to manage.
              </p>
            </div>
            <div className="service-list">
              <div className="service-row reveal">
                <h3>Website Development</h3>
                <p className="desc">
                  Fast, modern websites built with Next.js and React, designed to convert visitors
                  into customers.
                </p>
              </div>
              <div className="service-row reveal">
                <h3>UI / UX Design</h3>
                <p className="desc">
                  Interfaces built around how people actually use your product, from first click
                  through to checkout.
                </p>
              </div>
              <div className="service-row reveal">
                <h3>Branding &amp; Graphic Design</h3>
                <p className="desc">
                  A visual identity that stays consistent everywhere your business shows up, online
                  and off.
                </p>
              </div>
              <div className="service-row reveal">
                <h3>Digital Marketing</h3>
                <p className="desc">
                  Campaigns built on data, not guesswork, to bring the right people to your site and
                  keep them coming back.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="why" id="work">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="tag">Why Growferry</div>
              <h2>What working with us looks like</h2>
              <p className="desc">
                We build modern digital solutions and stay accountable for how they perform after
                launch.
              </p>
            </div>
            <div className="why-grid">
              <div className="why-item reveal">
                <h3>Fast delivery</h3>
                <p>We keep timelines tight without cutting corners on quality.</p>
              </div>
              <div className="why-item reveal">
                <h3>Fully responsive</h3>
                <p>Every site we build works cleanly on phones, tablets, and desktops.</p>
              </div>
              <div className="why-item reveal">
                <h3>Custom solutions</h3>
                <p>We design around your business and goals, not a one-size template.</p>
              </div>
              <div className="why-item reveal">
                <h3>Dedicated support</h3>
                <p>We stay reachable after your site goes live, not just before.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="wrap about-grid">
            <div className="about-copy">
              <div className="section-head reveal" style={{ marginBottom: 24 }}>
                <div className="tag">About Growferry</div>
                <h2>A digital partner, not just a vendor</h2>
              </div>
              <p>{c.aboutText}</p>
              <p style={{ marginTop: 16 }}>
                We believe every business deserves a strong, honest online presence, and we build
                every site to reflect that.
              </p>
              <div className="stats-row reveal">
                <div className="stat">
                  <b data-count="50" data-suffix="+">0</b>
                  <span>Projects delivered</span>
                </div>
                <div className="stat">
                  <b data-count="30" data-suffix="+">0</b>
                  <span>Happy clients</span>
                </div>
                <div className="stat">
                  <b data-count="100" data-suffix="%">0</b>
                  <span>Commitment</span>
                </div>
              </div>
            </div>
            <div className="mv-list">
              <div className="mv-item reveal">
                <h3>Our mission</h3>
                <p>{c.missionText}</p>
              </div>
              <div className="mv-item reveal">
                <h3>Our vision</h3>
                <p>{c.visionText}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="wrap contact-grid">
            <div className="contact-info">
              <h2>Have a project in mind?</h2>
              <p className="desc">Tell us what you&apos;re building and we&apos;ll get back to you within a day.</p>
              <div className="contact-rows reveal">
                <div className="row">
                  <span className="label">Email</span>
                  <span>{c.email}</span>
                </div>
                <div className="row">
                  <span className="label">Phone</span>
                  <span>{c.phone}</span>
                </div>
                <div className="row">
                  <span className="label">Location</span>
                  <span>{c.location}</span>
                </div>
              </div>
            </div>
            <div className="contact-panel reveal">
              <h3>Send us a message</h3>
              <p>Fill this in and it goes straight into our inbox — most messages get a same-day reply.</p>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site">
        <div className="wrap foot-row">
          <span>Growferry</span>
          <span>
            © {new Date().getFullYear()} Growferry. All rights reserved.
            <a href="/admin" className="admin-dot" aria-label="Site admin" title=""></a>
          </span>
        </div>
      </footer>
    </>
  );
}

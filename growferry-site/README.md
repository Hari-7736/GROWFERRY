# Growferry website

A dynamic version of the Growferry site: page content and contact-form
messages are stored in a real Postgres database instead of the browser.
There's a hidden admin area at `/admin` (a small dot next to the
copyright line in the footer links there) where you can edit the text on
the page and read messages people send through the contact form.

## What's different from a static site

- **Content lives in a database**, not in the HTML. Editing it from `/admin`
  changes what every visitor sees, everywhere, not just on your own browser.
- **Contact form submissions are saved to the database** and, if you set up
  the optional email step below, also emailed to you.
- **Admin login is real**: a username + password you choose, checked on the
  server, with a signed session cookie — not a password stored in the page.

## 1. Get a Postgres database (pick one, both are free to start)

**Option A — Neon (recommended, integrates with Vercel in one click)**
1. Go to [neon.tech](https://neon.tech) and create a free project.
2. Copy the connection string it gives you (starts with `postgresql://`).

**Option B — Vercel Postgres**
1. In your Vercel project → **Storage** tab → **Create Database** → Postgres.
2. Vercel adds the connection string for you automatically.

**Option C — AWS RDS**, if you'd rather host it there: create a Postgres
instance, make sure it allows connections from the internet (or from
Vercel's IP ranges), and use its connection string the same way as the
options above. No code changes are needed — Prisma (the database layer
this project uses) talks to any standard Postgres database the same way.

## 2. Set environment variables

Copy `.env.example` to `.env.local` for local development, and add the same
variables in your Vercel project under **Settings → Environment Variables**
for the live site:

- `DATABASE_URL` — the connection string from step 1
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — your own admin login
- `SESSION_SECRET` — a long random string (the `.env.example` file shows a
  one-line command to generate one)
- `SITE_URL` — your live URL, e.g. `https://growferry.vercel.app`
- `RESEND_API_KEY` / `CONTACT_TO_EMAIL` — optional. Leave blank and contact
  messages are still saved to the database, just not emailed to you. To turn
  emailing on, create a free key at [resend.com](https://resend.com).

## 3. Push to GitHub and deploy on Vercel

Same flow as your current site: push this folder to your GitHub repo and
connect it in Vercel. On the first deploy, Vercel runs `npm install` and
then the `build` script, which also creates the database tables for you
(`prisma migrate deploy`) — you don't need to run anything by hand.

## 4. Log in

Visit `yoursite.com/admin` and sign in with the `ADMIN_USERNAME` /
`ADMIN_PASSWORD` you set. From there you can edit the page text and see
contact form messages.

## Local development

```
npm install
npx prisma migrate dev --name init   # creates the tables on your database
npm run dev
```

## About search ranking

This project includes the technical SEO groundwork — page titles and
descriptions, Open Graph and Twitter preview tags, a sitemap, a robots.txt
file, and structured business data for Google. That's the part a website's
code can do.

No one can guarantee a #1 spot in Google's organic results or a place in
its paid ads — organic ranking depends on Google's own algorithm, content,
and other sites linking to yours over time, and appearing in ads specifically
requires running a paid Google Ads campaign, which is a separate service you
set up and fund directly with Google, not something built into the website.

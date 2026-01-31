# Job Aggregator (AI‑Assisted)

A minimal, developer‑friendly that **automatically collects frontend job offers from multiple sources, filters them using deterministic rules + AI classification, and delivers a daily curated summary** (email / Slack / Telegram).

This project is intentionally **not a full job board**. It is a personal productivity tool designed to eliminate manual browsing across multiple job portals.

---

## 🚀 Project Goals

- Eliminate daily manual searching across job portals
- Deliver **high‑signal frontend job offers only**
- Keep the system **simple, transparent, and controllable**
- Use AI where it actually adds value (classification & cleanup)
- Be buildable in **1–2 evenings**

Non‑goals:

- Public job board
- User accounts
- Full‑text search UI
- Perfect data completeness

---

## ✨ Features (MVP Scope)

### Core

- 🔄 Daily automated job fetching (cron‑based)
- 🌐 Multiple data sources (RSS / JSON / light scraping)
- 🧹 Offer normalization (title, salary, location, description)
- 🤖 AI‑based classification:
  - frontend vs non‑frontend
  - seniority detection
  - tech stack extraction
  - spam / junk filtering
- 📬 Daily summary delivery:
  - Email
  - Slack webhook
  - Telegram bot (optional)

### Filtering

- Frontend roles only
- Location (remote / city)
- Salary range (when available)
- Seniority level
- Technology keywords (Vue / React / etc.)

---

## 🧠 Why AI Is Used Here

AI **does not scrape websites**.

It is used strictly for:

- Semantic classification ("is this really frontend?")
- Normalizing inconsistent salary descriptions
- Extracting technologies from free‑text descriptions
- Rejecting low‑quality or agency spam offers

This keeps the system:

- Deterministic
- Auditable
- Cheap to run

---

## 🧱 Tech Stack

### Runtime

- **Node.js** (LTS)

### Data Fetching

- RSS parsing
- JSON endpoints (where available)
- Light HTML scraping (last resort)

### AI

- **OpenAI API** (classification only)

### Storage

- SQLite **or** local JSON files

### Scheduling

- `node-cron` **or** GitHub Actions (cron)

### Delivery

- SMTP (email)
- Slack Incoming Webhooks
- Telegram Bot API (optional)

---

## 🗂️ Project Structure

```
job-aggregator/
├── src/
│   ├── fetchers/        # Data source integrations
│   │   ├── nofluffjobs.js
│   │   ├── justjoinit.js
│   │   └── ...
│   ├── normalizer/      # Data normalization logic
│   ├── ai/              # AI prompt & classification logic
│   ├── filters/         # Deterministic filtering rules
│   ├── storage/         # SQLite / JSON persistence
│   ├── notifier/        # Email / Slack / Telegram
│   ├── config.js        # User filters & thresholds
│   └── index.js         # Main entry point
├── data/                # Local storage
├── .env
├── package.json
└── README.md
```

---

## 🧩 High‑Level Architecture

```
[ Cron / Scheduler ]
          ↓
[ Fetch Job Offers ]
          ↓
[ Normalize Data ]
          ↓
[ AI Classification ]
          ↓
[ Deterministic Filters ]
          ↓
[ Deduplication ]
          ↓
[ Daily Summary Output ]
```

Each step is isolated and replaceable.

---

## 🔄 How It Works (Step by Step)

1. **Scheduler triggers the job** (once per day)
2. Fetchers collect raw offers from selected sources
3. Raw offers are normalized into a unified format
4. AI classifies each offer and enriches metadata
5. Hard filters remove irrelevant or low‑quality offers
6. Previously seen offers are deduplicated
7. A daily summary is generated and sent

---

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18
- OpenAI API key

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```
OPENAI_API_KEY=your_key_here
EMAIL_HOST=...
EMAIL_USER=...
EMAIL_PASS=...
SLACK_WEBHOOK_URL=...
```

### Configuration

Edit `src/config.js`:

- preferred locations
- minimum salary
- allowed tech stack
- delivery method

### Run Manually

```bash
node src/index.js
```

### Run Daily (Cron)

Using node‑cron or GitHub Actions:

```bash
0 8 * * * node src/index.js
```

---

## 📬 Example Output

```
🔥 Frontend Jobs – 2026‑01‑31

1. Frontend Vue Developer – Remote – 18–22k B2B
2. Frontend React Engineer – Kraków – 15–19k UoP
3. Senior Frontend – Remote – 22–26k B2B

(7 offers rejected as spam or non‑frontend)
```

---

## 🗺️ Roadmap

### Short Term

- Offer scoring (salary + stack + location)
- Better salary normalization
- Company blacklist / whitelist

### Mid Term

- History & trend tracking
- Click tracking (what you open)
- Multiple filter profiles

### Long Term (Optional)

- Minimal web dashboard
- Saved searches
- Public read‑only mode

---

## ⚠️ Legal & Ethical Notes

- Respect robots.txt and platform terms
- Prefer RSS and public APIs
- This project is intended for **personal use**

---

## 🧠 Philosophy

> This project optimizes for **signal over completeness**.
> Missing an offer is acceptable.
> Wasting time scrolling junk is not.

---

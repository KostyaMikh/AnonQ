# AnonQ — Deployment Guide

## Overview

- **Hosting**: Vercel (free)
- **Database**: Supabase (free Postgres)
- **Auth**: JWT tokens, bcrypt passwords
- **Email**: EmailJS (free, configured in the UI)

---

## Step 1 — Push to GitHub

If not pushed yet, run in your terminal:

```bash
cd "c:\Kostia Project\Websites\testing\anonq"
git push -u origin master
```

GitHub will ask for credentials:
- **Username**: your GitHub username
- **Password**: a Personal Access Token (NOT your account password)

To create a token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → tick **repo** → copy the token
3. Paste it as the password when Git prompts

---

## Step 2 — Set up Supabase

1. Go to [supabase.com](https://supabase.com) → create a new project
2. Wait for it to provision (~1 min)
3. Go to **SQL Editor** → **New query** → paste the contents of `schema.sql` → **Run**
4. Go to **Settings → API** and copy:
   - **Project URL** → `https://xxxx.supabase.co`
   - **service_role** key (under "Project API keys" — use service_role, NOT anon)

---

## Step 3 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Click **Import Git Repository** → connect GitHub if not connected → select **AnonQ**
3. Vercel auto-detects the project. Leave all settings as default.
4. Before clicking Deploy, go to **Environment Variables** and add these three:

| Name | Value |
|---|---|
| `SUPABASE_URL` | your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | your Supabase service_role key |
| `JWT_SECRET` | any long random string (e.g. paste output of `openssl rand -hex 32`) |

5. Click **Deploy** — takes ~30 seconds.

Your app will be live at `https://anon-q.vercel.app` (or similar).

---

## Step 4 — Set up EmailJS (optional)

This enables sending anonymous questions to people who don't have an account.

1. Go to [emailjs.com](https://emailjs.com) → create free account
2. **Email Services** → Add Service → connect Gmail or Outlook
3. **Email Templates** → Create Template with this content:

**Subject:**
```
💬 Someone sent you an anonymous question on AnonQ
```

**Body:**
```
Hey!

Someone sent you an anonymous question anonymously:

❝ {{question}} ❞

To read it and reply, sign up for free:
{{site_url}}

— The AnonQ Team
```

Set **To Email** field → `{{to_email}}`

4. Copy your **Public Key**, **Service ID**, **Template ID**
5. On your live site → Find page → "By Email" tab → paste the three values → Save & activate

---

## Step 5 — Future updates

Whenever you make changes:

```bash
cd "c:\Kostia Project\Websites\testing\anonq"
git add .
git commit -m "describe your change"
git push
```

Vercel auto-deploys on every push to `master`. No manual steps needed.

---

## Project structure

```
anonq/
├── index.html          # Landing page
├── register.html       # Sign up
├── login.html          # Log in
├── dashboard.html      # Private inbox + answer questions
├── ask.html            # Public shareable page (?u=username)
├── find.html           # Find user by username/phone/telegram/email
├── api.js              # Frontend API client
├── style.css           # All styles + themes
├── themes.js           # Theme switcher (10 themes)
├── theme-init.js       # Flash-free theme loader
├── schema.sql          # Run once in Supabase SQL editor
├── package.json        # Dependencies
├── vercel.json         # Vercel config
├── .env.example        # Copy to .env for local dev
├── .gitignore
└── api/
    ├── _lib.js                  # Shared: Supabase client, JWT, CORS
    ├── auth/
    │   ├── register.js          # POST /api/auth/register
    │   ├── login.js             # POST /api/auth/login
    │   └── me.js                # GET  /api/auth/me
    ├── questions/
    │   ├── ask.js               # POST   /api/questions/ask
    │   ├── list.js              # GET    /api/questions/list
    │   ├── answer.js            # PATCH  /api/questions/answer
    │   └── delete.js            # DELETE /api/questions/delete
    └── users/
        ├── find.js              # GET /api/users/find
        └── profile.js           # GET /api/users/profile
```

---

## Local development

```bash
npm install
npm run dev   # starts vercel dev on http://localhost:3000
```

You need a `.env` file (copy from `.env.example`) with your Supabase credentials.

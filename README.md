# CodeGate 🚀
---
### A full-stack technical interview platform with live video calls, collaborative code editing, interview scheduling, and role-based access — built for engineering teams that take hiring seriously.
---
### LIVE DEMO: https://codegate-indol.vercel.app/

<img width="1896" height="940" alt="Screenshot 2026-04-19 163626" src="https://github.com/user-attachments/assets/3b4e5caf-dd62-4f20-934b-9297d904bcb7" />

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Auth | Clerk |
| Database | Convex |
| Video & Audio | Stream Video SDK |
| UI Components | shadcn/ui + Tailwind CSS |
| Webhooks | Svix |

---

## Features

- 🎥 **HD Video Interviews** — Real-time video calls powered by Stream
- 💻 **Collaborative Code Editor** — Live code editing during interviews
- 📅 **Interview Scheduling** — Schedule and manage interviews with candidates
- 👥 **Role-Based Access** — Separate flows for interviewers and candidates
- 🔒 **Secure Auth** — Google OAuth and email/password via Clerk
- 🌙 **Dark Mode** — Full light/dark theme support

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com) account
- A [Convex](https://convex.dev) account
- A [Stream](https://getstream.io) account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/codegate.git
cd codegate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Convex
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url

# Stream
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key
```

> ⚠️ Make sure `NEXT_PUBLIC_STREAM_API_KEY` uses uppercase `KEY` — lowercase will silently fail.

### 4. Set up Convex

```bash
npx convex dev
```

This starts the Convex dev server and syncs your schema and functions.

### 5. Set up Clerk Webhook

1. Go to **Clerk Dashboard → Webhooks → Add Endpoint**
2. Set the URL to: `https://your-domain.com/api/clerk-webhook`  
   (Use [ngrok](https://ngrok.com) for local development)
3. Subscribe to the `user.created` event
4. Copy the **Signing Secret** and add it as `CLERK_WEBHOOK_SECRET` in `.env.local`

### 6. Add `unsafeMetadata` to Clerk session token

1. Go to **Clerk Dashboard → Configure → Sessions**
2. Under **Customize session token**, add:
```json
{
  "unsafeMetadata": "{{user.unsafe_metadata}}"
}
```
3. Save

This allows the middleware to read the user's role from the session token.

### 7. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
├── app/
│   ├── (root)/
│   │   ├── page.tsx              # Home page (landing + dashboard)
│   │   ├── select-role/
│   │   │   └── page.tsx          # Role selection after sign-up
│   │   ├── meeting/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Meeting room
│   │   ├── schedule/
│   │   │   └── page.tsx          # Interview scheduling (interviewers)
│   │   └── recordings/
│   │       └── page.tsx          # Past recordings
│   └── layout.tsx
│
├── components/
│   ├── providers/
│   │   └── stream-client-provider.tsx   # Stream video client setup
│   ├── meeting-room.tsx                 # Video + code editor layout
│   ├── code-editor.tsx                  # Collaborative code editor
│   ├── meeting-card.tsx                 # Interview card component
│   ├── meeting-modal.tsx                # Start/join meeting modal
│   ├── navbar.tsx                       # Top navigation bar
│   └── end-call-button.tsx             # End call for interviewers
│
├── convex/
│   ├── schema.ts                # Database schema
│   ├── users.ts                 # User mutations & queries
│   ├── interviews.ts            # Interview mutations & queries
│   └── http.ts                  # Clerk webhook handler
│
├── hooks/
│   └── useUserRole.ts           # Hook to get current user role
│
├── actions/
│   └── stream.actions.ts        # Stream token provider (server action)
│
├── constants/
│   └── index.ts                 # QUICK_ACTIONS, TIME_SLOTS, CODING_QUESTIONS
│
├── middleware.ts                # Auth + role-based routing
└── types/
    └── globals.d.ts             # Clerk session claims type extensions
```

---

## User Roles

### Interviewer
- Create and schedule interviews
- Start instant meetings
- Access the code editor during calls
- End calls for all participants
- View past recordings

### Candidate
- View scheduled interviews
- Join meetings via link or ID
- Access the code editor during calls

After signing up, users are redirected to `/select-role` to choose their role. The role is saved to Clerk's `unsafeMetadata` and synced to Convex.

---

## How It Works

### Authentication Flow

```
Sign up → /select-role → Choose role → Saved to Clerk + Convex → Home
```

The middleware checks for the `user-role` cookie on every request. If a signed-in user has no role, they are redirected to `/select-role`.

### Interview Flow

```
Interviewer schedules interview → Convex stores it → Stream call created
→ Both parties join → Live video + code editor → Interview ends
```

### Webhook Flow

```
User signs up on Clerk → Clerk fires user.created webhook
→ /api/clerk-webhook receives it → Convex syncUser mutation runs
→ User record created in database
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk public key |
| `CLERK_SECRET_KEY` | ✅ | Clerk secret key |
| `CLERK_WEBHOOK_SECRET` | ✅ | Svix webhook signing secret |
| `NEXT_PUBLIC_CONVEX_URL` | ✅ | Convex deployment URL |
| `NEXT_PUBLIC_STREAM_API_KEY` | ✅ | Stream API key (must be uppercase KEY) |
| `STREAM_SECRET_KEY` | ✅ | Stream secret key |

---

## Common Issues

**Hydration errors on dialog open**  
Caused by `new Date()` or Clerk's `user` being different between server and client. Fixed by initializing `date` as `null` and `interviewerIds` as `[]` with a `useEffect` to sync the user id.

**Stream WebSocket connection fails**  
Check that `NEXT_PUBLIC_STREAM_API_KEY` uses uppercase `KEY`. Also verify your `STREAM_SECRET_KEY` is correct and the token provider is returning a valid token.

**User stuck on `/select-role` after choosing role**  
Make sure `unsafeMetadata` is added to the Clerk session token in the dashboard (see setup step 6). Without it, the middleware always sees an empty role.

**Clerk webhook not firing**  
Ensure the webhook endpoint URL is correct and the `user.created` event is subscribed. Use ngrok for local testing and verify the `CLERK_WEBHOOK_SECRET` matches the signing secret in the Clerk dashboard.

---

## License

MIT

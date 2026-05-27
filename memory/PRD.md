# Promillo - Trinkspiel-Hub PRD

## Original Problem Statement
User wollte ein Lovable-Projekt (`promillo-main.zip`) nach Emergent importieren und lauffähig machen.

## Project Overview
**Promillo** ist eine Trinkspiel-Sammlung mit folgenden Spielen:
- 🎭 Imposter (mit Online-Lobby via Supabase)
- 🃏 Poker (mit Online-Lobby via Supabase)
- ❓ Wer wird Bierionär? (Quiz)
- 🤪 Der Dümmste fliegt
- 🎨 Picili
- 🔄 Nacheinander

## Tech Stack
- **Framework:** TanStack Start (React 19 + TypeScript)
- **Build:** Vite 7 + Bun
- **Styling:** TailwindCSS 4 + shadcn/ui (Radix UI)
- **Backend:** Supabase (Auth + DB + Realtime Lobbies)
- **Deployment Target:** Cloudflare Workers (`wrangler.jsonc`)

## Architecture
- `/app/frontend` – TanStack Start app (komplettes Lovable-Projekt)
- `/app/frontend/supabase/migrations` – DB-Schema für Online-Lobbies (Imposter & Poker)
- `/app/frontend/src/integrations/supabase` – Supabase-Client + Auth-Middleware
- Supabase URL: `https://ituosrwsgwtneflzwyop.supabase.co` (aus .env)

## Setup Decisions (User-Bestätigt)
1. ✅ Supabase als Backend beibehalten (nicht zu MongoDB/FastAPI migrieren)
2. ✅ `/app` komplett ersetzt mit Promillo-Projekt
3. ✅ Bun als Package Manager installiert (1.3.14)
4. ✅ Cloudflare-Plugin aktiv gelassen
5. ✅ Ziel: Projekt lauffähig (erreicht)

## Implementierung (27.05.2026)
- Bun installiert und Dependencies via `bun install` eingespielt (506 Pakete)
- `start` Script zu `package.json` hinzugefügt (Supervisor ruft `yarn start`)
- `vite.config.ts` erweitert: Port 3000, Host 0.0.0.0, strictPort, HMR clientPort 443
- Backend-Supervisor (FastAPI) gestoppt – nicht benötigt da Supabase
- Frontend läuft via Supervisor unter Port 3000
- Preview erfolgreich: Homepage rendert mit allen 6 Spielen

## Status
- ✅ App startet erfolgreich
- ✅ Routing funktioniert (TanStack Router)
- ✅ Supabase-Credentials aus Original-`.env` eingebunden
- ✅ Assets (Logos, Spiele-Bilder) laden korrekt

## Backlog / Next Steps
- P1: Funktionalität der Online-Lobbies (Imposter/Poker) end-to-end testen
- P1: Audio/Click-Sounds testen
- P2: Cloudflare-Deployment-Pfad (`wrangler deploy`) prüfen wenn benötigt
- P2: PWA-Manifest validieren (manifest.webmanifest)

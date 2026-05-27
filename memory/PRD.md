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
- TanStack Start (React 19 + TypeScript), Vite 7 + Bun, TailwindCSS 4 + shadcn/ui
- Supabase (Auth + DB + Realtime Lobbies)
- Cloudflare Workers Deployment-Target

## What's Implemented (chronological)

### 27.05.2026 – Initial Import
- Lovable-Projekt nach `/app/frontend` kopiert (komplette Codebase)
- Bun 1.3.14 installiert + 506 Dependencies via `bun install`
- `vite.config.ts` angepasst (Port 3000, Host 0.0.0.0, HMR clientPort 443)
- `start` Script zu `package.json` hinzugefügt (für Supervisor `yarn start`)
- Backend-Supervisor gestoppt (Supabase übernimmt Backend)

### 27.05.2026 – Feature: Share Lobby & Bug Fix
- **NEU: `ShareLobbyDialog`-Komponente** (`/src/components/ShareLobbyDialog.tsx`)
  - Generiert QR-Code (via `qrcode` library, PNG dataURL, 280x280)
  - Zeigt Lobby-Code + Shareable Join-URL
  - Copy-to-Clipboard für Code & Link
  - Native Web Share API für Mobile (`navigator.share`)
- **NEU: Share-Button** in PokerRunout + ImposterOnline (Header)
- **NEU: Deep-Link Auto-Join** via `?code=XXXX` Query-Param
  - `/poker?code=ABCD` → öffnet direkt Spieler-Join-View mit vorausgefülltem Code
  - `/imposter?code=ABCD` → öffnet Online-Lobby Join-Flow mit Code
  - Code-Validierung via TanStack Router `validateSearch`
- **BUG FIX: Chips-Switch in PokerRunout**
  - Root Cause: Supabase Realtime postgres_changes liefert Updates nicht zurück
  - Fix: Optimistic local state update vor DB write in `updateLobby`, `assignSeat`, `kickPlayer`
  - Realtime bleibt als Sync-Layer aktiv; lokale State-Updates garantieren UI-Responsivität
- Neues Dependency: `qrcode@1.5.4` + `@types/qrcode@1.5.6`

## Architecture
- `/app/frontend` – TanStack Start app
- `/app/frontend/supabase/migrations` – DB-Schema für Online-Lobbies (Imposter & Poker)
- `/app/frontend/src/integrations/supabase` – Supabase-Client + Auth-Middleware
- Supabase URL: `https://ituosrwsgwtneflzwyop.supabase.co`

## Tested
- ✅ App startet, Homepage rendert mit allen 6 Spielen
- ✅ Chips-Switch toggelt jetzt zwischen `checked` ↔ `unchecked`
- ✅ Share-Dialog öffnet mit funktionierendem QR-Code (PNG 280x280)
- ✅ Join-URL `?code=XXXX` füllt Code-Feld automatisch im Player-View

## Backlog
- P1: Imposter-Lobby Share-Flow end-to-end testen (lobby state vor join)
- P2: Wenn jemand QR scannt → eigenes Modal `Mit Lobby XXXX verbinden?` als UX-Verfeinerung
- P2: Real-time Bug: prüfen, ob Realtime im Supabase-Projekt für `poker_lobbies` & `imposter_lobbies` aktiviert ist (Dashboard-Setting)
- P2: Cloudflare-Deployment (`wrangler deploy`)


Ich baue die Seite zu einer Trinkspiel-Plattform aus mit Hub, neuem Imposter-Spiel und Verbesserungen am Quiz.

## 1. Hub / Hauptmenü

- Neue Route `/` wird zum **Spiele-Hub** mit zwei Karten:
  - 🍻 **Sauf-Quiz** (bisheriges Spiel)
  - 🕵️ **Imposter** (neu)
- Jedes Spiel bekommt oben links einen **„← Hauptmenü"**-Button. Bei laufendem Quiz mit Bestätigungsdialog, damit man den Fortschritt nicht versehentlich verliert.

## 2. Imposter-Spiel

Routen: `/imposter` (Setup), `/imposter/local` (lokaler Modus), `/imposter/lobby/$code` (online).

### Gemeinsame Mechanik
- Vor dem Spiel: Spieler eingeben (lokal) oder beitreten (online), Kategorien an-/abwählen, Schalter „Imposter bekommt Tipp" (Hinweiswort).
- Zufällig ein Spieler = Imposter, alle anderen sehen dasselbe Wort.
- Bei aktiviertem Tipp bekommt der Imposter ein verwandtes Hinweiswort (z.B. Hauptwort „Pizza" → Tipp „Italienisches Essen").
- Random ausgewählt wer beginnt.
- Großer Button **„Imposter aufdecken"** beendet die Runde, zeigt Imposter + Wort.
- Button **„Neue Runde"** für nächste Partie mit gleichen Spielern.

### Lokaler Modus (Handy herumgeben)
- Reihum Karte pro Spieler: „Gib das Handy an **Name** weiter".
- Tap/Swipe deckt das Wort kurz auf, danach „Weiter" → nächster Spieler.
- Nach allen Spielern: Startspieler + „Imposter aufdecken"-Button.

### Online-Lobby
- Host erstellt Lobby → Link (`/imposter/lobby/ABCD`) zum Teilen, plus QR-fähiger Code.
- Beitretende geben ihren Namen ein.
- Host sieht Spielerliste live, kann Kategorien wählen, Tipp-Schalter setzen, Spiel starten.
- Jeder Spieler sieht auf seinem eigenen Handy sein Wort (bzw. „Du bist der Imposter" + optional Tipp).
- Erfordert **Lovable Cloud** (für Realtime-Sync via Supabase Realtime / Postgres-Tabellen für Lobbies, Spieler, Spielzustand).

### Kategorien (jeweils 50+ Begriffe)
Einfache Wörter, Trends, Spicy, Clash Royale, Fortnite, Marken, Gesellschaftsspiele, Filme & Serien, Fußball, Superhelden, Stars & Promis.
Pro Begriff hinterlege ich auch ein passendes Tipp-Wort.

## 3. Quiz-Verbesserungen

- **Konfigurierbare Schlücke pro Schwierigkeit** im PlayerSetup (3 Slider/Stepper: leicht/mittel/schwer, Default 1/2/3).
- **Konfigurierbare Fragen pro Runde** (Stepper, Default 4, Range 1–10).
- **Bugfix Abfüllen/Revanche**: Aktuell wird `sipCount` zwar verdoppelt, aber durch die +/-Buttons mit `remaining`-Limit korrekt. Ich prüfe ob das Limit beim Revanche-Spieler tatsächlich verdoppelt ankommt (Verdacht: irgendwo wird `baseSips` statt `sipCount` als Maximum benutzt). Fix: konsistent `sipCount` als Cap nutzen.
- **„Hauptmenü"-Button** im Quiz-Header (mit Bestätigungsdialog).
- **Fragen-Prüfung**: Bei >600 Fragen kann ich nicht jede einzeln verifizieren. Ich gehe mit einem Skript durch und prüfe automatisch auf: Duplikate, mehrdeutige Formulierungen („welcher … ist …" ohne klaren Kontext), `answer`-Index gültig, alle Optionen unterschiedlich, Tippfehler in häufigen Wörtern. Offensichtliche Fehler korrigiere ich, Unklarheiten markiere ich im Antwortchat.

## 4. Technisches

- **Lovable Cloud** wird aktiviert. Tabellen: `imposter_lobbies` (code, host_id, settings, status, word, imposter_player_id), `imposter_players` (lobby_id, name, joined_at). Realtime via Supabase channels.
- Pfade:
  - `src/routes/index.tsx` → Hub
  - `src/routes/quiz.tsx` → bisheriges Quiz
  - `src/routes/imposter.tsx`, `src/routes/imposter.local.tsx`, `src/routes/imposter.lobby.$code.tsx`
  - `src/lib/imposter-words.ts` (Kategorien + Wörter + Tipps)
  - `src/components/imposter/*` (Setup, LocalGame, LobbyHost, LobbyClient, RevealCard)

## 5. Was nicht im Scope ist

- Persistenz/Cookies fürs Imposter-Spiel (Sessions sind kurz, nicht nötig).
- Komplette manuelle Review aller 600+ Quizfragen — nur automatisierte Checks + offensichtliche Fehler.

Wenn das passt, geht's los. Falls du das Online-Lobby-Feature überspringen willst (spart Backend-Setup), sag kurz Bescheid.

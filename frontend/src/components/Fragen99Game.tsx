import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  X,
  Play,
  RotateCw,
  Trophy,
  Beer,
  MessageCircleQuestion,
  ArrowRight,
  Smartphone,
  Sparkles,
} from "lucide-react";
import {
  FRAGEN99_CATEGORIES,
  FRAGEN99_LIMIT,
  pickQuestion,
  sipsForQuestion,
  type Fragen99Category,
  type Fragen99Card,
} from "@/lib/fragen99-questions";
import { saveJSON, loadJSON } from "@/lib/persist";
import { playClick } from "@/hooks/use-click-sound";

type Phase = "setup" | "reading" | "handover" | "finished";

interface Saved {
  players: string[];
  cats: Fragen99Category[];
}

const STORAGE_KEY = "fragen99-setup-v2";
const DEFAULT_CATS: Fragen99Category[] = ["klassisch"];

const CAT_BADGE: Record<Fragen99Category, { label: string; className: string }> = {
  klassisch: { label: "Klassisch", className: "bg-sky-500/15 text-sky-700 border-sky-500/40" },
  action: { label: "Action", className: "bg-amber-500/15 text-amber-800 border-amber-500/40" },
  hotspicy: { label: "Hot & Spicy", className: "bg-rose-500/15 text-rose-700 border-rose-500/40" },
};

export function Fragen99Game() {
  const [players, setPlayers] = useState<string[]>(["Spieler 1", "Spieler 2", "Spieler 3"]);
  const [newName, setNewName] = useState("");
  const [cats, setCats] = useState<Fragen99Category[]>(DEFAULT_CATS);
  const [phase, setPhase] = useState<Phase>("setup");
  const [used, setUsed] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState<Fragen99Card | null>(null);
  const [count, setCount] = useState(0);
  // Index of player currently holding the phone (= card reader)
  const [holderIdx, setHolderIdx] = useState(0);
  // Index of player who was just passed the phone (pending tap-to-reveal)
  const [pendingIdx, setPendingIdx] = useState<number | null>(null);
  // Sip tally per player
  const [sips, setSips] = useState<Record<number, number>>({});

  useEffect(() => {
    const s = loadJSON<Saved>(STORAGE_KEY);
    if (s?.players?.length) setPlayers(s.players);
    if (s?.cats?.length) setCats(s.cats);
  }, []);

  useEffect(() => {
    saveJSON<Saved>(STORAGE_KEY, { players, cats });
  }, [players, cats]);

  const progress = useMemo(() => Math.min(100, (count / FRAGEN99_LIMIT) * 100), [count]);

  function addPlayer() {
    const n = newName.trim();
    if (!n || players.includes(n)) return;
    setPlayers([...players, n]);
    setNewName("");
  }

  function toggleCat(c: Fragen99Category) {
    setCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  function start() {
    if (players.length < 2 || cats.length === 0) return;
    setUsed(new Set());
    setCount(0);
    setSips({});
    const starter = Math.floor(Math.random() * players.length);
    setHolderIdx(starter);
    const first = pickQuestion(cats, new Set(), 1);
    if (!first) return;
    setCurrent(first);
    setUsed(new Set([first.text]));
    setCount(1);
    setPhase("reading");
    playClick({ type: "soft" });
  }

  // Reader picks the player who fits best -> handover screen
  function passTo(targetIdx: number) {
    if (targetIdx === holderIdx) return;
    const sipsToAdd = current ? sipsForQuestion(current.index) : 1;
    setSips((s) => ({ ...s, [targetIdx]: (s[targetIdx] ?? 0) + sipsToAdd }));
    setPendingIdx(targetIdx);
    setPhase("handover");
    playClick({ type: "pop" });
  }

  // Picked player tapped "Bereit" -> new reader, reveal next question
  function continueAsReader() {
    if (pendingIdx == null) return;
    if (count >= FRAGEN99_LIMIT) {
      setPhase("finished");
      setPendingIdx(null);
      playClick({ type: "success" });
      return;
    }
    const nextIndex = count + 1;
    const q = pickQuestion(cats, used, nextIndex);
    if (!q) return;
    setHolderIdx(pendingIdx);
    setPendingIdx(null);
    setCurrent(q);
    setUsed((u) => new Set(u).add(q.text));
    setCount(nextIndex);
    setPhase("reading");
    playClick({ type: "soft" });
  }

  function endGame() {
    setPhase("finished");
    playClick({ type: "success" });
  }

  function restart() {
    setPhase("setup");
    setCurrent(null);
    setUsed(new Set());
    setCount(0);
    setSips({});
    setPendingIdx(null);
  }

  // ---------- SETUP ----------
  if (phase === "setup") {
    return (
      <Card className="p-6 bg-card/90 backdrop-blur space-y-6 animate-scale-in" data-testid="fragen99-setup-card">
        <div className="text-center space-y-1">
          <p className="text-sm text-muted-foreground">
            Karte vorlesen → Handy an die Person geben, zu der's am besten passt.
          </p>
          <p className="text-xs text-muted-foreground">
            Wer das Handy bekommt, <strong>trinkt 1 Schluck</strong>. Jede 10. Frage = <strong>doppelter Schluck</strong>! 🍻
          </p>
        </div>

        <div>
          <h2 className="text-xl font-display tracking-wider mb-3">Spieler</h2>
          <div className="flex gap-2 mb-3">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPlayer()}
              placeholder="Name eingeben"
              data-testid="fragen99-add-name-input"
            />
            <Button onClick={addPlayer} size="icon" variant="secondary" data-testid="fragen99-add-player-btn">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {players.map((p, i) => (
              <Badge key={i} variant="secondary" className="gap-1 py-1.5 px-3" data-testid={`fragen99-player-${i}`}>
                {p}
                <button
                  onClick={() => setPlayers(players.filter((_, x) => x !== i))}
                  className="ml-1 opacity-60 hover:opacity-100"
                  aria-label={`${p} entfernen`}
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
          {players.length < 2 && (
            <p className="text-xs text-muted-foreground mt-2">Mind. 2 Spieler nötig.</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-display tracking-wider mb-3">Kategorien</h2>
          <div className="grid gap-2">
            {FRAGEN99_CATEGORIES.map((c) => {
              const active = cats.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggleCat(c.id)}
                  data-testid={`fragen99-cat-${c.id}`}
                  data-active={active}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    active
                      ? "border-primary bg-primary/15 shadow-[var(--shadow-glow)]"
                      : "border-border bg-muted/30 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{c.emoji}</span>
                    <div>
                      <div className="font-display tracking-wider">{c.label}</div>
                      <div className="text-xs text-muted-foreground">{c.desc}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <Button
          onClick={start}
          disabled={players.length < 2 || cats.length === 0}
          className="w-full"
          size="lg"
          data-testid="fragen99-start-btn"
        >
          <Play className="w-4 h-4 mr-2" /> Los geht's
        </Button>
      </Card>
    );
  }

  // ---------- HANDOVER (cover screen, hides next question) ----------
  if (phase === "handover" && pendingIdx != null) {
    const target = players[pendingIdx];
    const sipsToDrink = current ? sipsForQuestion(current.index) : 1;
    const totalSips = sips[pendingIdx] ?? 0;
    return (
      <Card
        className="p-8 bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400 text-white space-y-6 animate-scale-in shadow-2xl"
        data-testid="fragen99-handover-card"
      >
        <div className="text-center">
          <Smartphone className="w-12 h-12 mx-auto mb-2 drop-shadow-lg" />
          <p className="uppercase tracking-widest text-xs opacity-80">Gib das Handy an</p>
          <h2
            className="text-4xl md:text-5xl font-display tracking-wider mt-2 drop-shadow-[0_3px_0_rgba(74,0,40,0.5)]"
            data-testid="fragen99-handover-name"
          >
            {target}
          </h2>
        </div>

        <div className="rounded-2xl bg-black/25 backdrop-blur p-6 text-center space-y-2">
          <Beer className="w-10 h-10 mx-auto drop-shadow-md" />
          <div className="text-5xl font-black drop-shadow-md" data-testid="fragen99-handover-sips">
            {sipsToDrink}
          </div>
          <div className="text-sm uppercase tracking-widest opacity-90">
            {sipsToDrink === 1 ? "Schluck" : "Schlücke"} für dich
          </div>
          {sipsToDrink > 1 && (
            <Badge className="bg-amber-300 text-amber-950 border-0 mt-1">
              <Sparkles className="w-3 h-3 mr-1" /> Doppelter Schluck-Bonus!
            </Badge>
          )}
          {totalSips > sipsToDrink && (
            <p className="text-xs opacity-80 pt-1">
              Insgesamt schon: <strong>{totalSips}</strong> Schlücke
            </p>
          )}
        </div>

        <p className="text-center text-xs opacity-80">
          📱 Wenn du <strong>{target}</strong> bist und das Handy hältst, tippe zum Vorlesen.
        </p>

        <Button
          onClick={continueAsReader}
          size="lg"
          variant="secondary"
          className="w-full bg-white text-rose-700 hover:bg-white/90 font-bold"
          data-testid="fragen99-handover-continue-btn"
        >
          Bereit – nächste Frage <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Card>
    );
  }

  // ---------- FINISHED ----------
  if (phase === "finished") {
    const ranking = players
      .map((name, i) => ({ name, idx: i, sips: sips[i] ?? 0 }))
      .sort((a, b) => b.sips - a.sips);
    const champion = ranking[0];
    const totalSips = ranking.reduce((s, p) => s + p.sips, 0);
    return (
      <Card
        className="p-6 bg-card/90 backdrop-blur text-center space-y-5 animate-scale-in"
        data-testid="fragen99-finished-card"
      >
        <Trophy className="w-14 h-14 mx-auto text-amber-400 drop-shadow-md" />
        <h2 className="text-3xl font-display tracking-wider">
          {count >= FRAGEN99_LIMIT ? "99 Fragen geschafft!" : "Runde beendet"}
        </h2>

        {champion && champion.sips > 0 && (
          <div className="rounded-2xl border-2 border-amber-400/60 bg-amber-400/10 p-5 space-y-1">
            <p className="text-xs uppercase tracking-widest text-amber-700">Schluck-Champion 🏆</p>
            <p className="text-3xl font-display tracking-wider" data-testid="fragen99-champion-name">
              {champion.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {champion.sips} {champion.sips === 1 ? "Schluck" : "Schlücke"} kassiert
            </p>
          </div>
        )}

        <div className="text-left space-y-2" data-testid="fragen99-ranking">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Endstand</p>
          {ranking.map((r, i) => (
            <div
              key={r.idx}
              className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2"
            >
              <span className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}.</span>
                <span className="font-medium">{r.name}</span>
              </span>
              <span className="font-display tracking-wider text-rose-600 flex items-center gap-1">
                <Beer className="w-4 h-4" /> {r.sips}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          Insgesamt {totalSips} {totalSips === 1 ? "Schluck" : "Schlücke"} verteilt.
        </p>

        <Button onClick={restart} size="lg" className="w-full" data-testid="fragen99-restart-btn">
          <RotateCw className="w-4 h-4 mr-2" /> Neue Runde
        </Button>
      </Card>
    );
  }

  // ---------- READING ----------
  const reader = players[holderIdx];
  const c = current;
  const catBadge = c ? CAT_BADGE[c.cat] : null;
  const otherPlayers = players
    .map((name, i) => ({ name, idx: i }))
    .filter((p) => p.idx !== holderIdx);

  return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in" data-testid="fragen99-reading-card">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
          <span className="flex items-center gap-1">
            <MessageCircleQuestion className="w-3 h-3" />
            Frage <span data-testid="fragen99-count" className="text-foreground font-bold">{count}</span> /{" "}
            {FRAGEN99_LIMIT}
          </span>
          {catBadge && (
            <span
              className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${catBadge.className}`}
              data-testid="fragen99-current-cat"
            >
              {catBadge.label}
            </span>
          )}
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center text-xs text-muted-foreground pt-1">
          Vorleser:in: <strong data-testid="fragen99-reader-name" className="text-foreground">{reader}</strong>
        </div>
      </div>

      {/* Question */}
      <div
        key={c?.text}
        className="min-h-[200px] p-6 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/15 via-accent/10 to-transparent flex items-center justify-center text-center animate-fade-in"
      >
        <p
          className="text-2xl md:text-3xl font-display tracking-wide leading-snug"
          data-testid="fragen99-question-text"
        >
          {c?.text ?? "…"}
        </p>
      </div>

      {/* Pass-the-phone selection */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-muted-foreground text-center">
          Gib das Handy an die Person, zu der es am besten passt:
        </p>
        <div className="grid grid-cols-2 gap-2" data-testid="fragen99-pass-grid">
          {otherPlayers.map((p) => {
            const playerSips = sips[p.idx] ?? 0;
            return (
              <button
                key={p.idx}
                onClick={() => passTo(p.idx)}
                data-testid={`fragen99-pass-to-${p.idx}`}
                className="rounded-xl border-2 border-border bg-muted/30 hover:bg-primary/15 hover:border-primary/60 transition-all p-3 text-left group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate">{p.name}</span>
                  {playerSips > 0 && (
                    <Badge variant="secondary" className="text-xs gap-1 shrink-0">
                      <Beer className="w-3 h-3" /> {playerSips}
                    </Badge>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <Button
          onClick={() => setPhase("setup")}
          variant="ghost"
          size="sm"
          data-testid="fragen99-back-setup-btn"
        >
          <RotateCw className="w-3 h-3 mr-2" /> Setup
        </Button>
        <Button
          onClick={endGame}
          variant="outline"
          size="sm"
          data-testid="fragen99-end-btn"
        >
          <Trophy className="w-3 h-3 mr-2" /> Beenden
        </Button>
      </div>
    </Card>
  );
}

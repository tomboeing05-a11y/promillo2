import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Play, RotateCw, SkipForward, Sparkles } from "lucide-react";
import {
  PICINI_CATEGORIES,
  pickPrompt,
  type PiciniCategory,
} from "@/lib/picini-prompts";
import { saveJSON, loadJSON } from "@/lib/persist";
import { playClick } from "@/hooks/use-click-sound";

type Phase = "setup" | "play";

interface Saved {
  players: string[];
  cats: PiciniCategory[];
}

const STORAGE_KEY = "picini-setup-v1";
const DEFAULT_CATS: PiciniCategory[] = ["klassisch"];

export function PiciniGame() {
  const [players, setPlayers] = useState<string[]>(["Spieler 1", "Spieler 2", "Spieler 3"]);
  const [newName, setNewName] = useState("");
  const [cats, setCats] = useState<PiciniCategory[]>(DEFAULT_CATS);
  const [phase, setPhase] = useState<Phase>("setup");
  const [used, setUsed] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState<{ text: string; key: string } | null>(null);
  const [count, setCount] = useState(0);

  // Load
  useEffect(() => {
    const s = loadJSON<Saved>(STORAGE_KEY);
    if (s?.players?.length) setPlayers(s.players);
    if (s?.cats?.length) setCats(s.cats);
  }, []);
  // Save
  useEffect(() => {
    saveJSON<Saved>(STORAGE_KEY, { players, cats });
  }, [players, cats]);

  function addPlayer() {
    const n = newName.trim();
    if (!n || players.includes(n)) return;
    setPlayers([...players, n]);
    setNewName("");
  }

  function toggleCat(c: PiciniCategory) {
    setCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  function next() {
    const p = pickPrompt(cats, used, players);
    if (!p) return;
    setCurrent(p);
    setUsed((u) => {
      const nu = new Set(u);
      nu.add(p.key);
      return nu;
    });
    setCount((c) => c + 1);
    playClick({ type: "soft" });
  }

  function start() {
    if (players.length < 2 || cats.length === 0) return;
    setUsed(new Set());
    setCount(0);
    next();
    setPhase("play");
  }

  if (phase === "setup") {
    return (
      <Card className="p-6 bg-card/90 backdrop-blur space-y-6 animate-scale-in">
        <div>
          <h2 className="text-xl font-display tracking-wider mb-3">Spieler</h2>
          <div className="flex gap-2 mb-3">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPlayer()}
              placeholder="Name eingeben"
            />
            <Button onClick={addPlayer} size="icon" variant="secondary">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {players.map((p, i) => (
              <Badge key={i} variant="secondary" className="gap-1 py-1.5 px-3">
                {p}
                <button
                  onClick={() => setPlayers(players.filter((_, x) => x !== i))}
                  className="ml-1 opacity-60 hover:opacity-100"
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
            {PICINI_CATEGORIES.map((c) => {
              const active = cats.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggleCat(c.id)}
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
        >
          <Play className="w-4 h-4 mr-2" /> Los geht's
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card/90 backdrop-blur space-y-5 animate-scale-in">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Karte #{count}</span>
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> {cats.length} Kategorie{cats.length === 1 ? "" : "n"}
        </span>
      </div>

      <div
        key={current?.text}
        className="min-h-[220px] p-6 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/15 via-accent/10 to-transparent flex items-center justify-center text-center animate-fade-in"
      >
        <p className="text-2xl font-display tracking-wide leading-snug">
          {current?.text ?? "…"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button onClick={() => setPhase("setup")} variant="outline">
          <RotateCw className="w-4 h-4 mr-2" /> Setup
        </Button>
        <Button onClick={next} size="lg">
          <SkipForward className="w-4 h-4 mr-2" /> Nächste Karte
        </Button>
      </div>
    </Card>
  );
}

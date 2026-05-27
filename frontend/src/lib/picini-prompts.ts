// Picini – Picolo-ähnliche Prompts. {name1}/{name2}/{name3} werden ersetzt.
export type PiciniCategory = "klassisch" | "hausparty" | "hotspicy";

export const PICINI_CATEGORIES: { id: PiciniCategory; label: string; emoji: string; desc: string }[] = [
  { id: "klassisch", label: "Klassisch", emoji: "🎉", desc: "Locker & für jede Runde" },
  { id: "hausparty", label: "Hausparty", emoji: "🍻", desc: "Mehr Action, mehr Schlücke" },
  { id: "hotspicy", label: "Hot & Spicy", emoji: "🌶️", desc: "Pikant, nur für mutige Runden" },
];

export const PICINI_PROMPTS: Record<PiciniCategory, string[]> = {
  klassisch: [
    "{name1}, nimm einen Schluck und verteile einen weiteren.",
    "{name1} und {name2}: Wer als Letztes blinzelt, trinkt 2 Schlücke.",
    "Alle mit Brille trinken einen Schluck. Niemand mit Brille? {name1} übernimmt.",
    "{name1} nennt 3 Pizzabeläge in 5 Sekunden – sonst 2 Schlücke.",
    "Reihum: Jede:r nennt ein Wort, das mit dem letzten Buchstaben des vorherigen beginnt. Wer hängt, trinkt.",
    "{name1} sucht jemanden, der mit ihm/ihr anstößt. Wer ablehnt, trinkt doppelt.",
    "{name1}, erzähle einen Witz. Lacht niemand: 2 Schlücke für dich.",
    "Daumen-hoch-Regel: {name1} hebt heimlich den Daumen. Wer es als Erstes bemerkt, verteilt 2 Schlücke.",
    "Alle mit weißem Oberteil – ein Schluck.",
    "{name1} und {name2} tauschen für eine Runde die Plätze.",
    "Letzte:r, der/die ein Tier nennt, trinkt.",
    "{name1} darf bis zur nächsten Karte nur in Reimen sprechen. Sonst Schluck.",
    "Jüngste:r in der Runde: 1 Schluck. Älteste:r: 2 Schlücke. Wegen Erfahrung.",
    "{name1} stellt {name2} eine Wahrheitsfrage. Antwort verweigert? 3 Schlücke.",
    "Stille Karte: 10 Sekunden Schweigen. Wer redet, trinkt.",
    "{name1} trinkt einen Schluck pro Vokal in seinem/ihrem Vornamen.",
    "Hand-aufs-Herz: {name1} nennt etwas, das er/sie heute zum ersten Mal gemacht hat. Sonst Schluck.",
    "Kategorie: Automarken. Reihum, wer hängt, trinkt.",
    "{name1} singt eine Strophe seines/ihres Lieblingslieds – oder 2 Schlücke.",
    "Wer in der Runde am letzten Wochenende getanzt hat – ein Schluck.",
  ],
  hausparty: [
    "{name1} kippt einen Shot mit {name2}.",
    "Alle Männer trinken 2 Schlücke. Danach alle Frauen einen.",
    "{name1} darf eine Person bestimmen, die ein Glas exen muss.",
    "Bier-Pong-Mini: {name1} vs {name2}. Verlierer:in trinkt 3 Schlücke.",
    "Daumenkönig: {name1} darf, bis zur nächsten Karte, den Daumen heben. Letzte:r, der/die folgt, trinkt 2 Schlücke.",
    "Trinke so viele Schlücke, wie {name1} Ex-Partner:innen hatte. (Geschätzt!)",
    "Bottoms up: {name1} und {name2} stoßen an – beide austrinken.",
    "{name1} schreibt {name2} eine peinliche SMS. Weigerung: halbes Glas.",
    "Alle, die heute später als 10 Uhr aufgestanden sind – 2 Schlücke.",
    "{name1} muss bis zur nächsten Karte stehen. Setzt er/sie sich: Strafschluck.",
    "Karaoke-Karte: {name1} singt 10 Sekunden lautstark. Sonst 3 Schlücke.",
    "Wer das nächste Mal aufs Klo geht, trinkt vorher 2 Schlücke.",
    "{name1} darf eine neue Regel erfinden, die bis zur nächsten Picini-Karte gilt.",
    "Reihum 'Ich hab noch nie…' – {name1} startet. Wer's gemacht hat, trinkt.",
    "Alle, die ihr Handy in der Hand haben: 2 Schlücke.",
    "{name1} und {name2} machen ein Selfie. Verweigerung = 3 Schlücke.",
    "Trink-Battle: {name1} vs {name2}, beide gleichzeitig. Wer zuletzt absetzt, gewinnt – Verlierer:in nochmal.",
    "Wer als Letztes 'Prost' sagt, trinkt.",
    "{name1} darf einen Sip-Bann verteilen: Die Person darf 2 Karten lang nicht trinken.",
    "Würfel im Kopf: {name1} sagt eine Zahl 1-6. {name2} auch. Sind sie gleich: alle trinken.",
  ],
  hotspicy: [
    "{name1}, gib {name2} einen Klaps auf den Po oder trinke 3.",
    "{name1} verrät seine/ihre wildeste Story – oder kippt einen Shot.",
    "Truth: {name1}, wann war dein letzter One-Night-Stand?",
    "{name1} flüstert {name2} etwas Sexy ins Ohr. Weigerung: halbes Glas.",
    "Body-Shot: {name1} nimmt einen Schluck von {name2}s Glas – ohne Hände.",
    "{name1} und {name2} machen 7 Sekunden Augenkontakt. Wer wegschaut, trinkt 3.",
    "Spicy Truth: {name1}, was war dein wildester Ort?",
    "{name1} und {name2}: Lippen oder lieber Schlücke? Mind. 4.",
    "Dare: {name1} sendet einem Ex 'Ich vermisse dich'. Sonst Glas leeren.",
    "{name1} zeigt das letzte Bild in Galerie. Verweigerung: 3 Shots.",
    "Strip-Karte light: {name1} legt ein Kleidungsstück ab oder trinkt 4.",
    "{name1} muss bis zur nächsten Karte einen sexy Akzent sprechen.",
    "Truth: {name1}, gestehe einen Schwarm in der Runde – oder 4 Schlücke.",
    "{name1} setzt sich {name2} eine Karte lang auf den Schoß. Sonst 3 Schlücke.",
    "Whisper-Time: {name1} verrät {name2} eine Fantasie – Geheimhaltungspflicht!",
    "Picini-Massage: {name1} massiert {name2} 30 Sekunden die Schultern.",
    "{name1}, beschreibe deinen Typ in 3 Worten. Lacht jemand: 2 Schlücke für ihn/sie.",
    "Spicy Vote: Wer in der Runde küsst am besten? Geheime Abstimmung – Verlierer:in trinkt 3.",
    "{name1} darf {name2} eine Frage stellen, die normalerweise zu intim ist.",
    "Truth or Drink: Wann hast du das letzte Mal an jemanden hier gedacht – nicht ganz unschuldig?",
  ],
};

export function pickPrompt(
  cats: PiciniCategory[],
  used: Set<string>,
  players: string[],
): { text: string; key: string } | null {
  const pool: { text: string; cat: PiciniCategory }[] = [];
  for (const c of cats) for (const t of PICINI_PROMPTS[c]) pool.push({ text: t, cat: c });
  if (pool.length === 0) return null;
  const fresh = pool.filter((p) => !used.has(p.text));
  const arr = fresh.length > 0 ? fresh : pool;
  const pick = arr[Math.floor(Math.random() * arr.length)];

  // Spielernamen ersetzen
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  let text = pick.text;
  text = text.replaceAll("{name1}", shuffled[0] ?? "Jemand");
  text = text.replaceAll("{name2}", shuffled[1] ?? shuffled[0] ?? "Jemand anderes");
  text = text.replaceAll("{name3}", shuffled[2] ?? shuffled[0] ?? "Noch jemand");
  return { text, key: pick.text };
}

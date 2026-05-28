// 99 Fragen – "Wer würde am ehesten...?" Spielmodus.
// Spieler liest Karte vor und gibt das Handy an die Person weiter,
// zu der die Frage am besten passt. Diese Person trinkt und liest die nächste Karte.
export type Fragen99Category = "klassisch" | "action" | "hotspicy";

export const FRAGEN99_CATEGORIES: {
  id: Fragen99Category;
  label: string;
  emoji: string;
  desc: string;
}[] = [
  { id: "klassisch", label: "Klassisch", emoji: "💬", desc: "Persönlich, ehrlich, harmlos" },
  { id: "action", label: "Action", emoji: "⚡", desc: "Bewegt, mutig & ein bisschen verrückt" },
  { id: "hotspicy", label: "Hot & Spicy", emoji: "🌶️", desc: "Pikant, ab 18 – flirty & frech" },
];

export const FRAGEN99_LIMIT = 99;

export const FRAGEN99_QUESTIONS: Record<Fragen99Category, string[]> = {
  klassisch: [
    "Wer würde am ehesten heimlich Reality-TV im Bett schauen?",
    "Wer macht im Urlaub die meisten Selfies?",
    "Wer würde am ehesten 2 Stunden zu spät zur eigenen Hochzeit kommen?",
    "Wer in der Runde hat das chaotischste Zimmer?",
    "Wer würde am ehesten in eine Sekte geraten?",
    "Wer könnte am längsten ohne Internet überleben?",
    "Wer würde einen Promi treffen und ihn nicht erkennen?",
    "Wer hat hier das absurdeste Spotify-Hörverhalten?",
    "Wer würde am ehesten ohne Plan einfach auswandern?",
    "Wer checkt mindestens 50× am Tag sein Handy?",
    "Wer würde am ehesten ein Hotel-Personal mit dem Vornamen ansprechen, ohne zu fragen?",
    "Wer würde sich am wenigsten an ein Versprechen erinnern, das vor zwei Bier abgegeben wurde?",
    "Wer würde am ehesten beim Date 1 Stunde zu früh da sein?",
    "Wer hat hier den schlechtesten Geschmack bei Filmen?",
    "Wer würde am ehesten in seinem Auto schlafen, statt nach Hause zu fahren?",
    "Wer hat in der Runde das peinlichste Schulfoto?",
    "Wer würde mit 70 noch in Clubs gehen?",
    "Wer hat hier die meisten doppelten Buchstaben im Namen-Spitznamen?",
    "Wer würde am ehesten einen TikTok-Trend starten und es nicht mal merken?",
    "Wer kauft sich Dinge online, die er drei Wochen später bereut?",
    "Wer würde am ehesten ein Haustier kaufen, ohne es vorher abzustimmen?",
    "Wer ist hier morgens am unzurechnungsfähigsten?",
    "Wer würde am ehesten beim Lügen rot werden?",
    "Wer hat hier die meisten alten Schulfreunde komplett aus den Augen verloren?",
    "Wer würde am ehesten in einer Quiz-Show in der ersten Frage rausfliegen?",
    "Wer ist im Freundeskreis die wandelnde Wikipedia für Klatsch?",
    "Wer würde am ehesten heimlich an einem WG-Putzplan rütteln?",
    "Wer ist hier am unwahrscheinlichsten pünktlich?",
    "Wer würde am ehesten von Beruf YouTuber sein können?",
    "Wer wird am ehesten 100 Jahre alt – und warum?",
    "Wer hat in seiner Handy-Galerie aktuell die peinlichsten Screenshots?",
    "Wer würde am ehesten Karaoke ohne Alkohol singen?",
    "Wer in der Runde ist heimlich am organisiertesten?",
    "Wer hat hier die größte Sammlung von etwas Komischem?",
    "Wer würde am ehesten einen Aprilscherz nicht erkennen?",
  ],
  action: [
    "Wer würde am ehesten betrunken auf einen Tisch steigen und tanzen?",
    "Wer hat schon mal eine Nacht komplett durchgemacht und am nächsten Tag gearbeitet?",
    "Wer würde sich am ehesten ein Tattoo aus dem Affekt stechen lassen?",
    "Wer würde mit fremden Leuten in einen Pool springen?",
    "Wer war schon mal so betrunken, dass er den eigenen Heimweg vergessen hat?",
    "Wer würde am ehesten am Geburtstag in den falschen Club gehen und es zu spät merken?",
    "Wer hat schon mal etwas im Supermarkt geklaut – und sei es ein Bonbon?",
    "Wer würde sich am ehesten in einer Schlange ohne Grund vordrängeln?",
    "Wer hat schon mal in einem Aufzug oder Klo geschlafen?",
    "Wer würde am ehesten beim Festival in einem fremden Zelt aufwachen?",
    "Wer würde nackt im Garten campen, wenn es eine Wette wäre?",
    "Wer hat schon mal eine Polizeikontrolle erlebt, ohne dabei nüchtern zu sein?",
    "Wer würde am ehesten beim Bungee-Jumping kotzen?",
    "Wer hat schon mal heimlich aus einer fremden Bierflasche getrunken?",
    "Wer würde am ehesten eine Person ansprechen, mit der er flirtet, ohne deren Namen zu wissen?",
    "Wer hat schon mal aus Versehen ein Foto an die falsche Person geschickt?",
    "Wer würde am ehesten in einem Brunnen baden, wenn es heiß ist?",
    "Wer hat schon mal eine WhatsApp-Sprachnachricht aufgenommen, die nicht für den Empfänger gedacht war?",
    "Wer würde am ehesten beim Wandern den Weg verlieren?",
    "Wer hat schon mal in einer Bar eine Schlägerei beobachtet (oder angefangen)?",
    "Wer würde am ehesten ein Auto mieten, ohne den Führerschein dabei zu haben?",
    "Wer hat schon mal etwas getan, das er heute nüchtern niemals machen würde?",
    "Wer würde am ehesten beim Festival sein Zelt vergessen?",
    "Wer hat schon mal eine Achterbahn unfreiwillig zwei Mal hintereinander gefahren?",
    "Wer würde mit einem Fremden für einen Tag den Lebensstil tauschen?",
    "Wer hat schon mal eine ganz fremde Sprache benutzt, um Eindruck zu schinden?",
    "Wer würde am ehesten auf einer Demo aus Versehen gegen seine eigene Überzeugung mitlaufen?",
    "Wer hat schon mal eine Karaoke-Bühne gestürmt?",
    "Wer würde am ehesten in einem fremden Land 'Wo geht's lang?' auf Englisch fragen und so tun, als verstünde er die Antwort?",
    "Wer hat schon mal eine Wette so verloren, dass er sich heute noch schämt?",
    "Wer würde am ehesten in einer Disco vor allen anderen ohnmächtig werden?",
    "Wer hat schon mal das Auto seines Vaters/seiner Mutter heimlich genommen?",
    "Wer würde am ehesten beim Wandern den Rucksack vergessen?",
    "Wer hat schon mal jemanden auf einer Party geküsst, dessen Namen er nicht kannte?",
    "Wer würde am ehesten beim Wichteln das billigste Geschenk machen?",
  ],
  hotspicy: [
    "Wer hatte schon mal Sex an einem ungewöhnlichen Ort?",
    "Wer würde am ehesten mit einem Ex wieder ins Bett gehen?",
    "Wer war schon mal in einen besten Freund / eine beste Freundin verliebt?",
    "Wer hat schon mal mit zwei Personen am selben Tag was gehabt?",
    "Wer hat hier die wildesten Storys aus dem Schlafzimmer?",
    "Wer würde am ehesten ein Sextoy mit ins Reisegepäck nehmen?",
    "Wer hatte schon mal eine Affäre mit jemandem, der vergeben war?",
    "Wer würde am ehesten einen Dreier vorschlagen?",
    "Wer hat den ungewöhnlichsten Beziehungs-Lebenslauf?",
    "Wer hat schon mal mit jemandem geschlafen, ohne dessen vollen Namen zu kennen?",
    "Wer würde am ehesten ein Date in der eigenen Stadt mit der Bahn auf eine andere Stadt verlegen, nur um eskalieren zu können?",
    "Wer hat hier die schärfste Sprachnachricht-History?",
    "Wer würde am ehesten beim ersten Date zu schnell die Eltern erwähnen?",
    "Wer hat schon mal die Nachbarn beim Sex gehört (oder umgekehrt)?",
    "Wer würde am ehesten ein Foto in der Bar machen, das er später bereut?",
    "Wer hat hier den intensivsten Tinder-Marathon hinter sich?",
    "Wer hatte schon mal Sex im Auto?",
    "Wer würde am ehesten heimlich auf Insta einer/m Ex stalken?",
    "Wer hat schon mal jemanden bei einer Hochzeit angebaggert?",
    "Wer hat hier den weitesten gereisten One-Night-Stand?",
    "Wer würde am ehesten beim Sex aus Versehen den falschen Namen rufen?",
    "Wer hat hier die wildeste Bett-Erinnerung mit Lachflash dazu?",
    "Wer würde am ehesten beim Date sagen 'Ich bin nicht so der Beziehungstyp'?",
    "Wer hat schon mal eine Person im Pärchen-Vibes attraktiv gefunden?",
    "Wer würde am ehesten ein FWB-Setting (Friends with Benefits) anfangen, das eskaliert?",
    "Wer war schon mal in einer 'Komplizierten' Phase, von der niemand etwas wusste?",
    "Wer würde am ehesten ein Date in seine eigene Wohnung einladen, obwohl sie unaufgeräumt ist?",
    "Wer hat hier die meisten roten Flaggen ignoriert, weil's heiß war?",
    "Wer würde am ehesten in einer offenen Beziehung sein und es nicht erzählen?",
    "Wer hat schon mal jemandem geschrieben 'Komm noch vorbei' nach Mitternacht?",
    "Wer würde am ehesten ein 'romantisches' Date in einer Burger-Bude haben?",
    "Wer hat hier den klassischsten Liebes-Glow-Up gehabt (vorher → nachher)?",
    "Wer würde am ehesten heimlich ein 'On & Off' Verhältnis nicht beenden?",
    "Wer hat schon mal eine richtig peinliche Pickup-Line gehört (oder benutzt)?",
    "Wer hat hier am ehesten ein Nudie im Handy versteckt?",
  ],
};

export interface Fragen99Card {
  text: string;
  cat: Fragen99Category;
  index: number;
}

export function pickQuestion(
  cats: Fragen99Category[],
  used: Set<string>,
  index: number,
): Fragen99Card | null {
  const pool: { text: string; cat: Fragen99Category }[] = [];
  for (const c of cats) for (const t of FRAGEN99_QUESTIONS[c]) pool.push({ text: t, cat: c });
  if (pool.length === 0) return null;
  const fresh = pool.filter((p) => !used.has(p.text));
  const arr = fresh.length > 0 ? fresh : pool;
  const pick = arr[Math.floor(Math.random() * arr.length)];
  return { text: pick.text, cat: pick.cat, index };
}

// Drinking mechanic: receiver drinks. Every 10th question = double sips.
export function sipsForQuestion(index: number): number {
  return index % 10 === 0 ? 2 : 1;
}

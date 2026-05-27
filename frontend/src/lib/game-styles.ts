// Pro Spiel: eigene knallige Schrift + Farbe
export type GameKey = "quiz" | "imposter" | "nacheinander" | "picili" | "poker" | "duemmster";

export interface GameStyle {
  title: string;
  font: string; // CSS font-family stack
  color: string; // primary color (hex)
  shadow: string; // text-shadow color
  gradient: string; // inline css linear-gradient for text-fill
  emoji: string;
}

export const GAME_STYLES: Record<GameKey, GameStyle> = {
  quiz: {
    title: "Wer wird Bierionär?",
    font: `"Bungee", system-ui, sans-serif`,
    color: "#FFB400",
    shadow: "#7A4A00",
    gradient: "linear-gradient(180deg, #FFE259 0%, #FFA751 60%, #FF7A00 100%)",
    emoji: "🍺",
  },
  imposter: {
    title: "Wer ist der Imposter?",
    font: `"Creepster", "Rubik Mono One", system-ui, sans-serif`,
    color: "#E5004C",
    shadow: "#5A0019",
    gradient: "linear-gradient(180deg, #FF4D8D 0%, #E5004C 55%, #8B0030 100%)",
    emoji: "🕵️",
  },
  nacheinander: {
    title: "Nacheinander",
    font: `"Rubik Mono One", "Bungee", system-ui, sans-serif`,
    color: "#4FA8FF",
    shadow: "#1E5BB8",
    gradient: "linear-gradient(180deg, #BEE0FF 0%, #6FB8FF 55%, #2E8AE6 100%)",
    emoji: "🎯",
  },
  picili: {
    title: "Picili",
    font: `"Bagel Fat One", "Bungee", system-ui, sans-serif`,
    color: "#B936FF",
    shadow: "#3D0066",
    gradient: "linear-gradient(180deg, #FF9CEE 0%, #C44CFF 55%, #6E00B0 100%)",
    emoji: "🎉",
  },
  poker: {
    title: "Poker",
    font: `"Black Ops One", "Bungee", system-ui, sans-serif`,
    color: "#1FB95A",
    shadow: "#003918",
    gradient: "linear-gradient(180deg, #7CF2A4 0%, #1FB95A 55%, #006E2C 100%)",
    emoji: "♠️",
  },
  duemmster: {
    title: "Der Dümmste fliegt",
    font: `"Bungee", "Rubik Mono One", system-ui, sans-serif`,
    color: "#FF4D2E",
    shadow: "#6A1400",
    gradient: "linear-gradient(180deg, #FFD27A 0%, #FF6B35 55%, #C71F00 100%)",
    emoji: "🪂",
  },
};

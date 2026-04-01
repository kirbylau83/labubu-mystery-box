const CHARACTERS = [
  // Common (8)
  { id: 1, name: "Classic Labubu", rarity: "common", emoji: "😊", color: "#a8d8ea" },
  { id: 2, name: "Sleepy Labubu", rarity: "common", emoji: "😴", color: "#b8d4e3" },
  { id: 3, name: "Happy Labubu", rarity: "common", emoji: "😄", color: "#f9e79f" },
  { id: 4, name: "Grumpy Labubu", rarity: "common", emoji: "😤", color: "#f5b7b1" },
  { id: 5, name: "Baby Labubu", rarity: "common", emoji: "👶", color: "#fadbd8" },
  { id: 6, name: "Sitting Labubu", rarity: "common", emoji: "🧸", color: "#d5f5e3" },
  { id: 7, name: "Waving Labubu", rarity: "common", emoji: "👋", color: "#d2b4de" },
  { id: 8, name: "Peeking Labubu", rarity: "common", emoji: "🫣", color: "#aed6f1" },

  // Uncommon (6)
  { id: 9, name: "Space Labubu", rarity: "uncommon", emoji: "🚀", color: "#1a1a2e" },
  { id: 10, name: "Chef Labubu", rarity: "uncommon", emoji: "👨‍🍳", color: "#fdebd0" },
  { id: 11, name: "Pirate Labubu", rarity: "uncommon", emoji: "🏴‍☠️", color: "#6c3483" },
  { id: 12, name: "Ninja Labubu", rarity: "uncommon", emoji: "🥷", color: "#2c3e50" },
  { id: 13, name: "Wizard Labubu", rarity: "uncommon", emoji: "🧙", color: "#4a235a" },
  { id: 14, name: "DJ Labubu", rarity: "uncommon", emoji: "🎧", color: "#e74c3c" },

  // Rare (4)
  { id: 15, name: "Dragon Labubu", rarity: "rare", emoji: "🐉", color: "#c0392b" },
  { id: 16, name: "Rainbow Labubu", rarity: "rare", emoji: "🌈", color: "#ff6b6b" },
  { id: 17, name: "Crystal Labubu", rarity: "rare", emoji: "💎", color: "#76d7ea" },
  { id: 18, name: "Golden Labubu", rarity: "rare", emoji: "✨", color: "#f1c40f" },

  // Legendary (2)
  { id: 19, name: "Cosmic Labubu", rarity: "legendary", emoji: "🌌", color: "#0c0c3a" },
  { id: 20, name: "Phantom Labubu", rarity: "legendary", emoji: "👻", color: "#8e44ad" },
];

const RARITY_CONFIG = {
  common:    { label: "Common",    border: "#95a5a6", bg: "#ecf0f1", glow: "rgba(149,165,166,0.5)" },
  uncommon:  { label: "Uncommon",  border: "#27ae60", bg: "#eafaf1", glow: "rgba(39,174,96,0.5)" },
  rare:      { label: "Rare",      border: "#2980b9", bg: "#ebf5fb", glow: "rgba(41,128,185,0.5)" },
  legendary: { label: "Legendary", border: "#f39c12", bg: "#fef9e7", glow: "rgba(243,156,18,0.6)" },
};

const BOX_TYPES = [
  {
    id: "bronze",
    name: "Bronze Box",
    cost: 10,
    emoji: "🥉",
    color: "#cd7f32",
    mathChance: 0.3,
    mathReward: 15,
    mathDifficulty: "easy",
    characterPool: [
      { rarity: "common", weight: 70 },
    ],
  },
  {
    id: "silver",
    name: "Silver Box",
    cost: 25,
    emoji: "🥈",
    color: "#c0c0c0",
    mathChance: 0.3,
    mathReward: 35,
    mathDifficulty: "medium",
    characterPool: [
      { rarity: "uncommon", weight: 50 },
      { rarity: "rare", weight: 20 },
    ],
  },
  {
    id: "gold",
    name: "Gold Box",
    cost: 50,
    emoji: "🥇",
    color: "#ffd700",
    mathChance: 0.35,
    mathReward: 75,
    mathDifficulty: "hard",
    characterPool: [
      { rarity: "rare", weight: 40 },
      { rarity: "legendary", weight: 25 },
    ],
  },
];

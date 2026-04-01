// Sprite sheet: labubu-sprites.png (5 columns x 3 rows)
// Each character has a sprite position (row, col) in the grid

const CHARACTERS = [
  // Common (5)
  { id: 1,  name: "Classic Labubu",  rarity: "common",    row: 0, col: 0 },
  { id: 2,  name: "Happy Labubu",    rarity: "common",    row: 0, col: 1 },
  { id: 3,  name: "Grumpy Labubu",   rarity: "common",    row: 0, col: 2 },
  { id: 4,  name: "Explorer Labubu", rarity: "common",    row: 0, col: 3 },
  { id: 5,  name: "Safari Labubu",   rarity: "common",    row: 1, col: 0 },

  // Uncommon (5)
  { id: 6,  name: "Space Labubu",    rarity: "uncommon",  row: 0, col: 4 },
  { id: 7,  name: "Forest Labubu",   rarity: "uncommon",  row: 1, col: 1 },
  { id: 8,  name: "Dragon Labubu",   rarity: "uncommon",  row: 1, col: 2 },
  { id: 9,  name: "Panda Labubu",    rarity: "uncommon",  row: 1, col: 4 },
  { id: 10, name: "Lion Labubu",     rarity: "uncommon",  row: 2, col: 4 },

  // Rare (3)
  { id: 11, name: "Wizard Labubu",   rarity: "rare",      row: 2, col: 0 },
  { id: 12, name: "Phantom Labubu",  rarity: "rare",      row: 2, col: 1 },
  { id: 13, name: "Fairy Labubu",    rarity: "rare",      row: 2, col: 2 },

  // Legendary (2)
  { id: 14, name: "Cosmic Labubu",   rarity: "legendary", row: 1, col: 3 },
  { id: 15, name: "Crystal Labubu",  rarity: "legendary", row: 2, col: 3 },
];

const RARITY_CONFIG = {
  common:    { label: "Common",    border: "#95a5a6", bg: "#ecf0f1", glow: "rgba(149,165,166,0.5)" },
  uncommon:  { label: "Uncommon",  border: "#27ae60", bg: "#eafaf1", glow: "rgba(39,174,96,0.5)" },
  rare:      { label: "Rare",      border: "#2980b9", bg: "#ebf5fb", glow: "rgba(41,128,185,0.5)" },
  legendary: { label: "Legendary", border: "#f39c12", bg: "#fef9e7", glow: "rgba(243,156,18,0.6)" },
};

const BOX_TYPES = [
  {
    id: "starter",
    name: "Starter Box",
    cost: 5,
    color: "#8d6e63",
    mathChance: 0.6,
    mathReward: 10,
    mathDifficulty: "easy",
    characterPool: [
      { rarity: "common", weight: 100 },
    ],
  },
  {
    id: "bronze",
    name: "Bronze Box",
    cost: 10,
    color: "#cd7f32",
    mathChance: 0.5,
    mathReward: 15,
    mathDifficulty: "easy",
    characterPool: [
      { rarity: "common", weight: 80 },
      { rarity: "uncommon", weight: 20 },
    ],
  },
  {
    id: "silver",
    name: "Silver Box",
    cost: 25,
    color: "#c0c0c0",
    mathChance: 0.45,
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
    color: "#ffd700",
    mathChance: 0.4,
    mathReward: 75,
    mathDifficulty: "hard",
    characterPool: [
      { rarity: "rare", weight: 40 },
      { rarity: "legendary", weight: 25 },
    ],
  },
  {
    id: "diamond",
    name: "Diamond Box",
    cost: 100,
    color: "#b9f2ff",
    mathChance: 0.35,
    mathReward: 150,
    mathDifficulty: "hard",
    characterPool: [
      { rarity: "rare", weight: 30 },
      { rarity: "legendary", weight: 70 },
    ],
  },
];

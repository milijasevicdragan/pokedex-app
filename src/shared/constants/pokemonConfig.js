// Konstanten für Pokemon Farben von Typen
export const TYPE_COLORS = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

// Liste für Typen der Pokemon
export const POKEMON_TYPES = Object.keys(TYPE_COLORS);

// Konstanten für die Generationen und deren Anzahl an Pokemon
export const GENERATIONS = [
  { id: 'all', name: 'All Gens', limit: null, offset: null },
  { id: 1, name: 'Gen I', range: [1, 151] },
  { id: 2, name: 'Gen II', range: [152, 251] },
  { id: 3, name: 'Gen III', range: [252, 386] },
  { id: 4, name: 'Gen IV', range: [387, 493] },
  { id: 5, name: 'Gen V', range: [494, 649] },
  { id: 6, name: 'Gen VI', range: [650, 721] },
  { id: 7, name: 'Gen VII', range: [722, 809] },
  { id: 8, name: 'Gen VIII', range: [810, 905] },
  { id: 9, name: 'Gen IX', range: [906, 1025] },
];

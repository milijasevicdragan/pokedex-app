// Dieser Mapper bekommt das rohe API-Objekt und gibt dein sauberes Objekt zurück
export const mapApiToPokemon = (apiData) => {
  return {
    id: apiData.id,
    name: apiData.name,
    types: apiData.types, // Mehrere Typen
    description: apiData.description,
    height: apiData.height,
    genus: apiData.genus,
    stats: apiData.stats,
    moves: apiData.moves,
    sprite:
      apiData.sprites?.other?.dream_world?.front_default ||
      apiData.sprites?.front_default ||
      'https://via.placeholder.com/150', // Fallback falls gar kein Bild besteht
  };
};

export const mapApiToSpecies = (apiData) => {
  const descriptionEntry = apiData.flavor_text_entries?.find(
    (entry) => entry.language.name === 'en'
  );

  const genusEntry = apiData.genera?.find(
    (entry) => entry.language.name === 'en'
  );

  return {
    description: descriptionEntry 
      ? descriptionEntry.flavor_text.replace(/[\f\n\r]/g, ' ') 
      : 'Keine Beschreibung verfügbar.',
    genus: genusEntry ? genusEntry.genus : '',
    base_happiness: apiData.base_happiness,
    capture_rate: apiData.capture_rate,
  };
}

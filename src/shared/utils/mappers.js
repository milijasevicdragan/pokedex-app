// Dieser Mapper bekommt das rohe API-Objekt und gibt dein sauberes Objekt zurück
export const mapApiToPokemon = (apiData) => {
  return {
    id: apiData.id,
    name: apiData.name,
    types: apiData.types, // Mehrere Typen
    sprite:
      apiData.sprites?.other?.dream_world?.front_default ||
      apiData.sprites?.front_default ||
      'https://via.placeholder.com/150', // Fallback falls gar kein Bild besteht
  };
};

import { API } from '@/shared/api/axios';

const apiCache = new Map();

export const getPokemonList = async (limit, offset = 0) => {
  const key = `list-${limit}-${offset}`;
  if (apiCache.has(key)) return apiCache.get(key);

  const response = await API.get(`pokemon?limit=${limit}&offset=${offset}`);
  apiCache.set(key, response);

  return response;
};

export const getPokemonByIdOrName = async (idOrName) => {
  const key = `pokemon-${String(idOrName).toLowerCase()}`;

  if (apiCache.has(key)) {
    console.log(`Serving ${idOrName} from cache ⚡️`);
    return apiCache.get(key);
  }
  const response = await API.get(`pokemon/${idOrName}`);

  apiCache.set(key, response);
  return response;
};

export const getPokemonTypes = async () => {
  const key = 'types';

  if (apiCache.has(key)) return apiCache.get(key);
  const response = await API.get('type');

  apiCache.set(key, response);
  return response;
};

export const getPokemonByType = async (type) => {
  const key = `type-${type}`;

  if (apiCache.has(key)) return apiCache.get(key);
  const response = await API.get(`type/${type}`);

  apiCache.set(key, response);
  return response;
};

export const getPokemonSpeciesById = async (id) => {
  const key = `species-${String(id)}`;

  if (apiCache.has(key)) return apiCache.get(key);
  const response = await API.get(`pokemon-species/${id}`);

  apiCache.set(key, response);
  return response;
};

export const getMoveDetailsById = async (id) => {
  const key = `move-${String(id)}`;

  if (apiCache.has(key)) return apiCache.get(key);
  const response = await API.get(`move/${id}`);

  apiCache.set(key, response);

  return response;
};

import { API } from '@/shared/api/axios';

export const getPokemonList = (limit = 20, offset = 0) => {
  return API.get('/pokemon', {
    params: { limit, offset },
  });
};

export const getPokemonByIdOrName = (idOrName) => {
  return API.get(`/pokemon/${idOrName}`);
};

import { api } from '@/shared/api/axios';

export const getPokemonList = (limit = 20, offset = 0) => {
  return api.get('/pokemon', {
    params: { limit, offset },
  });
};

export const getPokemonByIdOrName = (idOrName) => {
  return api.get(`/pokemon/${idOrName}`);
};

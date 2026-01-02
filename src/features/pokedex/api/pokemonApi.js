import { API } from '@/shared/api/axios';

export const getPokemonList = (limit, offset = 0) => {
  return API.get('/pokemon', {
    params: { limit, offset },
  });
};

export const getPokemonByIdOrName = (idOrName) => {
  return API.get(`/pokemon/${idOrName}`);
};

export const getPokemonTypes = () => {
  return API.get('/type');
};

export const getPokemonByType = (type) => {
  return API.get(`/type/${type}`);
};

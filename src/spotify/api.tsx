import { fetchSpotify } from "./spotifyApi";

export const searchArtists = async (
  query: string,
  token: string,
  limit: number,
  offset: number
) => {
  return fetchSpotify(
    `search?q=${encodeURIComponent(query)}&type=artist&limit=${limit}&offset=${offset}`,
    token
  );
};

export const getInitialArtists = async (
  token: string,
  limit: number,
  offset: number
) => {
  // usamos una letra genérica para traer artistas iniciales
  return fetchSpotify(
    `search?q=a&type=artist&limit=${limit}&offset=${offset}`,
    token
  );
};

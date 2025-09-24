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

export const getArtistById = async (id: string, token: string) => {
  return await fetchSpotify(`artists/${id}`, token);
};

export const getArtistAlbums = async (id: string, token: string) => {
  return await fetchSpotify(`artists/${id}/albums?include_groups=album&limit=10`, token);
};

export const getMyAlbums = async (token: string, offset = 0, limit = 10) => {
  return await fetchSpotify(`me/albums?limit=${limit}&offset=${offset}`, token);
};

export const removeAlbum = async (id: string, token: string) => {
  return await fetchSpotify(`me/albums?ids=${id}`, token, 'DELETE', { ids: [id] });
}

export const addAlbum = async (id: string, token: string) => {
  return await fetchSpotify(`me/albums?ids=${id}`, token, 'PUT', { ids: [id] });
}
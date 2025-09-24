
export const fetchSpotify = async (endpoint: string, token: string, method = 'GET') => {
  const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    method: method.toUpperCase(),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

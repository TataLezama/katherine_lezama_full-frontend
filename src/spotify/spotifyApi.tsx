export const fetchSpotify = async (
  endpoint: string,
  token: string,
  method: string = "GET",
  body?: any
) => {
  const options: RequestInit = {
    method: method.toUpperCase(),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  if (response.status === 200 || response.status === 204) return true;

  return response.json();
};

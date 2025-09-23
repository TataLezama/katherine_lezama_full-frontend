
const clientId = "3101fd6a7ac84f3795ba053c6cbe44b5"; // Reemplázalo con tu Client ID
const redirectUri = "http://localhost:3000/"; // Debe coincidir con el registrado en Spotify
const scopes = [
  "user-read-email",
  "user-read-private",
  "user-top-read",
  "playlist-read-private",
];

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = (): string | null => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get("access_token");
};

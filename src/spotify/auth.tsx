
const clientId = "3101fd6a7ac84f3795ba053c6cbe44b5"; // Reemplázalo con tu Client ID
const redirectUri = "https://katherine-lezama-full-frontend.vercel.app"; // Debe coincidir con el registrado en Spotify
const scopes = [
  "user-read-private",
  "user-read-email",
];

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${scopes.join("%20")}`;

export const getTokenFromUrl = (): string | null => {
  const hash = window.location.hash.substring(1); // obtiene lo que está después de "#"
  const params = new URLSearchParams(hash);
  return params.get("access_token");
};

export const setTokenFromUrl = (): void => {
  const token = getTokenFromUrl();
  if (token) {
    localStorage.setItem("spotifyToken", token);
    window.location.hash = ""; // limpia el hash de la URL
  }
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem("spotifyToken");
};

export const logout = (): void => {
  localStorage.removeItem("spotifyToken");
};
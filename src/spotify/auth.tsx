import { error } from "console";

interface SpotifyToken {
  access_token: string;
  token_type: string;
  scope: string;
  refresh_token?: string;
}

const clientId = "3101fd6a7ac84f3795ba053c6cbe44b5"; // Reemplázalo con tu Client ID
const clientSecret = "0e02a1d063794b3582e612129acb5297";
const redirectUri = "https://katherine-lezama-full-frontend.vercel.app"; // Debe coincidir con el registrado en Spotify
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-library-read",
];

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${scopes.join("%20")}`;

export const getTokenFromUrl = (): string | null => {
  let token: string | null = localStorage.getItem("spotifyToken");
  if (token) {
    return token;
  } else {
    console.log("No hay token en localStorage");

    const hash = window.location.search;
    const params = new URLSearchParams(hash);
    
    if (!params.get("code")) {
      console.log("Debes autenticarte para usar esta app");
    } else {
      console.log("Autenticando...");
      fetchGetToken(params.get("code")!)
      .then(
        (data: SpotifyToken) => {
          console.log("Token obtenido:", data.access_token);
          token = data.access_token;
          localStorage.setItem("spotifyToken", data.access_token);

          if ( data.refresh_token ) {
            console.log("Refresh token:", data.refresh_token);
            localStorage.setItem("spotifyRefreshToken", data.refresh_token);
          }
        }
      )
      .catch((error) => {
        console.error("Error al obtener token:", error);
        return null;
      });
    }
    return token;
  }
};

export const fetchGetToken = async (code: string) => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export const fetchRefreshToken = async (refreshToken: string) => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

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
interface SpotifyToken {
  access_token: string;
  token_type: string;
  scope: string;
}

const clientId = "3101fd6a7ac84f3795ba053c6cbe44b5"; // Reemplázalo con tu Client ID
const clientSecret = "0e02a1d063794b3582e612129acb5297";
const redirectUri = "https://katherine-lezama-full-frontend.vercel.app"; // Debe coincidir con el registrado en Spotify
const scopes = [
  "user-read-private",
  "user-read-email",
];

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${scopes.join("%20")}`;

export const getTokenFromUrl = (): string | null => {
  let token: string | null = localStorage.getItem("spotifyToken");
  if (token) {
    return token;
  } else {
    const hash = window.location.search; // obtiene lo que está después de "#"
    const params = new URLSearchParams(hash);
    
    if (!params.get("code")) throw new Error("No se encontró el código de autorización");

    fetchGetToken(params.get("code")!)
    .then(
      (data: SpotifyToken) => {
        token = data.access_token;
      }
    )
    .catch(console.error);

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
import React, { useEffect, useState } from "react";
import { loginUrl, getTokenFromUrl } from "../../spotify/auth";
import { fetchSpotify } from "../../spotify/spotifyApi";

export const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const _token = getTokenFromUrl();
    
    if (_token) {
      setToken(_token);
      localStorage.setItem("spotifyToken", _token);
    } else {
      const savedToken = localStorage.getItem("spotifyToken");
      if (savedToken) setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchSpotify("me", token).then(setUser).catch(console.error);
    }
  }, [token]);

  return (
    <>
      <div className="grid grid-container">
        <div className="grid__image">
          <img src="/login-image.svg" alt="spotify-logo" />
        </div>
        <div className="grid__content">
          <h1 className="title">Disfruta de la <strong>mejor música</strong></h1>
          <p>Accede a tu cuenta para guardar tus albumes favoritos.</p>
          <div className="button-container">
            {!token ? (
              <a
                href={loginUrl}
                className="button"
              >
                Log in con Spotify <img src="/arrow-right.svg" alt="arrow-right" />
              </a>
            ) : user ? (
              <div>
                <h1>Hola, {user.display_name}</h1>
                <p>Email: {user.email}</p>
              </div>
            ) : (
              <p>Cargando usuario...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

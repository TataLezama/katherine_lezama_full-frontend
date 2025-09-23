import { AlbumCard } from "../../components/cards/AlbumCard";


export const Artist = () => {
  return (
    <div className="artist">
      <div className="artist__header">
        <div className="artist__image">
          <img src="/default-artist.jpg" alt="Default artist" />
        </div>
        <div className="artist__content">
          <p className="artist__certified">
            <img src="/icon-certified-artist.svg" alt="icon-certficate-artist" />
            Artista certificado
          </p>
          <h1 className="artist__name">Nombre del artista</h1>
          <p className="artist__followers">Followers: `numero`</p>
          <p>Oyentes mensuales: `numero`</p>
        </div>
      </div>
      <div className="artist__albums">
        <p>Guarda tus álbumes favoritos de `ArtisName`</p>
        <div className="albums-grid">
          {
            
          }
        </div>
      </div>
    </div>
  )
}

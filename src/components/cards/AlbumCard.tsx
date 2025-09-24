import { use, useState } from "react";
import { addAlbum, removeAlbum } from "../../spotify/api";

interface AlbumCardProps {
  id: string
  name: string,
  imageUrl: string,
  publishedDate: string,
  inMyAlbums: boolean,
}

export const AlbumCard = ( { name, imageUrl, id, publishedDate, inMyAlbums }: AlbumCardProps ) => {

  const token = localStorage.getItem("spotifyToken") || "";
  const [isInMyAlbums, setIsInMyAlbums] = useState(inMyAlbums);

  const handleRemoveAlbum = async () => {
    if (!token) return;
    try {
      const data = await removeAlbum(id, token);
      console.log("Album removido:", id);
      setIsInMyAlbums(false);
    } catch (err) {
      console.error("Error al remover el álbum:", err);
    }
  };

  const handleAddAlbum = () => {
    if (!token) return;
    try {
      const data = addAlbum(id, token);
      console.log("Album añadido:", id);
      setIsInMyAlbums(true);
    } catch (err) {
      console.error("Error al añadir el álbum:", err);
    }
  };

  return (
    <div className="album-card">
      <div className="album-card__image">
        <img src={ imageUrl } alt="album-image" />
      </div>
      <div className="album-card__content">
        <h1 className="album-card__name">{ name }</h1>
        <p>Publicado: { publishedDate }</p>
        {
          isInMyAlbums ? (
            <button onClick={handleRemoveAlbum} className="button-color button-color--red">- Remove album</button>
          ) : (
            <button onClick={handleAddAlbum} className="button-color">+ Add album</button>
          )
        }
      </div>
    </div>
  )
}

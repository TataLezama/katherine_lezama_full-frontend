import { useParams } from "react-router-dom";
import { AlbumCard } from "../../components/cards/AlbumCard";
import { useEffect, useState } from "react";
import { getArtistAlbums, getArtistById, getMyAlbums } from "../../spotify/api";
import { MyAlbums } from '../my-albums/MyAlbums';

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  release_date: string;
}

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  followers: { total: number };
}

export const Artist = () => {
  
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem("spotifyToken") || "";

  const [artist, setArtist] = useState<Artist>();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 10;

  let myArtistAlbums: any[] = [];

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !token) return;

      try {
        const artistData = await getArtistById(id, token);
        setArtist(artistData);

        const albumData = await getArtistAlbums(id, token);
        setAlbums(albumData.items);
      } catch (err: any) {
        setError(err.message);
      }
    };

    const fetchMyAlbums = async () => {
      if (!token) return;

      try {
        const data = await getMyAlbums(token, offset, limit);
        myArtistAlbums = data.items.filter((item:any) =>
          item.album.artists[0].id === id
        );
        console.log("My albums:", myArtistAlbums);
      } catch (err) {
        console.error("Error obteniendo mis álbumes:", err);
      }
    };

    fetchData();
    fetchMyAlbums();
  }, [id, token]);

  if (error) return <p>Error: {error}</p>;
  if (!artist) return <p>Cargando artista...</p>;

  return (
    <div className="artist">
      <div className="artist__header">
        <div className="artist__image">
          <img src={ artist.images[0].url } alt="artist-image" />
        </div>
        <div className="artist__content">
          <p className="artist__certified">
            <img src="/icon-certified-artist.svg" alt="icon-certficate-artist" />
            Artista certificado
          </p>
          <h1 className="artist__name">{ artist.name }</h1>
          <p className="artist__followers">Followers: { artist.followers.total }</p>
          <p>Oyentes mensuales: { artist.followers.total }</p>
        </div>
      </div>
      <div className="artist__albums">
        <p>Guarda tus álbumes favoritos de <strong>{ artist.name }</strong></p>
        <div className="albums-grid">
          {
            albums.length > 0 ? (
              albums.map(({ name, images, id, release_date }: any) => {
                let inMyAlbums = false;
                if (myArtistAlbums && myArtistAlbums.length > 0) {
                  myArtistAlbums.forEach((item: any) => {
                    if (item.album.id === id) {
                      inMyAlbums = true;
                    }
                  });
                }
                return <AlbumCard key={ id } name={ name } imageUrl={ images[0].url } id={ id } publishedDate={ release_date } inMyAlbums={ inMyAlbums } />
              })
            ) : (
              <p>No hay álbumes</p>
            )
          }
        </div>
      </div>
    </div>
  )
}

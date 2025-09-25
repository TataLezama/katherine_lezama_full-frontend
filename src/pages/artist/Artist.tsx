import { useParams } from "react-router-dom";
import { AlbumCard } from "../../components/cards/AlbumCard";
import { useEffect, useState } from "react";
import { getArtistAlbums, getArtistById, getMyAlbums } from "../../spotify/api";

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  release_date: string;
  inMyAlbums: boolean;
}

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  followers: { total: number };
}

interface MyAlbums {
  album: {
    id: string;
    artists: { id: string }[];
  };
}

export const Artist = () => {
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem("spotifyToken") || "";

  const [artist, setArtist] = useState<Artist>();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [myArtistAlbums, setMyArtistAlbums] = useState<MyAlbums[]>([]);
  const [error, setError] = useState<string | null>(null);

  const limit = 20;

  useEffect(() => {
    if (!id || !token) return;

    const fetchData = async () => {
      try {
        const artistData = await getArtistById(id, token);
        setArtist(artistData);

        const albumData = await getArtistAlbums(id, token);
        setAlbums( albumData.items.map(({ name, images, id, release_date }: Album) => {
          return { name, images, id, release_date, inMyAlbums: false }
        }));

        const myAlbumsData = await getMyAlbums(token, 0, limit);
        const filtered = myAlbumsData.items.filter(
          (item: MyAlbums) => item.album.artists[0].id === id
        );
        setMyArtistAlbums(filtered)
        
        if ( myArtistAlbums.length > 0 ) {
          albums.forEach((album: Album) => {
            myArtistAlbums.forEach((myAlbum: MyAlbums) => {
              if ( myAlbum.album.id === album.id ) {
                album.inMyAlbums = true;
              }
            })
          })
          setAlbums(albums);
        }

      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, [id, token]);

  if (error) return <p>Error: {error}</p>;
  if (!artist) return <p>Cargando artista...</p>;

  return (
    <div className="artist">
      <div className="artist__header">
        <div className="artist__image">
          <img src={artist.images[0].url} alt="artist" />
        </div>
        <div className="artist__content">
          <p className="artist__certified">
            <img src="/icon-certified-artist.svg" alt="certified" />
            Artista certificado
          </p>
          <h1 className="artist__name">{artist.name}</h1>
          <p className="artist__followers">Followers: {artist.followers.total}</p>
          <p>Oyentes mensuales: {artist.followers.total}</p>
        </div>
      </div>

      <div className="artist__albums">
        <p>
          Guarda tus álbumes favoritos de <strong>{artist.name}</strong>
        </p>
        <div className="albums-grid">
          {albums.length > 0 ? (
            albums.map(({ name, images, id, release_date, inMyAlbums }: Album) => {

              return (
                <AlbumCard
                  key={id}
                  id={id}
                  name={name}
                  imageUrl={images[0]?.url}
                  publishedDate={release_date}
                  inMyAlbums={inMyAlbums}
                />
              );
            })
          ) : (
            <p>No hay álbumes</p>
          )}
        </div>
      </div>
    </div>
  );
};

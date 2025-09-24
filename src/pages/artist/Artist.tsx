import { useParams } from "react-router-dom";
import { AlbumCard } from "../../components/cards/AlbumCard";
import { useEffect, useState } from "react";
import { getArtistAlbums, getArtistById, getMyAlbums } from "../../spotify/api";

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
  const [myAlbum, setMyAlbum] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const limit = 20;

  useEffect(() => {
    if (!id || !token) return;

    const fetchData = async () => {
      try {
        const artistData = await getArtistById(id, token);
        setArtist(artistData);

        const albumData = await getArtistAlbums(id, token);
        setAlbums(albumData.items);

        const myAlbumsData = await getMyAlbums(token, 0, limit);
        const filtered = myAlbumsData.items.filter(
          (item: MyAlbums) => item.album.artists[0].id === id
        );
        setMyArtistAlbums(filtered);
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
            albums.map((album: Album) => {
              let myAlbumTemp = true;
              if (myArtistAlbums.length > 0) {
                myArtistAlbums.forEach((item: MyAlbums) => {
                  console.log(item.album.id, album.id);
                  if (item.album.id === album.id) {
                    setMyAlbum(myAlbumTemp);
                  }
                });
              }

              return (
                <AlbumCard
                  key={album.id}
                  id={album.id}
                  name={album.name}
                  imageUrl={album.images[0]?.url}
                  publishedDate={album.release_date}
                  inMyAlbums={myAlbum}
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

import { use, useEffect, useState } from "react";
import { BannerText } from "../../components/BannerText"
import { getMyAlbums } from "../../spotify/api";
import { AlbumCard } from "../../components/cards/AlbumCard";

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  release_date: string;
}

export const MyAlbums = () => {
  const token = localStorage.getItem("spotifyToken") || "";
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const data = await getMyAlbums(token, 0, 10);
        setAlbums(data.items);
      } catch (err) {
        console.error("Error obteniendo mis álbumes:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <BannerText 
            title="Mis albumes" 
            titleStrong="guardados" 
            description="Disfruta de tu música a un solo click y descube que discos has guardado dentro de  “mis  álbumes”" />
        <div className="albums-grid">
          <p>Mis álbumes</p>
          {
            albums && albums.length > 0 ? (
              albums.map(({ name, images, id, release_date }: any) => {
                return <AlbumCard key={ id } name={ name } imageUrl={ images[0].url } id={ id } publishedDate={ release_date } inMyAlbums={ true } />
              })
            ) : (
              <p>No hay álbumes</p>
            )
          }
        </div>
    </div>
  )
}

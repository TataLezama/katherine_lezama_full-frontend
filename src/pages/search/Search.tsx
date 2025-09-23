import { useEffect, useState } from 'react';
import { BannerText } from '../../components/BannerText';
import { ArtistCard } from '../../components/cards/ArtistCard';
import { FormSearch } from '../../components/FormSearch';

import { getInitialArtists, searchArtists } from '../../spotify/api';

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  followers: { total: number };
  genres: string[];
}

export const Search = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("spotifyToken") || "";
  const limit = 10;

  const loadArtists = async (query?: string, pageNum: number = 1) => {
    if (!token) return;
    try {
      setLoading(true);
      const offset = (pageNum - 1) * limit;

      let data;
      if (query && query.trim() !== "") {
        data = await searchArtists(query, token, limit, offset);
        setTotalPages(Math.ceil(data.artists.total / limit));
        setArtists(data.artists.items);
      } else {
        data = await getInitialArtists(token, limit, offset);
        setTotalPages(Math.ceil(data.artists.total / limit));
        setArtists(data.artists.items);
      }
    } catch (error) {
      console.error("Error cargando artistas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtists("", page);
  }, [page]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    loadArtists(searchTerm, 1);
  };
  
  return (
    <div className='search-container'>
        <BannerText 
        title="Busca tus" 
        titleStrong="artistas" 
        description="Encuentra tus artistas favoritos gracias a nuestro buscador y guarda tus álbumes favoritos" />
        <FormSearch />
        {
          loading ? (
            <p>Cargando...</p>
          ) : (
            <>
              <p>Mostrando { artists.length } resultados de { totalPages } páginas</p>
              <div className="artists-grid">
                {
                  artists.length > 0 ? (
                  artists.map(({ name, followers, id }: Artist) => {
                    return <ArtistCard key={ id } name={ name } followers={ followers.total } uid={ id } />
                  })
                 ) : (
                  <p>No hay resultados</p>
                )}
              </div>
            </>
          )}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >Anterior</button>
              <span>
                Página {page} de {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >Siguiente</button>
            </div>
          )} 
    </div>

  )
}

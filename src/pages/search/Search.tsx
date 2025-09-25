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
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const token = localStorage.getItem("spotifyToken") || "";
  const limit = 4;

  const loadArtists = async (query?: string, pageNum: number = 1) => {
    if (!token) return;
    try {
      setLoading(true);
      const newOffset = (pageNum - 1) * limit;

      let data;
      if (query && query.trim() !== "") {
        data = await searchArtists(query, token, limit, newOffset);
        console.log("Artistas:", data.artists.items);
        setArtists(data.artists.items);
        setOffset(newOffset);
      } else {
        data = await getInitialArtists(token, limit, newOffset);
        setTotal(data.artists.total);
        setTotalPages(Math.ceil(data.artists.total / limit));
        setArtists(data.artists.items);
      }
    } catch (error) {
      console.error("Error cargando artistas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchQuery = query, newOffset = 0) => {
    if (!token || !searchQuery.trim()) return;

    try {
      console.log("Buscando ... :", searchQuery);
      setLoading(true);
      setQuery(searchQuery.trim());

      const data = await searchArtists(searchQuery, token, limit, offset);

      setArtists(data.artists.items);
      setTotal(data.artists.total);
      setTotalPages(Math.ceil(data.artists.total / limit));
      setOffset(limit);

    } catch (err) {
      console.error("Error buscando artistas:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = async() => {
    if (!token ) return;
    
    try {
      setQuery("");
      setPage(1);
      setOffset(0);
      await loadArtists("", 1);
    } catch (err) {
      console.error("Error al limpiar la búsqueda:", err);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    loadArtists(query, page);
  }, [page]);


  return (
    <div className='search-container'>
        <BannerText 
        title="Busca tus" 
        titleStrong="artistas" 
        description="Encuentra tus artistas favoritos gracias a nuestro buscador y guarda tus álbumes favoritos" />
        <div  className="form-search">
          <div className="form-search__content">
              <input type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
                      placeholder="Buscar..." />
              {
                query && query.trim() !== "" ? (
                  <button
                    type="button"
                    className="clear-button"
                    onClick={() => handleClearSearch()}
                  >x</button>
                ) : (
                  <button 
                    type="button" 
                    className="button-color" 
                    onClick={() => handleSearch(query, 0)}>Search</button>
                )
              }
          </div>
        </div>
        {
          loading ? (
            <p>Cargando...</p>
          ) : (
            <div className="search-results">
              {
                query && query.trim() !== "" && (
                  <p>Mostrando { artists.length } resultados de { total } artistas</p>
                )
              }
              <div className="artists-grid">
                {
                  artists.length > 0 ? (
                  artists.map(({ name, followers, id, images }: Artist) => {
                    return <ArtistCard key={ id } name={ name } followers={ followers.total } uid={ id } image={images.length > 0 ? images[0].url : "/default-artist.jpg"}  />
                  })
                 ) : (
                  <p>No hay resultados</p>
                )}
              </div>
            </div>
          )}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                type="button"
                className="button--prev"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                title='Anterior página'
              ><img src="/icon-chevron_left.svg" alt="icon-chevron__left" /></button>
              <span>
                Página {page} de {totalPages}
              </span>
              <button
                type="button"
                className="button--next"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                title='Siguiente página'
              ><img src="/icon-chevron_right.svg" alt="icon-chevron__right" /></button>
            </div>
          )} 
    </div>

  )
}

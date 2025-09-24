import { useEffect, useState } from "react";
import { searchArtists } from "../spotify/api";

export const FormSearch = () => {
  const token = localStorage.getItem("spotifyToken") || "";
  
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const handleSearch = async (searchQuery = query, newOffset = 0) => {
    if (!token || !searchQuery.trim()) return;

    try {
      const data = await searchArtists(searchQuery, token, newOffset, limit);
      setArtists(data.artists.items);
      setTotal(data.artists.total);
      setOffset(newOffset);
    } catch (err) {
      console.error("Error buscando artistas:", err);
    }
  };

  useEffect(() => {
    // Cargar algo inicial por defecto (ej: buscar "A")
    handleSearch("A", 0);
  }, []);

  const totalPages = Math.ceil(total / limit);
  
  return (
    <div  className="form-search">
        <div className="form-search__content">
            <input type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar..." />
            <button className="button-color" onClick={() => handleSearch(query, 0)}>Search</button>
        </div>
    </div>
  )
}

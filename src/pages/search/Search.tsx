import { BannerText } from '../../components/BannerText';
import { ArtistCard } from '../../components/cards/ArtistCard';
import { FormSearch } from '../../components/FormSearch';

import { type ArtistData, artists } from "../../data/Artists.data";



export const Search = () => {
  return (
    <div className='search-container'>
        <BannerText 
        title="Busca tus" 
        titleStrong="artistas" 
        description="Encuentra tus artistas favoritos gracias a nuestro buscador y guarda tus álbumes favoritos" />
        <FormSearch />
        <p>Mostrando 4 resultados de `número de resultados`</p>
        <div className="artists-grid">
          {
            artists.map(({ name, followers, id }: ArtistData) => {
              return <ArtistCard key={ id } name={ name } followers={ followers } uid={ id } />
            })
          }
        </div>
    </div>
  )
}

interface AlbumCardProps {
  id: string
  name: string,
  imageUrl: string,
  publishedDate: string,
  inMyAlbums: boolean,
}

export const AlbumCard = ( { name, imageUrl, id, publishedDate }: AlbumCardProps ) => {
  return (
    <div className="album-card">
      <a href={`/album/${ id }`}>
        <div className="album-card__image">
          <img src={ imageUrl } alt="album-image" />
        </div>
        <div className="album-card__content">
          <h1 className="album-card__name">{ name }</h1>
          <p>Publicado: { publishedDate }</p>
          <button type="button" className="button-color">+ Add album</button>
        </div>
      </a>
    </div>
  )
}

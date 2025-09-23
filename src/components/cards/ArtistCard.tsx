
interface ArtistCardProps {
  name: string,
  followers: number,
  uid: string
}

export const ArtistCard = ({ name, followers, uid }: ArtistCardProps) => {
  return (
    <div className="artist-card">
      <a href={`/artist/${ uid }`}>
        <div className="artist-card__image"></div>
        <div className="artist-card__content">
          <h1 className="artist-card__name">{ name }</h1>
          <p className="artist-card__followers">Followers: { followers }</p>
        </div>
      </a>
    </div>
  )
}

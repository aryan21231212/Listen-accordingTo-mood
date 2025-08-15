import React from 'react'

const Box = ({ playlist }) => {
  console.log(playlist)
  return (
    <>

      <div className='main'>
        {playlist.playlists != null && playlist.playlists.length > 0 ? (
          playlist.playlists
            .filter(p => p?.images?.length > 0 && p?.description?.trim())
            .map((p, index) => (
              <div key={index} className="playlist-card">
                <div className="playlist-image">
                  <img
                    src={p.images[0].url}
                    alt="playlist"
                  />
                </div>
                <div className="playlist-content">
                  <h3 className="playlist-title">{p.name}</h3>
                  <p className="playlist-description">{p.description}</p>
                  <div className="playlist-link">
                    <a href={p.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                      View on Spotify →
                    </a>
                  </div>
                </div>
              </div>
            ))) :""
       
        }
      </div>
    </>
  )
}

export default Box
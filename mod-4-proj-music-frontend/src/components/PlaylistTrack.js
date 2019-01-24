import React from 'react'

class PlaylistTrack extends React.Component {



  render() {
    return (
      <div>

      {this.props.tracks.map(track=>(
        <div className="card">
          <div className="card-body">

          <img className="card-img-top cover-pic" src={track.image} alt="" />
          <h3 className="card-title">{track.name}</h3>
          <h4 className="card-text">{track.artists}</h4><br/>
          
          <p>Preview:</p>
          {track.preview !== null ?
            <audio
              ref="audio_tag"
              src={track.preview}
              controls
            /> :
              <p>No preview available</p>
          }
          </div>
        </div>
      ))}
      </div>
    )
  }
}

export default PlaylistTrack;

import React from 'react'

class PlaylistTrack extends React.Component {



  render() {
    return (
      <div>

      {this.props.tracks.map(track=>(
        <p>{track.name}</p>
      ))}
      </div>
    )
  }
}

export default PlaylistTrack;

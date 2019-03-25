import React from 'react';
import PlaylistForm from './PlaylistForm'
import PlaylistCard from './PlaylistCard'


class Playlist extends React.Component {



  render() {

    return(
      <div>
      <h1>My Playlists</h1>
      <PlaylistForm
        userInfo={this.props.userInfo}
        createNewPlaylist={this.props.createNewPlaylist}
      />
      <br />

        {this.props.playlist.map(pl =>
          ( <PlaylistCard
              pl={pl}
              playlist={this.props.playlist}
              tracks={this.props.tracks}
              playlistTracks={this.props.playlistTracks}
            />
            )
        )}<br/>


      </div>

    )
  }
}
export default Playlist;

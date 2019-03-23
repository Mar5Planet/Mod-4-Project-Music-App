import React from 'react';
import PlaylistForm from './PlaylistForm'
import PlaylistTrack from './PlaylistTrack'


class Playlist extends React.Component {


  render() {
    return(
      <div>
      <h1>My Playlists</h1>
      <PlaylistForm
        userInfo={this.props.userInfo}
        createNewPlaylist={this.props.createNewPlaylist}/>

        {this.props.playlist.map(pl =>
          (<div key={pl.id}><h3>{pl.name}</h3>

            {this.props.playlistTracks.map(plt => (

            plt.playlist_id === pl.id ?

              <PlaylistTrack playlist={this.props.playlist.find(pl =>
                plt.playlist_id === pl.id
              )}
                tracks={this.props.tracks.filter(track=> (
                track.id === plt.track_id
              ))}
              />

              : null

            ))}

          </div>)
        )}


      </div>

    )
  }
}
export default Playlist;

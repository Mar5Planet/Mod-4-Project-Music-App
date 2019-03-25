import React from 'react';
import PlaylistTrack from './PlaylistTrack'
import { Collapse, Button } from 'reactstrap';

class PlaylistCard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      clicked: false
    }
  }


  render() {
    const { clicked } = this.state
    const {pl} = this.props

    return(
      <div key={pl.id}>

      <Button color="link"
        onClick={() => this.setState({ clicked: !clicked })}
        aria-controls={pl.name}
        aria-expanded={clicked}
      >
        {pl.name}
      </Button><br/>

      {this.props.playlistTracks.map(plt => (

        plt.playlist_id === pl.id ?

        <Collapse isOpen={clicked}>
          <div id={pl.name}>

            <PlaylistTrack
              playlist={this.props.playlist.find(npl =>
              plt.playlist_id === npl.id
            )}
              tracks={this.props.tracks.filter(track=> (
              track.id === plt.track_id
            ))}
            />
          </div>
        </Collapse>

          : null
        )
  )}<br/>


      </div>)
  }
}
export default PlaylistCard;

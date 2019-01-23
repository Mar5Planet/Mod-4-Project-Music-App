import React from 'react';


class AddToPlaylist extends React.Component {

  state = {
    selectedFilter: "",
  }

  changeHandler = (e) => {
    this.setState({
      selectedFilter: e.target.value
    })
  }


  render() {
    return(
      <form>
        <select name="type" id="type" onChange={this.changeHandler}>{this.props.playlist.map(pl => (
          <option value={pl.id}>{pl.name}</option>
        ))}
        </select>
        <button onClick={(e) => this.props.addToPlaylist(e, this.state.selectedFilter, this.props.track, this.props.track.spotify_id)} type="button" className="btn btn-info">Add Song</button>
      </form>
    )
  }
}
export default AddToPlaylist;

// <h1>My Playlist</h1>
// {this.props.playlist.map(track=> (
//   <div className="card">
//     <div className="card-body">
//       <img className="card-img-top cover-pic" src={track.image} alt="" />
//       <h3 className="card-title">{track.name}</h3>
//       <h4 className="card-text">{track.artist}</h4>
//       <p>Preview:</p>
//       {track.preview !== null ?
//         <audio
//           ref="audio_tag"
//           src={track.preview}
//           controls
//         /> :
//           <p>No preview available</p>
//       }
//       <br/><button type="button" className="btn btn-danger" onClick={()=>this.props.removeSong(track)}>Remove Song</button>
//   </div>
// </div>
// ))}

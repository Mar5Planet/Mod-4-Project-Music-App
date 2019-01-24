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

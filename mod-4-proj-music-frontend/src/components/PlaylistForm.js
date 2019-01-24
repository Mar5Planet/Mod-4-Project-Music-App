import React from 'react';


class PlaylistForm extends React.Component {

  state = {
    name: "",
    userId: "",
    clicked: false
  }

  changeHandler = (e) => {
    let userId = this.props.userInfo.id
    this.setState({
      name: e.target.value,
      userId: userId
    })
  }

  clickHandler = () => {
    let click = this.state.clicked
    this.setState({
      clicked: !click
    })
  }


  render() {
    return(
      <div>
      <button type="button" class="btn btn-primary" onClick={this.clickHandler}>Create New Playlist </button>
      {this.state.clicked ? (<form className="form-group" onSubmit={(e) => this.props.createNewPlaylist(e, this.state)}>

        <input type="text" placeholder="Playlist Name" onChange={this.changeHandler} value={this.state.playlistName} />
        <input type="hidden" value={this.state.userId} />
        <button type="button" className="btn btn-success">Submit</button>
      </form>
    ) : (null)
  }
      </div>
    )
  }
}
export default PlaylistForm;

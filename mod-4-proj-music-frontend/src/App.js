import React, { Component } from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import FullContainer from './containers/FullContainer';
import Sidebar from './components/Sidebar';
import NewUserForm from './components/NewUserForm';
import Login from './components/Login';
import PopTrack from './components/PopTrack';
import RandomTrack from './components/RandomTrack';
import Playlist from './components/Playlist';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import Loading from './components/Loading'



class App extends Component {
  _isMounted = false;

  state={
    topHits: [],
    userList: [],
    random: [],
    isLoading: true,
    user: {},
    login: false,
    playlist: [],
    searchedSongs: [],
    loading: false,
    tracks: [],
    playlistTracks: [],
  }

  componentDidMount(){
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({isLoading: false})
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getTopHits(){
    //change address depending on port
    fetch('http://localhost:3001/api/v1/tracks/top_100', {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res=>res.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            topHits: data
          })
        }
      })
  }

  getRandom(){
    //change address depending on port
    fetch('http://localhost:3001/api/v1/tracks/random', {
      headers: {
        Authorization: localStorage.getItem("token")}
      })
      .then(res=>res.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            random: data
          })
        }
        })
  }

  getUserList(){
    fetch('http://localhost:3001/api/v1/users')
      .then(res=>res.json())
      .then(data=> {
        this.setState({
          userList: data
        })
      })
  }

  getTracks = () => {
    fetch('http://localhost:3001/api/v1/tracks', {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => res.json())
    .then(data => {
      this.setState({
        tracks: data
      })
    })
  }

  loginSubmitHandler = (userInfo) => {
    fetch('http://localhost:3001/api/v1/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Action: "application/json",
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    }).then(res=>res.json())
      .then(data => {
        localStorage.setItem("token", data.jwt)
        this.setState({
          user: data.user,
          login: true
        })
        this.props.history.push("/home")
        this.getRandom()
        this.getTopHits()
        this.getPlaylist(data.user.id)
        this.getTracks()
        this.getPlaylistTracks()
      })
  }


    newUserSubmitHandler = (event, userInfo) => {
      event.preventDefault()
      let token = localStorage.getItem("token")
      fetch('http://localhost:3001/api/v1/users', {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
       },
       body: JSON.stringify({
         name: userInfo.name,
         username: userInfo.username,
         password: userInfo.password,
       })
     }).then(res=>res.json())
        .then(data=>{
          localStorage.setItem("token", data.jwt)
          this.setState({
            user: data.user,
            login: true
          })
          this.props.history.push("/home")
          this.getRandom()
          this.getTopHits()
          this.getPlaylist(data.user.id)
          this.getTracks()
          this.getPlaylistTracks()
        })

    }

    logout = () => {
      localStorage.removeItem("token")
      this.setState({
        user: {},
        login: false
      })
      this.props.history.push("/home")
    }



    submitPlaylistHandler= (e, playlistId, track, spotifyId) => {
      e.preventDefault()
      fetch(`http://localhost:3001/api/v1/playlist_tracks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          playlist_id: playlistId,
          track_id: track.id,
          spotify_id: spotifyId
        })
      }).then(res=>res.json())
        .then(data=>{
          let fullPlaylist = [...this.state.playlistTracks, data]
          let newTrack = {
            id: data.track_id,
            name: track.name,
            artists: track.artists,
            image: track.image,
            duration: track.duration,
            popularity: track.popularity,
            preview: track.preview,
            spotify_id: track.spotify_id
          }
          this.setState({
            playlistTracks: fullPlaylist,
            tracks: [...this.state.tracks, newTrack]
          })
        }).then(alert(`${track.name} added!`))
    }

    getPlaylist = (id) => {
      fetch(`http://localhost:3001/api/v1/users/${id}/playlists`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
    .then(res=>res.json())
    .then(data => {
      let newPl = [...data].filter(pl => pl.user_id === id)
      this.setState({
        playlist: newPl
      })
    })
    }

    getPlaylistTracks = () => {
      fetch(`http://localhost:3001/api/v1/playlist_tracks`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
    .then(res=>res.json())
    .then(data => {
      this.setState({
        playlistTracks: data
      })
    })
    }


    editSubmitHandler = (e, userInfo) => {
      e.preventDefault()
      let id = this.state.user.id
      console.log(id);
      fetch(`http://localhost:3001/api/v1/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          name: userInfo.name,
          username: userInfo.username,
          password: this.state.user.password
        })
      })
    }

    deleteUser = () => {
      let id = this.state.user.id
        fetch(`http://localhost:3001/api/v1/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }).then(this.logout())
    }

    fetchSearchedSongs = (query) => {
      this.setState({loading: true})
      fetch(`http://localhost:3001/api/v1/tracks/search?q=${query}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(r => r.json())
      .then(data => {
        this.setState({
          searchedSongs: data,
          loading: false
        })
      })
    }

    createNewPlaylist = (e, playlist) => {
      e.preventDefault()
      //console.log(playlist)
      fetch(`http://localhost:3001/api/v1/users/${playlist.userId}/playlists`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
         Authorization: localStorage.getItem("token")
       },
       body: JSON.stringify({
         name: playlist.name,
         user_id: playlist.userId
       })})
       .then(res => res.json())
       .then(data => {
         let playlist = [...this.state.playlist, data]
         this.setState({
           playlist
         })
       })
       .then(alert(`${playlist.name} created!`))
    }

    // addToPlaylist = (track) => {
    //   let newPlaylist = [...this.state.playlist, track]
    //   this.setState({
    //     playlist: newPlaylist
    //   })
    //   alert(`${track.name} added!`)
    // }
    //
    // removeSong = (trackObj) => {
    //   let newPlaylist = [...this.state.playlist].filter(track => track !== trackObj)
    //   this.setState({playlist: newPlaylist})
    // }



  render() {
    return (
      <div className="App">
      <Sidebar
        login={this.state.login}
        logout={this.logout}
        />
      <Switch>

      <Route
        path="/playlist"
        render={()=> (
          <Playlist
            userInfo={this.state.user}
            createNewPlaylist={this.createNewPlaylist}
            playlist={this.state.playlist}
            removeSong={this.removeSong}
            tracks={this.state.tracks}
            playlistTracks={this.state.playlistTracks}
          />
        )} />

        <Route
          path="/popular"
          render={()=> (
            this.state.topHits.length === 0?
            <Loading /> :
            <PopTrack
              topHits={this.state.topHits}
              addToPlaylist={this.submitPlaylistHandler}
              playlist={this.state.playlist}
              />
            )}
            />

        <Route
          path="/random"
          render={()=> (
            this.state.random.length === 0?
              <Loading /> :
              <RandomTrack
                random={this.state.random}
                addToPlaylist={this.submitPlaylistHandler}
                playlist={this.state.playlist}
                />
            )}
            />

        <Route
          path="/profile"
          render={()=>(
            <UserProfile
              userInfo={this.state.user}
              editSubmitHandler={this.editSubmitHandler}
              deleteUser={this.deleteUser}
             />
          )}
          />

        <Route
          path="/signup"
          render={()=>(
            <NewUserForm
              newUserSubmitHandler={this.newUserSubmitHandler}
              />
          )}
        />

        <Route
          path="/login"
          render={()=> (
            <Login
              loginSubmitHandler={this.loginSubmitHandler}
              userInfo={this.state.user}
              />
            )}
            />

        <Route
          path="/home"
          render={()=> (
            <Home
              fetchSearchedSongs={this.fetchSearchedSongs}
              searchedSongs={this.state.searchedSongs}
              login={this.state.login}
              loading={this.state.loading}
              addToPlaylist={this.submitPlaylistHandler}
              playlist={this.state.playlist}
            />
          )}
          />

        <Route
          path="/"
          component={Home}
          />

      </Switch>
      </div>
    );
  }
}

export default withRouter(App);

import React, { Component, Fragment } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import Navigation from './components/Navigation';
import Artists from './components/Artists';
import Tracks from './components/Tracks'

class App extends Component {

  state = {
    artists: [],
    currentArtist: 0
  };

  componentDidMount() {
    fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=5f7e08a667109d3fc3fab0397a234d2a&format=json&limit=10')
      .then(res => res.json())
      .then(data => {
        const artists = data.artists.artist.map(artist => {
          return {
            name: artist.name,
            image: artist.image[3]['#text']
          }
        })
        const arrPromisesSongs = [...artists].map(({ name }) =>
          fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${name}&api_key=5f7e08a667109d3fc3fab0397a234d2a&format=json`)
            .then(res => res.json())
            .catch(err => console.error(err)))
        Promise.all(arrPromisesSongs)
          .then(songsArr => {
            artists.forEach((artist, i) => {
              const tracks = songsArr[i].toptracks.track;
              artist.songs = tracks.map(track => {
                return {
                  trackname: track.name,
                  count: track.playcount
                }
              });
            })
            this.setState({
              artists
            })
          })
      })
  };

  nextArtist = () => {
    let { artists, currentArtist } = this.state;
    currentArtist++

    if (currentArtist >= artists.length) {
      currentArtist = 0;
    }
    this.setState({
      currentArtist
    })
  };

  previousArtist = () => {
    let { artists, currentArtist } = this.state;
  
    if (currentArtist === 0) {
      this.setState({
        currentArtist: (artists.length - 1)
      })
    }
    else {
      this.setState({
        currentArtist: currentArtist - 1
      })
    }
  };

  // `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${name}&api_key=5f7e08a667109d3fc3fab0397a234d2a&format=json`

  render() {
    console.log('la data 29', this.state.artists);
    const { artists, currentArtist } = this.state;
    return (

      <div className="App" >
        <Navigation></Navigation>
        <Container className="p-5">
          <Row className="mb-3 pt-3">
            <Col className="col-12 col-sm-6 m-auto wrap text-center"> 
              {artists.length ?
                artists.map((artist, i) =>
                  <Fragment>
                    <Artists artist={artist} key={i} previousArtist={this.previousArtist} nextArtist={this.nextArtist} />
                    {artist.songs.map((track, i) =>
                      <Tracks track={track} key={i} />
                    )}
                  </Fragment>
                )[currentArtist]
                : <p> Cargando ...</p>
              }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default App;

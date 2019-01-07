import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import Navigation from './components/Navigation';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      artists: [],
      currentArtist: 0
    }
  };

  componentDidMount() {
    fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=5f7e08a667109d3fc3fab0397a234d2a&format=json&limit=10')
      .then(res => res.json())
      .then(data => {
        const artists = data.artists.artist.map((artist, i) => {
          return {
            name: artist.name,
            image: artist.image[3]['#text']
          }
        })
        const arrPromisesSongs = [...artists].map(({name}) => 
        fetch (`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${name}&api_key=5f7e08a667109d3fc3fab0397a234d2a&format=json`)
        .then(res => res.json())
        .catch(err => console.error(err)))
        Promise.all(arrPromisesSongs)
        .then(res => console.log(res))
      })
  };

// `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${name}&api_key=5f7e08a667109d3fc3fab0397a234d2a&format=json`

render() {
  console.log('la data 29', this.state.artists);
 const { artists, currentArtist} = this.state;
  return (

    <div className="App" >
      <Navigation></Navigation>
      <Container className="p-5">
        <Row>
          <Col xs="12">
            {artists.length ?
              artists.map((artist, i) =>
                <Row>
                  <Col xs="12" key={i} className="pt-3">
                    {artist.name}
                    <i class="fas fa-heart ml-2"></i>
                    <i class="fas fa-thumbs-down ml-2"></i>
                  </Col>
                  <Col xs="12" key={i} className="pt-3">
                    <i class="fas fa-angle-left"></i><img src={artist.image} alt="" /><i class="fas fa-angle-right"></i>
                  </Col>
                </Row>
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

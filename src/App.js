import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import Navigation from './components/Navigation';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      artists: []
    }
  };

  componentDidMount() {
    fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=5f7e08a667109d3fc3fab0397a234d2a&format=json&limit=10')
      .then(res => res.json())
      .then(data => {
        this.setState({
          artists: data.artists.artist.map((artist, i) => {
            return {
              name: artist.name,
              image: artist.image[3]['#text']
            }
          })
        })
      })
  };

  render() {
    console.log('la data 29', this.state.artists);

    return (

      <div className="App" >
        <Navigation></Navigation>
        <Container className="p-5">
          <Row>
            <Col xs="12">
              {this.state.artists.length ?
                this.state.artists.map((artist, i) =>
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
                )
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

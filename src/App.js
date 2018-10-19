import React, { Component } from 'react';
import './App.css';

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
          artists: data.artists.artist,
        })
      })
  };

  render() {
    console.log('la data 37', this.state.artists);

    return (
      <div className="App" >
        {this.state.artists.length ?
          this.state.artists.map((artist, i) =>
            // console.log('objArtist', artist);

            // console.log(
            //   artist.name,
            //   artist.image[3]['#text']
            // )

            <div key={i}>
              Name: {artist.name} | Imagen: <img src={artist.image[3]['#text']}/>
            </div>)
          : <div> Cargando ...</div>
        }
      </div>

    );
  }

};


export default App;

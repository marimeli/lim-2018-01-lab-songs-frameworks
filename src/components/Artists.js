import React from 'react';
import { Col, Row } from 'reactstrap';
import '../App.css';

const Artists = ({ artist, nextArtist, previousArtist }) => (
  <Row>
    <Col xs="12">
      <i className="arrow previous fas fa-angle-left" onClick={previousArtist}></i><img src={artist.image} alt="artist_photo" className="img-fluid" /><i className="arrow next fas fa-angle-right" onClick={nextArtist} ></i>
      <h3 className="tc-white mt-3">{artist.name}</h3>
    </Col>
  </Row>
);


export default Artists;
import React from 'react';
import { Col, Row } from 'reactstrap';

const Artists = ({ artist, nextArtist }) => (
  <Row>
    <Col xs="12" className="pt-3">
      {artist.name}
      <i className="fas fa-heart ml-2"></i>
      <i className="fas fa-thumbs-down ml-2"></i>
    </Col>
    <Col xs="12" className="pt-3">
      <i className="fas fa-angle-left"></i><img src={artist.image} alt="" /><i className="fas fa-angle-right" onClick={nextArtist} ></i>
    </Col>
  </Row>
);


export default Artists;
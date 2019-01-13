import React from 'react';
import { Col, Row } from 'reactstrap';

const Tracks = ({ track }) => (
  <Row>
  <Col xs="12" className="pt-3">
    {track.trackname}
    <p>{track.count}</p>
    <i className="fas fa-heart ml-2"></i>
    <i className="fas fa-thumbs-down ml-2"></i>
  </Col>
</Row>
);


export default Tracks;



import React from 'react';
import { Col, Row } from 'reactstrap';
import '../App.css';

const Tracks = ({ track }) => (
  <Row className="mb-3 pt-3 m-auto">
    <Col className="col-8 col-sm-7 text-left tc-yellow">
      {track.trackname}
    </Col>
    <Col className="col-4 text-right tc-yellow">
      <p>{track.count}</p>
      {/* <i className="fas fa-heart ml-2"></i>
    <i className="fas fa-thumbs-down ml-2"></i> */}
    </Col>
  </Row>
);


export default Tracks;



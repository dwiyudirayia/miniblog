import React, { Component } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Navbar from '../../common/Navbar';

class Error404 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar {...this.props} />
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="my-3 p-3 bg-white rounded box-shadow">
                <h6 className="border-bottom border-gray pb-2 mb-0">404 - Not Found!</h6>
                <Row className="mt-3 justify-content-center">
                  <Col md="6" className="text-center text-muted">
                    <p>
                      We believe you are lost or may be the requested content has been removed.
                      But do not to worry, we will help you to get out from here.
                    </p>
                    <Button tag={Link} to="/">Go Back</Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Error404;
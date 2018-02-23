import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import Loader from './Loader';

class SinglePost extends Component {
  constructor(props) {
    super(props);
  }

  get generateComponent() {
    const { post, isLoading } = this.props;
    const data = { ...post.attributes, user: post.relationships.user.data };
    const timestamp = moment(data.created_at, 'YYYY-MM-DD HH:mm:ss').fromNow();

    return (
      <div>
        <h4 className="text-capitalize border-bottom border-gray pb-2 mb-0">{data.title}</h4>
        <Row className="small text-muted">
          <Col md="6">
            <span>{timestamp}</span>
          </Col>
          <Col md="6" className="text-right">
            <span>
              written by, <Link to={`/users/${data.user.id}`}>@{data.user.username}</Link>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md="12">
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="my-3 p-3 bg-white rounded box-shadow">
        {
          !isLoading
            ? this.generateComponent
            : (<Loader />)
        }
      </div>
    )
  }
}

export default SinglePost;
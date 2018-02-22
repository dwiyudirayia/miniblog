import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import Navbar from '../../common/Navbar';
import Loader from '../../common/Loader';
import SinglePost from '../../common/SinglePost';
import Error404 from '../../public/errors/404';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    const { match: { params } } = this.props;

    this.state = {
      post: null,
      id: params.postId
    }
  }

  componentWillMount() {
    this.load();
  }

  load() {
    const { id } = this.state;

    return axios.get(`/api/posts/${id}`)
      .then((response) => {
        const { data } = response.data;
        this.setState({
          post: data
        });
      })
      .catch((error) => {
        console.log('Error!', error);
      });
  }

  render() {
    const { post } = this.state;
    const { isLoading } = this.props;

    if (post === null && !isLoading) {
      return (<Error404 {...this.props} />);
    }

    return (
      <div>
        <Navbar {...this.props} />
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <SinglePost
                post={post}
                isLoading={isLoading} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PostDetail;
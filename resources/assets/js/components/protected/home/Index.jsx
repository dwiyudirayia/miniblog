import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import Navbar from '../../common/Navbar';
import EditorComponent from '../../common/EditorComponent';
import ListGroupPost from '../../common/ListGroupPost';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }

    this.handlePublished = this.handlePublished.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  load() {
    const { user } = this.props;
    const params = user !== null ? `?user_id=${user.id}` : '';
    return axios.get(`/api/posts${params}`)
      .then((response) => {
        const { data } = response.data;
        this.setState({
          posts: data
        });
      })
      .catch((error) => {
        console.log('Error!', error);
      });
  }

  handlePublished(post) {
    const { data } = post;
    const { posts } = this.state;
    posts.push(data);
    this.setState({
      posts
    });
  }

  render() {
    const { posts } = this.state;
    const { isLoading } = this.props;

    return (
      <div>
        <Navbar {...this.props} />
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <EditorComponent
                onPublished={this.handlePublished}
                {...this.props} />
              <ListGroupPost
                isLoading={isLoading}
                posts={posts}
                noPostText={'Sorry, you have no posts yet.'}
                title={'Your posts'} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Index;
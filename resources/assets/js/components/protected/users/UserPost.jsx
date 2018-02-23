import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Navbar from '../../common/Navbar';
import ListGroupPost from '../../common/ListGroupPost';

class UserPost extends Component {
  constructor(props) {
    super(props);
    const { match: { params } } = this.props;

    this.state = {
      id: params.userId ? params.userId : null,
      posts: [],
      user: null,
      userIsLoading: true,
      postIsLoading: true,
    }

    this.handlePublished = this.handlePublished.bind(this);
  }

  componentDidMount() {
    this.loadUser();
    this.load();
  }

  load() {
    const { id } = this.state;
    return axios.get(`/api/posts/?user_id=${id}`)
      .then((response) => {
        const { data } = response.data;
        this.setState({
          posts: data,
          postIsLoading: false
        });
      })
      .catch((error) => {
        console.log('Error!', error);
      });
  }

  loadUser() {
    const { id } = this.state;
    return axios.get(`/api/users/${id}`)
      .then((response) => {
        const { data } = response.data;
        this.setState({
          user: data,
          userIsLoading: false
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
    const { user, posts, postIsLoading, userIsLoading } = this.state;

    const title = !userIsLoading
      ? `${user.attributes.name}'s posts`
      : null;

    return (
      <div>
        <Navbar {...this.props} />
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <ListGroupPost
                isLoading={postIsLoading}
                posts={posts}
                noPostText="Sorry, there are no posts yet."
                title={title} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UserPost;
import React, { Component } from 'react';
import { Col, Container, Media, Row } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import Navbar from '../../common/Navbar';
import EditorComponent from '../../common/EditorComponent';
import Loader from '../../common/Loader';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true,
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
        setTimeout(() => {
          this.setState({
            posts: data,
            isLoading: false
          });
        }, 500);
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
    const { posts, isLoading } = this.state;

    const noPost = (
      <div className="pt-3 text-muted text-center">
        <span>Sorry, you have no posts yet.</span>
      </div>
    );

    const loader = (
      <Loader />
    );

    const listPosts = posts.map(post => {
      const { id } = post;
      const data = { id, ...post.attributes, user: post.relationships.user.data };
      return (
        <Media className="text-muted pt-3" key={data.id}>
          <Media body className="pb-3 mb-0 lh-125 border-bottom border-gray">
            <Link to="#">
              <strong className="d-block text-gray-dark">@{data.user.username}</strong>
            </Link>
            {data.title}
          </Media>
        </Media>
      )
    });

    return (
      <div>
        <Navbar {...this.props} />
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <EditorComponent
                onPublished={this.handlePublished}
                isAuthenticated={this.props.isAuthenticated}
                token={this.props.token} />
              <div className="my-3 p-3 bg-white rounded box-shadow">
                <h6 className="border-bottom border-gray pb-2 mb-0">Your posts</h6>
                {
                  !isLoading
                    ? posts.length > 0
                      ? listPosts
                      : noPost
                    : loader
                }
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Index;
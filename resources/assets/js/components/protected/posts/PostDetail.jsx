import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import Navbar from '../../common/Navbar';
import Loader from '../../common/Loader';
import SinglePost from '../../common/SinglePost';
import ListGroupComment from '../../common/ListGroupComment';
import CommentForm from '../../common/CommentForm';
import Error404 from '../../public/errors/404';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    const { match: { params } } = this.props;

    this.state = {
      post: null,
      id: params.postId,
      comments: [],
      commentsIsLoading: true,
      postIsLoading: true
    }

    this.handleCommented = this.handleCommented.bind(this);
  }

  componentWillMount() {
    this.load();
  }

  load() {
    const { id } = this.state;
    return axios.get(`/api/posts/${id}`)
      .then((response) => {
        const { data } = response.data;
        this.loadComments(data.relationships.comments.links.self);
        this.setState({
          post: data,
          postIsLoading: false
        });
      })
      .catch((error) => {
        console.log('Error!', error);
      });
  }

  loadComments(url) {
    return axios.get(url)
      .then((response) => {
        const { data } = response.data;
        this.setState({
          comments: data,
          commentsIsLoading: false
        });
      })
      .catch((error) => {
        console.log('Error!', error);
      });
  }

  handleCommented(comment) {
    const { data } = comment;
    const { comments } = this.state;
    comments.push(data);

    this.setState({
      comments
    });
  }

  render() {
    const { id, post, comments, postIsLoading, commentsIsLoading } = this.state;
    const { isLoading } = this.props;
    const totalComments = comments.length;

    if (post === null && !isLoading && !postIsLoading) {
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
                isLoading={postIsLoading} />
              <CommentForm
                onCommented={this.handleCommented}
                relatedName="post_id"
                relatedId={id}
                isLoading={commentsIsLoading} />
              <ListGroupComment
                comments={comments}
                isLoading={commentsIsLoading}
                noCommentText="Sorry, there are no comments yet."
                title={`${totalComments} comment${totalComments !== 1 ? 's' : ''}`} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PostDetail;
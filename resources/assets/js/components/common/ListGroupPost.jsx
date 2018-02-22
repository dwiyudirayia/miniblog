import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import Loader from './Loader';

class ListGroupPost extends Component {
  constructor(props) {
    super(props);
  }

  get createListPost() {
    const { posts } = this.props;
    return (
      posts.map(post => {
        const { id } = post;
        const data = { id, ...post.attributes, user: post.relationships.user.data };
        const timestamp = moment(data.created_at, 'YYYY-MM-DD HH:mm:ss').fromNow();
        return (
          <ListGroupItem tag={Link} to={`posts/${id}`} action key={id} className="px-1 border-0 border-bottom border-gray">
            <ListGroupItemText>
              @{data.user.username}
              <span className="float-right">{timestamp}</span>
            </ListGroupItemText>
            <ListGroupItemHeading>{data.title}</ListGroupItemHeading>
          </ListGroupItem>
        )
      })
    );
  }

  get createNoPost() {
    const { noPostText } = this.props;
    return (
      <div className="pt-3 text-muted text-center">
        <span>{noPostText}</span>
      </div>
    );
  }

  get generateComponent() {
    const { title, posts } = this.props;
    return (
      <div>
        <h6 className="border-bottom border-gray pb-2 mb-0">{title}</h6>
        <ListGroup>
          {
            posts.length > 0
              ? this.createListPost
              : this.createNoPost
          }
        </ListGroup>
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

export default ListGroupPost;
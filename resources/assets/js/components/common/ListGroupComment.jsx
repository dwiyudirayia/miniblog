import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import Loader from './Loader';

class ListGroupComment extends Component {
  constructor(props) {
    super(props);
  }

  get createListComment() {
    const { comments } = this.props;
    return (
      comments.map(comment => {
        const { id } = comment;
        const data = { id, ...comment.attributes, user: comment.relationships.user.data };
        const timestamp = moment(data.created_at, 'YYYY-MM-DD HH:mm:ss').fromNow();
        return (
          <ListGroupItem key={id} className="px-1 border-0 border-bottom border-gray">
            <ListGroupItemText>
              <Link to={`users/${data.user.id}`}>
                @{data.user.username}
              </Link>
              <span className="float-right">{timestamp}</span>
            </ListGroupItemText>
            <ListGroupItemHeading>{data.content}</ListGroupItemHeading>
          </ListGroupItem>
        )
      })
    );
  }

  get createNoComment() {
    const { noCommentText } = this.props;
    return (
      <div className="pt-3 text-muted text-center">
        <span>{noCommentText}</span>
      </div>
    );
  }

  get generateComponent() {
    const { title, comments } = this.props;
    return (
      <div>
        <h6 className="border-bottom border-gray pb-2 mb-0">{title}</h6>
        <ListGroup>
          {
            comments.length > 0
              ? this.createListComment
              : this.createNoComment
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

export default ListGroupComment;
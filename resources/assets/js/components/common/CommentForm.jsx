import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import Loader from './Loader';

const DEFAULT_HEIGHT = 40;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      height: DEFAULT_HEIGHT,
      disableComment: true,
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setFilledTextareaHeight = this.setFilledTextareaHeight.bind(this);
  }

  componentDidMount() {
    this.mounted = true;

    this.setFilledTextareaHeight();
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      disableComment: true
    });
    const { relatedName, relatedId } = this.props;
    const { content } = this.state;
    const data = {
      content,
      [relatedName]: relatedId
    };

    return axios.post('/api/comments', data)
      .then((response) => {
        this.props.onCommented(response.data);
        this.setState({
          content: '',
          disableComment: false
        });
      })
      .catch((error) => {
        console.log('Error!', error);
        this.setState({
          disableComment: false
        });
      });
  }

  onChange(e) {
    const { name, value } = e.target;
    const disableComment = value !== ''
      ? false
      : true;
    this.setState({ [name]: value, disableComment });
  }

  setFilledTextareaHeight() {
    if (this.mounted && !this.props.isLoading) {
      const element = this.ghost;

      this.setState({
        height: element.clientHeight,
      });
    }
  }

  get ghostField() {
    return (
      <div
        className="comment-textarea textarea--ghost"
        ref={(c) => this.ghost = c}
        aria-hidden="true"
        style={{
          minHeight: DEFAULT_HEIGHT
        }}>
        {this.state.content}
      </div>
    );
  }

  get generateForm() {
    const { content, height } = this.state;

    return (
      <Form onSubmit={this.onSubmit} className="relative">
        <FormGroup>
          <Input
            value={content}
            onChange={this.onChange}
            onKeyUp={this.setFilledTextareaHeight}
            onKeyDown={this.setFilledTextareaHeight}
            style={{
              height
            }}
            type="textarea"
            name="content"
            className="comment-textarea" />
        </FormGroup>
        {this.ghostField}
        <Button color="primary" className="mb-0" disabled={this.state.disableComment}>Comment</Button>
      </Form>
    );
  }

  render() {
    const { isLoading } = this.props;

    return (
      <div className="text-right my-3 p-3 bg-white rounded box-shadow">
        {
          !isLoading
            ? this.generateForm
            : null
        }
      </div>
    );
  }
}

export default CommentForm;
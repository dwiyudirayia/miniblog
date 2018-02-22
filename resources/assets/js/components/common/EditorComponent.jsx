import React, { Component } from 'react';
import { Button, Container, FormGroup, Input, Label, Nav, NavItem, NavLink } from 'reactstrap';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Loader from './Loader';

class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      disablePublish: true,
      editorState: EditorState.createEmpty(),
      toolbar: {
        inline: {
          options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace']
        },
      }
    }
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onPublishNow = this.onPublishNow.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  };

  onPublishNow(e) {
    e.preventDefault();
    this.setState({
      disablePublish: true
    });
    const { title, editorState } = this.state;
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const data = { title, content };
    return axios.post('/api/posts', data)
      .then((response) => {
        this.props.onPublished(response.data);
        const editorState = EditorState.createEmpty();
        this.setState({
          title: '',
          editorState,
          disablePublish: false
        });
      })
      .catch((error) => {
        console.log('Error!', error);
        this.setState({
          disablePublish: false
        });
      });
  }

  onChange(e) {
    const { name, value } = e.target;
    const disablePublish = value !== ''
      ? false
      : true;
    this.setState({ [name]: value, disablePublish });
  }

  render() {
    const { isReady } = this.props;

    const loader = (
      <Loader {...this.props} />
    );

    const editor = (
      <div>
        <FormGroup className="text-left">
          <Label for="title" size="lg">Write new post</Label>
          <Input
            value={this.state.title}
            onChange={this.onChange}
            type="text" name="title" id="title" placeholder="Enter Title" bsSize="lg" />
        </FormGroup>
        <Editor
          editorState={this.state.editorState}
          toolbarClassName="border-0 border-gray"
          wrapperClassName="my-3 p-1 bg-white rounded border border-gray"
          editorClassName="px-3"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={this.state.toolbar}
        />
        <Button color="primary" className="mb-0" onClick={this.onPublishNow} disabled={this.state.disablePublish}>Publish now</Button>
      </div>
    );

    return (
      <div className="text-right my-3 p-3 bg-white rounded box-shadow">
        {
          isReady
            ? editor
            : loader
        }
      </div>
    );
  }
}

export default EditorComponent;
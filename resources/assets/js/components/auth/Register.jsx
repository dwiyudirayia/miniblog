import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Row
} from 'reactstrap';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, email, password, password_confirmation } = this.state;
    axios.post('api/register', {
      name,
      email,
      password,
      password_confirmation
    })
      .then(response => {
        this.setState({ err: false });
        this.props.history.push('home');
      })
      .catch(error => {
        this.refs.name.value = '';
        this.refs.password.value = '';
        this.refs.email.value = '';
        this.refs.confirm.value = '';
        this.setState({ err: true });
      });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <CardHeader>
                Register
                <Link to="login" className="float-right">Already have an account?</Link>
              </CardHeader>
              <CardBody>
                <Form method="POST" onSubmit={this.onSubmit}>

                  <FormGroup row>
                    <Label for="name" className="col-sm-4 col-form-label text-md-right">Name</Label>
                    <Col md={6}>
                      <Input
                        ref="name"
                        onChange={this.onChange}
                        type="text" name="name" id="name" placeholder="Enter name" required autoFocus />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="email" className="col-sm-4 col-form-label text-md-right">Email</Label>
                    <Col md={6}>
                      <Input
                        ref="email"
                        onChange={this.onChange}
                        type="email" name="email" id="email" placeholder="Enter email" required />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="password" className="col-sm-4 col-form-label text-md-right">Password</Label>
                    <Col md={6}>
                      <Input
                        ref="password"
                        onChange={this.onChange}
                        type="password" name="password" id="password" placeholder="Enter password" required />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="password-confirm" className="col-sm-4 col-form-label text-md-right">Confirm Password</Label>
                    <Col md={6}>
                      <Input
                        ref="password_confirmation"
                        onChange={this.onChange}
                        type="password" name="password_confirmation" id="password-confirm" placeholder="Confirm password" required />
                    </Col>
                  </FormGroup>

                  <hr />

                  <FormGroup row className="mb-0 justify-content-center">
                    <Col md={4}>
                      <Row>
                        <Col sm={8}>
                          <Button type="submit" color="primary" block>Register</Button>
                        </Col>
                      </Row>
                    </Col>
                  </FormGroup>

                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;
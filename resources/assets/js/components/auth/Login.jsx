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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      remember: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    axios.post('api/login', {
      email,
      password
    })
      .then(response => {
        this.setState({ err: false });
        this.props.history.push("home");

      })
      .catch(error => {
        this.refs.email.value = "";
        this.refs.password.value = "";
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
                Login
                <Link to="register" className="float-right">Doesn't have an account?</Link>
              </CardHeader>
              <CardBody>
                <Form method="POST" onSubmit={this.onSubmit}>

                  <FormGroup row>
                    <Label for="email" className="col-sm-4 col-form-label text-md-right">Email</Label>
                    <Col md={6}>
                      <Input
                        ref="email"
                        onChange={this.onChange}
                        type="email" name="email" id="email" placeholder="Enter email" />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="password" className="col-sm-4 col-form-label text-md-right">Password</Label>
                    <Col md={6}>
                      <Input
                        ref="password"
                        onChange={this.onChange}
                        type="password" name="password" id="password" placeholder="Enter password" />
                    </Col>
                  </FormGroup>

                  <FormGroup check className="mb-3">
                    <Col md={{ size: 6, offset: 4 }}>
                      <Label check>
                        <Input
                          ref="remember"
                          onChange={this.onChange}
                          type="checkbox" name="remember" />{' '}
                        Remember Me
                      </Label>
                    </Col>
                  </FormGroup>

                  <hr />

                  <FormGroup row className="mb-0">
                    <Col md={{ size: 6, offset: 4 }}>
                      <Row>
                        <Col sm={5}>
                          <Button type="submit" color="primary" block>Login</Button>
                        </Col>
                        <Col sm={7}>
                          <li className="btn btn-link float-left">
                            <Link to="forgotpassword">Forgot Your Password?</Link>
                          </li>
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

export default Login;
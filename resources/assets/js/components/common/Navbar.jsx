import React, { Component } from 'react';
import { Container, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }
  
  render() {
    return (
      <Container fluid className="mb-4 px-0">
        <div className="nav-scroller bg-white box-shadow">
          <Nav className="nav-underline float-left">
            <NavItem>
              <NavLink tag={Link} to="/" active>Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="#">Explore</NavLink>
            </NavItem>
          </Nav>
          <Nav className="nav-underline float-right">
            <NavItem>
              <NavLink tag={Link} to="#" onClick={this.handleLogout}>Logout</NavLink>
            </NavItem>
          </Nav>
        </div>
      </Container>
    );
  }
}

export default Navbar;
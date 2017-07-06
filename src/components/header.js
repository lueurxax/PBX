/**
 * Created by xax on 23.02.2017.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <Nav key="users">
          <LinkContainer to="/users">
            <NavItem eventKey={1}>Пользователи</NavItem>
          </LinkContainer>
        </Nav>,
        <Nav key="exts">
          <LinkContainer to="/exts">
            <NavItem eventKey={2}>Номера</NavItem>
          </LinkContainer>
        </Nav>,
        <Nav key="queues">
          <LinkContainer to="/queues">
            <NavItem eventKey={3}>Очереди</NavItem>
          </LinkContainer>
        </Nav>,
        <Nav pullRight key="signout">
          <LinkContainer to="/signout">
            <NavItem eventKey={6}><Glyphicon glyph="log-out"/></NavItem>
          </LinkContainer>
        </Nav>
      ];
    } else {
      return (
        <Nav key="main">
          <LinkContainer to="/signin">
            <NavItem><Glyphicon glyph="log-in"/></NavItem>
          </LinkContainer>
        </Nav>
      );
    }
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className="glyphicon glyphicon-home"/>
          </Navbar.Brand>
        </Navbar.Header>
        {this.renderLinks()}
      </Navbar>
    );
  }
}
export default Header;

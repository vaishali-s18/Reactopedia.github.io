import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Reactopedia</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/article/html">
              <Nav.Link>HTML</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/article/css">
              <Nav.Link>CSS</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/article/javascript">
              <Nav.Link>JavaScript</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/article/react">
              <Nav.Link>React</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/new">
              <Nav.Link>New Article</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

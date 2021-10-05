import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const bg = {backgroundColor: '#333'}
function NavbarApp() {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="/">Teste 1</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: 'center'}}>
          <Nav className="me-auto">
            <Nav.Link href="/listagem">Listagem de alunos</Nav.Link>
            <Nav.Link href="/formulario">Formulário</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;

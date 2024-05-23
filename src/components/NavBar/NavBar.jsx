import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link, NavLink, useNavigate } from 'react-router-dom'

import CartWidget from '../CartWidget/CartWidget';
import logo from './assets/logo.jpg';

import {useState, useEffect } from 'react';
import { getCategorys } from '../../firebase/db'

function NavBar () {

    const navigation = useNavigate()

    const [categorys, setCategorys] = useState([])

    const [showMenu, setShowMenu] = useState(false);

    const handleToggle = () => {
      setShowMenu(!showMenu); // Invierte el estado actual de showMenu
    };

    const handleLinkClick = () => {
      setShowMenu(false); // Oculta el NavDropdown cuando se hace clic en un Link
    };

    useEffect(() => {
      const getCategorysDB = async () => {
        let data = await getCategorys()
        setCategorys(data)
      }

      getCategorysDB()
    }, [])

    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand><img src={logo} alt="logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavLink to="/" className="nav-link" onClick={handleLinkClick}>Home</NavLink>
              <NavLink to="/sobreNosotros" className="nav-link" onClick={handleLinkClick}>Sobre Nosotros</NavLink>
              <NavDropdown show={showMenu} title="Productos" id="navbarScrollingDropdown" onClick={handleToggle}>

                {categorys.map(category => (
                  <Link className="nav-link" to={`/category/${category.id}`} key={category.id} onClick={handleLinkClick}>{category.name}</Link>
                ))}
                
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <span onClick={()=>navigation('/cart')}>
              <CartWidget />
            </span>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavBar
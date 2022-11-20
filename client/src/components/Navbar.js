import {Link} from 'react-router-dom'
import { ReactComponent as Logo } from '../images/d.svg';
import { faPerson,faHouseUser,faMoon,faSun} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./Themes.js";
import { Navbar, NavDropdown, Nav, Container, Button } from 'react-bootstrap';

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const NavbarComponent = () => {
    const [clickTheme, setClickTheme] = useState(false);
    const [theme, setTheme] = useState('light');
    
    const handleClickTheme = () => {
      setClickTheme(!clickTheme);
      theme === 'light' ? setTheme('dark') : setTheme('light');
    }
    return (
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
            <StyledApp>
                <Navbar className="mx-5 px-5 py-5 " expand="lg">
                    <Container fluid >
                        <Navbar.Brand href="#"> <Logo width="80" height="100" alt="React Bootstrap logo"/><span className="text-danger text-uppercase fw-bold h2">  Flight-planner</span></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                        {
                            <Nav className="me-auto" style={{ maxHeight: '400px'}} navbarScroll>
                                <Link to='/' style={{fontSize: '20px', marginLeft: '20px'}} className='nav-link'>
                                    <FontAwesomeIcon icon={faHouseUser}/> Home
                                </Link>
                                <NavDropdown title="Services" style={{fontSize: '20px', marginLeft: '20px'}}>
                                    <Link to='/courses' className='nav-link'>
                                        Courses
                                    </Link>
                                    <NavDropdown.Divider />
                                    <Link to='/lecturers' className='nav-link'>
                                        Lecturers
                                    </Link>
                                </NavDropdown>
                                <Link to='/profil' style={{fontSize: '20px', marginLeft: '20px'}} className='nav-link'>
                                    <FontAwesomeIcon icon={faPerson}/> Profile
                                </Link>
                            </Nav>
                        }
                        <Button variant="outline-secondary" onClick={handleClickTheme}>
                            <FontAwesomeIcon icon={clickTheme ? faSun: faMoon} />
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </StyledApp>
      </ThemeProvider>
    );
}
 
export default NavbarComponent;
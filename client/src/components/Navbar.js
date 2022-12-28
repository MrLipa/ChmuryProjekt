import {Link} from 'react-router-dom'
import { ReactComponent as Logo } from '../images/d.svg';
import { faMagnifyingGlass,faHouseUser,faMoon,faSun,faArrowRightToBracket,faRegistered,faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./Themes.js";
import { Navbar, NavDropdown, Nav, Container, Button } from 'react-bootstrap';
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const NavbarComponent = () => {
    const [clickTheme, setClickTheme] = useState(false);
    const [theme, setTheme] = useState('light');
    const {setAuth} = useContext(AuthContext);
    const {auth} = useAuth();
    const navigate = useNavigate();
    
    const handleClickTheme = () => {
        setClickTheme(!clickTheme);
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

    const logout = async () => {
        setAuth({});
        navigate('/');
    }

    return (
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
            <StyledApp>
                <Navbar className="mx-5 px-5 py-5 " expand="lg">
                    <Container fluid >
                        <Navbar.Brand href="#"> <Logo width="80" height="100" alt="React Bootstrap logo"/><span className="text-danger text-uppercase fw-bold h4">  Flight-planner</span></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                        {
                            auth?.email
                            ?
                            <>
                                <Nav className="me-auto" style={{ maxHeight: '400px'}} navbarScroll>
                                    <Link to='/' style={{fontSize: '20px', marginLeft: '20px'}} className='nav-link'>
                                        <FontAwesomeIcon icon={faHouseUser}/> Home
                                    </Link>
                                    <NavDropdown title="Airport" style={{fontSize: '20px', marginLeft: '20px'}}>
                                        <Link to='/addAirport' className='nav-link'>
                                            Manage airports
                                        </Link>
                                        <NavDropdown.Divider />
                                    </NavDropdown>
                                    <Link to='/search' style={{fontSize: '20px', marginLeft: '20px'}} className='nav-link'>
                                        <FontAwesomeIcon icon={faMagnifyingGlass}/> Search
                                    </Link>
                                    <Link to='/' style={{fontSize: '20px', marginLeft: '20px'}} className='nav-link' onClick={logout} >
                                        <FontAwesomeIcon icon={faArrowRightFromBracket}/> Sign Out
                                    </Link>
                                </Nav>
                            </>
                            :
                            <>
                                <Nav className="me-auto" style={{ maxHeight: '400px'}} navbarScroll>
                                    <Link to='/' style={{fontSize: '20px', marginLeft: '20px'}} className='nav-link'>
                                        <FontAwesomeIcon icon={faHouseUser}/> Home
                                    </Link>
                                    <Link to='/login' style={{fontSize: '20px', marginLeft: '20px'}} className='nav-link'>
                                        <FontAwesomeIcon icon={faArrowRightToBracket}/> Sign In
                                    </Link>
                                    <Link to='/register' style={{fontSize: '20px', marginLeft: '20px'}} className='nav-link'>
                                        <FontAwesomeIcon icon={faRegistered}/> Sign Up
                                    </Link>
                                </Nav>
                            </>
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
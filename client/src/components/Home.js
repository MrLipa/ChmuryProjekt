import { FaFacebookF,FaTwitter,FaYoutube,FaGooglePlus } from "react-icons/fa";
import { Carousel,Container,Col,Row } from 'react-bootstrap';
import slide1 from '../images/4.jpg';
import slide2 from '../images/2.jpg';
import slide3 from '../images/3.jpg';

const Home = () => {
    
    return (
        <>
            <Container className="mt-1">
                <Row className="justify-content-md-center">
                    <Col md="12">
                        <h1>Welcome to IS-wiki</h1>
                        <br/><br/>
                    </Col>
                </Row>
            </Container>  
            <Carousel className="d-block w-75 h-75 mx-auto my-20">
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src={slide1}
                        alt="First slide"
                        height={750}
                        width={1260}
                    />
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src={slide2}
                        alt="First slide"
                        height={750}
                        width={1260}
                    />
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src={slide3}
                        alt="First slide"
                        height={750}
                        width={1260}
                    />
                </Carousel.Item>
            </Carousel>   
            <Container className="mt-4">
                <Row className="mt-5">
                    <Col md="3" sm="6" className="px-3">
                        <div className="fb">
                            <a href="https://www.facebook.com/fizagh/">
                                <FaFacebookF/>
                            </a> 
                        </div>
                    </Col>
                    <Col md="3" sm="6" className="px-3">
                        <div className="yt">
                            <a href="https://www.youtube.com/user/tvagh">
                                <FaYoutube/>
                            </a> 
                        </div>
                    </Col>
                    <Col md="3" sm="6" className="px-3">
                        <div className="tw">
                            <a href="https://mobile.twitter.com/fizagh">
                                <FaTwitter/>
                            </a> 
                        </div>
                    </Col>
                    <Col md="3" sm="6" className="px-3">
                        <div className="gplus">
                            <a href="https://www.fis.agh.edu.pl/">
                                <FaGooglePlus/>
                            </a> 
                        </div>
                    </Col>
                </Row>
            </Container>  
        </>
    )
}

export default Home
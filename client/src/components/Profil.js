import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from '../api/axios.js';
import { Container, Col, Row, ListGroup } from 'react-bootstrap'
import { faPenToSquare, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profil = () => {
    const [list, setList] = useState([]);
    const [add, setAdd] = useState('');
    const [edit, setEdit] = useState(0);
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => 
    {
        axiosInstance.get('movie')
        .then((response) =>
        {
            setList(response.data);
        });
    }, []);

    const deleteMovie = (title) => {
        axiosInstance.delete(`movie/${title}`)
        .then((response) =>
        {
            setList(response.data);
        });
        if (title === edit)
        {
            setEdit('');
            setAdd(false);
        }
      }

    const addMovie = (event) => {
        event.preventDefault();
        axiosInstance.post('movie',{title: title, year: year})
        .then((response) =>
        {
            setList(response.data);
        });
      }

    const editMovie = (event) => {
        event.preventDefault();
        axiosInstance.put(`movie/${edit}`,{title: title, year: year})
        .then((response) =>
        {
            setList(response.data);
        });
        setEdit(title);
      }

    return (
        <Container className="mt-5" id="courses">
            <h1>Movies</h1>
            <Row className="mt-5">
                <Col md="6">
                {
                    (add || edit)?
                        <Container className="border border-danger rounded">
                            {
                                (add)?
                                <h1>Add movie</h1>
                                :
                                <h1>Edit movie</h1>
                            }
                            <form className="col-8 mx-auto my-5" onSubmit={(add)?addMovie:editMovie}>
                                <div className="form-group my-3">
                                    <label>Title</label>
                                    <input type="text" className="form-control" placeholder="Title" name="title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                                </div>
                                <div className="form-group my-3">
                                    <label>Year</label>
                                    <input type="text" className="form-control" placeholder="Year" name="year" onChange={(e) => setYear(e.target.value)} value={year}/>
                                </div>
                                <button className="btn btn-primary my-3">Submit</button>
                            </form>
                        </Container>
                    :
                    ""
                }
                </Col>
                <Col  md="6">
                    <ListGroup className="mx-5 w-50">
                        <ListGroup.Item className="mt-2" action variant="primary" onClick={() =>{setAdd(true);setEdit('');setTitle('');setYear('')}}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </ListGroup.Item>
                        {
                            list.map((l,i) => (
                                <ListGroup.Item className="mt-2" action variant="primary" key={i}>
                                    <span className='item-link mx-4'>Title: {l[0]} Year: {l[1]}</span>
                                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => {setAdd(false);setEdit(l[0]);setTitle(l[0]);setYear(l[1]);} } className="mx-1"/>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteMovie(l[0])} className="mx-1"/>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container> 
    )
}

export default Profil;
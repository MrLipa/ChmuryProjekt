import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from '../api/axios.js';
import { Container, Col, Row, ListGroup } from 'react-bootstrap'
import { faPenToSquare, faTrash, faPlus, faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const AddAirport = () => {
    const [list, setList] = useState([]);
    const [options, setOptions] = useState([]);
    const [country_filter, setCountryFilter] = useState([]);
    const [add_airport, setAddAirport] = useState(false);
    const [edit_airport, setEditAirport] = useState(false);
    const [add_connection, setAddConnection] = useState(false);
    const [id_airport, setIdAirport] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [distance, setDistance] = useState('');

    useEffect(()=>{
        axiosInstance.get('airport')
        .then((response) =>
        {
            setList(response.data.filter((airport)=>{return !country_filter.length?true:country_filter.includes(airport[1])}));
            const temp_options = Array.from(new Set(response.data.map((airport)=>{return airport[1]})))
            setOptions(temp_options.map((airport)=>{return { value: airport, label: airport, color: '#FF8B00' }}));
        });
        
    }, []);

    const addAirport = (event) => {
        event.preventDefault();
        axiosInstance.post('airport',{country: country, city: city})
        .then((response) =>
        {
            setList(response.data.filter((airport)=>{return !country_filter.length?true:country_filter.includes(airport[1])}));
            setOptions(response.data.map((airport)=>{return { value: airport[1], label: airport[1], color: '#FF8B00' }}));
        });
    }

    const editAirport = (event) => {
        event.preventDefault();
        axiosInstance.put(`airport/${id_airport}`,{country: country, city: city})
        .then((response) =>
        {
            setList(response.data.filter((airport)=>{return !country_filter.length?true:country_filter.includes(airport[1])}));
            setOptions(response.data.map((airport)=>{return { value: airport[1], label: airport[1], color: '#FF8B00' }}));
        });
    }

    const deleteAirport = (id) => {
        axiosInstance.delete(`airport/${id}`)
        .then((response) =>
        {
            setList(response.data.filter((airport)=>{return !country_filter.length?true:country_filter.includes(airport[1])}));
            setOptions(response.data.map((airport)=>{return { value: airport[1], label: airport[1], color: '#FF8B00' }}));
        });
    }
    
    const addConnection = (event) => {
        event.preventDefault();
        axiosInstance.post('airport/collect',{city: city})
        .then((response) =>
        {
            console.log({id_airport_A: id_airport, id_airport_B: response.data[0][0], distance: distance})
            axiosInstance.post('airport/connect',{id_airport_A: id_airport, id_airport_B: response.data[0][0], distance: distance})
            .then((response) =>
            {
                ;
            });
        });
        
    }
    const getCountryFilters = (e) =>{
        const temp = e.map((option)=>{return option.value});
        setCountryFilter(temp);
        axiosInstance.get('airport')
        .then((response) =>
        {
            setList(response.data.filter((airport)=>{return !temp.length?true:temp.includes(airport[1])}));
        });
      }
    return (
        <Container>
            <h1>Airports</h1>
            <Row className="mt-5">
                <h4>Filter</h4>
                <h6 className="mt-1">Country</h6>
                <Select
                    onChange={getCountryFilters}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={options}
                />
            </Row>
            <Row className="mt-5">
                <Col md="6">
                {
                    (add_airport || edit_airport || add_connection)?
                        <Container className="border border-danger rounded">
                            {
                                (add_airport)?
                                <h1>Add airport</h1>
                                :(edit_airport)?
                                <h1>Edit airport</h1>
                                :
                                <h1>Add connection</h1>
                            }
                            <form className="col-8 mx-auto my-5" 
                            onSubmit={add_airport?addAirport:edit_airport?editAirport:addConnection}>
                                <div className="form-group my-3">
                                    <label>Country</label>
                                    <input type="text" className="form-control" placeholder="Country" name="country" onChange={(e) => setCountry(e.target.value)} value={country}/>
                                </div>
                                <div className="form-group my-3">
                                    <label>City</label>
                                    <input type="text" className="form-control" placeholder="City" name="city" onChange={(e) => setCity(e.target.value)} value={city}/>
                                </div>
                                {
                                    (add_connection)?
                                    <div className="form-group my-3">
                                        <label>Distance</label>
                                        <input type="text" className="form-control" placeholder="Distance" name="distance" onChange={(e) => setDistance(e.target.value)} value={distance}/>
                                    </div>
                                    :
                                    ""
                                }
                                <button className="btn btn-primary my-3">Submit</button>
                            </form>
                        </Container>
                    :
                    ""
                }
                </Col>
                <Col  md="6">
                    <ListGroup className="mx-1">
                        <ListGroup.Item className="mt-2" action variant="primary" 
                        onClick={() =>{setAddAirport(true);setEditAirport(false);setAddConnection(false);}}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </ListGroup.Item>
                        {
                            list.map((l,i) => (
                                <ListGroup.Item className="mt-2" action variant="primary" key={i}>
                                    <span className='item-link mx-4'>Country: {l[1]} City: {l[2]}</span>
                                    <FontAwesomeIcon icon={faPenToSquare} onClick={() =>{setAddAirport(false);setEditAirport(true);setAddConnection(false);setIdAirport(l[0])}} className="mx-1"/>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => {setIdAirport(l[0]);deleteAirport(l[0]);setAddAirport(false);setEditAirport(false);setAddConnection(false);}} className="mx-1"/>
                                    <FontAwesomeIcon icon={faArrowRightArrowLeft} onClick={() => {setAddAirport(false);setEditAirport(false);setAddConnection(true); setIdAirport(l[0])}} className="mx-1"/>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container> 
    )
}

export default AddAirport;
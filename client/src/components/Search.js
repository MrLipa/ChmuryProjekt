import { useState } from "react";
import { useEffect } from "react";
import React, { useMemo } from 'react';
import axiosInstance from '../api/axios.js';
import { Container, Table } from 'react-bootstrap'
import TableContainer from './TableContainer';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Search = () => {
    const [data, setData] = useState([]);
    const [path, setPath] = useState([]);
    const [city_out, setCityOUT] = useState('');
    const [city_in, setCityIN] = useState('');
    const [choice, setChoice] = useState(false);

    useEffect(()=>{
        axiosInstance.get('connection')
        .then((response) =>
        {
            setData(response.data.map((airport)=>{return {'id': airport[0], 'country_out': airport[1], 'city_out': airport[2], 'country_in': airport[3], 'city_in': airport[4], 'distance': airport[5]}}));
        });
    }, []);

    const getShortestPath = (event) =>{
        event.preventDefault();
        axiosInstance.post('connection/shortest_path', { "city_OUT": city_out,"city_IN": city_in })
        .then((response) =>
        {
            setPath(response.data);
        })
    }

    const getFastestPath = (event) =>{
        event.preventDefault();
        axiosInstance.post('connection/fastest_path', { "city_OUT": city_out,"city_IN": city_in })
        .then((response) =>
        {
            setPath(response.data);
        })
    }
  
    const columns = useMemo(
      () => [
        {
          Header: 'ID',
          accessor: 'id',
        },
        {
          Header: 'Country out',
          accessor: 'country_out',
        },
        {
            Header: 'City out',
            accessor: 'city_out',
        },
        {
            Header: 'Country in',
            accessor: 'country_in',
        },
        {
            Header: 'City in',
            accessor: 'city_in',
        },
        {
            Header: 'Distance',
            accessor: 'distance',
        },
      ],
      []
    );
  
    return (
        <Container>
            <h1>Flights</h1>
            <Tabs defaultActiveKey="profile" id="fill-tab-example" className="mb-3 mt-4" fill>
                <Tab eventKey="connections" title="Connections">
                    <TableContainer
                        columns={columns}
                        data={data}
                    />
                </Tab>
                <Tab eventKey="find_path" title="Find path">
                    <form className="col-8 mx-auto my-5" onSubmit={choice?getShortestPath:getFastestPath}>
                        <div className="form-group my-3">
                            <label>City Out</label>
                            <input type="text" className="form-control" placeholder="City out" name="city_out" onChange={(e) => setCityOUT(e.target.value)} value={city_out}/>
                        </div>
                        <div className="form-group my-3">
                            <label>City In</label>
                            <input type="text" className="form-control" placeholder="City in" name="city_in" onChange={(e) => setCityIN(e.target.value)} value={city_in}/>
                        </div>
                        <button className="btn btn-primary my-3 mx-5" onClick={(e) => setChoice(true)}>Find shortest plan</button>
                        <button className="btn btn-primary my-3 mx-5" onClick={(e) => setChoice(false)}>Find fastest plan</button>
                    </form>
                    
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Country Out</th>
                                <th>City out</th>
                                <th>Country In</th>
                                <th>City In</th>
                                <th>Distance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {path.map((item, i) => 
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.country_out}</td>
                                <td>{item.city_out}</td>
                                <td>{item.country_in}</td>
                                <td>{item.city_in}</td>
                                <td>{item.distance}</td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default Search
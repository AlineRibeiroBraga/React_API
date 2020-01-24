import React, { Component } from 'react';
import axios from '../../services/httpClient';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './ListPeople.css';

class ListPeople extends Component {

    state = {
        people: []
    }

    componentDidMount() {
        this.retrievePeople();
    }

    personRow = (person) => <tr key={person.id}>
        <td>{person.id}</td>
        <td>{person.name}</td>
        <td>{person.cpf}</td>
        <td> <Link to = {`/person/${person.id}`} className = "btn btn-primary">Edit</Link>
            <button className = "btn btn-danger" onClick ={ () => this.handleRemove(person.id)} >Remove</button> </td>
    </tr>

    retrievePeople() {
        axios.get("/person")
            .then(({ data }) => this.setState({ people: data }))
    }

    handleAdd = () => {
        axios.post("/person")
            .then(() => this.retrievePeople());
    }

    handleRemove = (id) => {
        axios.delete(`/person/${id}`)
            .then( () => this.retrievePeople());
    }

    render() {
        return <div >
            <h1 className = "titlePeople">People</h1>
            <table className="table table-striped">
                <thead>
                    <tr className = "tr">
                        <th>ID</th>
                        <th>Name</th>
                        <th>CPF</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.people.map(person => this.personRow(person))}
                </tbody>
            </table>
            <Link to = "/person/new" className="btn btn-secondary" > Add </Link>
            <Link to = "/account" className="btn btn-success" > Accounts </Link>                       
        </div>

    }
}

export default ListPeople;
import React, { Component } from 'react';
import axios from '../httpClient';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import '../List.css';

class People extends Component {

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
    </tr>

    render() {
        return <div className = "container">
            <h1>People</h1>
            <table className="table table-striped">
                <thead>
                    <tr className = "tr">
                        <th>ID</th>
                        <th>Name</th>
                        <th>CPF</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.people.map(person => this.personRow(person))}
                </tbody>
            </table>                           
             <Link to = "/person/new" className="btn btn-primary" onClick={() => this.handleAdd()}> Add </Link>
        </div>

    }

    handleAdd = () => {
        axios.post("/person")
            .then(() => this.retrievePeople());
    }

    retrievePeople() {
        axios.get("/person")
            .then(({ data }) => this.setState({ people: data }))
    }
}

export default People;
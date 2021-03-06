import React, { Component } from 'react';
import Field from '../../Component/Field';
import axios from '../../services/httpClient';
import 'bootstrap/dist/css/bootstrap.min.css'
import './NewPerson.css';

class NewPerson extends Component{

    state = {
        person: {
            name : "",
            cpf : ""
        },
        errors:{},
        globalError: ""
    };

    render(){
        const { person, errors, globalError } = this.state;
        
        return (
            <div>
                <h1 className = "newPersonTitle"> New Person</h1>

                {globalError ? <div className="alert alert-danger">
                    {globalError}
                </div> : <></>}

                <form onSubmit = {this.handleSubmit}>
                    <Field
                       name = "name"
                       label = "Name"
                       value = {person.name}
                       errors={errors["name"]}
                       onChange={this.handleChange}
                    />
                     <Field
                       name = "cpf"
                       label = "CPF"
                       value = {person.cpf}
                       errors={errors["cpf"]}
                       onChange={this.handleChange}
                    />
                    <button className = "btn btn-success" type = "submit">Save</button>
                </form>
            </div>
        );
    }

    handleChange = (event) => {
        let field = event.target.name;
        let value = event.target.value;
        
        this.setState( ( {person}) => ({
            person: {
                ...person,
                [field]: value
            }
        }));
    }

    handleSubmit = (event) => {
        axios.post("/person", this.state.person)
             .then( () => this.props.history.push("/"))
             .catch(({ response }) => {
                if (response.status === 400) {
                    this.setState({
                        errors: response.data
                    })
                }

                this.setState({
                    globalError: response.data.message
                })

            });
            
        event.preventDefault();
    } 
}

export default NewPerson;
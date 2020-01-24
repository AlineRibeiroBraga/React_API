import React, {Component} from "react";
import axios from "../services/httpClient";
import Field from '../Component/Field';

class EditPerson extends Component{

    state = {
        person: {
            name: "",
            cpf: ""
        },
        errors: {}
    }

    retrievePersonId = () => this.props.match.params.id;

    componentDidMount() {
    
        axios.get(`/person/${this.retrievePersonId()}`)
            .then(({ data }) => {
                this.setState({
                    person: data
                })
            })
            .catch(({ response }) => {
                if (response.status === 404) {
                    this.props.history.push("/not-found")
                }
            })
    }

    handleChange = (event) => {
        
        let field = event.target.name;
        let value = event.target.value;
        
        this.setState( ({person}) => ({
            person: {
                ...person,
                [field]: value
            }
        }));
    }

    
    handleSubmit = (event) => {

        event.preventDefault();

        axios.put(`person/${this.retrievePersonId()}`,this.state.person)
             .then( () => this.props.history.push("/person"))
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
    }

    render(){
        
        const{person, errors} = this.state;

        return <div>

            <h1 className = "newPersonTitle">Update</h1>
            <form onSubmit = {this.handleSubmit}>
                <Field 
                    name = "name"
                    label = "Name"
                    value = {person.name}
                    errors = {errors["name"]}
                    onChange = {this.handleChange} 
                />
                <Field
                    name = "cpf"
                    label = "CPF"
                    value = {person.cpf}
                    errors={errors["cpf"]}
                    onChange={this.handleChange}
                />
                <button type="submit" className = "btn btn-success" > Save </button>
            </form>
            
        </div>
    }

}

export default EditPerson;
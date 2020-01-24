import React, { Component } from 'react';
import Field from '../../Component/Field';
import axios from '../../services/httpClient';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../NewPerson/NewPerson.css';

class NewAccount extends Component{

    state = {
        account: {
            cpf : ""
        },
        errors:{},
        globalError: ""
    };

    render(){
        const { account, errors, globalError } = this.state;
        
        return (
            <div>
                <h1 className = "newPersonTitle"> New Account</h1>

                {globalError ? <div className="alert alert-danger">{globalError}</div> : <></>}

                <form onSubmit = {this.handleSubmit}>
                    <Field
                       name = "cpf"
                       label = "CPF"
                       value = {account.cpf}
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
        
        this.setState( ( {account}) => ({
            account: {
                ...account,
                [field]: value
            }
        }));
    }

    handleSubmit = (event) => {
        console.log("entrou")
        axios.post("/account", this.state.account)
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

export default NewAccount;
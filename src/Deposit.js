import React, {Component} from 'react';
import axios from './httpClient';
import Field from './Component/Field';

class Deposit extends Component{

    state = {
        balance : {
            balance: ""
        },
        errors : {},
        globalError: ""
    }

    render(){
        const { balance, errors, globalError} = this.state;

        return <div>
            <h1> Deposit</h1>

            <form onSubmit = {this.handleSubmit}>
                <Field
                    name = "balance"
                    label ="Deposit"
                    value = {balance.balance}
                    errors={errors["balance"]}
                    onChange={this.handleChange}
                />
                <button className = "btn btn-primary "> Deposit </button>
            </form>
        </div>
    }

    handleChange = (event) =>{
        let field = event.target.name;
        let value = event.target.value;

        this.setState( ({balance}) => ({
            balance: {
                ...balance,
                [field]: value
            }
        }))
    }

    handleSubmit = (event) => {
        axios.post(`/account/deposit/${this.retrieveBookId()}`,this.state.balance)
             .then( () => this.props.history.push("/account"))
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

    retrieveBookId = () => this.props.match.params.id;
}

export default Deposit;

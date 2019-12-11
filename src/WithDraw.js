import React, {Component} from 'react';
import Field from './Component/Field';
import axios from './httpClient';
import { Link } from 'react-router-dom';

class WithDraw extends Component{

    state = {
        balance: "",
        errors: {},
        globalError: ""
    }

    render(){
        const {balance, errors, globalError } = this.state;

        return <div>
            <h1>With Draw</h1>

            <form onSubmit ={this.handleSubmit}>
                <Field 
                    name = "value"
                    label = "Value"
                    value = {balance}
                    errors={errors["value"]}
                    onChange={this.handleChange}
                />
                <div><Link to = "/account/withDraw" className="btn btn-primary" onClick={() => this.handleWithDraw(account.id)}> With Draw </Link></div>


            </form>
            
        </div>
    }

    handleChange = (event) => {
        let field = event.target.name;
        let value = event.target.value;
        
        console.log(value)
        this.setState( ( {balance}) => ({
            balance: {
                ...balance,
                [field]: value
            }
        }));
    }

    handleSubmit = (event) => {
        axios.post("/account", this.state.account)
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
};

export default WithDraw;
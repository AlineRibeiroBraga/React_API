import React, { Component } from 'react';
import axios from '../httpClient';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import '../List.css';

class Account extends Component {

    state = {
        accounts: []
    }

    componentDidMount() {
        this.retrieveAccount();
    }

    render() {
        return <div className = "container">
            
            <h1>Accounts</h1>
            
            <table className="table table-striped">
                <thead>
                    <tr className = "tr">
                        <th>ID</th>
                        <th>Account</th>
                        <th>Balance</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.accounts.map(account => this.accountRow(account))}
                </tbody>
            </table>                           
            <Link to = "/account/new" className="btn btn-primary" onClick={() => this.handleAdd()}> Add </Link>
        </div>

    }

    accountRow = (account) => <tr  key= {account.id}>
        <td>{account.id}</td>
        <td>{account.account}</td>
        <td>{account.balance}</td>
        <td><Link to = "" className="btn btn-primary" onClick={() => this.handleRemove(account.id)}> Remove </Link>
            <Link to = {`/account/withDraw/${account.id}`} className="btn btn-primary"> With Draw </Link>
            <Link to = {`/account/deposit/${account.id}`} className="btn btn-primary"> Deposit </Link></td>
    </tr>

    handleRemove(id){
        axios.delete(`/account/${id}`)
             .then( () => this.retrieveAccount())
    }

    retrieveAccount() {
        axios.get("/account")
            .then(({ data }) => this.setState({ accounts: data }))
    }

    handleAdd = () => {
        axios.post("/account")
            .then(() => this.retrieveAccount());
    }

    handleWithDraw (id) {
        axios.post(`/withDraw/${id}`)
             .then( () => this.retrieveAccount());
    }
    
}

export default Account;
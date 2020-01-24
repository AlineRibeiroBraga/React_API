import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from '../../services/httpClient';

class ListAccounts extends Component {

    state = {
        accounts: []
    }

    componentDidMount() {
        this.retrieveAccount();
    }

    render() {
        return <div>
            
            <h1 className = "titlePeople">Accounts</h1>
        
             <table className="table table-striped">
                <thead>
                    <tr className = "tr">
                        <th>ID</th>
                        <th>Account</th>
                        <th>Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.accounts.map(account => this.accountRow(account))}
                </tbody>
            </table>
            <Link to = "/account/new" className="btn btn-secondary"> Add </Link>
        </div>

    }

    accountRow = (account) => <tr  key= {account.id}>
        <td>{account.id}</td>
        <td>{account.account}</td>
        <td>{account.balance}</td>
        <td><button className="btn btn-primary" onClick={() => this.handleRemove(account.id)}> Remove </button>
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

    handleWithDraw (id) {
        axios.post(`/withDraw/${id}`)
             .then( () => this.retrieveAccount());
    }
    
}

export default ListAccounts;
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ListAccounts from './pages/ListAccounts/ListAccounts';
import NewPerson from './pages/NewPerson/NewPerson';
import ListPeople from './pages/ListPeople/ListPeople';
import NewAccount from './pages/NewAccount/NewAccount';
import WithDraw from './pages/WithDraw/WithDraw';
import Deposit from './pages/Deposit/Deposit';
import EditPerson from './pages/EditPerson';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path = {["/", "/person"]} exact component = {ListPeople}/>
                <Route path = {"/person/new"} exact component = {NewPerson}/>
                <Route path = {"/person/:id"} exact component = {EditPerson}/>
                <Route path = {"/account"} exact component = {ListAccounts}/>
                <Route path = {"/account/new"} exact component = {NewAccount}/>
                <Route path = {"/account/withDraw/:id"} exact component = {WithDraw}/>
                <Route path = {"/account/deposit/:id"} exact component = {Deposit}/>
            </Switch>
        </BrowserRouter>
    );
}
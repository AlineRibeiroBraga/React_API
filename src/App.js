import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ListPerson from './People/ListPerson';
import NewPerson from './People/NewPerson';
import ListAccounts from './Account/ListAccounts';
import WithDraw from './WithDraw';
import Deposit from './Deposit';
 
const App = () => {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route path = {["/", "/person"]} exact component = {ListPerson}/>
                <Route path = {["/person/new"]} exact component = {NewPerson}/>
                <Route path = {["/account"]} exact component = {ListAccounts}/>
                <Route path = {["/account/withDraw/:id"]} exact component = {WithDraw}/>
                <Route path = {["/account/deposit/:id"]} exact component = {Deposit}/>
                {/* <Route path="*" component={NotFound}/> */}
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
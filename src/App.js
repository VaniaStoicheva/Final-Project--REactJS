import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Create from './Create/Create';
import './App.css';
import Header from './Header/Header';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      username:null
    }
  }
  handleChange(e){
    //console.log(e.target.name,'->',e.target.value)
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  
  handleSubmit(e ,data , isSignup ){
    e.preventDefault();
   // console.log(data);
    fetch('http://localhost:9999/auth/sign' + (isSignup ? 'up' : 'in') ,
        {
            method:'post',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'} 
    }).then(rawData=>rawData.json())
    .then(responseBody =>{
      if(responseBody.username){
        this.setState({
          username: responseBody.username
        })
      }
    })
  }
  render() {
    return (
      <div className="App">         
         <BrowserRouter>
         <div>
         <Header username={this.state.username}/>
         <Switch>
         <Route path='/' exact component={Home}/>
         <Route path="/register" 
         render={
           ()=>
           <Register 
           handleSubmit={this.handleSubmit.bind(this)} 
           handleChange={this.handleChange}
           /> } 
            />
         <Route path="/login" 
         render={
           ()=>
           <Login 
           handleSubmit={this.handleSubmit.bind(this)} 
           handleChange={this.handleChange}
           />}
            />
         <Route render={()=><h1>Not Found</h1>}/>
         </Switch>
         </div>
         </BrowserRouter>
      </div>
      
    );
  }
}

export default App;

import React,{ Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


//COMPONENTS
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import Adminlog from './components/Adminlog';
import Account from './components/Account';
import Orders from './components/Orders';
import Map from './components/Map';
import AdminComp from './components/AdminComp';



// STYLE
import './App.css';

class App extends Component {


  render(){
  return (
    <BrowserRouter>
    <div className="App">
      <Nav/> 
      <Switch>
      <Route exact path="/home" component={Home}/>
      <Route  path="/login" component={Login}/>
      <Route  path="/signup" component={Signup}/>
      <Route  path="/adminlogin" component={Adminlog}/>
      <Route  path="/admin_comp" component={AdminComp}/>
      <Route path="/account" component={Account}/>
      <Route path="/orders" component={Orders}/>
      <Route path="/map/:id" component={Map}/>

      </Switch>
      <Footer/>
    </div>
    </BrowserRouter>
  );
  }
}

export default App;

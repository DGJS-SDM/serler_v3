import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/screens/Login";
import Home from "./components/screens/Home";
import { compose } from "redux";
import { connect } from "react-redux";
import { setDataSuccess } from './actions/home.action'
//import ArticleDetails from "./components/screens/ArticleDetails";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles: []
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }
  
  // our first get method that uses our backend api to
  // fetch data from our data base
   getDataFromDb() {
    fetch('http://localhost:3001/articles')
      .then(results => results.json())
      .then(data => this.setState({ articles: data }))
      .catch(function(err) {console.log(err)});
  }  
}

const mapStateToProps = state => {
  return {
    data: state.homeReducer.data
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      setDataSuccess
    }
  )
)(App);
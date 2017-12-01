var React = require('react');
var Popular = require('./Popular');
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var ReactRouter = require('react-router-dom');
var Results = require('./Results');

var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
          <Route exact path="/" component={Home} />                      
            <Route exact path="/popular" component={Popular} />
            <Route exact path="/battle" component={Battle} />
            <Route exact path="/battle/results" component={Results} />            
            <Route render={()=>'Not found'} />
          </Switch>
        </div>
      </Router>
    );
  }
}

module.exports = App;
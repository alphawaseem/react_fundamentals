var React = require('react');
var ReactRouter = require('react-router-dom');
var Link = ReactRouter.Link;
const Home = () => {
  return (
    <div>
      <button><Link to="/battle">Battle</Link></button>
    </div>
  )
}

module.exports = Home;
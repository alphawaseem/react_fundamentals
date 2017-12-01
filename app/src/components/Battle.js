var React = require('react');
var PropTypes = require('prop-types');

var Link = require('react-router-dom').Link;

class Battle extends React.Component {

  constructor() {
    super();
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: '',
      playerTwoImage: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    console.log(id);
    let newState = {};
    newState[id + "Name"] = username;
    newState[id + "Image"] = 'https://github.com/' + username + '.png'
    this.setState(function () {
      return newState;
    });
  }

  handleReset(id) {
    let newState = {};
    newState[id + "Name"] = '';
    newState[id + "Image"] = '';
    this.setState(() => {
      return newState;
    });
  }

  render() {
    return (
      <div>
        {!this.state.playerOneName && <PlayerInput
          id="playerOne" title="Player One" onSubmit={this.handleSubmit} />}

        {this.state.playerOneImage && <PlayerPreview
          id="playerOne" avatar={this.state.playerOneImage}
          username={this.state.playerOneName} onReset={this.handleReset} />}

        {!this.state.playerTwoName && <PlayerInput
          id="playerTwo" title="Player Two" onSubmit={this.handleSubmit} />}

        {this.state.playerTwoImage && <PlayerPreview
          id="playerTwo" avatar={this.state.playerTwoImage}
          username={this.state.playerTwoName} onReset={this.handleReset} />}


        {this.state.playerOneImage && this.state.playerTwoImage &&
          <Link to={{
            pathname: this.props.match.url + '/results',
            search: '?playerOneName=' + this.state.playerOneName + '&playerTwoName=' + this.state.playerTwoName
          }}>Battle</Link>
        }
      </div>
    );
  }
}


class PlayerInput extends React.Component {

  constructor() {
    super();
    this.state = {
      username: ''
    };
    this.updateUsername = this.updateUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateUsername(evt) {
    let username = evt.target.value;
    this.setState(function () {
      return {
        username: username
      }
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit(this.props.id, this.state.username);
  }

  render() {
    return (
      <div>
        <h3>{this.props.title} </h3>
        <form onSubmit={this.handleSubmit} >

          <label htmlFor="username"><input name="username" id="username" value={this.state.value} onChange={this.updateUsername} /></label>
          <input type="submit" value="Submit" disabled={!this.state.username} />
        </form>
      </div>
    )
  }

}

const PlayerPreview = (props) => {
  return (
    <div>
      <div className="column">
        <img src={props.avatar} alt={"Avatar for " + props.username} className="avatar" />
        <h2 className="username">@{props.username}</h2>
      </div>
      <button className="reset" onClick={props.onReset.bind(null, props.id)}>
        Reset
      </button>

    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
}

module.exports = Battle;
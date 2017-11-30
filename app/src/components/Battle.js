var React = require('react');

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

  render() {
    return (
      <div>
        {!this.state.playerOneName && <PlayerInput
          id="playerOne" title="Player One" onSubmit={this.handleSubmit} />}
        {!this.state.playerTwoName && <PlayerInput
          id="playerTwo" title="Player Two" onSubmit={this.handleSubmit}/>}

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
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }

}

module.exports = Battle;
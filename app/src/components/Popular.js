var React = require('react');
var propTypes = require('prop-types');
var api = require('../utlis/api');

const SelectLangaugeList = (props) => {
  let languages = ["All", "Javascript", "Java", "Python", "Ruby", "CSS"]
  return (
    <ul>
      {
        languages.map(language => {
          return <li onClick={() => props.onSelectLanguage(language)} className={props.selectedLanguage === language ? 'selected' : ''} key={language}>{language}</li>;
        })
      }
    </ul>);
}

const RepoGrid = ({ repos }) => {
  return (
    <ul className='popular-list'>
      {repos.map(repo => {
        return (
          <li key={repo.name} className='popular-item'>
            <ul className="space-list-items">
              <li><img src={repo.owner.avatar_url} alt={'Avatar for ' + repo.owner.login} className="avatar" /></li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        );
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: propTypes.array.isRequired
}

SelectLangaugeList.propTypes = {
  onSelectLanguage: propTypes.func.isRequired,
  selectedLanguage: propTypes.string.isRequired
}

class Popular extends React.Component {
  componentDidMount() {
    this.selectLanguage();
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
      repos: null
    }
    this.selectLanguage = this.selectLanguage.bind(this);
  }
  selectLanguage(language = "All") {
    this.setState(() => {
      return { selectedLanguage: language }
    });
    this.setState({
      repos: null
    });
    api.fetchPopularRepos(this.state.selectedLanguage)
      .then(repos => {
        this.setState(() => {
          return {
            repos: repos
          }
        });
      });
  }

  render() {
    return (
      <div>
        <SelectLangaugeList onSelectLanguage={this.selectLanguage} selectedLanguage={this.state.selectedLanguage} />
        {this.state.repos ? <RepoGrid repos={this.state.repos} /> : 'Loading'}
      </div>
    )
  }
}

module.exports = Popular;
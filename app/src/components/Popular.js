var React = require('react');
var propTypes = require('prop-types');


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

SelectLangaugeList.propTypes = {
  onSelectLanguage : propTypes.func.isRequired,
  selectedLanguage : propTypes.string.isRequired
}

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All"
    }
    this.selectLanguage = this.selectLanguage.bind(this);
  }


  selectLanguage(language) {
    this.setState(() => {
      return { selectedLanguage: language }
    });
  }

  render() {
    return (
      <div>
        <SelectLangaugeList onSelectLanguage={this.selectLanguage} selectedLanguage={this.state.selectedLanguage} />
      </div>
    )
  }
}

module.exports = Popular;
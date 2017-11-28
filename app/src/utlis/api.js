import axios from 'axios';

const GithubApi = {
  fetchPopularRepos: (language) => {
    let encodedUri = window.encodeURI(
      'https://api.github.com/search/repositories?q=stars:>1+language:' +
      language + '&sort=stars&order=desc&type=Repositories');
    return axios.get(encodedUri)
    .then(response => response.data.items);
  }
}

module.exports = GithubApi;
export default class TMDBService {
  _apiKey = 'api_key=b36e9de452fb21ebfa2b4fe71caa7c84';
  _apiBase = `https://api.themoviedb.org/3/search/movie?${this._apiKey}`;
  _apiGenres = `https://api.themoviedb.org/3/genre/movie/list?${this._apiKey}`;

  async getResource(url) {
    const response = await fetch(url, { method: 'GET', headers: { accept: 'application/json' } });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    return await response.json();
  }

  async getMovies() {
    const url = `${this._apiBase}&query='return'`;
    const response = await this.getResource(url);
    console.log(response);
    return response;
  }

  async getGenres() {
    const { genres } = await this.getResource(this._apiGenres);
    return genres;
  }
}

export default class TMDBService {
  state = {
    guestSessionId: null,
  };

  _apiKey = 'api_key=b36e9de452fb21ebfa2b4fe71caa7c84';
  _apiBase = 'https://api.themoviedb.org/3/';
  _apiSearch = `${this._apiBase}search/movie?${this._apiKey}`;
  _apiGenres = `${this._apiBase}genre/movie/list?${this._apiKey}`;
  _apiGuestSession = `${this._apiBase}authentication/guest_session/new?${this._apiKey}`;

  async getResource(url) {
    try {
      const response = await fetch(url, { method: 'GET', headers: { accept: 'application/json' } });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, received ${response.status}`);
      }
      return await response.json();
    } catch (e) {
      return e;
    }
  }

  async getGuestSession() {
    const response = await this.getResource(this._apiGuestSession).then((item) => {
      const guestSessionId = item.guest_session_id;
      localStorage.setItem('guestSessionId', guestSessionId);
    });

    return response;
  }

  async getMovies(query = '', page = 1) {
    const url = `${this._apiSearch}&query='${query}'&page=${page}`;
    const response = await this.getResource(url);
    return response;
  }

  async getGenres() {
    const { genres } = await this.getResource(this._apiGenres);
    return genres;
  }

  async getRatedMovie(page = 1) {
    const guestSessionId = localStorage.getItem('guestSessionId');
    const url = `${this._apiBase}guest_session/${guestSessionId}/rated/movies?page=${page}&${this._apiKey}`;
    const response = await this.getResource(url);
    return response;
  }

  async postRatedMovie(id, rating) {
    const guestSessionId = localStorage.getItem('guestSessionId');
    const url = `${this._apiBase}movie/${id}/rating?${this._apiKey}&guest_session_id=${guestSessionId}`;
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: `{"value":${rating}}`,
    };
    const request = await fetch(url, options);
    const response = await request.json();
    return response;
  }
}

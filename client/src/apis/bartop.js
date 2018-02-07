import API from './base';
import config from '../config';

export default class BarTopAPI extends API {
  constructor() {
    super(config.apis.bartop.url);
    try {
      this.token = localStorage.getItem('bartop').authentication.accessToken;
    } catch (err) {
      this.token = null;
    }
  }

  setToken(token) {
    this.token = token;
  }

  async createUser(id) {
    if (!this.token) {
      throw new Error('createUser endpoint requires auth token');
    }
    const endpoint = `users/${id}`;

    return this.fetchJSON(endpoint, {
      method: 'POST',
      headers: new Headers({ Authorization: `Bearer ${this.token}` })
    });
  }
}

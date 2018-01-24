import API from './base';
import config from '../config';

export default class BarTopAPI extends API {
  constructor() {
    super(config.apis.bartop.url);
  }

  async createUser(id) {
    const endpoint = `user/${id}`;
    return this.fetchJSON(endpoint, { method: 'POST' });
  }
}

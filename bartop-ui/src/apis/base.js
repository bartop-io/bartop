import { errors } from '../strings';

export default class API {
  constructor(url) {
    this.url = url;
  }

  async fetch(endpoint, init) {
    const response = await fetch(`${this.url}/${endpoint}`, init);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }

  async fetchJSON(endpoint, init) {
    const response = await this.fetch(endpoint, init);
    const contentType = response.headers.get('Content-Type');
    if (!contentType || contentType.indexOf('application/json') === -1) {
      throw new Error(errors.expectedJSONResponse);
    }
    return response.json();
  }
}

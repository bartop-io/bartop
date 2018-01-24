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
    const jsonInit = {
      ...init,
      headers: new Headers({ 'Content-Type': 'application/json' })
    };
    const response = await this.fetch(endpoint, jsonInit);
    if (response.headers.get('Content-Type') !== 'application/json') {
      throw new Error(errors.expectedJSONResponse);
    }
    return response.json();
  }
}

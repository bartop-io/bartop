import API from './base';
import { errors } from '../strings';

describe('API base class', () => {
  describe('fetch()', () => {
    const url = 'url';
    let api;

    beforeEach(() => {
      api = new API(url);
    });

    it('calls fetch with url/endpoint & init options', async () => {
      window.fetch = jest.fn(() => Promise.resolve(new Response()));
      const endpoint = 'endpoint';
      const init = {};
      await api.fetch(endpoint, init);
      expect(window.fetch).toBeCalledWith(`${url}/${endpoint}`, init);
    });

    it('resolves with the Reponse', async () => {
      const response = new Response();
      window.fetch = jest.fn(() => Promise.resolve(response));
      const result = await api.fetch();
      expect(result).toEqual(response);
    });

    it(`rejects with an Error when the Response isn't ok`, async () => {
      const init = {
        status: 404,
        statusText: 'Not Found'
      };
      const response = new Response(null, init);
      window.fetch = jest.fn(() => Promise.resolve(response));
      await expect(api.fetch()).rejects.toEqual(new Error(init.statusText)); // Matcher can be toError in Jest v22
    });
  });

  describe('fetchJSON()', () => {
    const jsonHeaders = new Headers({ 'Content-Type': 'application/json' });

    it('calls fetch() with the Content-Type set to json', async () => {
      const api = new API();
      api.fetch = jest.fn(() =>
        Promise.resolve({
          headers: jsonHeaders,
          json: () => Promise.resolve({})
        })
      );
      await api.fetchJSON();
      expect(api.fetch).toBeCalledWith(undefined, {
        headers: new Headers({ 'Content-Type': 'application/json' })
      });
    });

    it('returns the result of json() from the Response', async () => {
      const api = new API();
      const jsonBody = { data: 'some data returned from the call' };
      const jsonMock = jest.fn(() => Promise.resolve(jsonBody));

      api.fetch = jest.fn(() =>
        Promise.resolve({
          headers: jsonHeaders,
          json: jsonMock
        })
      );

      const result = await api.fetchJSON();
      expect(jsonMock).toBeCalled();
      expect(result).toEqual(jsonBody);
    });

    it(`rejects with an Error when the Response isn't JSON`, async () => {
      const api = new API();

      api.fetch = jest.fn(() =>
        Promise.resolve({
          headers: new Headers()
        })
      );

      await expect(api.fetchJSON()).rejects.toEqual(
        new Error(errors.expectedJSONResponse) // Matcher can be toError in Jest v22
      );
    });
  });
});

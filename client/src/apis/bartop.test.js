import BarTopAPI from './bartop';
import { mockId } from '../test-helpers/state-mocks';

jest.mock('../config', () => ({
  apis: {
    bartop: {
      url: 'http://bartop.io/api'
    }
  },
  auth0: {
    claimNamespace: ''
  }
}));

describe('BartTop API', () => {
  it('initializes with URL from config', () => {
    const api = new BarTopAPI();
    expect(api.url).toBe('http://bartop.io/api');
  });

  it('POSTs to user/:id on createUser()', async () => {
    const api = new BarTopAPI();
    api.fetch = jest.fn(() =>
      Promise.resolve({
        headers: new Headers({ 'Content-Type': 'application/json' }),
        json: () => Promise.resolve({ id: mockId })
      })
    );
    await api.createUser(mockId);
    expect(api.fetch.mock.calls[0][0]).toEqual(`user/${mockId}`);
    expect(api.fetch.mock.calls[0][1].method).toEqual('POST');
  });
});

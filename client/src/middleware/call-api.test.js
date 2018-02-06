import callAPIMiddleware, { CALL_API } from './call-api';

describe('callAPI middleware', () => {
  describe('next handler', () => {
    it('given store, middleware returns function to handle next', () => {
      const nextHandler = callAPIMiddleware({});
      expect(typeof nextHandler).toEqual('function');
      expect(nextHandler.length).toEqual(1);
    });

    it('returns a function to handle actions', () => {
      const actionHandler = callAPIMiddleware({})(x => {});
      expect(typeof actionHandler).toEqual('function');
      expect(actionHandler.length).toEqual(1);
    });
  });

  describe('action handler', () => {
    let actionHandler = callAPIMiddleware({})(action => {});

    it(`passes along actions if action[CALL_API] is not defined`, done => {
      const notApiAction = {};
      actionHandler = callAPIMiddleware({})(action => {
        expect(action).toBe(notApiAction);
        done();
      });
      actionHandler(notApiAction);
    });

    it('returns the result of next if action[CALL_API] is not defined', () => {
      const expected = 'resultOfNext';
      actionHandler = callAPIMiddleware({})(action => expected);
      expect(actionHandler({})).toEqual(expected);
    });

    it('errors if not passed three types', () => {
      const action = { [CALL_API]: { types: [] } };
      expect(() => actionHandler(action)).toThrow();
    });

    it('errors if not passed three string types', () => {
      const action = { [CALL_API]: { types: ['REQUEST', 'SUCCESS', 0] } };
      expect(() => actionHandler(action)).toThrow();
    });

    it('errors if not passed a function to call', () => {
      const action = {
        [CALL_API]: {
          types: ['R', 'S', 'F'],
          call: 'this should be a function'
        }
      };
      expect(() => actionHandler(action)).toThrow();
    });

    describe('with a properly structured call api action', () => {
      const [REQUEST, SUCCESS, FAILURE] = ['REQUEST', 'SUCCESS', 'FAILURE'];
      const createActionWithCall = call => ({
        [CALL_API]: {
          types: [REQUEST, SUCCESS, FAILURE],
          call
        }
      });

      describe('handles a successful API call', () => {
        const dispatch = jest.fn(action => {});
        actionHandler = callAPIMiddleware({ dispatch })();

        const response = { data: 'data from API response' };
        const action = createActionWithCall(() => Promise.resolve(response));

        actionHandler(action);

        it('immediately calls dispatch with the request type', () => {
          expect(dispatch.mock.calls[0]).toEqual([{ type: REQUEST }]);
        });

        it('eventually calls dispatch with the success type & the response', () => {
          expect(dispatch.mock.calls[1]).toEqual([{ type: SUCCESS, response }]);
        });
      });

      describe('handles a failed API call', () => {
        const dispatch = jest.fn(action => {});
        actionHandler = callAPIMiddleware({ dispatch })();

        const error = { message: 'the API call failed' };
        const action = createActionWithCall(() => Promise.reject(error));

        actionHandler(action);

        it('immediately calls next with the request type', () => {
          expect(dispatch.mock.calls[0]).toEqual([{ type: REQUEST }]);
        });

        it('eventually calls next with the failure type & the error', () => {
          expect(dispatch.mock.calls[1]).toEqual([{ type: FAILURE, error }]);
        });
      });
    });
  });
});
